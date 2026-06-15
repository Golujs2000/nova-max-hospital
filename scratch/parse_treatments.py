import json
import re

def parse_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    specialities = []
    current_spec = None

    # This regex is broad for any emoji-like character at the start of the line or a known speciality header
    # We'll also look for lines that just look like headers (Short, capitalized, no Hindi)
    for i, line in enumerate(lines):
        line = line.strip()
        if not line:
            continue
        
        # A header usually starts with an emoji OR is a line that doesn't contain parentheses (Hindi translations) 
        # but the treatments DO contain parentheses.
        # Actually, let's just look for the emojis more carefully.
        
        # Match any non-ascii character at the start, followed by space and text
        header_match = re.match(r'^([^\x00-\x7F]|[0-9]?[0-9]?\s?[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF])\s*(.*)$', line)
        
        # If it's a header line
        if header_match or (line.isupper() and len(line) < 50): # backup for all-caps headers
             # Check if it's actually a treatment (treatments usually have Hindi in parens)
            if "(" in line and ")" in line and len(line.split("(")[0].strip()) > 3:
                if current_spec:
                    current_spec["treatments"].append(line)
                continue

            name = line
            # Clean up emoji if present
            name = re.sub(r'^([^\x00-\x7F]|[\uD83C-\uDBFF][\uDC00-\uDFFF])\s*', '', name).strip()
            
            emoji = ""
            e_match = re.match(r'^([^\x00-\x7F]|[\uD83C-\uDBFF][\uDC00-\uDFFF])', line)
            if e_match:
                emoji = e_match.group(1)

            current_spec = {
                "name": name,
                "icon": emoji,
                "treatments": []
            }
            specialities.append(current_spec)
        elif current_spec is not None:
            current_spec["treatments"].append(line)
            
    return specialities

data = parse_txt(r'e:\PROJECT_CGP360\CARE HOMEOPATHIC CLINIC\CARE HOMEOPATHIC CLINIC\treatment list.txt')
print(json.dumps(data, indent=2))
