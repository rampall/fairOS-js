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
  async kvNewTable({ pod_name, table_name, indexType }: KVNewTable) {
    return super.kvNewTable({
      pod_name,
      table_name,
      indexType,
    });
  }

  kvListTables({ pod_name }: KVListTables) {
    return super.kvListTables({ pod_name });
  }

  async kvOpenTable({ pod_name, table_name }: KVOpenTable) {
    return super.kvOpenTable({
      pod_name,
      table_name,
    });
  }

  kvCountTablePairs({ pod_name, table_name }: KVCountTablePairs) {
    return super.kvCountTablePairs({
      pod_name,
      table_name,
    });
  }

  kvDeleteTable({ pod_name, table_name }: KVDeleteTable) {
    return super.kvDeleteTable({
      pod_name,
      table_name,
    });
  }

  kvPutPair({ pod_name, table_name, key, value }: KVPutPair) {
    return super.kvPutPair({
      pod_name,
      table_name,
      key,
      value,
    });
  }

  kvGetValue({ pod_name, table_name, key, format }: KVGetValue) {
    return super.kvGetValue({
      pod_name,
      table_name,
      key,
      format,
    });
  }

  kvDeleteValue({ pod_name, table_name, key }: KVDeleteValue) {
    return super.kvDeleteValue({
      pod_name,
      table_name,
      key,
    });
  }

  kvSeekKey({ pod_name, table_name, start, end, limit }: KVSeekKey) {
    return super.kvSeekKey({
      pod_name,
      table_name,
      start,
      end,
      limit,
    });
  }

  kvGetSeekNext({ pod_name, table_name }: KVGetSeekNext) {
    return super.kvGetSeekNext({
      pod_name,
      table_name,
    });
  }

  kvLoadCSV({ pod_name, table_name, memory }: KVLoadCSV) {
    return super.kvLoadCSV({
      pod_name,
      table_name,
      memory,
    });
  }

  kvKeyPresent({ pod_name, table_name, key }: KVKeyPresent) {
    return super.kvKeyPresent({
      pod_name,
      table_name,
      key,
    });
  }
}
