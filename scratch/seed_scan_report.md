# Seed Data Analysis Report

## Modular Seeding Data (src/data/seed/)

### Hospital Departments (Count: 11)
| # | Name | Slug | Treatments | Icon/Order/Info |
|---|------|------|------------|-----------------|
| 1 | Cardiology | `cardiology` | 4 | Icon: ❤️, Order: 1, Category: Hospital Departments |
| 2 | Pulmonology | `pulmonology` | 4 | Icon: 🫁, Order: 2, Category: Hospital Departments |
| 3 | Gastroenterology | `gastroenterology` | 4 | Icon: 🫀, Order: 3, Category: Hospital Departments |
| 4 | Gynecology | `gynecology` | 4 | Icon: 👩‍⚕️, Order: 4, Category: Hospital Departments |
| 5 | Nephrology | `nephrology` | 4 | Icon: 🩸, Order: 5, Category: Hospital Departments |
| 6 | General Medicine | `general-medicine` | 4 | Icon: 🩺, Order: 6, Category: Hospital Departments |
| 7 | Psychiatry | `psychiatry` | 2 | Icon: 🧠, Order: 7, Category: Hospital Departments |
| 8 | Urology | `urology` | 4 | Icon: 🫘, Order: 8, Category: Hospital Departments |
| 9 | Consultant Physician | `consultant-physician` | 4 | Icon: 🩺, Order: 9, Category: Hospital Departments |
| 10 | General Physician | `general-physician` | 4 | Icon: 👨‍⚕️, Order: 10, Category: Hospital Departments |
| 11 | Critical Care Medicine | `critical-care-medicine` | 4 | Icon: 🏥, Order: 11, Category: Hospital Departments |

**Total Treatments in Hospital Departments:** 42

### Surgical Services (Count: 7)
| # | Name | Slug | Treatments | Icon/Order/Info |
|---|------|------|------------|-----------------|
| 1 | General Surgery | `general-surgery` | 8 | Icon: ✂️, Order: 9, Category: Surgical Services |
| 2 | Orthopedic Surgery | `orthopedic-surgery` | 8 | Icon: 🦴, Order: 10, Category: Surgical Services |
| 3 | Neurosurgery | `neurosurgery` | 8 | Icon: 🧠, Order: 11, Category: Surgical Services |
| 4 | Plastic Surgery | `plastic-surgery` | 8 | Icon: ✨, Order: 12, Category: Surgical Services |
| 5 | Laparoscopic Surgery | `laparoscopic-surgery` | 8 | Icon: 🔬, Order: 13, Category: Surgical Services |
| 6 | Cosmetic Surgery | `cosmetic-surgery` | 8 | Icon: 💄, Order: 14, Category: Surgical Services |
| 7 | Dental & Maxillofacial Surgery | `dental-maxillofacial-surgery` | 8 | Icon: 🦷, Order: 15, Category: Surgical Services |

**Total Treatments in Surgical Services:** 56

### Critical Care (Count: 7)
| # | Name | Slug | Treatments | Icon/Order/Info |
|---|------|------|------------|-----------------|
| 1 | Trauma Care | `trauma-care` | 3 | Icon: 🚑, Order: 17, Category: Critical & Emergency Care |
| 2 | Intensive Care Unit (ICU) | `icu` | 3 | Icon: 🏥, Order: 18, Category: Critical & Emergency Care |
| 3 | Intensive Coronary Care Unit (ICCU) | `iccu` | 3 | Icon: 🫀, Order: 19, Category: Critical & Emergency Care |
| 4 | High Dependency Unit (HDU) | `hdu` | 2 | Icon: 🛏️, Order: 20, Category: Critical & Emergency Care |
| 5 | Emergency Care | `emergency-care` | 3 | Icon: 🚨, Order: 21, Category: Critical & Emergency Care |
| 6 | Burn Unit | `burn-unit` | 3 | Icon: 🔥, Order: 22, Category: Critical & Emergency Care |
| 7 | Critical Care Physician (Intensivist) Consultation | `critical-care-physician-consultation` | 4 | Icon: 👨‍⚕️, Order: 23, Category: Critical & Emergency Care |

**Total Treatments in Critical Care:** 21

