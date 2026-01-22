import { PACKAGE_TYPE } from '../../constants'
import packageModel from '../../models/package.model'
import adminPackage from './admin-package.json'

export const createPackage = () => {
  return packageModel
    .findOne({ serviceType: PACKAGE_TYPE.SERVICE_PROVIDER_KIT_FEES })
    .then((existingPackages) => {
      if (!existingPackages) {
        return packageModel.insertMany(adminPackage)
      } else return []
    })
    .then((createdPackages) => {
      if (createdPackages.length >= 1) {
        console.log('===== 0003 Packages Inserted =====')
      } else {
        console.log('===== Package already exist =====')
      }
    })
}
