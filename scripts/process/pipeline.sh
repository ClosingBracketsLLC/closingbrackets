#!/usr/bin/env bash
# Process drawings for the homepage "How it gets built" tabs (ProcessTabs.js).
#
# Twelve pencil-on-drafting-paper stills, six per track, generated with
# Higgsfield nano_banana_pro (2 credits each at 3:2 / 2k) and encoded to webp.
# Prompts live in prompts/: style.txt is the shared art direction with
# {ACCENT}/{ACCENT_NAME} filled per track (the one coloured-pencil element:
# cyan for bot, coral for web), and <track>_<nn>.txt is each step's subject.
# Idempotent: a cached png is never regenerated, so a re-run only fills what
# is missing.
#
#   pipeline.sh anchors   # bot_01 + web_01 only — approve the style first
#                         # (ANCHOR_REF_DIR=<dir> locks them to an approved pair)
#   pipeline.sh stills    # everything not yet rendered, locked per track (BOT_LOCK/WEB_LOCK)
#   pipeline.sh one web 05 ref.png   # a single sheet, optionally locked to a reference
#   pipeline.sh encode    # png -> public/assets/process/*.webp (two tiers)
#   pipeline.sh sheet     # contact sheet of everything rendered so far
#
# WORK is the render cache and MUST live outside /tmp (a reboot wiped the
# scroll-world cache once). Requirements: higgsfield (authed), jq, curl, cwebp,
# ffmpeg for the contact sheet.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
P="$ROOT/scripts/process/prompts"
ASSETS="$ROOT/public/assets/process"
WORK="${WORK:-$HOME/closingbrackets-process-work}"
mkdir -p "$WORK" "$ASSETS"

MODEL="nano_banana_pro"
FULL_W=1440   # 3-across desktop cell at 2x, 2-across tablet at ~1.5x
MOBILE_W=720  # the <600px tier

# "concept" is a scratch track for direction tests (prompts/concept_<name>.txt,
# rendered with `one concept <name> [ref]`); it takes the web accent.
accent() { case "$1" in bot) echo "2EF2DC";; web|concept) echo "FF4E64";; esac; }
accent_name() { case "$1" in bot) echo "cyan";; web|concept) echo "coral";; esac; }

prompt_for() { # track nn -> full prompt on stdout
  sed -e "s/{ACCENT_NAME}/$(accent_name "$1")/g" -e "s/{ACCENT}/$(accent "$1")/g" "$P/style.txt"
  echo
  cat "$P/${1}_${2}.txt"
}

gen() { # track nn [style-lock png]
  local t="$1" n="$2" lock="${3:-}" key="${1}_${2}"
  [ -s "$WORK/$key.png" ] && { echo "$key cached"; return 0; }
  prompt_for "$t" "$n" > "$WORK/$key.txt"
  # shellcheck disable=SC2086
  higgsfield generate create "$MODEL" --prompt "$(cat "$WORK/$key.txt")" \
    ${lock:+--image "$lock"} \
    --aspect_ratio 3:2 --resolution 2k \
    --wait --wait-timeout 15m --json > "$WORK/$key.json" 2> "$WORK/$key.err" || true
  local url
  url=$(jq -r '.[0].result_url // .result_url // empty' "$WORK/$key.json" 2>/dev/null)
  if [ -n "$url" ] && curl -fsSL "$url" -o "$WORK/$key.png"; then
    echo "$key ok"
  else
    echo "$key FAIL — $(jq -r '.[0].status // .status // "?"' "$WORK/$key.json" 2>/dev/null) ($(head -c 200 "$WORK/$key.err"))"
    return 1
  fi
}

encode_one() { # track nn
  local key="${1}_${2}" out="$ASSETS/${1}-${2}"
  [ -s "$WORK/$key.png" ] || { echo "$key: no png"; return 0; }
  cwebp -quiet -q 76 -m 6 -resize "$FULL_W" 0 "$WORK/$key.png" -o "$out.webp"
  cwebp -quiet -q 78 -m 6 -resize "$MOBILE_W" 0 "$WORK/$key.png" -o "$out-m.webp"
  echo "  $key -> $(du -h "$out.webp" | cut -f1) / $(du -h "$out-m.webp" | cut -f1)"
}

case "${1:-}" in
  anchors)
    # ANCHOR_REF_DIR: lock the anchors to an earlier approved pair (style
    # approved, subject changed) instead of starting from the prompt alone.
    gen bot 01 ${ANCHOR_REF_DIR:+"$ANCHOR_REF_DIR/bot_01.png"} &
    gen web 01 ${ANCHOR_REF_DIR:+"$ANCHOR_REF_DIR/web_01.png"} &
    wait
    echo ">> Review $WORK/bot_01.png and $WORK/web_01.png, then run: pipeline.sh stills"
    ;;
  stills)
    # Each track locks to its anchor sheet: BOT_LOCK / WEB_LOCK name the step
    # (default 01). The web set anchors on 05, the finished building, so the
    # same building appears in every frame.
    bl="$WORK/bot_${BOT_LOCK:-01}.png"; wl="$WORK/web_${WEB_LOCK:-01}.png"
    [ -s "$bl" ] && [ -s "$wl" ] || { echo "anchors missing ($bl, $wl)"; exit 1; }
    for n in 01 02 03 04 05 06; do
      gen bot "$n" "$bl" &
      gen web "$n" "$wl" &
    done
    wait
    ;;
  one)
    # one <track> <nn> [reference.png] — render a single sheet, e.g. a new anchor
    # locked to an earlier approved sheet for paper tone.
    gen "$2" "$3" "${4:-}"
    ;;
  encode)
    for t in bot web; do for n in 01 02 03 04 05 06; do encode_one "$t" "$n"; done; done
    ;;
  sheet)
    # One 3x2 sheet per track, ffmpeg only (ImageMagick is not a requirement).
    for t in bot web; do
      ffmpeg -v error -y $(for n in 01 02 03 04 05 06; do printf -- "-i %s/%s_%s.png " "$WORK" "$t" "$n"; done) \
        -filter_complex "[0]scale=600:400[a];[1]scale=600:400[b];[2]scale=600:400[c];[3]scale=600:400[d];[4]scale=600:400[e];[5]scale=600:400[f];[a][b][c]hstack=3[r1];[d][e][f]hstack=3[r2];[r1][r2]vstack=2" \
        -q:v 3 "$WORK/sheet_$t.jpg" && echo "$WORK/sheet_$t.jpg"
    done
    ;;
  *)
    echo "usage: $0 anchors|stills|one <track> <nn> [ref]|encode|sheet"; exit 1;;
esac
