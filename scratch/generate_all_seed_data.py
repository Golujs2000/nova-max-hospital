import re
import json

def slugify(text):
    s = text.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')

def get_existing_data():
    # We'll extract the seedSpecialities array from seedData.js
    # For now, I'll manually define the high-quality ones I saw earlier 
    # Or I can try to parse the file. Parsing JS with regex is tricky.
    # I'll just use the first 11 I already know.
    return {
        "Common Acute Conditions": "🩺",
        "Skin & Hair Diseases": "💧",
        "Digestive Disorders": "🌿",
        "Respiratory & Allergies": "🫁",
        "Women's Health": "👩‍⚕️",
        "Joint, Bone & Muscle": "💪",
        "Nervous System & Mental Health": "🧠",
        "Metabolic & Chronic Diseases": "🩸",
        "Urinary & Kidney": "🧪",
        "Children's Health": "👶",
        "Men's Health": "👨‍⚕️"
    }

def parse_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    specs = []
    curr = None
    for line in lines:
        line = line.strip()
        if not line: continue
        # Match Emoji + Name
        m = re.match(r'^([^\x00-\x7F]|[\uD83C-\uDBFF][\uDC00-\uDFFF])\s*(.*)$', line)
        if m:
            emoji = m.group(1)
            name = m.group(2).replace(':', '').strip()
            curr = {"name": name, "icon": emoji, "treatments": []}
            specs.append(curr)
        elif curr:
            curr["treatments"].append(line)
    return specs

def generate_treatment(name, is_chronic=False):
    slug = slugify(name)
    cost = "₹300 – ₹600" if is_chronic else "₹200 – ₹400"
    recovery = "2–6 months" if is_chronic else "1–2 weeks"
    return {
        "name": name,
        "slug": slug,
        "cost": cost,
        "duration": "20–30 min",
        "recovery": recovery,
        "description": f"Homeopathic consultation for {name}. Focuses on individualized remedies to address {name} naturally and effectively.",
        "indications": [f"Symptoms associated with {name}", "Recurrent condition", "Chronic management support"],
        "benefits": ["Non-toxic approach", "No side effects", "Strengthens immunity", "Personalised care"],
        "preparation": ["Record symptoms", "Note triggers", "Bring past reports"],
        "steps": [
            {"step": "01", "title": "History", "desc": "Detailed discussion of condition."},
            {"step": "02", "title": "Analysis", "desc": "Individualised remedy selection."},
            {"step": "03", "title": "Dose", "desc": "Specific remedy dispensing."}
        ],
        "faqs": [
            {"question": f"Can homeopathy help with {name}?", "answer": "Yes, homeopathy is effective for managing many conditions by treating the whole person."}
        ]
    }

def main():
    specs_from_txt = parse_txt(r'e:\PROJECT_CGP360\CARE HOMEOPATHIC CLINIC\CARE HOMEOPATHIC CLINIC\treatment list.txt')
    
    final_specs = []
    order = 1
    
    for s in specs_from_txt:
        # Determine Category
        cat = "General"
        if "Skin" in s["name"]: cat = "Skin"
        elif "Digestive" in s["name"]: cat = "Digestive"
        elif "Respiratory" in s["name"] or "ENT" in s["name"]: cat = "Respiratory"
        elif "Women" in s["name"] or "Female" in s["name"]: cat = "Women"
        elif "Men" in s["name"] or "Male" in s["name"]: cat = "Men"
        elif "Joint" in s["name"] or "Muscle" in s["name"] or "Bone" in s["name"] or "Musculoskeletal" in s["name"]: cat = "Musculo"
        elif "Nervous" in s["name"] or "Neuro" in s["name"] or "Mental" in s["name"] or "Psychological" in s["name"] or "Behavioral" in s["name"]: cat = "Neuro"
        elif "Metabolic" in s["name"] or "Chronic" in s["name"] or "Hormonal" in s["name"] or "Endo" in s["name"]: cat = "Chronic"
        elif "Urinary" in s["name"] or "Kidney" in s["name"] or "Urology" in s["name"]: cat = "Urology"
        elif "Children" in s["name"]: cat = "Children"
        elif "Oral" in s["name"] or "Dental" in s["name"]: cat = "Dental"
        elif "Allergy" in s["name"] or "Autoimmune" in s["name"]: cat = "Allergy"
        elif "Cardio" in s["name"]: cat = "Cardio"
        elif "Eye" in s["name"]: cat = "Eye"
        elif "Ear" in s["name"]: cat = "Ear"
        
        is_chronic = cat not in ["General", "Children"]
        
        spec_obj = {
            "name": s["name"],
            "slug": slugify(s["name"]),
            "icon": s["icon"],
            "category": cat,
            "available": "OPD Hours",
            "description": f"Homeopathic care for various {s['name']}. Dr. Rajesh Kumar Ranjan provides specialized treatment for acute and chronic conditions.",
            "features": s["treatments"][:6], # Use first 6 as features
            "costEstimate": "₹200 – ₹600",
            "recoveryTime": "1 – 6 months",
            "order": order,
            "treatments": [generate_treatment(t, is_chronic) for t in s["treatments"]]
        }
        final_specs.append(spec_obj)
        order += 1
        
    print(json.dumps(final_specs, indent=2))

if __name__ == "__main__":
    main()
