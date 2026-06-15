import os

src_dir = r"E:\CGP360_PROJECTS\SARVADA HOSPITO CARE\SARVADA HOSPITO CARE\src"

REPLACEMENTS = {
    "â”€": "─",
    "â†’": "→",
    "Â·": "·",
    "â€¦": "…",
    "Ã—": "×",
    "ðŸ‘¨â€ âš•ï¸": "👨‍⚕️",
    "ðŸ ¥": "🏥",
    "ðŸ’Š": "💊",
    "ðŸš‘": "🚑",
    "ðŸ§¾": "🧪",
    "ðŸ🤰": "🤰",
    "ðŸ🦴": "🦴",
    "ðŸ🧠": "🧠",
    "ðŸ🩻": "🩻",
    "ðŸ🫀": "🫀",
    "ðŸ🩺": "🩺",
    "ðŸ🔬": "🔬",
    "ðŸ🫘": "🫘",
    "â€“": "–",
    "â€”": "—",
    "â€™": "’",
    "â€˜": "‘",
    "â€œ": "“",
    "â€": "”",
}

extensions = (".jsx", ".js", ".html", ".css", ".json")
modified_files = []

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.lower().endswith(extensions):
            file_path = os.path.join(root, f)
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    content = file.read()
                
                original_content = content
                for corrupted, clean in REPLACEMENTS.items():
                    if corrupted in content:
                        content = content.replace(corrupted, clean)
                
                if content != original_content:
                    with open(file_path, "w", encoding="utf-8") as file:
                        file.write(content)
                    modified_files.append(file_path)
            except Exception as e:
                print(f"Error processing {file_path}: {e}")

print(f"Cleanup finished! Modified {len(modified_files)} files:")
for f in modified_files:
    print(f" - {f}")
