import { Base } from "../base";
import {
  UserSignUpParams,
  UserSignUpResponse,
  UserLoginParams,
  UserLoginResponse,
  UserImportParams,
  UserImportResponse,
  UserPresentParams,
  UserPresentResponse,
  UserLoggedInParams,
  UserLoggedInResponse,
  UserLogoutResponse,
  UserExportResponse,
  UserDeleteParams,
  UserStatReponse,
  UserDeleteResponse,
} from "./types";

const resourceName = "user";

export class User extends Base {
  //TODO: maybe better implementation
  userSignup({ user_name, password, mnemonic }: UserSignUpParams) {
    return this.postRequest<UserSignUpResponse<typeof mnemonic>>(
      `${resourceName}/signup`,
      {
        user_name,
        password,
        mnemonic,
      }
    );
  }

  userLogin({ user_name, password }: UserLoginParams) {
    return this.postRequest<UserLoginResponse>(`${resourceName}/login`, {
      user_name,
      password,
    });
  }

  userImport({ user_name, password, address, mnemonic }: UserImportParams) {
    return this.postRequest<UserImportResponse>(`${resourceName}/import`, {
      user_name,
      password,
      address,
      mnemonic,
    });
  }

  userPresent({ user_name }: UserPresentParams) {
    return this.getRequest<UserPresentResponse>(`${resourceName}/present`, {
      params: {
        user_name,
      },
    });
  }

  userLoggedIn({ user_name }: UserLoggedInParams) {
    return this.getRequest<UserLoggedInResponse>(`${resourceName}/isloggedin`, {
      params: {
        user_name,
      },
    });
  }

  userLogout() {
    return this.postRequest<UserLogoutResponse>(`${resourceName}/logout`);
  }

  userExport() {
    return this.postRequest<UserExportResponse>(`${resourceName}/export`);
  }

  userDelete({ password }: UserDeleteParams) {
    return this.deleteRequest<UserDeleteResponse>(`${resourceName}/delete`, {
      data: {
        password,
      },
    });
  }

  userStat() {
    return this.getRequest<UserStatReponse>(`${resourceName}/stat`);
  }
}
