#!/usr/bin/env python3
"""Create reviewable WebP derivatives; never replace the original website images.

Requires Python 3 and Pillow with WebP support. Run from any directory:
    python3 scripts/optimize-images.py --report ../operations/website-review-2026-11-09/image-optimization.json

The build consumes the checked-in derivatives and does not need Pillow. Encoding
is deterministic for a given Pillow/libwebp version, recorded in the report.
"""

import argparse
import hashlib
import json
from pathlib import Path

try:
    import PIL
    from PIL import Image, ImageChops, ImageOps, features
except ImportError as exc:
    raise SystemExit("Pillow with WebP support is required to regenerate images.") from exc


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUTPUT = PUBLIC / "optimized"
QUALITY = 84

# Source names are explicit so new site imagery is never silently transformed.
# Widths are caps: smaller originals are never enlarged, and nothing is cropped.
ASSETS = [
    ("40d5f3fe-bf32-42eb-8908-98dd60b9e62e.PNG", "lavash-logo", [512, 256], True),
    ("hero-image.jpg", "hero-image", [1920, 768], False),
    ("new_lavash_tray.png", "lavash-tray", [1440, 768], False),
    ("baklava.png", "baklava", [1200], False),
    ("beirut-loaded-fries.png", "beirut-loaded-fries", [1200], False),
    ("caesar-chicken-wrap.png", "caesar-chicken-wrap", [1200], False),
    ("chicken-shawarma-bowl.png", "chicken-shawarma-bowl", [1200], False),
    ("hommous.png", "hommous", [1200], False),
    ("og-falafel.png", "og-falafel", [1200], False),
    ("saj_bread_chicken_shawarma.png", "saj-bread-chicken-shawarma", [1200], False),
    ("shish_tawook_bowl.png", "shish-tawook-bowl", [1200], False),
    ("spicy-chicken-manoushi.png", "spicy-chicken-manoushi", [1200], False),
]


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def derivative(source, target_width):
    image = source.copy()
    width = min(source.width, target_width)
    if width != source.width:
        height = max(1, round(source.height * width / source.width))
        image = image.resize((width, height), Image.Resampling.LANCZOS)
    return image


def encode_asset(filename, output_name, widths, lossless):
    source_path = PUBLIC / filename
    source_hash = sha256(source_path)
    with Image.open(source_path) as original:
        image = ImageOps.exif_transpose(original)
        alpha = "A" in image.getbands() or "transparency" in image.info
        image = image.convert("RGBA" if alpha else "RGB")
        original_dimensions = list(image.size)
        profile = original.info.get("icc_profile")
        variants = []
        seen_widths = set()
        for index, width_cap in enumerate(widths):
            resized = derivative(image, width_cap)
            if resized.width in seen_widths:
                continue
            seen_widths.add(resized.width)
            suffix = "" if index == 0 else f"-{resized.width}"
            destination = OUTPUT / f"{output_name}{suffix}.webp"
            options = {
                "format": "WEBP",
                "quality": 100 if lossless else QUALITY,
                "method": 6,
                "lossless": lossless,
                "exact": True,
            }
            if profile:
                options["icc_profile"] = profile
            resized.save(destination, **options)
            with Image.open(destination) as encoded:
                encoded.verify()
            with Image.open(destination) as encoded:
                encoded.load()
                assert encoded.format == "WEBP", destination
                assert encoded.size == resized.size, destination
                decoded_alpha = "A" in encoded.getbands()
                if alpha:
                    assert decoded_alpha, destination
                    assert ImageChops.difference(
                        resized.getchannel("A"), encoded.getchannel("A")
                    ).getbbox() is None, destination
                if lossless:
                    assert ImageChops.difference(
                        resized.convert("RGB"), encoded.convert("RGB")
                    ).getbbox() is None, destination
                variants.append({
                    "url": "/optimized/" + destination.name,
                    "width": encoded.width,
                    "height": encoded.height,
                    "bytes": destination.stat().st_size,
                    "sha256": sha256(destination),
                    "alpha_preserved": alpha and decoded_alpha,
                    "decode_verified": True,
                    "lossless": lossless,
                    "quality": 100 if lossless else QUALITY,
                })
    assert sha256(source_path) == source_hash, "Original image was modified"
    primary = variants[0]
    return {
        "source_url": "/" + filename,
        "source_bytes": source_path.stat().st_size,
        "source_sha256": source_hash,
        "source_width": original_dimensions[0],
        "source_height": original_dimensions[1],
        "source_has_alpha": alpha,
        "primary_url": primary["url"],
        "primary_bytes": primary["bytes"],
        "saved_bytes": source_path.stat().st_size - primary["bytes"],
        "variants": variants,
        "srcset": ", ".join(
            f"{item['url']} {item['width']}w"
            for item in sorted(variants, key=lambda item: item["width"])
        ),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    if not features.check("webp"):
        raise SystemExit("This Pillow installation does not include WebP support.")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    assets = [encode_asset(*specification) for specification in ASSETS]
    source_bytes = sum(asset["source_bytes"] for asset in assets)
    primary_bytes = sum(asset["primary_bytes"] for asset in assets)
    saved_bytes = sum(asset["saved_bytes"] for asset in assets)
    # Reconcile independently from the files, rather than the accumulated rows.
    source_file_bytes = sum((PUBLIC / specification[0]).stat().st_size for specification in ASSETS)
    primary_file_bytes = sum((PUBLIC / asset["primary_url"].lstrip("/")).stat().st_size for asset in assets)
    assert source_bytes == source_file_bytes
    assert primary_bytes == primary_file_bytes
    assert source_bytes - primary_bytes == saved_bytes
    source_mapping = {
        asset["source_url"]: {
            "src": asset["primary_url"],
            "width": asset["variants"][0]["width"],
            "height": asset["variants"][0]["height"],
            "srcSet": asset["srcset"],
        }
        for asset in assets
    }
    (ROOT / "src" / "image-assets.ts").write_text(
        "// Generated by scripts/optimize-images.py; original image URLs remain available.\n"
        "export const imageAssets = "
        + json.dumps(source_mapping, indent=2)
        + " as const;\n"
    )
    report = {
        "scope": "Local derivative generation only; originals retained. No deployment or publication.",
        "toolchain": {"pillow": PIL.__version__, "libwebp": features.version("webp")},
        "settings": {
            "photo_quality": QUALITY,
            "encoding_method": 6,
            "logo": "Lossless after proportional resizing; alpha channel verified exactly.",
            "resize": "Proportional width cap; no cropping or upscaling.",
            "metadata": "ICC color profiles retained; EXIF orientation applied, other metadata omitted.",
        },
        "assets": assets,
        "totals": {
            "source_image_count": len(assets),
            "derivative_count": sum(len(asset["variants"]) for asset in assets),
            "source_bytes": source_bytes,
            "primary_derivative_bytes": primary_bytes,
            "primary_saved_bytes": saved_bytes,
            "primary_reduction_percent": round(100 * saved_bytes / source_bytes, 2),
            "all_derivative_bytes": sum(item["bytes"] for asset in assets for item in asset["variants"]),
            "independent_file_totals_reconciled": True,
        },
        "limits": [
            "Totals compare one primary derivative per source, not a measured page transfer or load-time improvement.",
            "Original files remain available; build artifact disk size increases until originals are deliberately retired.",
            "Component src/srcset usage must be updated separately to serve the derivatives.",
        ],
    }
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report["totals"], indent=2))


if __name__ == "__main__":
    main()
