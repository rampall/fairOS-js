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

  /**
   * Signs up a user.
   */
  userSignup({ user_name, password, mnemonic }: UserSignUp) {
    return super.userSignup({ user_name, password, mnemonic });
  }

  /**
   * Logs in user.
   */
  userLogin({ user_name, password }: UserLogin) {
    return super.userLogin({ user_name, password });
  }

  /**
   * Import a user from one dfs server to another.
   */
  userImport({ user_name, password, address, mnemonic }: UserImport) {
    return super.userImport({
      user_name,
      password,
      address,
      mnemonic,
    });
  }

  /**
   * Check if an user is present in a given dfs-server.
   */
  userPresent({ user_name }: UserPresent) {
    return super.userPresent({ user_name });
  }

  /**
   * Check if a user is logged in already.
   */
  userLoggedIn({ user_name }: UserLoggedIn) {
    return super.userLoggedIn({ user_name });
  }
}
