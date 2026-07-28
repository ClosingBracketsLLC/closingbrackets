#!/usr/bin/env python3
"""Regenerate src/app/favicon.ico and src/app/apple-icon.png from the brand mark.

The mark's source of truth is src/app/icon.svg (32x32 viewBox). No SVG
rasterizer is assumed on this machine, so the same axis-aligned geometry is
redrawn here with PIL at 32x supersample — IF YOU EDIT icon.svg, MIRROR THE
CHANGE IN `GEOMETRY` BELOW, or the tab icon silently keeps the old mark.

Usage: python3 scripts/brand/make-icons.py   (requires Pillow)
"""

from pathlib import Path

from PIL import Image, ImageDraw

REPO = Path(__file__).resolve().parents[2]

INK = (6, 9, 16)
RAIN = (27, 41, 66)
CORAL = (255, 78, 100)
CYAN = (46, 242, 220)

# (x0, y0, x1, y1, color) in the 32x32 viewBox — mirrors icon.svg:
# Interlock Monogram — bracket slab as top bar / right column / bottom bar,
# coral cursor keyed into the open mouth.
GEOMETRY = [
    (6, 6, 26, 10, CYAN),
    (22, 6, 26, 26, CYAN),
    (6, 22, 26, 26, CYAN),
    (6, 12, 14, 20, CORAL),
]

S = 32  # supersample factor -> 1024px master


def draw(tile_style):
    """tile_style: 'rounded' (favicon, plain ink tile like icon.svg) or
    'square' (apple-icon, full-bleed — iOS rounds the corners itself)."""
    px = 32 * S
    if tile_style == "rounded":
        img = Image.new("RGBA", (px, px), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        d.rounded_rectangle([0, 0, px - 1, px - 1], radius=6 * S, fill=INK)
    else:
        img = Image.new("RGB", (px, px), INK)
        d = ImageDraw.Draw(img)
    for x0, y0, x1, y1, c in GEOMETRY:
        d.rectangle([x0 * S, y0 * S, x1 * S - 1, y1 * S - 1], fill=c)
    return img


def main():
    mark = draw("rounded")
    frames = {s: mark.resize((s, s), Image.LANCZOS) for s in (48, 32, 16)}
    ico = REPO / "src/app/favicon.ico"
    # Largest frame must be the base image or PIL writes only that one size.
    frames[48].save(
        ico,
        format="ICO",
        append_images=[frames[32], frames[16]],
        sizes=[(48, 48), (32, 32), (16, 16)],
    )
    print("wrote", ico)

    apple = REPO / "src/app/apple-icon.png"
    draw("square").resize((180, 180), Image.LANCZOS).save(apple)
    print("wrote", apple)


if __name__ == "__main__":
    main()
