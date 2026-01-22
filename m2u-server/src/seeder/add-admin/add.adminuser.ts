import bcrypt from 'bcrypt'
import adminModel from '../../models/admin.model'
function addAdminUser() {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync('mobilab2u', salt)

  const addUser = {
    name: 'Admin',
    email: 'mobilab2u@gmail.com',
    userRole: 'SUPER_ADMIN',
    password: hash,
  }
  return adminModel
    .find()
    .then((user = []) => {
      if (user.length <= 0) {
        return adminModel.create(addUser)
      } else return {}
    })
    .then((user: any) => {
      if (user.name) {
        console.log('===== 0002 admin user Inserted =====')
      } else console.log('==== 0002 Admin user already exist ====')
    })
}

export default addAdminUser
