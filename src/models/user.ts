import {
  UserClient,
  Request,
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
  UserLogoutResponse,
  UserExportResponse,
  UserDelete,
  UserStatReponse,
  UserDeleteResponse,
} from "../internal";

const resourceName = "user";

type Config = {
  providerUrl: string;
  cookies?: string;
};

export class UserModel extends Request {
  constructor(config: Config) {
    super(config);
  }

  protected async userSignup({ user_name, password, mnemonic }: UserSignUp) {
    const response = await this.postRequest<UserSignUpResponse>(
      `${resourceName}/signup`,
      {
        user_name,
        password,
        mnemonic,
      }
    );

    const cookies = this.axiosInstance.defaults.headers.common[
      "Cookie"
    ] as string;

    const user = new UserClient({
      providerUrl: this.providerUrl,
      cookies,
      username: user_name,
      address: response.address,
    });

    return user;
  }

  protected async userLogin({ user_name, password }: UserLogin) {
    await this.postRequest<UserLoginResponse>(`${resourceName}/login`, {
      user_name,
      password,
    });

    const cookies = this.axiosInstance.defaults.headers.common[
      "Cookie"
    ] as string;

    const user = new UserClient({
      providerUrl: this.providerUrl,
      cookies,
      username: user_name,
    });

    return user;
  }

  protected async userImport({
    user_name,
    password,
    address,
    mnemonic,
  }: UserImport) {
    const response = await this.postRequest<UserImportResponse>(
      `${resourceName}/import`,
      {
        user_name,
        password,
        address,
        mnemonic,
      }
    );

    const cookies = this.axiosInstance.defaults.headers.common[
      "Cookie"
    ] as string;

    const user = new UserClient({
      providerUrl: this.providerUrl,
      cookies,
      username: user_name,
      address: response.address,
    });

    return user;
  }

  protected userPresent({ user_name }: UserPresent) {
    return this.getRequest<UserPresentResponse>(`${resourceName}/present`, {
      params: {
        user_name,
      },
    });
  }

  protected userLoggedIn({ user_name }: UserLoggedIn) {
    return this.getRequest<UserLoggedInResponse>(`${resourceName}/isloggedin`, {
      params: {
        user_name,
      },
    });
  }

  protected userLogout() {
    return this.postRequest<UserLogoutResponse>(`${resourceName}/logout`);
  }

  protected userExport() {
    return this.postRequest<UserExportResponse>(`${resourceName}/export`);
  }

  protected userDelete({ password }: UserDelete) {
    return this.deleteRequest<UserDeleteResponse>(`${resourceName}/delete`, {
      data: {
        password,
      },
    });
  }

  protected userStat() {
    return this.getRequest<UserStatReponse>(`${resourceName}/stat`);
  }
}
