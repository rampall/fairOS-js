import {
  Request,
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
  KVTableClient,
} from "../internal";

import FormData from "form-data";

const resourceName = "kv";

type Config = {
  providerUrl: string;
  cookies?: string;
};

export class KVStoreModel extends Request {
  constructor(config: Config) {
    super(config);
  }

  protected async kvNewTable({ pod_name, table_name, indexType }: KVNewTable) {
    const response = await this.postRequest<KVNewTableResponse>(
      `${resourceName}/new`,
      {
        pod_name,
        table_name,
        indexType,
      }
    );

    const cookies = this.axiosInstance.defaults.headers.common[
      "Cookie"
    ] as string;

    const kvTable = new KVTableClient({
      providerUrl: this.providerUrl,
      cookies,
      podName: pod_name,
      tableName: table_name,
    });

    return kvTable;
  }

  protected kvListTables({ pod_name }: KVListTables) {
    return this.getRequest<KVListTablesResponse>(`${resourceName}/ls`, {
      params: {
        pod_name,
      },
    });
  }

  protected async kvOpenTable({ pod_name, table_name }: KVOpenTable) {
    const response = await this.postRequest<KVOpenTableResponse>(
      `${resourceName}/open`,
      {
        pod_name,
        table_name,
      }
    );

    const cookies = this.axiosInstance.defaults.headers.common[
      "Cookie"
    ] as string;

    const kvTable = new KVTableClient({
      providerUrl: this.providerUrl,
      cookies,
      podName: pod_name,
      tableName: table_name,
    });

    return kvTable;
  }

  protected kvCountTablePairs({ pod_name, table_name }: KVCountTablePairs) {
    return this.postRequest<KVCountTablePairsResponse>(
      `${resourceName}/count`,
      {
        pod_name,
        table_name,
      }
    );
  }

  protected kvDeleteTable({ pod_name, table_name }: KVDeleteTable) {
    return this.deleteRequest<KVDeleteTableResponse>(`${resourceName}/delete`, {
      data: {
        pod_name,
        table_name,
      },
    });
  }

  protected kvPutPair({ pod_name, table_name, key, value }: KVPutPair) {
    return this.postRequest<KVPutPairResponse>(`${resourceName}/entry/put`, {
      pod_name,
      table_name,
      key,
      value,
    });
  }

  protected kvGetValue({ pod_name, table_name, key, format }: KVGetValue) {
    const resourcePath = format ? "get-data" : "get";

    return this.getRequest<KVGetValueResponse>(
      `${resourceName}/entry/${resourcePath}`,
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

  protected kvDeleteValue({ pod_name, table_name, key }: KVDeleteValue) {
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

  protected kvSeekKey({ pod_name, table_name, start, end, limit }: KVSeekKey) {
    return this.postRequest<KVSeekKeyResponse>(`${resourceName}/seek`, {
      pod_name,
      table_name,
      start,
      end,
      limit,
    });
  }

  protected kvGetSeekNext({ pod_name, table_name }: KVGetSeekNext) {
    return this.getRequest<KVGetSeekNextResponse>(`${resourceName}/seek/next`, {
      params: {
        pod_name,
        table_name,
      },
    });
  }

  protected kvLoadCSV({
    pod_name,
    table_name,
    file_buffer,
    file_name,
    memory,
  }: KVLoadCSV) {
    const form = new FormData();
    form.append("pod_name", pod_name);
    form.append("table_name", table_name);
    form.append("csv", file_buffer, file_name);
    form.append("memory", memory);

    return this.postRequest<KVLoadCSVResponse>(
      `${resourceName}/loadcsv`,
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );
  }

  protected kvKeyPresent({ pod_name, table_name, key }: KVKeyPresent) {
    return this.getRequest<KVKeyPresentResponse>(`${resourceName}/present`, {
      params: {
        pod_name,
        table_name,
        key,
      },
    });
  }
}
