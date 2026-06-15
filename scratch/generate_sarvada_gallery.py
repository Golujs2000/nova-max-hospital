import os

assets_dir = r"E:\CGP360_PROJECTS\SARVADA HOSPITO CARE\assets"
scratch_dir = r"E:\CGP360_PROJECTS\SARVADA HOSPITO CARE\SARVADA HOSPITO CARE\scratch"
output_file = os.path.join(scratch_dir, "sarvada_gallery.html")

extensions = (".png", ".jpg", ".jpeg", ".webp", ".mp4")
files_found = []

# Generic prefixes we want to rename
generic_prefixes = [
    "whatsapp",
    "chatgpt image",
    "sarvada hospito care",
    "hero backgound pic",
    "hero background image",
    "hero bakgound pic",
    "neemkroli baba",
    "screencapture"
]

def is_generic(filename):
    fn = filename.lower()
    for prefix in generic_prefixes:
        if fn.startswith(prefix):
            return True
    return False

for root, dirs, files in os.walk(assets_dir):
    for f in files:
        if f.lower().endswith(extensions) and is_generic(f):
            full_path = os.path.join(root, f)
            rel_path_from_assets = os.path.relpath(full_path, assets_dir)
            files_found.append((full_path, rel_path_from_assets))

print(f"Found {len(files_found)} generic files to rename.")

# Sort them so they are grouped by directory and name
files_found.sort(key=lambda x: x[1])

# Generate HTML
html_content = """<!DOCTYPE html>
<html>
<head>
  <title>Sarvada Hospito Care Asset Viewer</title>
  <style>
    body { font-family: sans-serif; background: #1e1e1e; color: #fff; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }
    .card { background: #2d2d2d; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; flex-direction: column; }
    img, video { max-width: 100%; max-height: 250px; object-fit: contain; margin-bottom: 10px; border-radius: 4px; background: #000; }
    .path { font-size: 11px; word-break: break-all; color: #aaa; margin-top: auto; }
    .index { font-weight: bold; margin-bottom: 5px; color: #4fc3f7; }
  </style>
</head>
<body>
  <h1>Sarvada Hospito Care Asset Viewer ({count} files)</h1>
  <div class="grid">
"""

for idx, (full_path, rel_path) in enumerate(files_found, 1):
    url_path = f"../../assets/{rel_path.replace('\\', '/')}"
    
    html_content += f"""      <div class="card" data-relpath="{rel_path}">
        <div class="index">#{idx}</div>
"""
    if rel_path.lower().endswith(".mp4"):
        html_content += f'        <video src="{url_path}" controls muted alt="Video #{idx}"></video>\n'
    else:
        html_content += f'        <img src="{url_path}" alt="Image #{idx}" />\n'
        
    html_content += f"""        <div class="path">{rel_path}</div>
      </div>
"""

html_content += """  </div>
</body>
</html>
"""

html_content = html_content.replace("{count}", str(len(files_found)))

with open(output_file, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated gallery at {output_file}")
