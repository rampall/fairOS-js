import { Base } from '../base'
import { SignUpBody, LoginBody } from './types'

const resourceName = 'user'

export class User extends Base {
  signupUser({ username, password, mnemonic }: SignUpBody) {
    return this.postRequest(`${resourceName}/signup`, {
      user_name: username,
      password: password,
      mnemonic: mnemonic
    })
  }

  loginUser({ username, password }: LoginBody) {
    return this.postRequest(`${resourceName}/login`, {
      user_name: username,
      password: password
    })
  }
}
