export type UserSignUpBody = {
  user_name: string;
  password: string;
  mnemonic?: string; //TODO: maybe mnemonic type.
};

export type UserSignUpResponse<T> = T extends string
  ? {
      address: string;
    }
  : null;

export type UserLoginBody = {
  user_name: string;
  password: string;
};

export type UserLoginResponse = {
  message: string;
  code: number;
};

//TODO: maybe better type
export type UserImportBody = {
  user_name: string;
  password: string;
} & (
  | { address: string; mnemonic?: never }
  | { mnemonic: string; address?: never }
);

export type UserImportResponse = {
  address: string;
};

export type UserPresentParams = {
  user_name: string;
};

export type UserPresentResponse = {
  present: boolean;
};

export type UserLoggedInParams = {
  user_name: string;
};

export type UserLoggedInResponse = {
  loggedin: boolean;
};

export type UserLogoutResponse = {
  message: string;
  code: number;
};

export type UserExportResponse = {
  user_name: string;
  address: string;
};

export type UserDeleteBody = {
  password: string;
};

export type UserDeleteResponse = {
  message: string;
  code: number;
};

//TODO: reference or address
export type UserStatReponse = {
  user_name: string;
  reference?: string;
  address?: string;
};
