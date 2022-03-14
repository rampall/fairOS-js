import { Request } from "../../request";

import { FileSystem } from "./fs";
import { DocumentDB } from "./document-db";
import { KeyValueStore } from "./kv-store";

import {
  PodCloseResponse,
  PodDelete,
  PodDeleteResponse,
  PodPresentResponse,
  PodShare,
  PodShareResponse,
  PodStatResponse,
  PodSyncResponse,
} from "../../types/pod";
import { applyMixins } from "../../utils";

type Config = {
  providerUrl: string;
  authCookie?: string;
  name: string;
};

type omit<T> = Omit<T, "pod_name">;

class Pod extends Request {
  public readonly podName: string;

  constructor(config: Config) {
    super(config);
    this.podName = config.name;
  }

  close() {
    return this.postRequest<PodCloseResponse>("pod/close", {
      pod_name: this.podName,
    });
  }

  sync() {
    return this.postRequest<PodSyncResponse>("pod/sync", {
      pod_name: this.podName,
    });
  }

  share({ password }: omit<PodShare>) {
    return this.postRequest<PodShareResponse>("pod/share", {
      pod_name: this.podName,
      password,
    });
  }

  delete({ password }: omit<PodDelete>) {
    return this.postRequest<PodDeleteResponse>("pod/delete", {
      pod_name: this.podName,
      password,
    });
  }

  stat() {
    return this.getRequest<PodStatResponse>("pod/stat", {
      data: {
        pod_name: this.podName,
      },
    });
  }

  isPresent() {
    return this.getRequest<PodPresentResponse>("pod/present", {
      data: {
        pod_name: this.podName,
      },
    });
  }
}

interface Pod extends FileSystem, DocumentDB, KeyValueStore {}

applyMixins(Pod, [FileSystem, DocumentDB, KeyValueStore]);

export { Pod };
