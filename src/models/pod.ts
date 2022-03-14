import { Request } from "../request";
import { PodClient } from "../client/pod";

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
} from "../types/pod";

const resourceName = "pod";

export class PodModel extends Request {
  protected podReceiveInfo({ reference }: PodReceiveInfo) {
    return this.getRequest<PodReceiveInfoResponse>(
      `${resourceName}/receiveinfo`,
      {
        params: {
          reference,
        },
      }
    );
  }

  protected podReceive({ reference }: PodReceive) {
    return this.getRequest<PodReceiveResponse>(`${resourceName}/receive`, {
      params: {
        reference,
      },
    });
  }

  protected async podNew({ pod_name, password }: PodNew) {
    const response = await this.postRequest<PodNewResponse>(
      `${resourceName}/new`,
      {
        pod_name,
        password,
      }
    );

    const pod = new PodClient({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      name: pod_name,
    });

    return pod;
  }

  protected async podOpen({ pod_name, password }: PodOpen) {
    const response = await this.postRequest<PodOpenResponse>(
      `${resourceName}/open`,
      {
        pod_name,
        password,
      }
    );

    const pod = new PodClient({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      name: pod_name,
    });

    return pod;
  }

  protected podClose({ pod_name }: PodClose) {
    return this.postRequest<PodCloseResponse>(`${resourceName}/close`, {
      pod_name,
    });
  }

  protected podSync({ pod_name }: PodSync) {
    return this.postRequest<PodSyncResponse>(`${resourceName}/sync`, {
      pod_name,
    });
  }

  protected podShare({ pod_name, password }: PodShare) {
    return this.postRequest<PodShareResponse>(`${resourceName}/share`, {
      pod_name,
      password,
    });
  }

  protected podDelete({ pod_name, password }: PodDelete) {
    return this.postRequest<PodDeleteResponse>(`${resourceName}/delete`, {
      pod_name,
      password,
    });
  }

  protected podList() {
    return this.getRequest<PodListResponse>(`${resourceName}/ls`);
  }

  protected podStat({ pod_name }: PodStat) {
    return this.getRequest<PodStatResponse>(`${resourceName}/stat`, {
      data: {
        pod_name,
      },
    });
  }

  protected podPresent({ pod_name }: PodPresent) {
    return this.getRequest<PodPresentResponse>(`${resourceName}/present`, {
      data: {
        pod_name,
      },
    });
  }
}
