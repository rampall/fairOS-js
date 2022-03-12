import { Request } from "../../request";
import {
  KVNewTable,
  KVNewTableResponse,
  KVListTables,
  KVListTablesResponse,
  KVOpenTable,
  KVOpenTableResponse,
  KVCountTablePairs,
  KVCountTablePairsResponse,
  KVDeleteTable,
  KVDeleteTableResponse,
  KVPutPair,
  KVPutPairResponse,
  KVGetValue,
  KVGetValueResponse,
  KVDeleteValue,
  KVDeleteValueResponse,
  KVSeekKey,
  KVSeekKeyResponse,
  KVGetSeekNext,
  KVGetSeekNextResponse,
  KVLoadCSV,
  KVLoadCSVResponse,
  KVKeyPresent,
  KVKeyPresentResponse,
} from "../../types/kv-store";
import { KeyValueTable } from "../kv-store/table";

export class KeyValueStore extends Request {
  async kvNewTable({ pod_name, table_name, indexType }: KVNewTable) {
    const response = await this.postRequest<KVNewTableResponse>("kv/new", {
      pod_name,
      table_name,
      indexType,
    });

    const kvTable = new KeyValueTable({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      podName: pod_name,
      tableName: table_name,
    });

    return kvTable;
  }

  kvListTables({ pod_name }: KVListTables) {
    return this.getRequest<KVListTablesResponse>("kv/ls", {
      params: {
        pod_name,
      },
    });
  }

  kvOpenTable({ pod_name, table_name }: KVOpenTable) {
    return this.postRequest<KVOpenTableResponse>("kv/open", {
      pod_name,
      table_name,
    });
  }

  kvCountTablePairs({ pod_name, table_name }: KVCountTablePairs) {
    return this.postRequest<KVCountTablePairsResponse>("kv/count", {
      pod_name,
      table_name,
    });
  }

  kvDeleteTable({ pod_name, table_name }: KVDeleteTable) {
    return this.deleteRequest<KVDeleteTableResponse>("kv/delete", {
      data: {
        pod_name,
        table_name,
      },
    });
  }

  kvPutPair({ pod_name, table_name, key, value }: KVPutPair) {
    return this.postRequest<KVPutPairResponse>("kv/entry/put", {
      pod_name,
      table_name,
      key,
      value,
    });
  }

  //TODO: do we need both endpoints?
  kvGetValue({ pod_name, table_name, key, format = "string" }: KVGetValue) {
    return this.getRequest<KVGetValueResponse>("kv/entry/get-data", {
      params: {
        pod_name,
        table_name,
        key,
        format,
      },
    });
  }

  kvDeleteValue({ pod_name, table_name, key }: KVDeleteValue) {
    return this.deleteRequest<KVDeleteValueResponse>("kv/entry/del", {
      data: {
        pod_name,
        table_name,
        key,
      },
    });
  }

  kvSeekKey({ pod_name, table_name, start, end, limit }: KVSeekKey) {
    return this.postRequest<KVSeekKeyResponse>("kv/seek", {
      pod_name,
      table_name,
      start,
      end,
      limit,
    });
  }

  kvGetSeekNext({ pod_name, table_name }: KVGetSeekNext) {
    return this.getRequest<KVGetSeekNextResponse>("kv/seek/next", {
      params: {
        pod_name,
        table_name,
      },
    });
  }

  kvLoadCSV({ pod_name, table_name, memory }: KVLoadCSV) {
    return this.postRequest<KVLoadCSVResponse>("kv/loadcsv", {
      pod_name,
      table_name,
      memory,
    });
  }

  kvKeyPresent({ pod_name, table_name, key }: KVKeyPresent) {
    return this.getRequest<KVKeyPresentResponse>("kv/present", {
      params: {
        pod_name,
        table_name,
        key,
      },
    });
  }
}
