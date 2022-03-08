import { Base } from "../base";
import {
  KVNewTableParams,
  KVNewTableResponse,
  KVListTablesParams,
  KVListTablesResponse,
  KVOpenTableParams,
  KVOpenTableResponse,
  KVCountTablePairsParams,
  KVCountTablePairsResponse,
  KVDeleteTableParams,
  KVDeleteTableResponse,
  KVPutPairParams,
  KVPutPairResponse,
  KVGetValueParams,
  KVGetValueResponse,
  KVDeleteValueParams,
  KVDeleteValueResponse,
  KVSeekKeyParams,
  KVSeekKeyResponse,
  KVGetSeekNextParams,
  KVGetSeekNextResponse,
  KVLoadCSVParams,
  KVLoadCSVResponse,
  KVKeyPresentParams,
  KVKeyPresentResponse,
} from "./types";

const resourceName = "kv";

export class KeyValueStore extends Base {
  kvNewTable({ pod_name, table_name, indexType }: KVNewTableParams) {
    return this.postRequest<KVNewTableResponse>(`${resourceName}/new`, {
      pod_name,
      table_name,
      indexType,
    });
  }

  kvListTables({ pod_name }: KVListTablesParams) {
    return this.getRequest<KVListTablesResponse>(`${resourceName}/ls`, {
      params: {
        pod_name,
      },
    });
  }

  kvOpenTable({ pod_name, table_name }: KVOpenTableParams) {
    return this.postRequest<KVOpenTableResponse>(`${resourceName}/open`, {
      pod_name,
      table_name,
    });
  }

  kvCountTablePairs({ pod_name, table_name }: KVCountTablePairsParams) {
    return this.postRequest<KVCountTablePairsResponse>(
      `${resourceName}/count`,
      {
        pod_name,
        table_name,
      }
    );
  }

  kvDeleteTable({ pod_name, table_name }: KVDeleteTableParams) {
    return this.deleteRequest<KVDeleteTableResponse>(`${resourceName}/delete`, {
      data: {
        pod_name,
        table_name,
      },
    });
  }

  kvPutPair({ pod_name, table_name, key, value }: KVPutPairParams) {
    return this.postRequest<KVPutPairResponse>(`${resourceName}/entry/put`, {
      pod_name,
      table_name,
      key,
      value,
    });
  }

  //TODO: do we need both endpoints?
  kvGetValue({
    pod_name,
    table_name,
    key,
    format = "string",
  }: KVGetValueParams) {
    return this.getRequest<KVGetValueResponse>(
      `${resourceName}/entry/get-data`,
      {
        params: {
          pod_name,
          table_name,
          key,
          format,
        },
      }
    );
  }

  kvDeleteValue({ pod_name, table_name, key }: KVDeleteValueParams) {
    return this.deleteRequest<KVDeleteValueResponse>(
      `${resourceName}/entry/del`,
      {
        data: {
          pod_name,
          table_name,
          key,
        },
      }
    );
  }

  kvSeekKey({ pod_name, table_name, start, end, limit }: KVSeekKeyParams) {
    return this.postRequest<KVSeekKeyResponse>(`${resourceName}/seek`, {
      pod_name,
      table_name,
      start,
      end,
      limit,
    });
  }

  kvGetSeekNext({ pod_name, table_name }: KVGetSeekNextParams) {
    return this.getRequest<KVGetSeekNextResponse>(`${resourceName}/seek/next`, {
      params: {
        pod_name,
        table_name,
      },
    });
  }

  kvLoadCSV({ pod_name, table_name, memory }: KVLoadCSVParams) {
    return this.postRequest<KVLoadCSVResponse>(`${resourceName}/loadcsv`, {
      pod_name,
      table_name,
      memory,
    });
  }

  kvKeyPresent({ pod_name, table_name, key }: KVKeyPresentParams) {
    return this.getRequest<KVKeyPresentResponse>(`${resourceName}/present`, {
      params: {
        pod_name,
        table_name,
        key,
      },
    });
  }
}
