const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'seed', 'laproStoneSpecialities.js');
let content = fs.readFileSync(filePath, 'utf8');

const specialitiesDescriptions = [
  {
    name: 'Laparoscopic Surgery',
    longDescription: 'Patna Lapro and Stone Healthcare is a premier centre for advanced laparoscopic (keyhole) surgery in Patna, Bihar. Led by Dr. Sanjeev Kumar, a senior consultant with over 27 years of experience, we perform minimally invasive procedures for gallbladder stones, hernias, appendicitis, and bariatric weight loss. Using high-definition laparoscopes and specialized instruments, our keyhole surgeries ensure smaller cuts, minimal pain, shorter hospital stays (usually 24–48 hours), and a rapid return to daily activities.'
  },
  {
    name: 'Kidney Stone & Kidney Cancer',
    longDescription: 'Our Urology department offers comprehensive care for kidney stones and renal masses in Patna, Bihar. We specialize in advanced, minimally invasive stone removal techniques including PCNL (Percutaneous Nephrolithotomy) for large stones, URS (Ureteroscopy) with laser lithotripsy, and medical dissolution therapy. We also provide expert surgical oncology services, including partial and radical nephrectomy for kidney cancer, ensuring maximum preservation of healthy kidney tissue.'
  },
  {
    name: 'Liver Disorders',
    longDescription: 'The Liver Disorders department at Patna Lapro and Stone Healthcare provides specialized medical and surgical care for hepatological diseases. Our services include percutaneous drainage of liver abscesses, surgical management of benign and malignant liver tumors (hepatectomy), and emergency treatment for liver trauma. Under the guidance of Dr. Sanjeev Kumar, patients receive comprehensive care supported by our fully equipped ICU and round-the-clock anaesthesia team.'
  },
  {
    name: 'Pancreas Disorders',
    longDescription: 'We offer highly specialized surgical care for pancreatic conditions, including acute/chronic pancreatitis, pancreatic pseudocysts, and pancreatic cancer. Dr. Sanjeev Kumar is trained in performing complex pancreatic resections such as the Whipple Procedure (pancreaticoduodenectomy) and distal pancreatectomy. Our multidisciplinary approach in Patna ensures that patients with complex pancreatic diseases receive world-class diagnostic, critical care, and surgical management.'
  },
  {
    name: 'Jaundice & Biliary Disorders',
    longDescription: 'Our biliary department specializes in diagnosing and treating obstructive/surgical jaundice caused by common bile duct (CBD) stones, strictures, and biliary tract cancers. We offer advanced endoscopic interventions such as ERCP for stone extraction and biliary stenting, alongside surgical options like laparoscopic CBD exploration and hepaticojejunostomy reconstructions. We serve patients across Bihar with high-success biliary clearance protocols.'
  },
  {
    name: 'General & Gastrointestinal Surgery',
    longDescription: "This department covers standard and emergency general surgical procedures, including thyroidectomy, AV fistula creation for dialysis access, splenectomy, and paediatric congenital surgeries. Managed by Dr. Sanjeev Kumar, the team is supported by a 24/7 ICU and critical care unit led by qualified anaesthetists, making our centre in Kidwaipuri, Patna, a trusted destination for both planned and emergency major abdominal interventions."
  },
  {
    name: 'Gastro-Intestinal Disorder',
    longDescription: "We provide diagnostic evaluation and therapeutic management for complex gastrointestinal disorders such as GERD, Inflammatory Bowel Disease (Ulcerative Colitis and Crohn's disease), peptic ulcers, and upper GI bleeding. Our treatment options span medical therapy, nutritional counseling, lifestyle modification guidelines, and advanced laparoscopic surgeries like Nissen Fundoplication to permanently cure severe acid reflux."
  },
  {
    name: 'Liver Biopsy',
    longDescription: "For accurate staging and diagnosis of chronic liver diseases (such as cirrhosis, fatty liver, or unexplained liver enzyme elevations), we perform percutaneous and ultrasound-guided liver biopsies. This outpatient procedure is performed with high safety standards and minimal discomfort under local anaesthesia, providing critical tissue samples for histopathological evaluation."
  },
  {
    name: 'Upper G.I. Endoscopy / Colonoscopy',
    longDescription: "Our endoscopy suite offers diagnostic and therapeutic upper GI endoscopy (gastroscopy) and colonoscopy. We perform routine cancer screenings, polyp removals (polypectomy), and identify bleeding sources in the esophagus, stomach, and large intestines. Procedures are performed under conscious sedation to ensure maximum patient comfort and quick recovery."
  },
  {
    name: 'Colorectal Surgeon',
    longDescription: "We provide specialized surgical oncology and reconstructive procedures for colon and rectal cancers, large bowel obstructions, and intestinal perforations. Dr. Sanjeev Kumar's oncological training ensures radical resections with clean margins and lymph node dissections, followed by restorative anastomosis or stoma creation, backed by dedicated ICU monitoring."
  },
  {
    name: 'Piles, fissure and fistula in Ano',
    longDescription: "We offer modern, minimally invasive solutions for proctological conditions. Our treatments include Stapled Haemorrhoidectomy (MIPH/PPH) for grade 3–4 piles, laser sphincterotomy for anal fissures, and sphincter-preserving fistula surgeries (like LIFT and mucosal flaps). These advanced keyhole and laser techniques ensure minimal pain, no large wounds, and same-day or next-day discharge."
  },
  {
    name: 'Pancreatic stone',
    longDescription: "Our clinic is one of the specialized centers in Bihar for managing pancreatic duct stones. We provide comprehensive treatment including endoscopic clearance, pancreatic pseudocyst drainage, pancreatic stricture dilations, and surgical lithotomy. Removing pancreatic stones relieves severe chronic abdominal pain and preserves pancreatic exocrine and endocrine functions."
  },
  {
    name: 'Fissure Laser Surgery',
    longDescription: "We provide state-of-the-art laser treatment for chronic anal fissures, offering a bloodless and virtually painless alternative to traditional surgery. In addition, this department covers the surgical management of complex liver abscesses and hydatid cysts of the liver, utilizing both percutaneous catheter drainage and laparoscopic cyst excision techniques."
  },
  {
    name: 'Gall bladder stone',
    longDescription: "As a dedicated gallbladder center in Patna, we offer advanced surgical options for gallbladder stones, acute cholecystitis, and gallbladder cancer. Dr. Sanjeev Kumar performs laparoscopic cholecystectomy using 4-port, 3-port, and single-port techniques. We also specialize in radical gallbladder resections for early and advanced biliary cancers."
  },
  {
    name: 'Liver',
    longDescription: "This department focuses on the long-term medical management and treatment of viral hepatitis (Hepatitis B and Hepatitis C), fatty liver disease, and cirrhosis. We offer viral load monitoring, antiviral therapy, lifestyle and dietary counseling, and family screening programs to prevent transmission and manage liver health comprehensively."
  },
  {
    name: 'ERCP — for CBD stone',
    longDescription: "Our advanced ERCP unit provides endoscopic clearance of common bile duct stones, biliary stenting for strictures and leaks, and palliative stenting for inoperable pancreatic and gallbladder cancers. It also handles medical evaluations for abdominal tuberculosis and tuberculous strictures, avoiding major open surgery for many patients."
  },
  {
    name: 'Stomach cancer',
    longDescription: "We specialize in radical gastrectomy (partial or total) for gastric cancers, combined with D2 lymph node dissection for optimal oncological outcomes. This department also offers advanced laparoscopic gynaecological oncology services, including keyhole removal of complex ovarian cysts and surgical management of ovarian cancers."
  },
  {
    name: 'Hernia',
    longDescription: "We offer comprehensive hernia repair surgeries for all types of hernias, including inguinal (groin), umbilical (navel), incisional (prior scar), and femoral hernias. We perform both tension-free open mesh hernioplasty and advanced laparoscopic repairs (TEP/TAPP) to ensure low recurrence, minimal post-op pain, and rapid recovery."
  },
  {
    name: 'Jaundice, Ascites & Biliary Disorder',
    longDescription: "We provide clinical diagnosis, medical management, and palliative support for patients suffering from liver failure, advanced cirrhosis, ascites (fluid in the abdomen), and complex biliary cysts. Services include therapeutic paracentesis (abdominal tapping), dietary salt restriction guidelines, and surgical referrals for portosystemic shunts."
  }
];

