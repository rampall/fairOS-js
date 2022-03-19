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
  cookies?: string;
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

  /**
   * Opens the key value table
   */
  open() {
    return super.kvOpenTable({
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  /**
   * Count KV pairs in the table
   */
  countPairs() {
    return super.kvCountTablePairs({
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  /**
   * Delete the KV table of the pod
   */
  delete() {
    return super.kvDeleteTable({
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  /**
   * Inserts a Key Value pair in the table
   */
  putPair({ key, value }: omit<KVPutPair>) {
    return super.kvPutPair({
      pod_name: this.podName,
      table_name: this.tableName,
      key,
      value,
    });
  }

  /**
   * Get value given a key
   */
  getValue({ key, format }: omit<KVGetValue>) {
    return super.kvGetValue({
      pod_name: this.podName,
      table_name: this.tableName,
      key,
      format,
    });
  }

  /**
   * Delete a KV pair given a key
   */
  deleteValue({ key }: omit<KVDeleteValue>) {
    return super.kvDeleteValue({
      pod_name: this.podName,
      table_name: this.tableName,
      key,
    });
  }

  /**
   * Seek a KV pair given a key or its prefix
   */
  seekKey({ start, end, limit }: omit<KVSeekKey>) {
    return super.kvSeekKey({
      pod_name: this.podName,
      table_name: this.tableName,
      start,
      end,
      limit,
    });
  }

  /**
   * Get Next value after the Seek
   */
  getSeekNext() {
    return super.kvGetSeekNext({
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  /**
   * load a csv file in to the KV table
   */
  loadCSV({ file_buffer, file_name, memory }: omit<KVLoadCSV>) {
    return super.kvLoadCSV({
      pod_name: this.podName,
      table_name: this.tableName,
      file_buffer,
      file_name,
      memory,
    });
  }

  /**
   * Is Key present
   */
  isKeyPresent({ key }: omit<KVKeyPresent>) {
    return super.kvKeyPresent({
      pod_name: this.podName,
      table_name: this.tableName,
      key,
    });
  }
}
