import { Request } from "../../request";
import {
  KVNewTable,
  KVNewTableResponse,
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

const resourceName = "kv";

type omit<T> = Omit<T, "pod_name">;

export class KeyValueStore extends Request {
  public readonly podName: string = "";

  async kvNewTable({ table_name, indexType }: omit<KVNewTable>) {
    const response = await this.postRequest<KVNewTableResponse>(
      `${resourceName}/new`,
      {
        pod_name: this.podName,
        table_name,
        indexType,
      }
    );

    const kvTable = new KeyValueTable({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      podName: this.podName,
      tableName: table_name,
    });

    return kvTable;
  }

  kvListTables() {
    return this.getRequest<KVListTablesResponse>(`${resourceName}/ls`, {
      params: {
        pod_name: this.podName,
      },
    });
  }

  async kvOpenTable({ table_name }: omit<KVOpenTable>) {
    const response = await this.postRequest<KVOpenTableResponse>(
      `${resourceName}/open`,
      {
        pod_name: this.podName,
        table_name,
      }
    );

    const kvTable = new KeyValueTable({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      podName: this.podName,
      tableName: table_name,
    });

    return kvTable;
  }

  kvCountTablePairs({ table_name }: omit<KVCountTablePairs>) {
    return this.postRequest<KVCountTablePairsResponse>(
      `${resourceName}/count`,
      {
        pod_name: this.podName,
        table_name,
      }
    );
  }

  kvDeleteTable({ table_name }: omit<KVDeleteTable>) {
    return this.deleteRequest<KVDeleteTableResponse>(`${resourceName}/delete`, {
      data: {
        pod_name: this.podName,
        table_name,
      },
    });
  }

  kvPutPair({ table_name, key, value }: omit<KVPutPair>) {
    return this.postRequest<KVPutPairResponse>(`${resourceName}/entry/put`, {
      pod_name: this.podName,
      table_name,
      key,
      value,
    });
  }

  //TODO: do we need both endpoints?
  kvGetValue({ table_name, key, format = "string" }: omit<KVGetValue>) {
    return this.getRequest<KVGetValueResponse>(
      `${resourceName}/entry/get-data`,
      {
        params: {
          pod_name: this.podName,
          table_name,
          key,
          format,
        },
      }
    );
  }

  kvDeleteValue({ table_name, key }: omit<KVDeleteValue>) {
    return this.deleteRequest<KVDeleteValueResponse>(
      `${resourceName}/entry/del`,
      {
        data: {
          pod_name: this.podName,
          table_name,
          key,
        },
      }
    );
  }

  kvSeekKey({ table_name, start, end, limit }: omit<KVSeekKey>) {
    return this.postRequest<KVSeekKeyResponse>(`${resourceName}/seek`, {
      pod_name: this.podName,
      table_name,
      start,
      end,
      limit,
    });
  }

  kvGetSeekNext({ table_name }: omit<KVGetSeekNext>) {
    return this.getRequest<KVGetSeekNextResponse>(`${resourceName}/seek/next`, {
      params: {
        pod_name: this.podName,
        table_name,
      },
    });
  }

  kvLoadCSV({ table_name, memory }: omit<KVLoadCSV>) {
    return this.postRequest<KVLoadCSVResponse>(`${resourceName}/loadcsv`, {
      pod_name: this.podName,
      table_name,
      memory,
    });
  }

  kvKeyPresent({ table_name, key }: omit<KVKeyPresent>) {
    return this.getRequest<KVKeyPresentResponse>(`${resourceName}/present`, {
      params: {
        pod_name: this.podName,
        table_name,
        key,
      },
    });
  }
}
