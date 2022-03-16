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

  logout() {
    return super.userLogout();
  }

  export() {
    return super.userExport();
  }

  delete({ password }: UserDelete) {
    return super.userDelete({ password });
  }

  stat() {
    return super.userStat();
  }

  isPresent() {
    return super.userPresent({
      user_name: this.username,
    });
  }

  isLoggedIn() {
    return super.userLoggedIn({
      user_name: this.username,
    });
  }
}

interface UserClient extends UserFS, UserPod, UserKVStore, UserDocumentDB {}

applyMixins(UserClient, [UserFS, UserPod, UserKVStore, UserDocumentDB]);

export { UserClient };
