import { Request } from "../request";
import { User } from "../user/user";

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
} from "../user/types";

type Config = {
  providerUrl: string;
};

type Resources = {
  user?: string;
};

export class FairOS extends Request {
  private resources: Resources;

  constructor(config: Config, resources?: Resources) {
    super(config);

    this.resources = {
      user: resources?.user || "user",
    };
  }

  async userSignup({ user_name, password, mnemonic }: UserSignUp) {
    const response = await this.postRequest<
      UserSignUpResponse<typeof mnemonic>
    >(`${this.resources.user}/signup`, {
      user_name,
      password,
      mnemonic,
    });

    const user = new User({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      username: user_name,
    });

    return user;
  }

  async userLogin({ user_name, password }: UserLogin) {
    const response = await this.postRequest<UserLoginResponse>(
      `${this.resources.user}/login`,
      {
        user_name,
        password,
      }
    );

    const user = new User({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      username: user_name,
    });

    return user;
  }

  async userImport({ user_name, password, address, mnemonic }: UserImport) {
    const response = await this.postRequest<UserImportResponse>(
      `${this.resources.user}/import`,
      {
        user_name,
        password,
        address,
        mnemonic,
      }
    );

    const user = new User({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      username: user_name,
    });

    return user;
  }

  userPresent({ user_name }: UserPresent) {
    return this.getRequest<UserPresentResponse>(
      `${this.resources.user}/present`,
      {
        params: {
          user_name,
        },
      }
    );
  }

  userLoggedIn({ user_name }: UserLoggedIn) {
    return this.getRequest<UserLoggedInResponse>(
      `${this.resources.user}/isloggedin`,
      {
        params: {
          user_name,
        },
      }
    );
  }
}
