import { PodFS } from "./fs";
import { PodDocumentDB } from "./document-db";
import { PodKVStore } from "./kv-store";

import { PodModel, PodDelete, PodShare, applyMixins } from "../../internal";

type Config = {
  providerUrl: string;
  authCookie?: string;
  name: string;
};

type omit<T> = Omit<T, "pod_name">;

class PodClient extends PodModel {
  public readonly podName: string;

  constructor(config: Config) {
    super(config);
    this.podName = config.name;
  }

  close() {
    return super.podClose({
      pod_name: this.podName,
    });
  }

  sync() {
    return super.podSync({
      pod_name: this.podName,
    });
  }

  share({ password }: omit<PodShare>) {
    return super.podShare({
      pod_name: this.podName,
      password,
    });
  }

  delete({ password }: omit<PodDelete>) {
    return super.podDelete({
      pod_name: this.podName,
      password,
    });
  }

  stat() {
    return super.podStat({
      pod_name: this.podName,
    });
  }

  isPresent() {
    return super.podPresent({
      pod_name: this.podName,
    });
  }
}

interface PodClient extends PodFS, PodDocumentDB, PodKVStore {}

applyMixins(PodClient, [PodFS, PodDocumentDB, PodKVStore]);

export { PodClient };
