import { UserDocumentDB } from "./document-db";
import { UserFS } from "./fs";
import { UserKVStore } from "./kv-store";
import { UserPod } from "./pod";

import { UserModel, UserDelete, applyMixins } from "../../internal";

type Config = {
  providerUrl: string;
  username: string;
  cookies?: string;
  address?: string;
};

class UserClient extends UserModel {
  public readonly username: string;
  public readonly address?: string;

  constructor(config: Config) {
    super(config);
    this.username = config.username;
    this.address = config.address;
  }

  /**
   * Logout the user from the dfs server.
   */
  logout() {
    return super.userLogout();
  }

  /**
   * Export the user so that ic can be imported in another machine.
   */
  export() {
    return super.userExport();
  }

  /**
   * Delete the logged-in user from the dfs server.
   */
  delete({ password }: UserDelete) {
    return super.userDelete({ password });
  }

  /**
   * Delete a logged-in user from the dfs server.
   */
  stat() {
    return super.userStat();
  }

  /**
   * Check if an user is present in a given dfs-server.
   */
  isPresent() {
    return super.userPresent({
      user_name: this.username,
    });
  }

  /**
   * Check if the user is logged in already.
   */
  isLoggedIn() {
    return super.userLoggedIn({
      user_name: this.username,
    });
  }
}

interface UserClient extends UserFS, UserPod, UserKVStore, UserDocumentDB {}

applyMixins(UserClient, [UserFS, UserPod, UserKVStore, UserDocumentDB]);

export { UserClient };
