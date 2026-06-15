const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/seed/hospitalDepartments.js');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the closing ]; so we can append
content = content.trimEnd();
if (content.endsWith('];')) {
  content = content.slice(0, -2);
}

const newDepts = `,
  {
    "name": "Consultant Physician",
    "slug": "consultant-physician",
    "icon": "🩺",
    "category": "Hospital Departments",
    "available": "OPD Hours",
    "description": "Expert internal medicine consultations for complex systemic diseases, chronic conditions, and specialist second opinions.",
    "longDescription": "The Consultant Physician department at Sarvada Hospito Care in Patna is led by highly experienced internal medicine specialists with MBBS, MD qualifications and decades of clinical experience. Our consultant physicians provide in-depth evaluation and management of complex, multi-system diseases including diabetes, hypertension, jaundice, liver disorders, infectious diseases, and fever of unknown origin. We offer comprehensive second opinions, pre-operative medical assessments, and long-term chronic disease management programs tailored to each patient unique profile.\\n\\nAt Sarvada Hospito Care, we pride ourselves on maintaining an internationally benchmarked medical infrastructure right here in Kankarbagh, Patna. Our dedicated OPD consultation rooms, advanced laboratory services, and imaging facilities allow our consultant physicians to make rapid, accurate diagnoses and formulate evidence-based treatment plans for every patient who walks through our doors.\\n\\nWe understand that managing a complex or chronic illness can be deeply overwhelming, which is why our consultant physicians prioritize patient education, transparent communication, and compassionate care at every step. Our support staff assists with insurance, government health schemes, and seamless referrals to specialist departments when needed.\\n\\nTrust Sarvada Hospito Care's Consultant Physician department for expert, evidence-based internal medicine care in Patna, Bihar. Whether you need a thorough diagnostic workup, management of a chronic condition, or a specialist second opinion, our experienced team is here to provide the comprehensive medical support you deserve.",
    "features": [
      "Internal Medicine Consultation",
      "Chronic Disease Management",
      "Fever and Infection Workup",
      "Pre-operative Medical Assessment"
    ],
    "costEstimate": "Varies",
    "recoveryTime": "Varies",
    "order": 9,
    "treatments": [
      {
        "name": "Diabetes Management",
        "slug": "diabetes-management-physician",
        "description": "Comprehensive diabetes care including accurate diagnosis, individualized glycemic control plans, insulin therapy optimization, and monitoring of complications affecting the kidneys, eyes, and nerves. Our consultant physicians at Sarvada Hospito Care in Patna combine evidence-based medical protocols with dietary counseling and lifestyle modification guidance to help patients across Bihar achieve optimal blood sugar control and prevent long-term complications.\\n\\nAt Sarvada Hospito Care, our advanced diagnostic infrastructure enables precise monitoring of HbA1c, blood glucose profiles, and organ function, allowing our physicians to fine-tune treatment strategies with exceptional accuracy. We offer both OPD consultations and inpatient management for severe diabetic emergencies like DKA and hyperosmolar states, ensuring seamless, comprehensive care across all stages of the disease.\\n\\nWhen considering Diabetes Management, trust Sarvada Hospito Care's experienced consultant physicians in Kankarbagh, Patna. We utilize evidence-based protocols and advanced diagnostic tools to maximize glycemic outcomes and ensure long-term wellness. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      },
      {
        "name": "Hypertension and Blood Pressure Management",
        "slug": "hypertension-blood-pressure-management",
        "description": "Expert diagnosis, accurate risk stratification, and individualized antihypertensive therapy plans for patients with hypertension. Our consultant physicians at Sarvada Hospito Care evaluate secondary causes of hypertension, monitor for target organ damage, and implement comprehensive lifestyle modification programs to achieve sustainable blood pressure control for patients across Patna and Bihar.\\n\\nAt Sarvada Hospito Care, our state-of-the-art ambulatory blood pressure monitoring and echocardiography services allow our physicians to accurately assess cardiovascular risk and tailor medication regimens with precision. Regular follow-up and proactive management ensure our patients remain on track and well-protected from dangerous hypertensive crises.\\n\\nWhen considering Hypertension and Blood Pressure Management, trust the expert consultant physicians at Sarvada Hospito Care in Kankarbagh, Patna. We utilize evidence-based medical protocols and advanced therapeutic techniques to maximize cardiovascular protection and ensure long-term wellness. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      },
      {
        "name": "Fever and Infectious Disease Workup",
        "slug": "fever-infectious-disease-workup",
        "description": "Systematic, comprehensive fever workups using advanced blood cultures, serology panels, and imaging studies to detect typhoid, malaria, dengue, tuberculosis, and other systemic infections. Our consultant physicians at Sarvada Hospito Care provide accurate, rapid diagnoses and targeted antibiotic or antiviral therapies to resolve infections effectively and prevent dangerous complications in patients across Bihar.\\n\\nAt Sarvada Hospito Care, our advanced microbiology laboratory, rapid diagnostic testing capabilities, and experienced clinical pharmacists ensure that the most effective, evidence-based antimicrobial regimens are prescribed with precision. Our physicians vigilantly monitor for treatment response and medication side effects, ensuring the safest and most effective outcomes for every patient.\\n\\nWhen considering Fever and Infectious Disease Workup, trust the experienced consultant physicians at Sarvada Hospito Care in Kankarbagh, Patna. We utilize advanced diagnostics and evidence-based infectious disease protocols to accurately identify and effectively treat complex infections. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      },
      {
        "name": "Pre-operative Medical Assessment",
        "slug": "pre-operative-medical-assessment",
        "description": "Comprehensive pre-operative evaluations including cardiovascular risk assessment, pulmonary function review, metabolic optimization for diabetes and thyroid conditions, and anesthesia fitness certification. Our consultant physicians at Sarvada Hospito Care work closely with the surgical and anesthesia teams to ensure every patient is in the best possible medical condition before undergoing any surgical procedure.\\n\\nAt Sarvada Hospito Care, our in-house diagnostic suite enables rapid ECG, 2D Echo, pulmonary function tests, and comprehensive blood panels, allowing our physicians to complete thorough pre-operative assessments efficiently without requiring patients to visit multiple facilities. This integrated, one-stop approach saves time, reduces stress, and ensures optimal surgical preparedness.\\n\\nWhen considering Pre-operative Medical Assessment, trust the expert consultant physicians at Sarvada Hospito Care in Kankarbagh, Patna. We provide thorough, evidence-based medical evaluations that maximize surgical safety and ensure the best possible outcomes. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      }
    ]
  },
  {
    "name": "General Physician",
    "slug": "general-physician",
    "icon": "👨‍⚕️",
    "category": "Hospital Departments",
    "available": "OPD Hours",
    "description": "Primary and general medical care for common illnesses, routine health checkups, and preventive healthcare.",
    "longDescription": "The General Physician department at Sarvada Hospito Care serves as the first point of contact for patients seeking comprehensive medical care in Patna. Our experienced general physicians diagnose and treat a wide spectrum of acute and chronic conditions including viral fevers, respiratory infections, gastroenteritis, seasonal illnesses, anemia, thyroid disorders, and general wellness concerns. We provide compassionate, holistic primary care that emphasizes early diagnosis, disease prevention, and patient education for the people of Bihar.\\n\\nAt Sarvada Hospito Care in Kankarbagh, our general physicians are supported by an advanced in-house diagnostic laboratory, digital X-ray, ultrasound, and ECG facilities, enabling comprehensive same-day workups for most common conditions. This means faster diagnoses, immediate treatment initiation, and fewer unnecessary referrals—providing efficient, high-quality primary healthcare right in your neighborhood.\\n\\nWe understand that many patients visit a general physician when they feel vulnerable or uncertain about their health. Our physicians dedicate adequate consultation time to listen carefully, perform thorough examinations, and explain findings and treatment plans in simple, clear language. We are committed to building lasting doctor-patient relationships built on trust, transparency, and genuine compassion, making Sarvada Hospito Care the preferred healthcare destination for families across Patna.\\n\\nWhether you need treatment for a sudden illness, management of a chronic condition, or a routine health assessment, our General Physician department offers comprehensive, accessible, and affordable primary medical care. Trust Sarvada Hospito Care to be your family's dedicated healthcare partner in Bihar.",
    "features": [
      "General OPD and Acute Care",
      "Routine Health Checkups",
      "Seasonal Illness Management",
      "Thyroid and Anaemia Care"
    ],
    "costEstimate": "Varies",
    "recoveryTime": "Varies",
    "order": 10,
    "treatments": [
      {
        "name": "Viral Fever and Seasonal Illness Treatment",
        "slug": "viral-fever-seasonal-illness-treatment",
        "description": "Accurate clinical assessment and targeted investigations to differentiate between viral and bacterial infections. Our general physicians at Sarvada Hospito Care provide supportive therapies, IV fluid management when required, and careful monitoring to ensure rapid, safe recovery from seasonal illnesses like dengue, chikungunya, influenza, and common cold for patients across Patna and Bihar.\\n\\nAt Sarvada Hospito Care, our rapid diagnostic capabilities including dengue NS1 antigen testing, malaria cards, and complete blood counts allow for same-day diagnosis of most seasonal illnesses. Patients can receive a comprehensive evaluation and initiate treatment in a single visit, minimizing the duration and complications of their illness.\\n\\nWhen considering Viral Fever and Seasonal Illness Treatment, trust the experienced general physicians at Sarvada Hospito Care in Kankarbagh, Patna. We utilize evidence-based clinical protocols and advanced rapid diagnostics to provide accurate diagnoses and effective treatments. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      },
      {
        "name": "Thyroid Disorder Management",
        "slug": "thyroid-disorder-management",
        "description": "Expert evaluation with thyroid function tests (TFT), thyroid antibody panels, and ultrasound examinations to accurately diagnose hypothyroidism, hyperthyroidism, and thyroid nodules. Our general physicians at Sarvada Hospito Care create individualized treatment plans using evidence-based hormone replacement or suppression therapy, with regular monitoring to maintain optimal thyroid function and prevent long-term complications for patients in Bihar.\\n\\nAt Sarvada Hospito Care, our advanced in-house laboratory provides accurate, rapid thyroid function testing, enabling our general physicians to promptly diagnose and initiate treatment for thyroid disorders. We utilize digital thyroid ultrasound to evaluate nodules and goiters, and coordinate seamlessly with specialist colleagues for complex cases.\\n\\nWhen considering Thyroid Disorder Management, trust the experienced general physicians at Sarvada Hospito Care in Kankarbagh, Patna. We utilize evidence-based protocols and advanced diagnostic capabilities to accurately diagnose and effectively manage all thyroid conditions. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      },
      {
        "name": "Anaemia Diagnosis and Treatment",
        "slug": "anaemia-diagnosis-treatment",
        "description": "Comprehensive anaemia evaluation including complete blood counts, peripheral blood smears, iron studies, and Vitamin B12 levels to identify the underlying cause of anaemia—whether iron deficiency, B12/folate deficiency, haemolytic, or disease-related. Our general physicians at Sarvada Hospito Care prescribe targeted, evidence-based treatment protocols for rapid and sustained recovery, including IV iron infusions and blood transfusion support via our 24/7 blood bank.\\n\\nAt Sarvada Hospito Care, our advanced in-house laboratory provides rapid, accurate haematological testing, allowing our physicians to determine the exact type and severity of anaemia during the initial consultation. We take a holistic approach combining effective medical treatment with practical dietary advice on iron-rich foods and absorption enhancers.\\n\\nWhen considering Anaemia Diagnosis and Treatment, trust the experienced general physicians at Sarvada Hospito Care in Kankarbagh, Patna. We utilize comprehensive diagnostic protocols and evidence-based therapeutic strategies to accurately identify and effectively treat all forms of anaemia. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      },
      {
        "name": "General Health Checkup and Preventive Care",
        "slug": "general-health-checkup-preventive-care",
        "description": "Comprehensive screening packages with thorough physical examinations and age-appropriate laboratory investigations including blood glucose, lipid profiles, kidney and liver function tests, thyroid panels, complete blood counts, and ECG. Our general physicians at Sarvada Hospito Care provide personalized preventive advice and early intervention strategies to identify risks early and empower patients to achieve and maintain optimal health across Bihar.\\n\\nAt Sarvada Hospito Care, our in-house diagnostic facilities enable comprehensive health checkup packages to be completed efficiently in a single visit, minimizing disruption to patients' busy schedules. From digital X-rays and ECG to ultrasound abdomen and advanced laboratory panels, every investigation is conducted on-site by trained, certified technicians.\\n\\nWhen considering General Health Checkup and Preventive Care, trust the experienced general physicians at Sarvada Hospito Care in Kankarbagh, Patna. We provide comprehensive, evidence-based health assessments that identify risks early and empower patients to achieve and maintain optimal health. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      }
    ]
  },
  {
    "name": "Critical Care Medicine",
    "slug": "critical-care-medicine",
    "icon": "🏥",
    "category": "Hospital Departments",
    "available": "24/7",
    "description": "Specialized 24/7 critical care and intensive management for life-threatening illnesses requiring advanced monitoring.",
    "longDescription": "The Critical Care Medicine department at Sarvada Hospito Care provides round-the-clock, expert intensive management for patients with life-threatening medical conditions. Our ICU and ICCU are staffed by dedicated intensivists and critical care specialists who manage severe respiratory failure, septic shock, multi-organ dysfunction syndrome, acute liver failure, and complex post-operative care. Equipped with advanced ventilators, hemodynamic monitoring systems, and continuous renal replacement therapy (CRRT), our critical care unit delivers world-class intensive medicine right in Kankarbagh, Patna.\\n\\nAt Sarvada Hospito Care, our critical care team operates on a collaborative, multidisciplinary model. Intensivists work hand-in-hand with general surgeons, pulmonologists, cardiologists, nephrologists, and infectious disease specialists to provide seamlessly integrated, holistic critical care. Daily multidisciplinary rounds ensure that every critically ill patient receives the most current, evidence-based management tailored to their evolving clinical condition.\\n\\nWe understand that having a family member in the ICU is an extremely stressful and emotionally overwhelming experience. At Sarvada Hospito Care, our critical care physicians are committed to regular, transparent, and compassionate family communication. We hold dedicated family briefings to explain the patient's condition, treatment plan, and prognosis in clear, empathetic terms.\\n\\nTrust Sarvada Hospito Care's Critical Care Medicine department for expert, comprehensive intensive care in Patna, Bihar. Our state-of-the-art ICU, experienced intensivists, and compassionate multidisciplinary team ensure that even the most critically ill patients receive the highest standard of life-saving care.",
    "features": [
      "24/7 Intensivist Coverage",
      "Advanced Ventilator Support",
      "Multi-organ Support and CRRT",
      "Sepsis and Shock Management"
    ],
    "costEstimate": "Varies",
    "recoveryTime": "Varies",
    "order": 11,
    "treatments": [
      {
        "name": "Mechanical Ventilation and Respiratory Failure Management",
        "slug": "mechanical-ventilation-respiratory-failure",
        "description": "Expert initiation and management of invasive mechanical ventilation using lung-protective strategies that minimize ventilator-induced lung injury for patients with severe pneumonia, ARDS, or post-surgical respiratory failure. Our critical care specialists at Sarvada Hospito Care utilize advanced ICU ventilators and conduct systematic daily spontaneous breathing trials to identify the earliest safe opportunity for extubation.\\n\\nAt Sarvada Hospito Care, our ICU is equipped with the latest generation of ICU ventilators featuring advanced flow monitoring and graphics displays, enabling our intensivists and respiratory therapists to precisely fine-tune ventilator settings based on real-time patient data. We minimize the duration of mechanical ventilation and reduce associated complications for critically ill patients across Bihar.\\n\\nWhen considering Mechanical Ventilation and Respiratory Failure Management, trust the expert intensivists at Sarvada Hospito Care in Kankarbagh, Patna. We utilize evidence-based lung-protective ventilation strategies and advanced monitoring to maximize respiratory outcomes. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      },
      {
        "name": "Sepsis and Multi-Organ Dysfunction Management",
        "slug": "sepsis-multi-organ-dysfunction-management",
        "description": "Aggressive management following internationally validated Surviving Sepsis Campaign guidelines, initiating targeted fluid resuscitation, broad-spectrum IV antibiotics, vasopressors, and source control within the critical one-hour window of sepsis recognition. Our critical care team at Sarvada Hospito Care provides continuous, meticulous monitoring of organ function to detect early deterioration and intervene proactively for patients across Bihar.\\n\\nAt Sarvada Hospito Care, our ICU's advanced hemodynamic monitoring capabilities including invasive arterial lines, central venous pressure monitoring, and bedside point-of-care ultrasound allow our intensivists to guide fluid therapy with exceptional precision. Our in-house microbiology laboratory provides rapid blood culture and sensitivity results to guide de-escalation of antibiotics.\\n\\nWhen considering Sepsis and Multi-Organ Dysfunction Management, trust the expert critical care team at Sarvada Hospito Care in Kankarbagh, Patna. We utilize internationally validated sepsis protocols and advanced monitoring to deliver the most effective, life-saving intensive care available in Bihar. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      },
      {
        "name": "Acute Liver Failure and Hepatic Encephalopathy Management",
        "slug": "acute-liver-failure-hepatic-encephalopathy",
        "description": "Expert multidisciplinary management for acute liver failure including aggressive treatment of hepatic encephalopathy, correction of coagulopathy, prevention of acute kidney injury, management of infections, and careful hemodynamic support. Our critical care and hepatology teams at Sarvada Hospito Care work together to provide comprehensive, evidence-based intensive care for the most complex liver failure cases in Bihar.\\n\\nAt Sarvada Hospito Care, our intensivists use advanced continuous monitoring and real-time coagulation testing to guide precise management of acute liver failure complications. Our in-house blood bank enables immediate access to fresh frozen plasma, platelets, and cryoprecipitate for urgent correction of dangerous coagulopathy.\\n\\nWhen considering Acute Liver Failure and Hepatic Encephalopathy Management, trust the expert multidisciplinary team at Sarvada Hospito Care in Kankarbagh, Patna. We utilize comprehensive, evidence-based protocols and advanced monitoring to provide the highest standard of intensive hepatic care available in Bihar. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      },
      {
        "name": "Post-operative Critical Care",
        "slug": "post-operative-critical-care",
        "description": "24/7 specialist intensivist oversight, continuous hemodynamic monitoring, expert pain management, and specialized nutritional support for patients recovering from major gastrointestinal, hepatobiliary, and emergency surgeries. Our critical care team at Sarvada Hospito Care coordinates seamlessly with our surgical teams to minimize post-operative complications and accelerate safe recovery.\\n\\nAt Sarvada Hospito Care, seamless communication between our surgical and critical care teams ensures that post-operative patients receive perfectly coordinated, holistic care. Our intensivists participate in surgical briefings before complex operations to prepare individualized post-operative management plans that minimize complications and accelerate the journey from ICU to ward to home.\\n\\nWhen considering Post-operative Critical Care, trust the expert intensivists at Sarvada Hospito Care in Kankarbagh, Patna. We provide meticulous, evidence-based post-operative monitoring and management that maximizes surgical outcomes and ensures the safest possible recovery. Trust Sarvada Hospito Care to provide the unwavering expertise and dedicated support you need for a healthier future in Bihar."
      }
    ]
  }
];`;

content = content + newDepts;
fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! hospitalDepartments.js updated - 3 new departments appended.');
