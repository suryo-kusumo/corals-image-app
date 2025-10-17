
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import numpy as np
import sys
from pathlib import Path

def gray_world_balance(pil_img):
    arr = np.asarray(pil_img).astype(np.float32)
    means = arr.reshape(-1, 3).mean(axis=0) + 1e-6
    gray_mean = means.mean()
    gains = gray_mean / means
    balanced = np.clip(arr * gains, 0, 255).astype(np.uint8)
    return Image.fromarray(balanced)

def fix_underwater(in_path, out_path=None):
    img = Image.open(in_path).convert("RGB")
    wb = gray_world_balance(img)
    r, g, b = wb.split()
    r = r.point(lambda i: min(255, int(i * 1.10)))
    g = g.point(lambda i: min(255, int(i * 0.96)))
    b = b.point(lambda i: min(255, int(i * 1.06)))
    balanced = Image.merge("RGB", (r, g, b))
    autocon = ImageOps.autocontrast(balanced, cutoff=1)
    clarity = ImageEnhance.Sharpness(autocon).enhance(1.15)
    contrast = ImageEnhance.Contrast(clarity).enhance(1.12)
    final_img = ImageEnhance.Color(contrast).enhance(1.05)
    if out_path is None:
        out_path = str(Path(in_path).with_name(Path(in_path).stem + "_corrected.jpg"))
    final_img.save(out_path)
    return out_path

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python underwater_fix.py <input_image> [output_image]")
        sys.exit(1)
    in_path = sys.argv[1]
    out_path = sys.argv[2] if len(sys.argv) > 2 else None
    out_file = fix_underwater(in_path, out_path)
    print("Saved:", out_file)
