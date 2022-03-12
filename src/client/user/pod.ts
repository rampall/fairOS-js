import { Request } from "../../request";
import { Pod as PodBase } from "../pod";

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
} from "../../types/pod";

export class Pod extends Request {
  podReceiveInfo({ reference }: PodReceiveInfo) {
    return this.getRequest<PodReceiveInfoResponse>("pod/receiveinfo", {
      params: {
        reference,
      },
    });
  }

  podReceive({ reference }: PodReceive) {
    return this.getRequest<PodReceiveResponse>("pod/receive", {
      params: {
        reference,
      },
    });
  }

  async podNew({ pod_name, password }: PodNew) {
    const response = await this.postRequest<PodNewResponse>("pod/new", {
      pod_name,
      password,
    });

    const pod = new PodBase({
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

    const pod = new PodBase({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      name: pod_name,
    });

    return pod;
  }

  podClose({ pod_name }: PodClose) {
    return this.postRequest<PodCloseResponse>("user/close", {
      pod_name,
    });
  }

  podSync({ pod_name }: PodSync) {
    return this.postRequest<PodSyncResponse>("user/sync", {
      pod_name,
    });
  }

  podShare({ pod_name, password }: PodShare) {
    return this.postRequest<PodShareResponse>("user/share", {
      pod_name,
      password,
    });
  }

  podDelete({ pod_name, password }: PodDelete) {
    return this.postRequest<PodDeleteResponse>("user/delete", {
      pod_name,
      password,
    });
  }

  podList() {
    return this.getRequest<PodListResponse>("pod/ls");
  }

  podStat({ pod_name }: PodStat) {
    return this.getRequest<PodStatResponse>("user/stat", {
      data: {
        pod_name,
      },
    });
  }

  podPresent({ pod_name }: PodPresent) {
    return this.getRequest<PodPresentResponse>("user/present", {
      data: {
        pod_name,
      },
    });
  }
}
