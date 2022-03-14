import { FSModel } from "../../models/fs";
import { PodModel } from "../../models/pod";
import { KVStoreModel } from "../../models/kv-store";
import { DocumentDBModel } from "../../models/document-db";
import { UserModel } from "../../models/user";

import { applyMixins } from "../../utils";

import { UserDelete } from "../../types/user";

type Config = {
  providerUrl: string;
  authCookie?: string;
  username: string;
  address?: string;
};

class UserClient extends UserModel {
  public readonly username: string;
  public readonly address: string | undefined;

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

interface UserClient extends FSModel, PodModel, KVStoreModel, DocumentDBModel {}

applyMixins(UserClient, [FSModel, PodModel, KVStoreModel, DocumentDBModel]);

export { UserClient };
