import { BaseResponse } from "./base";

export interface UserSignUp {
  user_name: string;
  password: string;
  mnemonic?: string;
}

export type UserSignUpResponse = {
  address: string;
  mnemonic?: string;
};

export interface UserLogin {
  user_name: string;
  password: string;
}

export interface UserLoginResponse extends BaseResponse {}

export type UserImport = {
  user_name: string;
  password: string;
  address?: string;
  mnemonic?: string;
};

//TODO: handle UserImport type properly
// } & (
//   | {
//       address: string;
//     }
//   | {
//       mnemonic: string;
//     }
// );

export interface UserImportResponse {
  address: string;
}

export interface UserPresent {
  user_name: string;
}

export interface UserPresentResponse {
  present: boolean;
}

export interface UserLoggedIn {
  user_name: string;
}

export interface UserLoggedInResponse {
  loggedin: boolean;
}

export interface UserLogoutResponse extends BaseResponse {}

export interface UserExportResponse {
  user_name: string;
  address: string;
}

export interface UserDelete {
  password: string;
}

export interface UserDeleteResponse extends BaseResponse {}

export interface UserStatReponse {
  user_name: string;
  reference?: string;
  address?: string;
}
