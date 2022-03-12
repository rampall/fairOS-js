import { Request } from "../../request";

import {
  KVCountTablePairsResponse,
  KVDeleteTableResponse,
  KVPutPair,
  KVPutPairResponse,
  KVGetValue,
  KVGetValueResponse,
  KVDeleteValue,
  KVDeleteValueResponse,
  KVSeekKey,
  KVSeekKeyResponse,
  KVGetSeekNextResponse,
  KVLoadCSV,
  KVLoadCSVResponse,
  KVKeyPresent,
  KVKeyPresentResponse,
} from "../../types/kv-store";

type Config = {
  providerUrl: string;
  authCookie?: string;
  podName: string;
  tableName: string;
};

type omit<T> = Omit<T, "pod_name" | "table_name">;

export class KeyValueTable extends Request {
  public readonly podName: string;
  public readonly tableName: string;

  constructor(config: Config) {
    super(config);
    this.podName = config.podName;
    this.tableName = config.tableName;
  }

  countPairs() {
    return this.postRequest<KVCountTablePairsResponse>("kv/count", {
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  delete() {
    return this.deleteRequest<KVDeleteTableResponse>("kv/delete", {
      data: {
        pod_name: this.podName,
        table_name: this.tableName,
      },
    });
  }

  putPair({ key, value }: omit<KVPutPair>) {
    return this.postRequest<KVPutPairResponse>("kv/entry/put", {
      pod_name: this.podName,
      table_name: this.tableName,
      key,
      value,
    });
  }

  //TODO: do we need both endpoints?
  getValue({ key, format = "string" }: omit<KVGetValue>) {
    return this.getRequest<KVGetValueResponse>("kv/entry/get-data", {
      params: {
        pod_name: this.podName,
        table_name: this.tableName,
        key,
        format,
      },
    });
  }

  deleteValue({ key }: omit<KVDeleteValue>) {
    return this.deleteRequest<KVDeleteValueResponse>("kv/entry/del", {
      data: {
        pod_name: this.podName,
        table_name: this.tableName,
        key,
      },
    });
  }

  seekKey({ start, end, limit }: omit<KVSeekKey>) {
    return this.postRequest<KVSeekKeyResponse>("kv/seek", {
      pod_name: this.podName,
      table_name: this.tableName,
      start,
      end,
      limit,
    });
  }

  getSeekNext() {
    return this.getRequest<KVGetSeekNextResponse>("kv/seek/next", {
      params: {
        pod_name: this.podName,
        table_name: this.tableName,
      },
    });
  }

  loadCSV({ memory }: omit<KVLoadCSV>) {
    return this.postRequest<KVLoadCSVResponse>("kv/loadcsv", {
      pod_name: this.podName,
      table_name: this.tableName,
      memory,
    });
  }

  isKeyPresent({ key }: omit<KVKeyPresent>) {
    return this.getRequest<KVKeyPresentResponse>("kv/present", {
      params: {
        pod_name: this.podName,
        table_name: this.tableName,
        key,
      },
    });
  }
}
