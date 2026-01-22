import userModel from '../../models/user.model'
import serviceProviderModel from '../../models/service.provider.model'
import '../../database'
import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

export default function createFakeUser() {
  console.log('==== Get fake data =====')
  const fakeData = getRandomData()
  console.log('==== Start fake data seeding =====')
  return userModel
    .insertMany(fakeData)
    .then((users) => {
      const serviceProviders = []
      for (const user of users) {
        const data = {
          userId: user._id,
          userRole: user.roles[0],
          name: user.userName,
          nricNumber: user.nricNumber,
          gender: 'MALE',
          phone: user.phone,
          city: user.city,
          state: user.state,
          country: user.country,
          postCode: user.postCode,
          address: user.address,
          other: 'Other',
          email: user.email,
          medicalQualification: 'DOCTOR',
          adminApprovalStatus: 'PENDING',
          paymentStatus: 'PENDING',
          mQdocOne: user._id,
          mQdocTwo: user._id,
          mQdocThree: user._id,
          mQdocFour: user._id,
          passportSizePhoto: user._id,
          myKad: user._id,
        }
        serviceProviders.push(data)
      }
      console.log()
      return serviceProviderModel.insertMany(serviceProviders)
    })
    .then((serviceProviders) => {
      console.log('===== Fake service provider inserted =====')
    })
}

function getRandomData() {
  const hash = bcrypt.hashSync('12345', bcrypt.genSaltSync(10))
  function createRandomUser(userRole: string) {
    return {
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      roles: [userRole],
      password: hash,
      postCode: faker.string.numeric(6),
      state: faker.string.alpha(7),
      city: faker.string.alpha(7),
      country: faker.string.alpha(7),
      nricNumber: Number(faker.string.numeric(12)),
      gender: 'MALE',
      phone: Number(faker.string.numeric(9)),
      address: faker.string.alpha(50),
    }
  }
  const serviceProviderUsers = Array.from({ length: 5 }, () =>
    createRandomUser('SERVICE_PROVIDER'),
  )
  const gpPartnerUsers = Array.from({ length: 5 }, () =>
    createRandomUser('GP_PARTNER'),
  )
  const users = [...serviceProviderUsers, ...gpPartnerUsers]
  return users
}
