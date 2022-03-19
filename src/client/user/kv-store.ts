import {
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
  KVListTables,
  KVStoreModel,
} from "../../internal";

export class UserKVStore extends KVStoreModel {
  /**
   * Create a new key value table
   */
  async kvNewTable({ pod_name, table_name, indexType }: KVNewTable) {
    return super.kvNewTable({
      pod_name,
      table_name,
      indexType,
    });
  }

  /**
   * List all the Key Value tables of this pod
   */
  kvListTables({ pod_name }: KVListTables) {
    return super.kvListTables({ pod_name });
  }

  /**
   * Opens a already created key value table
   */
  async kvOpenTable({ pod_name, table_name }: KVOpenTable) {
    return super.kvOpenTable({
      pod_name,
      table_name,
    });
  }

  /**
   * Count KV pairs in a table
   */
  kvCountTablePairs({ pod_name, table_name }: KVCountTablePairs) {
    return super.kvCountTablePairs({
      pod_name,
      table_name,
    });
  }

  /**
   * Delete a KV table of a pod
   */
  kvDeleteTable({ pod_name, table_name }: KVDeleteTable) {
    return super.kvDeleteTable({
      pod_name,
      table_name,
    });
  }

  /**
   * Inserts a Key Value pair in the table
   */
  kvPutPair({ pod_name, table_name, key, value }: KVPutPair) {
    return super.kvPutPair({
      pod_name,
      table_name,
      key,
      value,
    });
  }

  /**
   * Get value given a key
   */
  kvGetValue({ pod_name, table_name, key, format }: KVGetValue) {
    return super.kvGetValue({
      pod_name,
      table_name,
      key,
      format,
    });
  }

  /**
   * Delete a KV pair given a key
   */
  kvDeleteValue({ pod_name, table_name, key }: KVDeleteValue) {
    return super.kvDeleteValue({
      pod_name,
      table_name,
      key,
    });
  }

  /**
   * Seek a KV pair given a key or its prefix
   */
  kvSeekKey({ pod_name, table_name, start, end, limit }: KVSeekKey) {
    return super.kvSeekKey({
      pod_name,
      table_name,
      start,
      end,
      limit,
    });
  }

  /**
   * Get Next value after the Seek
   */
  kvGetSeekNext({ pod_name, table_name }: KVGetSeekNext) {
    return super.kvGetSeekNext({
      pod_name,
      table_name,
    });
  }

  /**
   * load a csv file in to a given KV table
   */
  kvLoadCSV({
    pod_name,
    table_name,
    file_buffer,
    file_name,
    memory,
  }: KVLoadCSV) {
    return super.kvLoadCSV({
      pod_name,
      table_name,
      file_buffer,
      file_name,
      memory,
    });
  }

  /**
   * Is Key present
   */
  kvKeyPresent({ pod_name, table_name, key }: KVKeyPresent) {
    return super.kvKeyPresent({
      pod_name,
      table_name,
      key,
    });
  }
}
