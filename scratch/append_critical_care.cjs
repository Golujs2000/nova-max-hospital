const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/seed/criticalCare.js');
let content = fs.readFileSync(filePath, 'utf8');

content = content.trimEnd();
if (content.endsWith('];')) {
  content = content.slice(0, -2);
}

const newEntry = `,
  {
    "name": "Critical Care Physician (Intensivist) Consultation",
    "slug": "critical-care-physician-consultation",
    "icon": "👨‍⚕️",
    "category": "Critical & Emergency Care",
    "available": "24/7",
    "description": "Dedicated intensivist-led ICU rounds, family consultations, and critical care medicine management for all ICU and ICCU patients.",
    "longDescription": "The Critical Care Physician (Intensivist) Consultation service at Sarvada Hospito Care ensures that every patient admitted to our ICU or ICCU receives expert, dedicated medical oversight from a qualified critical care physician. Our intensivists conduct comprehensive daily ICU rounds, review all investigations, adjust treatment plans, and coordinate with specialist colleagues to provide the highest standard of evidence-based critical care management. Available round-the-clock, our intensivists are the central coordinators of every critically ill patient's care journey.\\n\\nAt Sarvada Hospito Care, our intensivists bring extensive training in internal medicine, critical care medicine, and acute resuscitation to every patient interaction. They are proficient in advanced procedures including central venous catheter insertion, arterial line placement, bronchoscopy, and bedside ultrasound-guided interventions. This comprehensive skill set ensures that critically ill patients receive expert procedural support without the delays associated with calling multiple specialist teams.\\n\\nWe understand that families of ICU patients desperately need clear, honest, and compassionate communication about their loved one's condition. Our intensivists schedule daily family briefings at fixed times, providing structured updates on the patient's progress, current treatment plan, and anticipated trajectory. We use simple, jargon-free language and answer every question thoroughly, ensuring families feel genuinely informed, respected, and supported throughout the ICU stay.\\n\\nTrust Sarvada Hospito Care's dedicated intensivist consultation service for expert, round-the-clock critical care physician oversight in Patna, Bihar. Our commitment to evidence-based critical care medicine, compassionate family communication, and seamless multidisciplinary coordination ensures the best possible outcomes for every critically ill patient.",
    "features": [
      "Daily ICU Multidisciplinary Rounds",
      "Family Counseling & Communication",
      "Advanced ICU Procedures",
      "24/7 On-call Intensivist Coverage"
    ],
    "costEstimate": "Varies",
    "recoveryTime": "Varies",
    "order": 23,
    "treatments": [
      {
        "name": "ICU Daily Rounds and Treatment Optimization",
        "slug": "icu-daily-rounds-treatment-optimization",
        "description": "Comprehensive daily ICU rounds conducted by our dedicated intensivists at Sarvada Hospito Care involve systematic review of all critically ill patients, meticulous analysis of vital sign trends, laboratory results, imaging studies, and ventilator data. Our intensivists make evidence-based, real-time adjustments to fluid management, antibiotic regimens, nutritional support, and organ support strategies to optimize outcomes and minimize ICU-associated complications for patients across Bihar.\\n\\nAt Sarvada Hospito Care, our ICU rounds follow a structured, checklist-based approach that systematically addresses all aspects of critical care including ventilator management, sedation and analgesia optimization, venous thromboembolism prophylaxis, stress ulcer prevention, and infection surveillance. This rigorous, systematic methodology significantly reduces the incidence of preventable ICU complications and ensures no important clinical detail is overlooked.\\n\\nWhen considering ICU Daily Rounds and Treatment Optimization, trust the expert intensivists at Sarvada Hospito Care in Kankarbagh, Patna. We utilize evidence-based critical care bundles and advanced monitoring to deliver the most effective, life-saving intensive care available in Bihar. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      },
      {
        "name": "Central Venous Access and Invasive Monitoring",
        "slug": "central-venous-access-invasive-monitoring",
        "description": "Central venous catheter insertion and arterial line placement are essential ICU procedures that enable accurate hemodynamic monitoring and safe administration of concentrated medications, IV nutrition, and blood products. Our intensivists at Sarvada Hospito Care perform these advanced procedures using real-time ultrasound guidance, significantly improving success rates and minimizing the risk of insertion-related complications for critically ill patients.\\n\\nAt Sarvada Hospito Care, all invasive ICU procedures are performed under strict aseptic technique with maximum barrier precautions, using dedicated procedure kits to minimize the risk of catheter-related bloodstream infections (CRBSI). Our intensivists systematically review the need for central lines daily and remove them at the earliest clinically safe opportunity, following evidence-based bundle protocols to minimize line-associated infections.\\n\\nWhen considering Central Venous Access and Invasive Monitoring, trust the skilled intensivists at Sarvada Hospito Care in Kankarbagh, Patna. We utilize ultrasound-guided techniques and strict aseptic protocols to ensure the safest possible invasive monitoring for every critically ill patient. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      },
      {
        "name": "Palliative and Goal-Directed ICU Care",
        "slug": "palliative-goal-directed-icu-care",
        "description": "For some critically ill patients, the focus of care may appropriately shift toward comfort-centered management and symptom control rather than aggressive life-prolonging interventions. Our intensivists at Sarvada Hospito Care are trained in facilitating compassionate, family-centered goals-of-care discussions with utmost sensitivity and cultural awareness. We ensure every patient's values, wishes, and dignity are fully respected in all care decisions.\\n\\nAt Sarvada Hospito Care, our palliative care approach within the ICU integrates expert symptom management—including aggressive pain control, dyspnea relief, and anxiety management—with compassionate family support. We ensure that even in the most difficult clinical situations, patients remain free from distressing symptoms and families feel fully supported by our medical and counseling teams throughout this profoundly challenging time.\\n\\nWhen considering Palliative and Goal-Directed ICU Care, trust the compassionate intensivists at Sarvada Hospito Care in Kankarbagh, Patna. We provide patient-centered, dignity-preserving critical care that fully respects individual values and family wishes. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need in even the most challenging healthcare situations in Bihar."
      },
      {
        "name": "ICU-acquired Infection Prevention and Antimicrobial Stewardship",
        "slug": "icu-infection-prevention-antimicrobial-stewardship",
        "description": "ICU-acquired infections including ventilator-associated pneumonia (VAP), catheter-related bloodstream infections (CRBSI), and Clostridioides difficile colitis significantly increase ICU mortality. Our intensivists at Sarvada Hospito Care implement rigorous, evidence-based infection prevention bundles including strict hand hygiene protocols, sterile dressing changes, oral decontamination, and systematic antibiotic de-escalation guided by culture results and clinical response.\\n\\nAt Sarvada Hospito Care, our antimicrobial stewardship program actively monitors antibiotic prescribing patterns in the ICU to prevent the emergence of multidrug-resistant organisms. Our intensivists work closely with clinical microbiologists and pharmacists to ensure optimal antibiotic selection, dosing, and duration for every critically ill patient, protecting both individual patients and the broader hospital environment from dangerous resistant infections.\\n\\nWhen considering ICU-acquired Infection Prevention and Antimicrobial Stewardship, trust the expert intensivists at Sarvada Hospito Care in Kankarbagh, Patna. We implement rigorous, evidence-based infection prevention strategies and antimicrobial stewardship protocols to minimize ICU complications and ensure the safest possible outcomes for every critically ill patient. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      }
    ]
  }
];`;

content = content + newEntry;
fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! criticalCare.js updated - Critical Care Physician entry appended.');