let updatedCount = 0;

for (const spec of specialitiesDescriptions) {
  // Find the speciality name in the file
  const nameAnchor = `name: '${spec.name}',`;
  const nameIndex = content.indexOf(nameAnchor);
  
  if (nameIndex !== -1) {
    // Find the next description property after this name
    const descAnchor = 'description:';
    const descIndex = content.indexOf(descAnchor, nameIndex);
    
    if (descIndex !== -1) {
      // Find the end of this description line (matching ' or ")
      const quoteChar = content[descIndex + descAnchor.length + 1]; // usually ' or " or `
      let endOfLineIndex = content.indexOf('\n', descIndex);
      
      // Check if we already inserted longDescription for this speciality
      const longDescCheck = 'longDescription:';
      const checkRange = content.substring(descIndex, descIndex + 250);
      if (checkRange.includes(longDescCheck)) {
        console.log(`Skipping "${spec.name}" - longDescription already exists.`);
        continue;
      }
      
      // Prepare insertion
      const insertion = `\n    longDescription: \`${spec.longDescription}\`,`;
      
      // Insert right after the description line
      content = content.substring(0, endOfLineIndex) + insertion + content.substring(endOfLineIndex);
      updatedCount++;
      console.log(`Added longDescription for "${spec.name}"`);
    } else {
      console.error(`Could not find description for "${spec.name}"`);
    }
  } else {
    console.error(`Could not find speciality named "${spec.name}"`);
  }
}

if (updatedCount > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated ${updatedCount} specialities in laproStoneSpecialities.js.`);
} else {
  console.log('No updates applied.');
}
