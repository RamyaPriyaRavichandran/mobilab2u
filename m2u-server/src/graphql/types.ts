import { objectType } from 'nexus'

export const CityG = objectType({
  name: 'City',
  definition(t) {
    t.string('label')
    t.string('value')
  },
})
