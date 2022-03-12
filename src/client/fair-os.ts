import { Request } from "../request";
import { User } from "./user";

import {
  UserSignUp,
  UserSignUpResponse,
  UserLogin,
  UserLoginResponse,
  UserImport,
  UserImportResponse,
  UserPresent,
  UserPresentResponse,
  UserLoggedIn,
  UserLoggedInResponse,
} from "../types/user";

type Config = {
  providerUrl: string;
};

export class FairOS extends Request {
  constructor(config: Config) {
    super(config);
  }

  async userSignup({ user_name, password, mnemonic }: UserSignUp) {
    const response = await this.postRequest<UserSignUpResponse>("user/signup", {
      user_name,
      password,
      mnemonic,
    });

    const user = new User({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      username: user_name,
      address: response.address,
    });

    return user;
  }

  async userLogin({ user_name, password }: UserLogin) {
    const response = await this.postRequest<UserLoginResponse>("user/login", {
      user_name,
      password,
    });

    const user = new User({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      username: user_name,
    });

    return user;
  }

  async userImport({ user_name, password, address, mnemonic }: UserImport) {
    const response = await this.postRequest<UserImportResponse>("user/import", {
      user_name,
      password,
      address,
      mnemonic,
    });

    const user = new User({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      username: user_name,
      address: response.address,
    });

    return user;
  }

  userPresent({ user_name }: UserPresent) {
    return this.getRequest<UserPresentResponse>("user/present", {
      params: {
        user_name,
      },
    });
  }

  userLoggedIn({ user_name }: UserLoggedIn) {
    return this.getRequest<UserLoggedInResponse>("user/isloggedin", {
      params: {
        user_name,
      },
    });
  }
}
