import os
from PIL import Image

assets_dir = r"E:\CGP360_PROJECTS\SARVADA HOSPITO CARE\assets"

def examine():
    for root, dirs, files in os.walk(assets_dir):
        if not files:
            continue
        print(f"\nDirectory: {root}")
        for f in sorted(files)[:5]: # show first 5 files of each folder
            ext = os.path.splitext(f)[1].lower()
            full_path = os.path.join(root, f)
            size = os.path.getsize(full_path)
            if ext in ('.png', '.jpg', '.jpeg', '.webp'):
                try:
                    with Image.open(full_path) as img:
                        print(f"  {f} - Size: {size} bytes - Format: {img.format} - Mode: {img.mode} - Dimensions: {img.size}")
                except Exception as e:
                    print(f"  {f} - Size: {size} bytes - Error opening: {e}")
            else:
                print(f"  {f} - Size: {size} bytes - (Non-image)")

if __name__ == "__main__":
    examine()
