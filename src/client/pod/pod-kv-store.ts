import { KVStore } from "../../models/kv-store";

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
} from "../../types/kv-store";

type omit<T> = Omit<T, "pod_name">;

export class PodKVStore extends KVStore {
  public readonly podName: string = "";

  async kvNewTable({ table_name, indexType }: omit<KVNewTable>) {
    return super.kvNewTable({
      pod_name: this.podName,
      table_name,
      indexType,
    });
  }

  kvListTables() {
    return super.kvListTables({ pod_name: this.podName });
  }

  async kvOpenTable({ table_name }: omit<KVOpenTable>) {
    return super.kvOpenTable({
      pod_name: this.podName,
      table_name,
    });
  }

  kvCountTablePairs({ table_name }: omit<KVCountTablePairs>) {
    return super.kvCountTablePairs({
      pod_name: this.podName,
      table_name,
    });
  }

  kvDeleteTable({ table_name }: omit<KVDeleteTable>) {
    return super.kvDeleteTable({
      pod_name: this.podName,
      table_name,
    });
  }

  kvPutPair({ table_name, key, value }: omit<KVPutPair>) {
    return super.kvPutPair({
      pod_name: this.podName,
      table_name,
      key,
      value,
    });
  }

  //TODO: do we need both endpoints?
  kvGetValue({ table_name, key, format = "string" }: omit<KVGetValue>) {
    return super.kvGetValue({
      pod_name: this.podName,
      table_name,
      key,
      format,
    });
  }

  kvDeleteValue({ table_name, key }: omit<KVDeleteValue>) {
    return super.kvDeleteValue({
      pod_name: this.podName,
      table_name,
      key,
    });
  }

  kvSeekKey({ table_name, start, end, limit }: omit<KVSeekKey>) {
    return super.kvSeekKey({
      pod_name: this.podName,
      table_name,
      start,
      end,
      limit,
    });
  }

  kvGetSeekNext({ table_name }: omit<KVGetSeekNext>) {
    return super.kvGetSeekNext({
      pod_name: this.podName,
      table_name,
    });
  }

  kvLoadCSV({ table_name, memory }: omit<KVLoadCSV>) {
    return super.kvLoadCSV({
      pod_name: this.podName,
      table_name,
      memory,
    });
  }

  kvKeyPresent({ table_name, key }: omit<KVKeyPresent>) {
    return super.kvKeyPresent({
      pod_name: this.podName,
      table_name,
      key,
    });
  }
}
