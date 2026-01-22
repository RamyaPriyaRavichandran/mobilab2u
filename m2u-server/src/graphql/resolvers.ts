import type { FieldResolver } from 'nexus'
import cityModel from '../models/city.model'

export const getCities = async () => await cityModel.find({})
export const helloWorld: FieldResolver<'Query', 'hello'> = (
  _parent,
  { name },
) => `Hello ${name ?? 'World'}!`
