import { BaseResponse } from "../types";

export interface UserSignUpParams {
  user_name: string;
  password: string;
  mnemonic?: string; //TODO: maybe mnemonic type.
}

export type UserSignUpResponse<T> = T extends string
  ? {
      address: string;
    }
  : null;

export interface UserLoginParams {
  user_name: string;
  password: string;
}

export interface UserLoginResponse extends BaseResponse {}

//TODO: maybe better type
export type UserImportParams = {
  user_name: string;
  password: string;
} & (
  | { address: string; mnemonic?: never }
  | { mnemonic: string; address?: never }
);

export interface UserImportResponse {
  address: string;
}

export interface UserPresentParams {
  user_name: string;
}

export interface UserPresentResponse {
  present: boolean;
}

export interface UserLoggedInParams {
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

export interface UserDeleteParams {
  password: string;
}

export interface UserDeleteResponse extends BaseResponse {}

//TODO: reference or address
export interface UserStatReponse {
  user_name: string;
  reference?: string;
  address?: string;
}
