#!/usr/bin/env bash
# scroll-world asset pipeline for closingbrackets.com
# ---------------------------------------------------
# Generates the homepage's camera-flight chain with the Higgsfield CLI and
# encodes it for scrubbing. Idempotent: every step skips outputs that already
# exist, so a crash, an NSFW re-roll, or a single-scene regen never re-pays for
# finished work. To force one asset, delete its file in $WORK and re-run.
#
#   WORK=~/scroll-world-work bash pipeline.sh stills    # anchor-gated scene stills
#   WORK=... bash pipeline.sh dives                     # 6 dive clips  (seedance_2_0, 1080p)
#   WORK=... bash pipeline.sh frames                    # boundary frames from RENDERED dives
#   WORK=... bash pipeline.sh conns                     # 5 connectors  (actual-frame handoffs)
#   WORK=... bash pipeline.sh encode                    # masters + mobile + posters -> public/assets
#   WORK=... bash pipeline.sh seams                     # side-by-side seam sheets for eyeballing
#   WORK=... bash pipeline.sh status
#
# Prompts live in prompts/ next to this script:
#   preamble.txt        shared style preamble — BYTE-IDENTICAL across all stills;
#                       this is what makes six scenes read as one city
#   subj_<scene>.txt    per-scene subject ("Subject: ...")
#   dive_<scene>.txt    dive clip prompt (full text, style tail included)
#   conn_<i>.txt        connector prompt (i = 1..5)
#
# Requirements: higgsfield (authed), ffmpeg/ffprobe, jq, cwebp, curl.
#
# HARD-WON RULES (violate these and the seams visibly pop):
# - One model for the whole chain: seedance_2_0, --mode std --resolution 1080p.
#   kling3_0 is NOT a drop-in: it ignores --aspect_ratio and follows the start
#   image's aspect, and its render character differs enough to read at a seam.
# - Connector endpoints are extracted frames of the RENDERED neighbouring dives,
#   never the source stills. Every render differs; a still as an endpoint
#   guarantees a pop no crossfade can hide.
# - Connector prompts must describe arriving at the END-IMAGE'S CAMERA POSITION
#   (the next dive's high wide first frame). Saying "arrive in front of <the
#   subject>" makes seedance fly PAST the end-image to the subject (learned on
#   conn_5).
# - Seedance NSFW false-positives are stochastic per scene: re-roll first; if a
#   scene fails ~3x it is deterministic — find the visual trigger in the STILL
#   (dense abstract "readout board" arrays did it here) and change the still,
#   or scrub the prompt ("empty, unoccupied, architectural, no people").
# - Numeric SSIM gating does NOT work on this halftone comic style (hatching
#   phase-noise scores true handoffs 0.2-0.6). Eyeball the seam sheets instead.
set -u
SD="$(cd "$(dirname "$0")" && pwd)"
P="$SD/prompts"
WORK="${WORK:-$HOME/scroll-world-work}"
ASSETS="${ASSETS:-$SD/../../public/assets}"
NAMES="signal blueprint forge swarm engine launch"
mkdir -p "$WORK" "$ASSETS/vid"

VOPTS="--mode std --resolution 1080p"   # seedance_2_0, the chain model

gen_still() { # scene
  n="$1"
  [ -s "$WORK/still_$n.png" ] && { echo "still $n cached"; return 0; }
  cat "$P/preamble.txt" "$P/subj_$n.txt" > "$WORK/still_$n.txt"
  # STYLE_LOCK: pass the approved anchor to lock the batch to one look.
  higgsfield generate create gpt_image_2 --prompt "$(cat "$WORK/still_$n.txt")" \
    ${STYLE_LOCK:+--image "$STYLE_LOCK"} \
    --aspect_ratio 3:2 --resolution 2k --quality high \
    --wait --wait-timeout 15m --json > "$WORK/still_$n.json" 2> "$WORK/still_$n.err"
  url=$(jq -r '.[0].result_url // empty' "$WORK/still_$n.json" 2>/dev/null)
  [ -n "$url" ] && curl -fsSL "$url" -o "$WORK/still_$n.png" && echo "still $n ok" \
    || echo "still $n FAIL — $(jq -r '.[0].status // "?"' "$WORK/still_$n.json" 2>/dev/null)"
}

