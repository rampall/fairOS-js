import { PodFS } from "./fs";
import { PodDocumentDB } from "./document-db";
import { PodKVStore } from "./kv-store";

import { PodModel, PodDelete, PodShare, applyMixins } from "../../internal";

type Config = {
  providerUrl: string;
  cookies?: string;
  name: string;
};

type omit<T> = Omit<T, "pod_name">;

class PodClient extends PodModel {
  public readonly podName: string;

  constructor(config: Config) {
    super(config);
    this.podName = config.name;
  }

  /**
   * Closes the pod
   */
  close() {
    return super.podClose({
      pod_name: this.podName,
    });
  }

  /**
   * Syncs the latest contents of the pod from Swarm
   */
  sync() {
    return super.podSync({
      pod_name: this.podName,
    });
  }

  /**
   * Shared the pod
   */
  share({ password }: omit<PodShare>) {
    return super.podShare({
      pod_name: this.podName,
      password,
    });
  }

  /**
   * Deletes the pod
   */
  delete({ password }: omit<PodDelete>) {
    return super.podDelete({
      pod_name: this.podName,
      password,
    });
  }

  /**
   * Show all the information about the pod
   */
  stat() {
    return super.podStat({
      pod_name: this.podName,
    });
  }

  /**
   * Is the Pod present
   */
  isPresent() {
    return super.podPresent({
      pod_name: this.podName,
    });
  }
}

interface PodClient extends PodFS, PodDocumentDB, PodKVStore {}

applyMixins(PodClient, [PodFS, PodDocumentDB, PodKVStore]);

export { PodClient };