### Diagnostics (Count: 6)
| # | Name | Slug | Treatments | Icon/Order/Info |
|---|------|------|------------|-----------------|
| 1 | Pathology | `pathology` | 3 | Icon: 🔬, Order: 23, Category: Diagnostics |
| 2 | Ultrasound | `ultrasound` | 3 | Icon: 💻, Order: 24, Category: Diagnostics |
| 3 | Digital X-Ray | `digital-xray` | 3 | Icon: 🩻, Order: 25, Category: Diagnostics |
| 4 | ECG | `ecg` | 2 | Icon: 📈, Order: 26, Category: Diagnostics |
| 5 | 2D Echo | `2d-echo` | 2 | Icon: 🫀, Order: 27, Category: Diagnostics |
| 6 | Color Doppler | `color-doppler` | 3 | Icon: 🩸, Order: 28, Category: Diagnostics |

**Total Treatments in Diagnostics:** 16

### Patient Facilities (Count: 7)
| # | Name | Slug | Treatments | Icon/Order/Info |
|---|------|------|------------|-----------------|
| 1 | Outpatient Department (OPD) | `opd` | 2 | Icon: 🏥, Order: 29, Category: Patient Care Facilities |
| 2 | Inpatient Department (IPD) | `ipd` | 2 | Icon: 🛏️, Order: 30, Category: Patient Care Facilities |
| 3 | Day Care Services | `day-care-services` | 2 | Icon: ☀️, Order: 31, Category: Patient Care Facilities |
| 4 | Dialysis Unit | `dialysis-unit` | 2 | Icon: 🩸, Order: 32, Category: Patient Care Facilities |
| 5 | AC Rooms & General Wards | `ac-rooms-general-wards` | 2 | Icon: ❄️, Order: 33, Category: Patient Care Facilities |
| 6 | Ambulance Service | `ambulance-service` | 2 | Icon: 🚑, Order: 34, Category: Patient Care Facilities |
| 7 | 24/7 Pharmacy | `pharmacy` | 2 | Icon: 💊, Order: 35, Category: Patient Care Facilities |

**Total Treatments in Patient Facilities:** 14

## Inline Seeding Data (src/data/seedData.js)

### Doctors (Count: 3)
| # | Name | Specialty | Experience | Qualification | Consultation Fee |
|---|------|-----------|------------|---------------|------------------|
| 1 | Dr. Manmohan Suman | Director & Consultant Physician | 21 Years | MBBS, MD | ₹500 |
| 2 | Dr. R. K. Prasad | Laparoscopic & General Surgeon | 22 Years | MBBS, MS | ₹500 |
| 3 | Dr. Shalini Priya | Consultant Physician | 15 Years | MBBS, MD (Internal Medicine) | ₹500 |


### Blogs (Count: 3)
| # | Title | Slug | Category | Author |
|---|-------|------|----------|--------|
| 1 | Laparoscopic Surgery: What You Need to Know Before Your Procedure | `laparoscopic-surgery-what-to-know` | Laparoscopic Surgery | Dr. Manmohan Suman |
| 2 | Kidney Stones: When Do You Need Surgery? | `kidney-stones-when-surgery` | Kidney & Stone | Dr. Manmohan Suman |
| 3 | Jaundice: When Is It a Surgical Emergency? | `jaundice-surgical-emergency` | Jaundice & Liver | Dr. Manmohan Suman |


### Hospital Services (Count: 8)
| # | Name | Category | Available | Icon |
|---|------|----------|-----------|------|
| 1 | OPD Consultation (ओपीडी परामर्श) | Consultation | OPD Hours | 🩺 |
| 2 | Online Consultation (ऑनलाइन परामर्श) | Consultation | 24 Hours | 📱 |
| 3 | Laparoscopic Surgery (लेप्रोस्कोपिक सर्जरी) | Surgery | By Appointment | 🔬 |
| 4 | Stone Surgery (पथरी सर्जरी) | Surgery | OPD & Emergency | 🫘 |
| 5 | Emergency Surgery (आपातकालीन सर्जरी) | Emergency | 24 Hours | 🚑 |
| 6 | I.C.U & Indoor Care (आईसीयू और इनडोर सेवा) | Infrastructure | 24 × 7 | 🩺 |
| 7 | ICU Anaesthesia Support (आईसीयू संज्ञाहरण सहायता) | Support | 24 × 7 | 💉 |
| 8 | Neurology & Neurosurgery (न्यूरोलॉजी और न्यूरोसर्जरी) | Department | By Appointment | 🧠 |


## Summary of Seeding Files

| Data Collection / Section | Number of Parent Entries | Number of Sub-items / Treatments |
|----------------------------|--------------------------|----------------------------------|
| Hospital Departments | 11 | 42 |
| Surgical Services | 7 | 56 |
| Critical Care | 7 | 21 |
| Diagnostics | 6 | 16 |
| Patient Facilities | 7 | 14 |
| Doctors | 3 | - |
| Blogs | 3 | - |
| Hospital Services | 8 | - |