gen_dive() { # scene
  n="$1"
  [ -s "$WORK/dive_$n.mp4" ] && { echo "dive $n cached"; return 0; }
  # shellcheck disable=SC2086
  higgsfield generate create seedance_2_0 --prompt "$(cat "$P/dive_$n.txt")" \
    --start-image "$WORK/still_$n.png" \
    $VOPTS --aspect_ratio 16:9 --duration 8 \
    --wait --wait-timeout 20m --json > "$WORK/dive_$n.json" 2> "$WORK/dive_$n.err"
  url=$(jq -r '.[0].result_url // empty' "$WORK/dive_$n.json" 2>/dev/null)
  [ -n "$url" ] && curl -fsSL "$url" -o "$WORK/dive_$n.mp4" && echo "dive $n ok" \
    || echo "dive $n FAIL — $(jq -r '.[0].status // "?"' "$WORK/dive_$n.json" 2>/dev/null)"
}

gen_conn() { # i startPng endPng
  i="$1"
  [ -s "$WORK/conn_$i.mp4" ] && { echo "conn $i cached"; return 0; }
  # shellcheck disable=SC2086
  higgsfield generate create seedance_2_0 --prompt "$(cat "$P/conn_$i.txt")" \
    --start-image "$2" --end-image "$3" \
    $VOPTS --aspect_ratio 16:9 --duration 5 \
    --wait --wait-timeout 20m --json > "$WORK/conn_$i.json" 2> "$WORK/conn_$i.err"
  url=$(jq -r '.[0].result_url // empty' "$WORK/conn_$i.json" 2>/dev/null)
  [ -n "$url" ] && curl -fsSL "$url" -o "$WORK/conn_$i.mp4" && echo "conn $i ok" \
    || echo "conn $i FAIL — $(jq -r '.[0].status // "?"' "$WORK/conn_$i.json" 2>/dev/null)"
}

enc() { # src dst — native res, crf 20, GOP 8, sharpen, no audio, faststart
  ffmpeg -v error -y -i "$1" -an -vf "unsharp=5:5:0.8:5:5:0.0" \
    -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
    -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$2"
  echo "  enc  $(basename "$2") $(du -h "$2" | cut -f1)"
}

encm() { # src dst — 720p, GOP 4 (cheap phone seeks), crf 23
  ffmpeg -v error -y -i "$1" -an -vf "scale=-2:720,unsharp=5:5:0.6:5:5:0.0" \
    -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
    -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "$2"
  echo "  encm $(basename "$2") $(du -h "$2" | cut -f1)"
}

poster() { # srcClip dstWebp quality — poster MUST be the encoded clip's own first frame
  # Quality split (Lighthouse "improve image delivery" budgets bytes against the
  # VISIBLE crop only): full tier q60 keeps each 1080p poster under the ~280 KB
  # desktop budget (q60 vs q84 is indistinguishable on this art — verified in
  # side-by-side crops); the -m tier stays q84 because phones upscale it ~2x
  # (artifacts magnify) and its portrait-crop budget (~43 KB) is unreachable
  # without visibly degrading the halftone art anyway.
  ffmpeg -v error -y -ss 0 -i "$1" -frames:v 1 -q:v 2 "$WORK/_p.png"
  cwebp -quiet -q "${3:-84}" -m 6 "$WORK/_p.png" -o "$2"
}

