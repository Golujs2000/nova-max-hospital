const fs = require('fs');
let content = fs.readFileSync('src/data/seed/laproStoneSpecialities.js', 'utf8');

// Each insertion: [unique_anchor_text, new_treatment_text]
// We insert BEFORE each anchor
const insertions = [
  // Spec 3: Liver Disorders - insert before "// ── 4. Pancreas Disorders"
  [
    `    ],
  },

  // ── 4. Pancreas Disorders`,
    `      {
        name: 'Liver Surgery (Trauma, Cancer & Resection)',
        slug: 'liver-surgery-trauma-cancer',
        cost: '₹50,000 – ₹3,00,000',
        duration: '2–5 hrs',
        recovery: '10–21 days',
        description: 'Major liver surgery including hepatectomy for liver cancer, liver trauma repair, and jaundice-related liver procedures.',
        longDescription: \`Liver Surgery (लिवर सर्जरी) at Patna Lapro and Stone Healthcare encompasses a wide range of complex hepatic procedures — from emergency liver trauma repair to planned hepatectomy for liver cancer and surgical management of obstructive jaundice. Dr. Sanjeev Kumar, with specialized training at IGIMS Patna and Safdarjung Hospital New Delhi, performs both open and laparoscopic liver surgeries with high precision.

Liver Trauma Surgery: Road accidents and blunt abdominal injuries can cause liver lacerations and haemorrhage. Our hospital provides emergency surgical intervention including perihepatic packing, hepatorrhaphy (liver suturing), and segmental resection when needed.

Liver Cancer Surgery: Hepatocellular carcinoma (HCC) and metastatic liver tumours are treated with anatomical or non-anatomical hepatectomy (removal of the affected liver segment). Dr. Sanjeev Kumar carefully evaluates liver function reserves before planning resection to ensure safe outcomes.

Jaundice-related Liver Surgery: Obstructive jaundice caused by bile duct tumours, hilar cholangiocarcinoma (Klatskin tumour), or benign strictures may require biliary bypass surgery or liver resection.

Patients from across Bihar — Patna, Gaya, Bhagalpur, Muzaffarpur, Darbhanga, and Purnea — trust Patna Lapro and Stone Healthcare for complex liver surgery. Early diagnosis is critical for liver cancer. Contact us at L-35, Sri Krishna Nagar Kidwaipuri, Patna 800001. Call 9334097925.\`,
        indications: ['Liver cancer (HCC)', 'Liver trauma', 'Obstructive jaundice', 'Liver abscess (complex)', 'Liver metastasis'],
        benefits: ['Expert hepatobiliary surgeon', 'Emergency trauma services', 'Both open and laparoscopic options'],
        preparation: ['CT scan triple-phase', 'Liver function tests', 'Tumour markers (AFP)', 'Anaesthesia fitness'],
        steps: [
          { step: '01', title: 'Imaging', desc: 'Triple-phase CT or MRI to map the tumour and liver anatomy.' },
          { step: '02', title: 'Surgery', desc: 'Hepatectomy, trauma repair, or biliary bypass as indicated.' },
          { step: '03', title: 'ICU Recovery', desc: 'Post-operative ICU monitoring, drain management, and discharge.' },
        ],
        faqs: [
          { question: 'Can liver grow back after surgery?', answer: 'Yes, the liver has remarkable regenerative capacity. It can regrow to near-normal size within 6–8 weeks after partial resection.' },
        ],
      },
    ],
  },

  // ── 4. Pancreas Disorders`
  ],

  // Spec 4: Pancreas Disorders - insert before "// ── 5. Jaundice"
  [
    `    ],
  },

  // ── 5. Jaundice & Biliary Disorders`,
    `      {
        name: 'Pancreatic Cancer Surgery (Whipple/Distal Pancreatectomy)',
        slug: 'pancreatic-cancer-surgery',
        cost: '₹1,50,000 – ₹4,00,000',
        duration: '4–7 hrs',
        recovery: '14–28 days',
        description: 'Complex surgery for pancreatic cancer including Whipple procedure (pancreaticoduodenectomy) and distal pancreatectomy.',
        longDescription: \`Pancreatic Cancer Surgery (अग्नाशय कैंसर सर्जरी) at Patna Lapro and Stone Healthcare includes the Whipple Procedure (Pancreaticoduodenectomy) for head-of-pancreas tumours and Distal Pancreatectomy for body/tail tumours. Dr. Sanjeev Kumar has extensive experience in complex pancreatic surgery, trained at premier institutions including IGIMS Patna and Safdarjung Hospital New Delhi.

The Whipple Procedure is one of the most complex abdominal operations — it involves removing the head of the pancreas, the duodenum, part of the bile duct, the gallbladder, and sometimes part of the stomach. The remaining organs are then reconnected to restore digestive function. This surgery is the only curative option for pancreatic head cancer and ampullary carcinoma.

Distal Pancreatectomy removes the body and tail of the pancreas, often along with the spleen, for tumours in these regions. Both procedures require meticulous surgical technique and comprehensive post-operative care.

Pancreatic cancer often presents late with painless jaundice, weight loss, and back pain. Early diagnosis and surgery by an experienced surgeon significantly improve survival. Patients from Bihar and eastern India consult Dr. Sanjeev Kumar for pancreatic cancer evaluation. Contact Patna Lapro and Stone Healthcare at 9334097925, Sri Krishna Nagar Kidwaipuri, Patna.\`,
        indications: ['Pancreatic head cancer', 'Ampullary carcinoma', 'Pancreatic body/tail tumour', 'Chronic pancreatitis with mass'],
        benefits: ['Only curative option for pancreatic cancer', 'Expert surgical team', 'Comprehensive post-operative care'],
        preparation: ['CT pancreas protocol', 'CA 19-9 tumour marker', 'EUS (Endoscopic Ultrasound)', 'Nutritional optimisation'],
        steps: [
          { step: '01', title: 'Staging', desc: 'CT, EUS, and tumour markers to assess resectability.' },
          { step: '02', title: 'Surgery', desc: 'Whipple or distal pancreatectomy under general anaesthesia.' },
          { step: '03', title: 'Recovery', desc: 'ICU stay, pancreatic enzyme supplementation, and staged recovery.' },
        ],
        faqs: [
          { question: 'What is the Whipple procedure?', answer: 'It is a complex surgery to remove the head of the pancreas, duodenum, bile duct, and gallbladder — the standard operation for pancreatic head cancer.' },
        ],
      },
    ],
  },

  // ── 5. Jaundice & Biliary Disorders`
  ],

  // Spec 5: Jaundice & Biliary - insert before "// ── 6. General & GI Surgery"
  [
    `    ],
  },

  // ── 6. General & GI Surgery`,
    `      {
        name: 'Common Bile Duct (CBD) Surgery',
        slug: 'common-bile-duct-surgery',
        cost: '₹40,000 – ₹1,50,000',
        duration: '2–4 hrs',
        recovery: '7–14 days',
        description: 'Surgery for CBD stone, CBD cancer, and CBD stricture — open and laparoscopic common bile duct exploration.',
        longDescription: \`Common Bile Duct Surgery (सामान्य पित्त नली की सर्जरी) at Patna Lapro and Stone Healthcare covers the entire spectrum of CBD pathologies — CBD stones (choledocholithiasis), CBD cancer (cholangiocarcinoma), and CBD stricture (narrowing of the bile duct). Dr. Sanjeev Kumar provides both open and laparoscopic CBD exploration based on the patient's condition.

CBD Stones: When gallstones migrate into the common bile duct, they cause obstructive jaundice, cholangitis (bile duct infection), and pancreatitis. Treatment options include ERCP (endoscopic stone removal) and laparoscopic/open CBD exploration with stone extraction.

CBD Cancer (Cholangiocarcinoma): This is a serious malignancy of the bile duct that typically presents with painless jaundice. Surgical resection with clear margins offers the best chance of cure. Dr. Sanjeev Kumar performs bile duct resection and hepaticojejunostomy (Roux-en-Y reconstruction).

CBD Stricture: Post-surgical or inflammatory narrowing of the bile duct requires reconstructive surgery — hepaticojejunostomy — to bypass the strictured segment and restore bile flow.

Patients from Patna, Bihar, and neighbouring states trust our centre for complex biliary surgery. Contact Patna Lapro and Stone Healthcare at 9334097925, L-35, Sri Krishna Nagar Kidwaipuri, Patna 800001.\`,
        indications: ['CBD stones (choledocholithiasis)', 'CBD cancer (cholangiocarcinoma)', 'CBD stricture', 'Failed ERCP'],
        benefits: ['Complete stone clearance', 'Curative surgery for cancer', 'Reconstruction for strictures'],
        preparation: ['MRCP (MR Cholangiopancreatography)', 'LFT, PT/INR', 'CT scan', 'ERCP if indicated'],
        steps: [
          { step: '01', title: 'Imaging', desc: 'MRCP or CT to map the biliary anatomy and pathology.' },
          { step: '02', title: 'Surgery', desc: 'CBD exploration, stone removal, or bile duct reconstruction.' },
          { step: '03', title: 'Recovery', desc: 'T-tube/drain management and gradual diet advancement.' },
        ],
        faqs: [
          { question: 'What is CBD exploration?', answer: 'It is a surgical procedure to open the common bile duct, remove stones, and restore normal bile flow.' },
        ],
      },
      {
        name: 'Laparoscopic Common Bile Duct Exploration',
        slug: 'laparoscopic-cbd-exploration',
        cost: '₹50,000 – ₹1,20,000',
        duration: '2–3 hrs',
        recovery: '5–10 days',
        description: 'Minimally invasive laparoscopic exploration and clearance of common bile duct stones, often combined with cholecystectomy.',
        longDescription: \`Laparoscopic Common Bile Duct Exploration (लैप्रोस्कोपिक CBD एक्सप्लोरेशन) at Patna Lapro and Stone Healthcare is an advanced minimally invasive procedure to remove CBD stones without the need for open surgery. Dr. Sanjeev Kumar performs this technically demanding procedure using a combination of choledochoscopy (bile duct camera) and stone extraction through laparoscopic ports.

This procedure is typically performed in combination with laparoscopic cholecystectomy — removing both the gallbladder and CBD stones in a single sitting. A small opening is made in the CBD, a choledochoscope is inserted to visualise and extract stones using a Dormia basket or balloon catheter, and the CBD is then closed primarily or over a T-tube.

The laparoscopic approach offers all the advantages of minimally invasive surgery — less pain, faster recovery, shorter hospital stay, and minimal scarring. It is particularly useful when ERCP has failed to clear CBD stones or when combined surgery is needed.

Patients from Patna and Bihar benefit from this single-stage procedure that avoids the need for multiple interventions. Contact Patna Lapro and Stone Healthcare at 9334097925 for consultation.\`,
        indications: ['CBD stones with gallstones', 'Failed ERCP stone extraction', 'Large CBD stones'],
        benefits: ['Single-stage surgery', 'No open incision', 'Faster recovery', 'Combined with cholecystectomy'],
        preparation: ['MRCP', 'LFT', 'Coagulation profile', 'Anaesthesia fitness'],
        steps: [
          { step: '01', title: 'Diagnosis', desc: 'MRCP confirms CBD stone location and size.' },
          { step: '02', title: 'Surgery', desc: 'Laparoscopic cholecystectomy + CBD exploration and stone clearance.' },
          { step: '03', title: 'Discharge', desc: 'T-tube cholangiogram at 10 days, then T-tube removal.' },
        ],
        faqs: [
          { question: 'Can CBD stones be removed laparoscopically?', answer: 'Yes, Dr. Sanjeev Kumar performs laparoscopic CBD exploration for stone removal, avoiding the need for open surgery.' },
        ],
      },
    ],
  },

  // ── 6. General & GI Surgery`
  ],

  // Spec 6: General & GI Surgery - insert before "// ── 7. Gastro-Intestinal Disorder"
  [
    `    ],
  },

  // ── 7. Gastro-Intestinal Disorder`,
    `      {
        name: 'ICU & Critical Care Management',
        slug: 'icu-critical-care',
        cost: '₹5,000 – ₹25,000/day',
        duration: 'Variable',
        recovery: 'Depends on condition',
        description: 'Fully equipped ICU managed by highly qualified anaesthetic doctors for post-surgical and critical care management.',
        longDescription: \`ICU & Critical Care Management (आईसीयू और क्रिटिकल केयर) at Patna Lapro and Stone Healthcare provides round-the-clock intensive care managed by highly qualified anaesthetic doctors and trained nursing staff. Our ICU is equipped with modern ventilators, multi-parameter monitors, infusion pumps, central oxygen supply, and emergency resuscitation equipment.

Post-surgical ICU care is critical for patients undergoing major operations such as Whipple procedure, liver resection, complex abdominal trauma repair, and pancreatic surgery. Our anaesthesia team ensures optimal pain management, haemodynamic monitoring, fluid balance, and early detection of complications.

The ICU also manages medical emergencies including sepsis, multi-organ failure, severe pancreatitis, GI bleeding, and post-operative complications. Every patient receives personalised attention with continuous monitoring and family counselling.

Patients from across Patna, Bihar — including referrals from Gaya, Muzaffarpur, Bhagalpur, and Darbhanga — benefit from our ICU facilities. Contact Patna Lapro and Stone Healthcare at 9334097925, Sri Krishna Nagar Kidwaipuri, Patna 800001.\`,
        indications: ['Post-major surgery care', 'Sepsis', 'Multi-organ failure', 'Severe pancreatitis', 'GI bleeding'],
        benefits: ['24/7 anaesthetist coverage', 'Modern ICU equipment', 'Personalised critical care'],
        preparation: ['Referral from treating surgeon', 'Previous medical records'],
        steps: [
          { step: '01', title: 'Admission', desc: 'Patient shifted to ICU with full monitoring setup.' },
          { step: '02', title: 'Management', desc: 'Continuous monitoring, ventilator support, and medications as needed.' },
          { step: '03', title: 'Step-down', desc: 'Transfer to ward once stable for continued recovery.' },
        ],
        faqs: [
          { question: 'Is the ICU available 24/7?', answer: 'Yes, our ICU is staffed round-the-clock by qualified anaesthetic doctors and trained nurses.' },
        ],
      },
      {
        name: 'Paediatric Congenital Disease Surgery',
        slug: 'paediatric-congenital-surgery',
        cost: '₹30,000 – ₹1,50,000',
        duration: '1–4 hrs',
        recovery: '5–14 days',
        description: 'Surgical correction of congenital abnormalities in children — including hernias, undescended testis, hypospadias, and intestinal malformations.',
        longDescription: \`Paediatric Congenital Disease Surgery (बच्चों की जन्मजात बीमारी सर्जरी) at Patna Lapro and Stone Healthcare addresses a range of congenital (birth-related) surgical conditions in infants and children. Dr. Sanjeev Kumar provides expert surgical care for congenital inguinal hernia, umbilical hernia, undescended testis (cryptorchidism), hypospadias, intestinal atresia, Hirschsprung's disease, and anorectal malformations.

Congenital hernias are one of the most common surgical conditions in children, especially premature babies. Undescended testis requires orchidopexy (surgical fixation of the testis into the scrotum) ideally before 1–2 years of age to preserve fertility and reduce cancer risk.

Intestinal malformations such as duodenal atresia, jejunal atresia, and Hirschsprung's disease require specialised neonatal surgery. Our team provides safe anaesthesia and age-appropriate surgical techniques for the smallest patients.

Parents from across Patna and Bihar trust our centre for paediatric surgical care. Contact Patna Lapro and Stone Healthcare at 9334097925, L-35, Sri Krishna Nagar Kidwaipuri, Patna 800001.\`,
        indications: ['Congenital hernia', 'Undescended testis', 'Hypospadias', 'Intestinal atresia', 'Anorectal malformation'],
        benefits: ['Age-appropriate surgical techniques', 'Safe paediatric anaesthesia', 'Short hospital stay'],
        preparation: ['Paediatric blood tests', 'Ultrasound', 'Anaesthesia fitness assessment'],
        steps: [
          { step: '01', title: 'Evaluation', desc: 'Clinical and imaging assessment of the congenital condition.' },
          { step: '02', title: 'Surgery', desc: 'Corrective surgery under general anaesthesia.' },
          { step: '03', title: 'Recovery', desc: 'Post-operative monitoring and discharge with follow-up plan.' },
        ],
        faqs: [
          { question: 'At what age should congenital hernias be operated?', answer: 'Congenital inguinal hernias should be repaired as soon as diagnosed to prevent complications like incarceration.' },
        ],
      },
      {
        name: 'Splenic Surgery & Splenorenal Shunt',
        slug: 'splenic-surgery-splenorenal-shunt',
        cost: '₹40,000 – ₹1,50,000',
        duration: '2–4 hrs',
        recovery: '7–14 days',
        description: 'Splenectomy for splenic trauma, splenic disorders, and splenorenal shunt surgery for portal hypertension.',
        longDescription: \`Splenic Surgery (तिल्ली की सर्जरी) at Patna Lapro and Stone Healthcare includes emergency splenectomy for splenic trauma, elective splenectomy for haematological disorders, and Splenorenal Shunt surgery for portal hypertension with variceal bleeding.

Splenic Trauma: The spleen is the most commonly injured abdominal organ in blunt trauma (road accidents, falls). While minor injuries can be managed conservatively, severe splenic lacerations with haemodynamic instability require emergency splenectomy. Dr. Sanjeev Kumar provides 24-hour emergency surgical services for splenic trauma.

Splenorenal Shunt: In patients with portal hypertension (often due to liver cirrhosis or non-cirrhotic portal fibrosis), the splenic vein is surgically connected to the left renal vein to decompress the portal system and prevent life-threatening variceal bleeding. This is a definitive surgical solution when endoscopic therapy fails.

Elective Splenectomy: Required for conditions like ITP (Idiopathic Thrombocytopenic Purpura), hereditary spherocytosis, and hypersplenism not responding to medical treatment.

Patients from Patna, Bihar trust our centre for complex splenic surgery. Contact us at 9334097925, Sri Krishna Nagar Kidwaipuri, Patna.\`,
        indications: ['Splenic trauma', 'Portal hypertension with variceal bleeding', 'ITP', 'Hypersplenism'],
        benefits: ['Emergency trauma services', 'Definitive portal decompression', 'Expert surgical team'],
        preparation: ['CT abdomen', 'Complete blood count', 'Coagulation profile', 'Blood grouping & cross-match'],
        steps: [
          { step: '01', title: 'Assessment', desc: 'Imaging and haematological workup to plan surgery.' },
          { step: '02', title: 'Surgery', desc: 'Splenectomy or splenorenal shunt under general anaesthesia.' },
          { step: '03', title: 'Post-op', desc: 'Vaccination schedule, monitoring, and discharge.' },
        ],
        faqs: [
          { question: 'Can you live without a spleen?', answer: 'Yes, but you need vaccinations against certain bacteria and should be aware of increased infection risk.' },
        ],
      },
      {
        name: 'Neurology & Neurosurgery Consultation',
        slug: 'neurology-neurosurgery-consultation',
        cost: '₹500 – ₹2,000',
        duration: '30–60 min',
        recovery: 'Depends on condition',
        description: 'Neurology services managed by highly qualified neurosurgeon and neurophysician for brain, spine, and nerve disorders.',
        longDescription: \`Neurology & Neurosurgery Consultation (न्यूरोलॉजी और न्यूरोसर्जरी) at Patna Lapro and Stone Healthcare is managed by highly qualified neurosurgeons and neurophysicians. Our neurology services cover diagnosis and management of a wide range of brain, spine, and peripheral nerve disorders.

Services include evaluation and management of headaches, epilepsy, stroke, Parkinson's disease, neuropathy, vertigo, disc prolapse, spinal cord compression, brain tumours, and head injuries. Our neurophysician provides detailed neurological examinations, nerve conduction studies, and treatment planning.

Neurosurgical services include craniotomy for brain tumours, spinal decompression surgery, disc surgery, and management of traumatic brain injuries. Complex cases are managed in collaboration with our ICU team for comprehensive post-operative care.

Patients from Patna, Bihar and surrounding districts benefit from specialist neurological care without travelling to metro cities. Contact Patna Lapro and Stone Healthcare at 9334097925, Sri Krishna Nagar Kidwaipuri, Patna 800001.\`,
        indications: ['Headaches & migraines', 'Epilepsy', 'Stroke', 'Disc prolapse', 'Brain tumours', 'Head injury'],
        benefits: ['Expert neurosurgeon & neurophysician', 'Comprehensive neurological workup', 'ICU backup for complex cases'],
        preparation: ['Previous MRI/CT reports', 'Medication list', 'Referral letter if available'],
        steps: [
          { step: '01', title: 'Consultation', desc: 'Detailed neurological examination and history.' },
          { step: '02', title: 'Investigation', desc: 'MRI, CT, EEG, or nerve conduction studies as needed.' },
          { step: '03', title: 'Treatment', desc: 'Medical management or surgical referral based on diagnosis.' },
        ],
        faqs: [
          { question: 'Is a neurosurgeon available at the hospital?', answer: 'Yes, our hospital has qualified neurosurgeons and neurophysicians for comprehensive neurological care.' },
        ],
      },
    ],
  },

  // ── 7. Gastro-Intestinal Disorder`
  ],

  // Spec 7: Gastro-Intestinal Disorder - insert before "// ── 8. Liver Biopsy"
  [
    `    ],
  },

  // ── 8. Liver Biopsy`,
    `      {
        name: 'GERD (Gastro-Esophageal Reflux Disease) Management',
        slug: 'gerd-management',
        cost: '₹500 – ₹1,50,000',
        duration: 'Variable',
        recovery: '1–7 days',
        description: 'Comprehensive management of GERD including medical therapy, lifestyle modification, and anti-reflux surgery (fundoplication).',
        longDescription: \`GERD Management (गैस्ट्रो-इसोफेगल रिफ्लक्स डिजीज का इलाज) at Patna Lapro and Stone Healthcare provides complete care for acid reflux — from medical management to laparoscopic anti-reflux surgery. Dr. Sanjeev Kumar evaluates each patient with upper GI endoscopy, pH monitoring, and manometry to determine the best treatment approach.

GERD occurs when stomach acid repeatedly flows back into the oesophagus, causing heartburn, chest pain, regurgitation, chronic cough, and difficulty swallowing. Long-standing GERD can lead to Barrett's oesophagus and oesophageal cancer.

Treatment begins with lifestyle modifications (diet changes, weight loss, elevation of head during sleep) and medications (PPIs — proton pump inhibitors). When medical therapy fails or complications develop, laparoscopic Nissen Fundoplication is performed — the upper part of the stomach is wrapped around the lower oesophagus to create a new valve mechanism preventing reflux.

GERD is increasingly common across Patna and Bihar due to changing dietary habits, stress, and obesity. Contact Patna Lapro and Stone Healthcare at 9334097925, Sri Krishna Nagar Kidwaipuri, Patna 800001.\`,
        indications: ['Chronic heartburn', 'Acid regurgitation', 'Barrett\\'s oesophagus', 'Failed medical therapy'],
        benefits: ['Complete GERD workup', 'Medical and surgical options', 'Laparoscopic fundoplication'],
        preparation: ['Upper GI endoscopy', 'pH monitoring', 'Oesophageal manometry'],
        steps: [
          { step: '01', title: 'Diagnosis', desc: 'Endoscopy and pH study to confirm GERD severity.' },
          { step: '02', title: 'Treatment', desc: 'Medical therapy or laparoscopic fundoplication as indicated.' },
          { step: '03', title: 'Follow-up', desc: 'Dietary counselling and periodic endoscopic surveillance.' },
        ],
        faqs: [
          { question: 'Can GERD be cured permanently?', answer: 'Laparoscopic fundoplication provides long-term relief from GERD in over 90% of carefully selected patients.' },
        ],
      },
      {
        name: 'Ulcerative Colitis & Crohn\\'s Disease Surgery',
        slug: 'ulcerative-colitis-crohns-surgery',
        cost: '₹50,000 – ₹2,00,000',
        duration: '2–5 hrs',
        recovery: '10–21 days',
        description: 'Surgical management of complications of ulcerative colitis and Crohn\\'s disease — colectomy, strictureplasty, and abscess drainage.',
        longDescription: \`Ulcerative Colitis & Crohn's Disease Surgery (अल्सरेटिव कोलाइटिस और क्रोन रोग सर्जरी) at Patna Lapro and Stone Healthcare provides surgical management for patients with inflammatory bowel disease (IBD) who have failed medical therapy or developed complications.

Ulcerative Colitis complications requiring surgery include toxic megacolon, perforation, massive bleeding, and dysplasia/cancer. Surgery involves total colectomy with ileal pouch-anal anastomosis (J-pouch) or permanent ileostomy.

Crohn's Disease complications include intestinal strictures causing obstruction, fistulae (abnormal connections between bowel loops or to skin), and abscesses. Surgical options include strictureplasty (widening the narrowed segment without removing it), segmental resection, and abscess drainage.

Dr. Sanjeev Kumar takes a conservative surgical approach — removing only the minimum bowel necessary to treat the complication while preserving as much intestine as possible.

IBD is increasingly diagnosed in Bihar and eastern India. Patients from Patna and surrounding districts trust our centre for IBD surgery. Contact Patna Lapro and Stone Healthcare at 9334097925.\`,
        indications: ['Toxic megacolon', 'Intestinal stricture', 'Fistula', 'Abscess', 'Failed medical therapy'],
        benefits: ['Bowel-preserving surgery when possible', 'Expert IBD surgical management', 'Multidisciplinary care'],
        preparation: ['Colonoscopy', 'CT enterography', 'Nutritional optimization', 'Stoma marking if needed'],
        steps: [
          { step: '01', title: 'Assessment', desc: 'Disease extent mapping with colonoscopy and CT.' },
          { step: '02', title: 'Surgery', desc: 'Colectomy, strictureplasty, or abscess drainage as needed.' },
          { step: '03', title: 'Recovery', desc: 'Stoma care (if applicable), dietary guidance, and follow-up.' },
        ],
        faqs: [
          { question: 'Is surgery the last option for IBD?', answer: 'Surgery is recommended when medical therapy fails or serious complications develop. It can significantly improve quality of life.' },
        ],
      },
      {
        name: 'Trichobezoar & Upper GI Bleeding Management',
        slug: 'trichobezoar-upper-gi-bleeding',
        cost: '₹20,000 – ₹1,00,000',
        duration: '1–3 hrs',
        recovery: '5–14 days',
        description: 'Emergency and elective management of trichobezoar (hair ball in stomach) and upper gastrointestinal bleeding.',
        longDescription: \`Trichobezoar & Upper GI Bleeding Management (ट्राइकोबेज़ोर और ऊपरी जीआई ब्लीडिंग) at Patna Lapro and Stone Healthcare provides expert surgical care for two important upper GI conditions.

Trichobezoar: A trichobezoar is a mass of ingested hair that accumulates in the stomach, most commonly seen in young females with trichotillomania (hair-pulling disorder). It can cause abdominal pain, vomiting, weight loss, and gastric obstruction. Large trichobezoars extending into the small intestine (Rapunzel syndrome) require surgical removal through gastrotomy (opening the stomach).

Upper GI Bleeding: Causes include peptic ulcers, oesophageal varices (in liver cirrhosis), Mallory-Weiss tears, and gastric erosions. Management begins with resuscitation, blood transfusion, and emergency upper GI endoscopy for diagnosis and therapeutic intervention (adrenaline injection, band ligation, or clipping). When endoscopic therapy fails, emergency surgery is performed — oversewing of bleeding ulcers, gastrectomy, or devascularisation procedures for variceal bleeding.

Dr. Sanjeev Kumar provides 24-hour emergency surgical services for upper GI bleeding at Patna Lapro and Stone Healthcare. Call 9334097925 for emergency consultation.\`,
        indications: ['Trichobezoar (hair ball)', 'Peptic ulcer bleeding', 'Variceal bleeding', 'Mallory-Weiss tear'],
        benefits: ['24-hour emergency services', 'Endoscopic and surgical options', 'Expert GI surgeon'],
        preparation: ['Emergency resuscitation', 'Blood grouping & cross-match', 'Upper GI endoscopy'],
        steps: [
          { step: '01', title: 'Resuscitation', desc: 'IV fluids, blood transfusion, and stabilisation.' },
          { step: '02', title: 'Endoscopy/Surgery', desc: 'Endoscopic therapy or surgical intervention as needed.' },
          { step: '03', title: 'Recovery', desc: 'ICU monitoring, diet advancement, and discharge.' },
        ],
        faqs: [
          { question: 'What is a trichobezoar?', answer: 'It is a mass of swallowed hair that forms a ball in the stomach, requiring surgical removal.' },
        ],
      },
    ],
  },

  // ── 8. Liver Biopsy`
  ],

  // Spec 10: Colorectal - insert before "// ── 11. Piles"
  [
    `    ],
  },

  // ── 11. Piles, fissure and fistula in Ano`,
    `      {
        name: 'Large Bowel (Colon) Cancer Surgery',
        slug: 'large-bowel-colon-cancer-surgery',
        cost: '₹80,000 – ₹2,50,000',
        duration: '3–5 hrs',
        recovery: '10–21 days',
        description: 'Radical surgery for colon and rectal cancer including hemicolectomy, anterior resection, and abdominoperineal resection.',
        longDescription: \`Large Bowel Cancer Surgery (बड़ी आंत के कैंसर की सर्जरी) at Patna Lapro and Stone Healthcare provides comprehensive surgical treatment for cancers of the colon and rectum. Dr. Sanjeev Kumar performs right hemicolectomy, left hemicolectomy, sigmoid colectomy, anterior resection, and abdominoperineal resection (APR) based on the tumour location and stage.

Colorectal cancer is the third most common cancer worldwide and is increasingly diagnosed in Bihar due to dietary changes (high processed food, low fibre), sedentary lifestyle, and delayed screening. Symptoms include change in bowel habits, blood in stool, unexplained weight loss, and abdominal pain.

Surgery involves removing the cancer-bearing segment of the bowel along with its draining lymph nodes (radical resection), followed by reconnection of the remaining bowel. In low rectal cancers, a permanent colostomy (stoma) may be necessary.

Early-stage colorectal cancers have excellent cure rates with surgery alone. Advanced cases benefit from combined chemotherapy and surgery. Patients from Patna and Bihar trust our centre for expert colorectal cancer surgery. Contact 9334097925.\`,
        indications: ['Colon cancer', 'Rectal cancer', 'Large bowel polyps with malignancy'],
        benefits: ['Radical oncological resection', 'Laparoscopic options for select cases', 'Expert GI cancer surgeon'],
        preparation: ['Colonoscopy with biopsy', 'CT chest/abdomen/pelvis', 'CEA tumour marker', 'Bowel preparation'],
        steps: [
          { step: '01', title: 'Staging', desc: 'Colonoscopy, CT, and tumour markers for staging.' },
          { step: '02', title: 'Surgery', desc: 'Radical colectomy with lymph node dissection.' },
          { step: '03', title: 'Follow-up', desc: 'Chemotherapy if needed; surveillance colonoscopy.' },
        ],
        faqs: [
          { question: 'Is colon cancer curable?', answer: 'Yes, early-stage colon cancer has cure rates above 90% with proper surgery.' },
        ],
      },
      {
        name: 'Intestinal Perforation & Stricture Surgery',
        slug: 'intestinal-perforation-stricture-surgery',
        cost: '₹30,000 – ₹1,20,000',
        duration: '2–4 hrs',
        recovery: '10–21 days',
        description: 'Emergency surgery for intestinal perforation and elective surgery for intestinal strictures causing obstruction.',
        longDescription: \`Intestinal Perforation & Stricture Surgery (आंत में छेद और सिकुड़न की सर्जरी) at Patna Lapro and Stone Healthcare provides both emergency and planned surgical management for bowel perforations and strictures.

Intestinal Perforation: A hole in the intestinal wall is a surgical emergency that causes peritonitis (infection of the abdominal cavity). Common causes include typhoid fever, tuberculosis (Koch's), peptic ulcer, trauma, and Crohn's disease. Surgery involves closure of the perforation (primary repair), resection of the damaged segment, or creation of a stoma (temporary colostomy/ileostomy) depending on the severity of contamination.

Intestinal Stricture: Narrowing of the intestine causes recurrent abdominal pain, bloating, vomiting, and eventually complete bowel obstruction. Common causes include TB (tuberculosis of the intestine — very common in Bihar), Crohn's disease, post-surgical adhesions, and radiation. Surgery involves strictureplasty (widening the narrowed segment) or resection with anastomosis.

Dr. Sanjeev Kumar provides 24-hour emergency surgical services for intestinal perforation. Our ICU facilities ensure comprehensive post-operative care. Contact Patna Lapro and Stone Healthcare at 9334097925, Sri Krishna Nagar Kidwaipuri, Patna.\`,
        indications: ['Intestinal perforation (typhoid, TB, trauma)', 'Intestinal stricture (TB, Crohn\\'s)', 'Post-surgical adhesive obstruction'],
        benefits: ['24-hour emergency surgery', 'ICU backup', 'Bowel-preserving techniques when possible'],
        preparation: ['Emergency X-ray erect abdomen', 'Blood tests', 'IV resuscitation'],
        steps: [
          { step: '01', title: 'Resuscitation', desc: 'IV fluids, antibiotics, and nasogastric decompression.' },
          { step: '02', title: 'Surgery', desc: 'Perforation repair, resection, or strictureplasty.' },
          { step: '03', title: 'ICU Care', desc: 'Post-operative monitoring, drain management, and staged diet.' },
        ],
        faqs: [
          { question: 'Is intestinal perforation an emergency?', answer: 'Yes, it is a life-threatening emergency requiring immediate surgery to prevent fatal peritonitis.' },
        ],
      },
    ],
  },

  // ── 11. Piles, fissure and fistula in Ano`
  ],

  // Spec 11: Piles - insert before "// ── 12. Pancreatic stone"
  [
    `    ],
  },

  // ── 12. Pancreatic stone`,
    `      {
        name: 'Stapler Haemorrhoidectomy (MIPH)',
        slug: 'stapler-haemorrhoidectomy-miph',
        cost: '₹25,000 – ₹60,000',
        duration: '30–45 min',
        recovery: '3–7 days',
        description: 'Minimally invasive stapler haemorrhoidectomy (MIPH) for grade 3–4 piles with less pain and faster recovery than conventional surgery.',
        longDescription: \`Stapler Haemorrhoidectomy — also known as MIPH (Minimally Invasive Procedure for Haemorrhoids) or PPH (Procedure for Prolapse and Haemorrhoids) — is an advanced surgical technique for treating grade 3 and 4 internal haemorrhoids (बवासीर) at Patna Lapro and Stone Healthcare.

Unlike conventional haemorrhoidectomy which cuts and removes the piles tissue (causing significant post-operative pain), the stapler technique uses a circular stapling device to remove a ring of excess mucosa above the pile mass. This lifts the prolapsed piles back to their normal position and cuts off the blood supply, causing them to shrink. The staple line is placed in an area with fewer pain nerves, resulting in significantly less pain compared to traditional surgery.

Advantages of MIPH include: minimal post-operative pain, faster recovery (return to work in 3–5 days vs 2–3 weeks), less bleeding, and no external wounds. It is particularly effective for circumferential (all-around) prolapsing piles.

Piles are extremely common in Bihar due to dietary habits (low fibre, high spice), sedentary jobs, and chronic constipation. Patients from Patna, Gaya, Muzaffarpur, Bhagalpur, and across Bihar choose Patna Lapro and Stone Healthcare for expert pile treatment. Contact us at 9334097925, L-35, Sri Krishna Nagar Kidwaipuri, Patna 800001.\`,
        indications: ['Grade 3–4 internal haemorrhoids', 'Circumferential prolapsing piles', 'Recurrent piles after banding'],
        benefits: ['Minimal pain', 'Faster recovery', 'No external wounds', 'Day-care or overnight stay'],
        preparation: ['Proctoscopy', 'Blood tests (CBC, PT/INR)', 'Bowel preparation'],
        steps: [
          { step: '01', title: 'Examination', desc: 'Proctoscopy to grade the haemorrhoids.' },
          { step: '02', title: 'Stapler Surgery', desc: 'Circular stapler removes excess mucosa and lifts prolapsed piles.' },
          { step: '03', title: 'Discharge', desc: 'Same-day or next-day discharge with dietary advice.' },
        ],
        faqs: [
          { question: 'Is stapler surgery painful?', answer: 'Stapler haemorrhoidectomy causes significantly less pain than conventional surgery because the staple line is placed above the pain-sensitive zone.' },
        ],
      },
    ],
  },

  // ── 12. Pancreatic stone`
  ],
];

let replacements = 0;
for (const [anchor, replacement] of insertions) {
  if (content.includes(anchor)) {
    content = content.replace(anchor, replacement);
    replacements++;
  } else {
    console.error('ANCHOR NOT FOUND:', anchor.substring(0, 60));
  }
}

fs.writeFileSync('src/data/seed/laproStoneSpecialities.js', content, 'utf8');
console.log(`Done! ${replacements} insertions applied.`);
