import {
  KVStoreModel,
  KVPutPair,
  KVGetValue,
  KVDeleteValue,
  KVSeekKey,
  KVLoadCSV,
  KVKeyPresent,
} from "../../internal";

type Config = {
  providerUrl: string;
  authCookie?: string;
  podName: string;
  tableName: string;
};

type omit<T> = Omit<T, "pod_name" | "table_name">;

export class KVTableClient extends KVStoreModel {
  public readonly podName: string;
  public readonly tableName: string;

  constructor(config: Config) {
    super(config);
    this.podName = config.podName;
    this.tableName = config.tableName;
  }

  countPairs() {
    return super.kvCountTablePairs({
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  delete() {
    return super.kvDeleteTable({
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  putPair({ key, value }: omit<KVPutPair>) {
    return super.kvPutPair({
      pod_name: this.podName,
      table_name: this.tableName,
      key,
      value,
    });
  }

  //TODO: do we need both endpoints?
  getValue({ key, format = "string" }: omit<KVGetValue>) {
    return super.kvGetValue({
      pod_name: this.podName,
      table_name: this.tableName,
      key,
      format,
    });
  }

  deleteValue({ key }: omit<KVDeleteValue>) {
    return super.kvDeleteValue({
      pod_name: this.podName,
      table_name: this.tableName,
      key,
    });
  }

  seekKey({ start, end, limit }: omit<KVSeekKey>) {
    return super.kvSeekKey({
      pod_name: this.podName,
      table_name: this.tableName,
      start,
      end,
      limit,
    });
  }

  getSeekNext() {
    return super.kvGetSeekNext({
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  loadCSV({ memory }: omit<KVLoadCSV>) {
    return super.kvLoadCSV({
      pod_name: this.podName,
      table_name: this.tableName,
      memory,
    });
  }

  isKeyPresent({ key }: omit<KVKeyPresent>) {
    return super.kvKeyPresent({
      pod_name: this.podName,
      table_name: this.tableName,
      key,
    });
  }
}