case "${1:-}" in
  stills)
    # Anchor gate: generate signal alone first, get the art direction approved,
    # then batch the rest with STYLE_LOCK=$WORK/still_signal.png.
    if [ ! -s "$WORK/still_signal.png" ]; then
      gen_still signal
      echo ">> Review $WORK/still_signal.png, then re-run to batch the rest."
      exit 0
    fi
    STYLE_LOCK="$WORK/still_signal.png"
    for n in $NAMES; do gen_still "$n" & done; wait
    ;;
  dives)
    for n in $NAMES; do gen_dive "$n" & done; wait
    ;;
  frames)
    for n in $NAMES; do
      ffmpeg -v error -y -ss 0        -i "$WORK/dive_$n.mp4" -frames:v 1 -q:v 2 "$WORK/first_$n.png"
      ffmpeg -v error -y -sseof -0.15 -i "$WORK/dive_$n.mp4" -frames:v 1 -q:v 2 "$WORK/last_$n.png"
      echo "frames $n ok"
    done
    ;;
  conns)
    set -- $NAMES; i=0; prev=""
    for n in "$@"; do
      if [ -n "$prev" ]; then i=$((i + 1)); gen_conn "$i" "$WORK/last_$prev.png" "$WORK/first_$n.png" & fi
      prev="$n"
    done; wait
    ;;
  encode)
    for n in $NAMES; do
      enc  "$WORK/dive_$n.mp4" "$ASSETS/vid/$n.mp4"
      encm "$WORK/dive_$n.mp4" "$ASSETS/vid/$n-m.mp4"
      poster "$ASSETS/vid/$n.mp4"   "$ASSETS/$n-poster.webp"   60
      poster "$ASSETS/vid/$n-m.mp4" "$ASSETS/$n-poster-m.webp" 84
      cwebp -quiet -q 84 -resize 1800 0 "$WORK/still_$n.png" -o "$ASSETS/$n.webp"
    done
    i=0
    for f in "$WORK"/conn_[0-9].mp4; do
      i=$((i + 1))
      enc  "$f" "$ASSETS/vid/conn$i.mp4"
      encm "$f" "$ASSETS/vid/conn$i-m.mp4"
    done
    rm -f "$WORK/_p.png"
    echo "total: $(du -sh "$ASSETS" | cut -f1)"
    ;;
  seams)
    # Side-by-side sheets: last frame of A | first frame of B, for every seam.
    # EYEBALL these (SSIM lies on halftone art — see header).
    set -- $NAMES; i=0; prev=""
    for n in "$@"; do
      if [ -n "$prev" ]; then
        i=$((i + 1))
        for pair in "$ASSETS/vid/$prev.mp4|$ASSETS/vid/conn$i.mp4|${prev}_conn$i" \
                    "$ASSETS/vid/conn$i.mp4|$ASSETS/vid/$n.mp4|conn${i}_$n"; do
          a="${pair%%|*}"; rest="${pair#*|}"; b="${rest%%|*}"; lbl="${rest#*|}"
          ffmpeg -v error -y -sseof -0.05 -i "$a" -frames:v 1 "$WORK/_sa.png"
          ffmpeg -v error -y -ss 0        -i "$b" -frames:v 1 "$WORK/_sb.png"
          ffmpeg -v error -y -i "$WORK/_sa.png" -i "$WORK/_sb.png" \
            -filter_complex "[0]scale=960:540[l];[1]scale=960:540[r];[l][r]hstack" \
            "$WORK/seam_$lbl.png"
          echo "seam sheet: $WORK/seam_$lbl.png"
        done
      fi; prev="$n"
    done
    rm -f "$WORK/_sa.png" "$WORK/_sb.png"
    ;;
  status)
    for n in $NAMES; do
      printf '%-10s still:%s dive:%s\n' "$n" \
        "$([ -s "$WORK/still_$n.png" ] && echo ok || echo -- )" \
        "$([ -s "$WORK/dive_$n.mp4" ] && echo ok || echo -- )"
    done
    for f in "$WORK"/conn_[0-9].mp4; do [ -s "$f" ] && echo "$(basename "$f") ok"; done
    ;;
  *) sed -n '2,20p' "$0"; exit 1 ;;
esac
echo "--- done ---"
