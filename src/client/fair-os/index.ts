import {
  UserModel,
  UserSignUp,
  UserLogin,
  UserImport,
  UserPresent,
  UserLoggedIn,
} from "../../internal";

type Config = {
  providerUrl: string;
};

export class FairOSClient extends UserModel {
  constructor(config: Config) {
    super(config);
  }

  userSignup({ user_name, password, mnemonic }: UserSignUp) {
    return super.userSignup({ user_name, password, mnemonic });
  }

  userLogin({ user_name, password }: UserLogin) {
    return super.userLogin({ user_name, password });
  }

  userImport({ user_name, password, address, mnemonic }: UserImport) {
    return super.userImport({
      user_name,
      password,
      address,
      mnemonic,
    });
  }

  userPresent({ user_name }: UserPresent) {
    return super.userPresent({ user_name });
  }

  userLoggedIn({ user_name }: UserLoggedIn) {
    return super.userLoggedIn({ user_name });
  }
}
