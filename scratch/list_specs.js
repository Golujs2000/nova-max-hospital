import { laproStoneSpecialities } from '../src/data/seed/laproStoneSpecialities.js'

laproStoneSpecialities.forEach((spec, idx) => {
  console.log(`\n================================================================`)
  console.log(`CATEGORY ${idx + 1} — ${spec.name.toUpperCase()}`)
  console.log(`================================================================`)
  if (spec.treatments) {
    spec.treatments.forEach((t) => {
      console.log(`\nSERVICE NAME: ${t.name}`)
      console.log(`DESCRIPTION:\n${t.description || t.longDescription.slice(0, 200) + '...'}`)
    })
  }
})
