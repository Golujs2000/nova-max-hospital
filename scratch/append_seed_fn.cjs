const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/seedData.js');
let content = fs.readFileSync(filePath, 'utf8');

const newFunction = `
// Non-destructive: push only NEW departments and critical care entries to Firestore.
// Safe to run multiple times — checks slug before inserting to avoid duplicates.
export async function seedNewDepts() {
  const newHospitalDepts = hospitalDepartments.filter(d =>
    ['consultant-physician', 'general-physician', 'critical-care-medicine'].includes(d.slug)
  )
  const newCriticalCareEntries = criticalCare.filter(d =>
    ['critical-care-physician-consultation'].includes(d.slug)
  )

  let added = 0
  let skipped = 0

  const pushCategory = async (colName, items) => {
    for (const item of items) {
      const existing = await getDocs(
        query(collection(db, colName), where('slug', '==', item.slug))
      )
      if (!existing.empty) {
        console.log('Skipping existing: ' + item.name)
        skipped++
        continue
      }

      const { treatments, ...docData } = item
      const docRef = await addDoc(collection(db, colName), {
        ...docData,
        createdAt: serverTimestamp(),
      })

      if (Array.isArray(treatments) && treatments.length > 0) {
        for (const t of treatments) {
          await addDoc(collection(db, 'treatments'), {
            ...t,
            parentId: docRef.id,
            parentCollection: colName,
            createdAt: serverTimestamp(),
          })
        }
      }

      console.log('Added: ' + item.name + ' (' + (treatments?.length || 0) + ' treatments)')
      added++
    }
  }

  await pushCategory('hospitalDepartments', newHospitalDepts)
  await pushCategory('criticalCare', newCriticalCareEntries)

  console.log('Done! Added: ' + added + ', Skipped: ' + skipped)
  return { added, skipped }
}
`;

content = content + newFunction;
fs.writeFileSync(filePath, content, 'utf8');
console.log('seedData.js updated with seedNewDepts function.');
