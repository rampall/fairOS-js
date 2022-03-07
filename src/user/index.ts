import { Base } from "../base";
import {
  UserSignUpBody,
  UserSignUpResponse,
  UserLoginBody,
  UserLoginResponse,
  UserImportBody,
  UserImportResponse,
  UserPresentParams,
  UserPresentResponse,
  UserLoggedInParams,
  UserLoggedInResponse,
  UserLogoutResponse,
  UserExportResponse,
  UserDeleteBody,
  UserStatReponse,
  UserDeleteResponse,
} from "./types";

const resourceName = "user";

export class User extends Base {
  //TODO: maybe better implementation
  userSignup({ user_name, password, mnemonic }: UserSignUpBody) {
    return this.postRequest<UserSignUpResponse<typeof mnemonic>>(
      `${resourceName}/signup`,
      {
        user_name,
        password,
        mnemonic,
      }
    );
  }

  userLogin({ user_name, password }: UserLoginBody) {
    return this.postRequest<UserLoginResponse>(`${resourceName}/login`, {
      user_name,
      password,
    });
  }

  userImport({ user_name, password, address, mnemonic }: UserImportBody) {
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

  userDelete({ password }: UserDeleteBody) {
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
