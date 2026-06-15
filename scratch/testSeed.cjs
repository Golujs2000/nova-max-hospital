const { laproStoneSpecialities } = require('../src/data/seed/laproStoneSpecialities.js');

console.log('Total specialities:', laproStoneSpecialities.length);
let totalTreatments = 0;
laproStoneSpecialities.forEach((spec, index) => {
  const count = spec.treatments ? spec.treatments.length : 0;
  totalTreatments += count;
  console.log(`${index + 1}. ${spec.name} (${spec.slug}): ${count} treatments`);
  if (spec.treatments) {
    spec.treatments.forEach((t) => {
      console.log(`   - ${t.name} (${t.slug})`);
    });
  }
});
console.log('Total treatments across all specialities:', totalTreatments);
