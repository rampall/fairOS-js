import { Request } from "../../request";

import {
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
} from "../../types/document-db";
import { DocumentTable } from "../document-db/table";

const resourceName = "doc";

type omit<T> = Omit<T, "pod_name">;

export class DocumentDB extends Request {
  public readonly podName: string = "";

  async docCreateDB({ table_name, si, mutable }: omit<DocCreateDB>) {
    const response = await this.postRequest<DocCreateDBResponse>(
      `${resourceName}/new`,
      {
        pod_name: this.podName,
        table_name,
        si,
        mutable,
      }
    );

    const docTable = new DocumentTable({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      podName: this.podName,
      tableName: table_name,
    });

    return docTable;
  }

  docListDBs() {
    return this.getRequest<DocListDBsResponse>(`${resourceName}/ls`, {
      params: {
        pod_name: this.podName,
      },
    });
  }

  async docOpenDB({ table_name }: omit<DocOpenDB>) {
    const response = await this.postRequest<DocOpenDBResponse>(
      `${resourceName}/open`,
      {
        pod_name: this.podName,
        table_name,
      }
    );

    const docTable = new DocumentTable({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      podName: this.podName,
      tableName: table_name,
    });

    return docTable;
  }

  docCount({ table_name, expr }: omit<DocCount>) {
    return this.postRequest<DocCountResponse>(`${resourceName}/count`, {
      pod_name: this.podName,
      table_name,
      expr,
    });
  }

  docDeleteDB({ table_name }: omit<DocDeleteDB>) {
    return this.deleteRequest<DocDeleteDBResponse>(`${resourceName}/delete`, {
      data: {
        pod_name: this.podName,
        table_name,
      },
    });
  }

  docFind({ table_name, expr, limit }: omit<DocFind>) {
    return this.deleteRequest<DocFindResponse>(`${resourceName}/find`, {
      data: {
        pod_name: this.podName,
        table_name,
        expr,
        limit,
      },
    });
  }

  docLoadJson({ table_name }: omit<DocLoadJson>) {
    return this.postRequest<DocLoadJsonResponse>(`${resourceName}/loadjson`, {
      pod_name: this.podName,
      table_name,
    });
  }

  docIndexJson({ table_name, file }: omit<DocIndexJson>) {
    return this.postRequest<DocIndexJsonResponse>(`${resourceName}/indexjson`, {
      pod_name: this.podName,
      table_name,
      file,
    });
  }

  docPut({ table_name, doc }: omit<DocPut>) {
    return this.postRequest<DocPutResponse>(`${resourceName}/entry/put`, {
      pod_name: this.podName,
      table_name,
      doc,
    });
  }

  docGet({ table_name, id }: omit<DocGet>) {
    return this.getRequest<DocGetResponse>(`${resourceName}/entry/get`, {
      params: {
        pod_name: this.podName,
        table_name,
        id,
      },
    });
  }

  docDelete({ table_name, id }: omit<DocDelete>) {
    return this.deleteRequest<DocDeleteResponse>(`${resourceName}/entry/del`, {
      data: {
        pod_name: this.podName,
        table_name,
        id,
      },
    });
  }
}
