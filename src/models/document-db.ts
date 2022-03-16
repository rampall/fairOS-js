import {
  Request,
  DocCount,
  DocCountResponse,
  DocCreateDB,
  DocCreateDBResponse,
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
  DocListDBs,
  DocListDBsResponse,
  DocLoadJson,
  DocLoadJsonResponse,
  DocOpenDB,
  DocOpenDBResponse,
  DocPut,
  DocPutResponse,
  DocumentTableClient,
} from "../internal";

const resourceName = "doc";

type Config = {
  providerUrl: string;
  authCookie?: string;
};

export class DocumentDBModel extends Request {
  constructor(config: Config) {
    super(config);
  }

  protected async docCreateDB({
    pod_name,
    table_name,
    si,
    mutable,
  }: DocCreateDB) {
    const response = await this.postRequest<DocCreateDBResponse>(
      `${resourceName}/new`,
      {
        pod_name,
        table_name,
        si,
        mutable,
      }
    );

    const authCookie = this.axiosInstance.defaults.headers.common[
      "Cookie"
    ] as string;

    const docTable = new DocumentTableClient({
      providerUrl: this.providerUrl,
      authCookie,
      podName: pod_name,
      tableName: table_name,
    });

    return docTable;
  }

  protected docListDBs({ pod_name }: DocListDBs) {
    return this.getRequest<DocListDBsResponse>(`${resourceName}/ls`, {
      params: {
        pod_name,
      },
    });
  }

  protected async docOpenDB({ pod_name, table_name }: DocOpenDB) {
    const response = await this.postRequest<DocOpenDBResponse>(
      `${resourceName}/open`,
      {
        pod_name,
        table_name,
      }
    );

    const authCookie = this.axiosInstance.defaults.headers.common[
      "Cookie"
    ] as string;

    const docTable = new DocumentTableClient({
      providerUrl: this.providerUrl,
      authCookie,
      podName: pod_name,
      tableName: table_name,
    });

    return docTable;
  }

  protected docCount({ pod_name, table_name, expr }: DocCount) {
    return this.postRequest<DocCountResponse>(`${resourceName}/count`, {
      pod_name,
      table_name,
      expr,
    });
  }

  protected docDeleteDB({ pod_name, table_name }: DocDeleteDB) {
    return this.deleteRequest<DocDeleteDBResponse>(`${resourceName}/delete`, {
      data: {
        pod_name,
        table_name,
      },
    });
  }

  protected docFind({ pod_name, table_name, expr, limit }: DocFind) {
    return this.deleteRequest<DocFindResponse>(`${resourceName}/find`, {
      data: {
        pod_name,
        table_name,
        expr,
        limit,
      },
    });
  }

  protected docLoadJson({ pod_name, table_name }: DocLoadJson) {
    return this.postRequest<DocLoadJsonResponse>(`${resourceName}/loadjson`, {
      pod_name,
      table_name,
    });
  }

  protected docIndexJson({ pod_name, table_name, file }: DocIndexJson) {
    return this.postRequest<DocIndexJsonResponse>(`${resourceName}/indexjson`, {
      pod_name,
      table_name,
      file,
    });
  }

  protected docPut({ pod_name, table_name, doc }: DocPut) {
    return this.postRequest<DocPutResponse>(`${resourceName}/entry/put`, {
      pod_name,
      table_name,
      doc,
    });
  }

  protected docGet({ pod_name, table_name, id }: DocGet) {
    return this.getRequest<DocGetResponse>(`${resourceName}/entry/get`, {
      params: {
        pod_name,
        table_name,
        id,
      },
    });
  }

  protected docDelete({ pod_name, table_name, id }: DocDelete) {
    return this.deleteRequest<DocDeleteResponse>(`${resourceName}/entry/del`, {
      data: {
        pod_name,
        table_name,
        id,
      },
    });
  }
}
