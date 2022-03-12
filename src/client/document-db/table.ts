import { Request } from "../../request";

import {
  DocCount,
  DocCountResponse,
  DocDeleteDB,
  DocDeleteDBResponse,
  DocDelete,
  DocDeleteResponse,
  DocFind,
  DocFindResponse,
  DocGet,
  DocGetResponse,
  DocIndexJson,
  DocIndexJsonResponse,
  DocLoadJson,
  DocLoadJsonResponse,
  DocPut,
  DocPutResponse,
} from "../../types/document-db";

type Config = {
  providerUrl: string;
  authCookie?: string;
  podName: string;
  tableName: string;
};

type omit<T> = Omit<T, "pod_name" | "table_name">;

export class DocumentTable extends Request {
  public readonly podName: string;
  public readonly tableName: string;

  constructor(config: Config) {
    super(config);
    this.podName = config.podName;
    this.tableName = config.tableName;
  }

  countDoc({ expr }: omit<DocCount>) {
    return this.postRequest<DocCountResponse>("doc/count", {
      pod_name: this.podName,
      table_name: this.tableName,
      expr,
    });
  }

  delete() {
    return this.deleteRequest<DocDeleteDBResponse>("doc/delete", {
      data: {
        pod_name: this.podName,
        table_name: this.tableName,
      },
    });
  }

  findDoc({ expr, limit }: omit<DocFind>) {
    return this.deleteRequest<DocFindResponse>("doc/find", {
      data: {
        pod_name: this.podName,
        table_name: this.tableName,
        expr,
        limit,
      },
    });
  }

  loadJson() {
    return this.postRequest<DocLoadJsonResponse>("doc/loadjson", {
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  indexJson({ file }: omit<DocIndexJson>) {
    return this.postRequest<DocIndexJsonResponse>("doc/indexjson", {
      pod_name: this.podName,
      table_name: this.tableName,
      file,
    });
  }

  putDoc({ doc }: omit<DocPut>) {
    return this.postRequest<DocPutResponse>("doc/entry/put", {
      pod_name: this.podName,
      table_name: this.tableName,
      doc,
    });
  }

  getDoc({ id }: omit<DocGet>) {
    return this.getRequest<DocGetResponse>("doc/entry/get", {
      params: {
        pod_name: this.podName,
        table_name: this.tableName,
        id,
      },
    });
  }

  deleteDoc({ id }: omit<DocDelete>) {
    return this.deleteRequest<DocDeleteResponse>("doc/entry/del", {
      data: {
        pod_name: this.podName,
        table_name: this.tableName,
        id,
      },
    });
  }
}
