import { hospitalDepartments } from './hospitalDepartments.js';
import { surgicalServices } from './surgicalServices.js';
import { criticalCare } from './criticalCare.js';
import { diagnostics } from './diagnostics.js';
import { patientFacilities } from './patientFacilities.js';

// Combine all modules into a single array for Firestore seeding
export const allDepartments = [
  ...hospitalDepartments,
  ...surgicalServices,
  ...criticalCare,
  ...diagnostics,
  ...patientFacilities
];
