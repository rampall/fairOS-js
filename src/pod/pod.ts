import { Request } from "../request";

import {
  PodClose,
  PodCloseResponse,
  PodDelete,
  PodDeleteResponse,
  PodListResponse,
  PodNew,
  PodNewResponse,
  PodOpen,
  PodOpenResponse,
  PodPresent,
  PodPresentResponse,
  PodReceiveInfo,
  PodReceiveInfoResponse,
  PodReceive,
  PodReceiveResponse,
  PodShare,
  PodShareResponse,
  PodStat,
  PodStatResponse,
  PodSync,
  PodSyncResponse,
} from "../pod/types";

type Config = {
  providerUrl: string;
  authCookie?: string;
  name: string;
};

export class Pod extends Request {
  public name: string;

  constructor(config: Config) {
    super(config);
    this.name = config.name;
  }

  close() {
    return this.postRequest<PodCloseResponse>("pod/close", {
      pod_name: this.name,
    });
  }

  sync() {
    return this.postRequest<PodSyncResponse>("pod/sync", {
      pod_name: this.name,
    });
  }

  share({ password }: { password: string }) {
    return this.postRequest<PodShareResponse>("pod/share", {
      pod_name: this.name,
      password,
    });
  }

  delete({ password }: { password: string }) {
    return this.postRequest<PodDeleteResponse>("pod/delete", {
      pod_name: this.name,
      password,
    });
  }

  stat() {
    return this.getRequest<PodStatResponse>("pod/stat", {
      data: {
        pod_name: this.name,
      },
    });
  }

  isPresent() {
    return this.getRequest<PodPresentResponse>("pod/present", {
      data: {
        pod_name: this.name,
      },
    });
  }
}
