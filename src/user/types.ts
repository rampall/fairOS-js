import { BaseResponse } from "../types";

export interface UserSignUp {
  user_name: string;
  password: string;
  mnemonic?: string; //TODO: maybe mnemonic type.
}

export type UserSignUpResponse<T> = T extends string
  ? null
  : {
      address: string;
    };

export interface UserLogin {
  user_name: string;
  password: string;
}

export interface UserLoginResponse extends BaseResponse {}

//TODO: maybe better type
export type UserImport = {
  user_name: string;
  password: string;
} & (
  | { address: string; mnemonic?: never }
  | { mnemonic: string; address?: never }
);

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

//TODO: reference or address
export interface UserStatReponse {
  user_name: string;
  reference?: string;
  address?: string;
}
