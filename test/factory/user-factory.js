import User from '../../src/models/User'
import {
  stringGenerator,
  emailGenerator,
  generateJWTToken,
  encryptPassword
} from '../../src/helpers'

const userFactory = async () => {
  const password = 'test123'

  const user = await new User({
    name: stringGenerator(),
    email: emailGenerator(),
    password: await encryptPassword(password),
    role: 'USER'
  }).save()

  return {
    ...user.attributes,
    password,
    token: `Bearer ${generateJWTToken(user.attributes)}`
  }
}

export default userFactory
