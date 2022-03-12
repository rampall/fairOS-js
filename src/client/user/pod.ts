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

const resourceName = "pod";

export class Pod extends Request {
  podReceiveInfo({ reference }: PodReceiveInfo) {
    return this.getRequest<PodReceiveInfoResponse>(
      `${resourceName}/receiveinfo`,
      {
        params: {
          reference,
        },
      }
    );
  }

  podReceive({ reference }: PodReceive) {
    return this.getRequest<PodReceiveResponse>(`${resourceName}/receive`, {
      params: {
        reference,
      },
    });
  }

  async podNew({ pod_name, password }: PodNew) {
    const response = await this.postRequest<PodNewResponse>(
      `${resourceName}/new`,
      {
        pod_name,
        password,
      }
    );

    const pod = new PodBase({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      name: pod_name,
    });

    return pod;
  }

  async podOpen({ pod_name, password }: PodOpen) {
    const response = await this.postRequest<PodOpenResponse>(
      `${resourceName}/open`,
      {
        pod_name,
        password,
      }
    );

    const pod = new PodBase({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      name: pod_name,
    });

    return pod;
  }

  podClose({ pod_name }: PodClose) {
    return this.postRequest<PodCloseResponse>(`${resourceName}/close`, {
      pod_name,
    });
  }

  podSync({ pod_name }: PodSync) {
    return this.postRequest<PodSyncResponse>(`${resourceName}/sync`, {
      pod_name,
    });
  }

  podShare({ pod_name, password }: PodShare) {
    return this.postRequest<PodShareResponse>(`${resourceName}/share`, {
      pod_name,
      password,
    });
  }

  podDelete({ pod_name, password }: PodDelete) {
    return this.postRequest<PodDeleteResponse>(`${resourceName}/delete`, {
      pod_name,
      password,
    });
  }

  podList() {
    return this.getRequest<PodListResponse>(`${resourceName}/ls`);
  }

  podStat({ pod_name }: PodStat) {
    return this.getRequest<PodStatResponse>(`${resourceName}/stat`, {
      data: {
        pod_name,
      },
    });
  }

  podPresent({ pod_name }: PodPresent) {
    return this.getRequest<PodPresentResponse>(`${resourceName}/present`, {
      data: {
        pod_name,
      },
    });
  }
}
