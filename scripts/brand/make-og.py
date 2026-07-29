#!/usr/bin/env python3
"""Regenerate public/og.jpg (1200x630 social card).

Composes the card in a headless browser: signal poster background, left ink
scrim, logo lockup, eyebrow, and the homepage h1. Text is real HTML set in the
site's own Space Grotesk, which next/font self-hosts into the build — SO A
BUILD MUST EXIST (`pnpm build`) before running this; the woff2 is located by
parsing the built CSS. Rendered at 2x device scale, downsampled with PIL for
crisp text, saved as JPEG.

If the homepage h1 or the logo changes, update H1 below / just re-run.

Usage: python3 scripts/brand/make-og.py   (requires Pillow + Brave/Chrome)
"""

import base64
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parents[2]

# Client-facing surfaces always mirror the homepage h1.
H1 = "Custom solutions for your business"
EYEBROW = "AI-Native Agency"
BROWSERS = ["/opt/brave.com/brave/brave", "google-chrome", "chromium"]


def data_uri(path, mime):
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


DISPLAY_FAMILY = "Archivo Black"  # must track --font-display in layout.js


def find_display_font():
    """The latin (U+??) subset of the display face from the built CSS.

    next/font has emitted the src url as both `../media/x.woff2` and
    `/_next/static/media/x.woff2` across versions, so match either and keep
    only the basename.
    """
    for css in (REPO / "out/_next/static/chunks").glob("*.css"):
        for m in re.finditer(
            rf"font-family:{DISPLAY_FAMILY};[^}}]*?url\(([^)]+\.woff2)\)"
            r"[^}]*?unicode-range:U\+\?\?,",
            css.read_text(),
        ):
            return REPO / "out/_next/static/media" / Path(m.group(1)).name
    sys.exit(f"{DISPLAY_FAMILY} woff2 not found — run `pnpm build` first.")


def main():
    font = data_uri(find_display_font(), "font/woff2")
    poster = data_uri(REPO / "public/assets/signal-poster.webp", "image/webp")
    logo = data_uri(REPO / "public/logo-mark.svg", "image/svg+xml")

    html = f"""<!doctype html><meta charset="utf-8"><style>
      /* Archivo Black ships one weight; declaring 400 keeps the browser from
         synthesising a fake bold on top of an already-black face. */
      @font-face {{ font-family: "{DISPLAY_FAMILY}"; font-weight: 400;
                    src: url({font}) format("woff2"); }}
      * {{ margin: 0; }}
      body {{ width: 1200px; height: 630px; overflow: hidden; position: relative;
              background: #060910; font-family: "{DISPLAY_FAMILY}", sans-serif; }}
      .poster {{ position: absolute; inset: 0; width: 100%; height: 100%;
                 object-fit: cover; }}
      .scrim {{ position: absolute; inset: 0; background:
        linear-gradient(90deg, rgba(6,9,16,.94) 0%, rgba(6,9,16,.62) 36%,
                        rgba(6,9,16,0) 62%),
        linear-gradient(0deg, rgba(6,9,16,.35), rgba(6,9,16,0) 40%); }}
      .col {{ position: absolute; left: 72px; top: 168px; }}
      .lockup {{ display: flex; align-items: center; gap: 16px; }}
      .lockup img {{ height: 56px; width: auto; }}
      /* Everything sits at 400 — see the @font-face note above. Sizes are a
         notch below the old display face's: Archivo Black sets much wider, so
         the h1 needs the room to stay on three lines inside the column. */
      .lockup b {{ font-size: 34px; font-weight: 400; color: #F4F7FF;
                   letter-spacing: -0.01em; }}
      .eyebrow {{ margin-top: 52px; font-size: 19px; font-weight: 400;
                  letter-spacing: 0.22em; text-transform: uppercase;
                  color: #2EF2DC; }}
      h1 {{ margin-top: 26px; width: 700px; font-size: 58px; font-weight: 400;
            line-height: 1.14; letter-spacing: -0.015em; color: #F4F7FF; }}
    </style>
    <img class="poster" src="{poster}"><div class="scrim"></div>
    <div class="col">
      <div class="lockup"><img src="{logo}"><b>Closing Brackets</b></div>
      <div class="eyebrow">{EYEBROW}</div>
      <h1>{H1}</h1>
    </div>"""

    with tempfile.TemporaryDirectory() as td:
        page = Path(td) / "og.html"
        page.write_text(html)
        shot = Path(td) / "og.png"
        for browser in BROWSERS:
            try:
                subprocess.run(
                    [browser, "--headless", "--disable-gpu", "--no-sandbox",
                     "--hide-scrollbars", "--force-device-scale-factor=2",
                     "--window-size=1200,630", f"--screenshot={shot}", str(page)],
                    check=True, capture_output=True)
                break
            except FileNotFoundError:
                continue
        else:
            sys.exit("no Chromium-family browser found")
        img = Image.open(shot).convert("RGB").resize((1200, 630), Image.LANCZOS)

    out = REPO / "public/og.jpg"
    img.save(out, quality=85, optimize=True, progressive=True)
    print("wrote", out, out.stat().st_size, "bytes")


if __name__ == "__main__":
    main()
