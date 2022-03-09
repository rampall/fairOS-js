import { Base } from "../base";
import {
  PodCloseParams,
  PodCloseResponse,
  PodDeleteParams,
  PodDeleteResponse,
  PodListResponse,
  PodNewParams,
  PodNewResponse,
  PodOpenParams,
  PodOpenResponse,
  PodPresentParams,
  PodPresentResponse,
  PodReceiveInfoParams,
  PodReceiveInfoResponse,
  PodReceiveParams,
  PodReceiveResponse,
  PodShareParams,
  PodShareResponse,
  PodStatParams,
  PodStatResponse,
  PodSyncParams,
  PodSyncResponse,
} from "./types";

const resourceName = "pod";

export class Pod extends Base {
  podReceiveInfo({ reference }: PodReceiveInfoParams) {
    return this.getRequest<PodReceiveInfoResponse>(
      `${resourceName}/receiveinfo`,
      {
        params: {
          reference,
        },
      }
    );
  }

  podReceive({ reference }: PodReceiveParams) {
    return this.getRequest<PodReceiveResponse>(`${resourceName}/receive`, {
      params: {
        reference,
      },
    });
  }

  podNew({ pod_name, password }: PodNewParams) {
    return this.postRequest<PodNewResponse>(`${resourceName}/new`, {
      pod_name,
      password,
    });
  }

  podOpen({ pod_name, password }: PodOpenParams) {
    return this.postRequest<PodOpenResponse>(`${resourceName}/open`, {
      pod_name,
      password,
    });
  }

  podClose({ pod_name }: PodCloseParams) {
    return this.postRequest<PodCloseResponse>(`${resourceName}/close`, {
      pod_name,
    });
  }

  podSync({ pod_name }: PodSyncParams) {
    return this.postRequest<PodSyncResponse>(`${resourceName}/sync`, {
      pod_name,
    });
  }

  podShare({ pod_name, password }: PodShareParams) {
    return this.postRequest<PodShareResponse>(`${resourceName}/share`, {
      pod_name,
      password,
    });
  }

  podDelete({ pod_name, password }: PodDeleteParams) {
    return this.postRequest<PodDeleteResponse>(`${resourceName}/delete`, {
      pod_name,
      password,
    });
  }

  podList() {
    return this.getRequest<PodListResponse>(`${resourceName}/ls`);
  }

  podStat({ pod_name }: PodStatParams) {
    return this.getRequest<PodStatResponse>(`${resourceName}/stat`, {
      data: {
        pod_name,
      },
    });
  }

  podPresent({ pod_name }: PodPresentParams) {
    return this.getRequest<PodPresentResponse>(`${resourceName}/present`, {
      data: {
        pod_name,
      },
    });
  }
}
