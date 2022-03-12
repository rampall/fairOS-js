import { Request } from "../../request";

import { FS } from "./fs";
import { Pod } from "./pod";
import { KeyValueStore } from "./kv-store";
import { DocumentDB } from "./document-db";

import { applyMixins } from "../../utils";

import {
  UserLogoutResponse,
  UserExportResponse,
  UserDelete,
  UserStatReponse,
  UserDeleteResponse,
  UserPresentResponse,
  UserLoggedInResponse,
} from "../../types/user";

type Config = {
  providerUrl: string;
  authCookie?: string;
  username: string;
  address?: string;
};

class User extends Request {
  public readonly username: string;
  public readonly address: string | undefined;

  constructor(config: Config) {
    super(config);
    this.username = config.username;
    this.address = config.address;
  }

  logout() {
    return this.postRequest<UserLogoutResponse>("user/logout");
  }

  export() {
    return this.postRequest<UserExportResponse>("user/export");
  }

  delete({ password }: UserDelete) {
    return this.deleteRequest<UserDeleteResponse>("user/delete", {
      data: {
        password,
      },
    });
  }

  stat() {
    return this.getRequest<UserStatReponse>("user/stat");
  }

  isPresent() {
    return this.getRequest<UserPresentResponse>("user/present", {
      params: {
        user_name: this.username,
      },
    });
  }

  isLoggedIn() {
    return this.getRequest<UserLoggedInResponse>("user/isloggedin", {
      params: {
        user_name: this.username,
      },
    });
  }
}

interface User extends FS, Pod, KeyValueStore, DocumentDB {}

applyMixins(User, [FS, Pod, KeyValueStore, DocumentDB]);

export { User };
