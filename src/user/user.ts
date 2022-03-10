import { Request } from "../request";
import { Pod } from "../pod/pod";

import {
  UserLogoutResponse,
  UserExportResponse,
  UserDelete,
  UserStatReponse,
  UserDeleteResponse,
  UserPresentResponse,
  UserLoggedInResponse,
} from "./types";

import {
  PodNew,
  PodNewResponse,
  PodOpen,
  PodOpenResponse,
  PodListResponse,
} from "../pod/types";

type Config = {
  providerUrl: string;
  authCookie?: string;
  username: string;
};

export class User extends Request {
  public username: string;

  constructor(config: Config) {
    super(config);
    this.username = config.username;
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

  async podNew({ pod_name, password }: PodNew) {
    const response = await this.postRequest<PodNewResponse>("pod/new", {
      pod_name,
      password,
    });

    const pod = new Pod({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      name: pod_name,
    });

    return pod;
  }

  async podOpen({ pod_name, password }: PodOpen) {
    const response = await this.postRequest<PodOpenResponse>("pod/open", {
      pod_name,
      password,
    });

    const pod = new Pod({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      name: pod_name,
    });

    return pod;
  }

  podList() {
    return this.getRequest<PodListResponse>("pod/ls");
  }
}
