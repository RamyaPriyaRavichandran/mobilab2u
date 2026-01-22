import { queryType, stringArg } from 'nexus'
import { getCities, helloWorld } from './resolvers'
import { CityG } from './types'

export default queryType({
  definition(t) {
    t.string('hello', {
      args: { name: stringArg() },
      resolve: helloWorld,
    })
    t.list.field('getCities', {
      type: CityG,
      resolve: getCities,
    })
  },
})
