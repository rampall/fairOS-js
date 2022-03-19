import {
  KVStoreModel,
  KVNewTable,
  KVOpenTable,
  KVCountTablePairs,
  KVDeleteTable,
  KVPutPair,
  KVGetValue,
  KVDeleteValue,
  KVSeekKey,
  KVGetSeekNext,
  KVLoadCSV,
  KVKeyPresent,
} from "../../internal";

type omit<T> = Omit<T, "pod_name">;

export class PodKVStore extends KVStoreModel {
  public readonly podName: string = "";

  /**
   * Create a new key value table
   */
  async kvNewTable({ table_name, indexType }: omit<KVNewTable>) {
    return super.kvNewTable({
      pod_name: this.podName,
      table_name,
      indexType,
    });
  }

  /**
   * List all the Key Value tables of this pod
   */
  kvListTables() {
    return super.kvListTables({ pod_name: this.podName });
  }

  /**
   * Opens a already created key value table
   */
  async kvOpenTable({ table_name }: omit<KVOpenTable>) {
    return super.kvOpenTable({
      pod_name: this.podName,
      table_name,
    });
  }

  /**
   * Count KV pairs in a table
   */
  kvCountTablePairs({ table_name }: omit<KVCountTablePairs>) {
    return super.kvCountTablePairs({
      pod_name: this.podName,
      table_name,
    });
  }

  /**
   * Delete a KV table of a pod
   */
  kvDeleteTable({ table_name }: omit<KVDeleteTable>) {
    return super.kvDeleteTable({
      pod_name: this.podName,
      table_name,
    });
  }

  /**
   * Inserts a Key Value pair in the table
   */
  kvPutPair({ table_name, key, value }: omit<KVPutPair>) {
    return super.kvPutPair({
      pod_name: this.podName,
      table_name,
      key,
      value,
    });
  }

  /**
   * Get value given a key
   */
  kvGetValue({ table_name, key, format }: omit<KVGetValue>) {
    return super.kvGetValue({
      pod_name: this.podName,
      table_name,
      key,
      format,
    });
  }

  /**
   * Delete a KV pair given a key
   */
  kvDeleteValue({ table_name, key }: omit<KVDeleteValue>) {
    return super.kvDeleteValue({
      pod_name: this.podName,
      table_name,
      key,
    });
  }

  /**
   * Seek a KV pair given a key or its prefix
   */
  kvSeekKey({ table_name, start, end, limit }: omit<KVSeekKey>) {
    return super.kvSeekKey({
      pod_name: this.podName,
      table_name,
      start,
      end,
      limit,
    });
  }

  /**
   * Get Next value after the Seek
   */
  kvGetSeekNext({ table_name }: omit<KVGetSeekNext>) {
    return super.kvGetSeekNext({
      pod_name: this.podName,
      table_name,
    });
  }

  /**
   * load a csv file in to a given KV table
   */
  kvLoadCSV({ table_name, file_buffer, file_name, memory }: omit<KVLoadCSV>) {
    return super.kvLoadCSV({
      file_buffer,
      file_name,
      pod_name: this.podName,
      table_name,
      memory,
    });
  }

  /**
   * Is Key present
   */
  kvKeyPresent({ table_name, key }: omit<KVKeyPresent>) {
    return super.kvKeyPresent({
      pod_name: this.podName,
      table_name,
      key,
    });
  }
}
