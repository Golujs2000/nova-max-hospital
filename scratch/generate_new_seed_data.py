import re
import json

def slugify(text):
    s = text.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')

# The 11 specialities already in seedData.js with high quality content
EXISTING_SPECS = [
    "Common Acute Conditions", "Skin & Hair Diseases", "Digestive Disorders", 
    "Respiratory & Allergies", "Women's Health", "Joint, Bone & Muscle", 
    "Nervous System & Mental Health", "Metabolic & Chronic Diseases", 
    "Urinary & Kidney", "Children's Health", "Men's Health"
]

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
    # Specific pricing logic
    if "stone" in name.lower() or "cyst" in name.lower() or "fibroid" in name.lower():
        cost = "₹300 – ₹600"
        recovery = "1–3 months"
    elif "fever" in name.lower() or "cold" in name.lower() or "flu" in name.lower():
        cost = "₹200 – ₹400"
        recovery = "3–7 days"
    elif "cancer" in name.lower() or "autoimmune" in name.lower() or "supportive" in name.lower():
        cost = "₹500 – ₹1000"
        recovery = "Long-term"
    else:
        cost = "₹300 – ₹500" if is_chronic else "₹200 – ₹400"
        recovery = "2–4 months" if is_chronic else "1–2 weeks"

    return {
        "name": name,
        "slug": slug,
        "cost": cost,
        "duration": "20–30 min",
        "recovery": recovery,
        "description": f"Targeted homeopathic treatment for {name}, focusing on safe, individualized remedies that address the root cause and strengthen overall immunity.",
        "indications": [f"Chronic symptoms of {name}", "Recurrent episodes", "Lack of response to conventional medicine", "Emotional stress associated with condition"],
        "benefits": ["Safe for all age groups", "No toxic side effects", "Improves overall vital force", "Long-term sustainable relief"],
        "preparation": ["Note down onset and pattern of symptoms", "Identify aggravating factors (cold, heat, etc.)", "Bring previous diagnostic reports"],
        "steps": [
            {"step": "01", "title": "Comprehensive Consultation", "desc": "Detailed discussion of your physical and emotional symptoms."},
            {"step": "02", "title": "Individualization", "desc": "Selection of a constitutionally matched homeopathic remedy."},
            {"step": "03", "title": "Protocol & Follow-up", "desc": "Medicine dispensing with specific dosage and lifestyle guidance."}
        ],
        "faqs": [
            {"question": f"Is homeopathy effective for {name}?", "answer": "Yes, homeopathy is widely used and effective for managing this condition by treating the patient holistically."},
            {"question": "How soon can I expect results?", "answer": "Acute conditions show relief in days, while chronic conditions typically require 2-4 months of consistent treatment."}
        ]
    }

def main():
    specs_from_txt = parse_txt(r'e:\PROJECT_CGP360\CARE HOMEOPATHIC CLINIC\CARE HOMEOPATHIC CLINIC\treatment list.txt')
    
    new_specs = []
    order = 12 # Start after the existing 11
    
    for s in specs_from_txt:
        # Check if already covered by existing 11 (approximate match)
        if any(ex in s["name"] for ex in EXISTING_SPECS) or any(s["name"] in ex for ex in EXISTING_SPECS):
            # Special case for "Extended" or "Advanced" - we still want them if they are distinct names
            if "Extended" not in s["name"] and "Advanced" not in s["name"] and s["name"] in EXISTING_SPECS:
                 continue
        
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
        
        is_chronic = cat not in ["General", "Children", "Dental"]
        
        spec_obj = {
            "name": s["name"],
            "slug": slugify(s["name"]),
            "icon": s["icon"],
            "category": cat,
            "available": "OPD Hours",
            "description": f"Homeopathic care for various {s['name']}. Dr. Rajesh Kumar Ranjan provides specialized treatment for acute and chronic conditions.",
            "features": [t[:40] for t in s["treatments"][:6]], # Keep it short
            "costEstimate": "₹200 – ₹600",
            "recoveryTime": "1 – 6 months",
            "order": order,
            "treatments": [generate_treatment(t, is_chronic) for t in s["treatments"]]
        }
        new_specs.append(spec_obj)
        order += 1
        
    print(json.dumps(new_specs, indent=2))

if __name__ == "__main__":
    main()
