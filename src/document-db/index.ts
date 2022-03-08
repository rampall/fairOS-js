import { Base } from "../base";
import {
  DocCountParams,
  DocCountResponse,
  DocCreateDBParams,
  DocCreateDBResponse,
  DocDeleteDBParams,
  DocDeleteDBResponse,
  DocDeleteParams,
  DocDeleteResponse,
  DocFindParams,
  DocFindResponse,
  DocGetParams,
  DocGetResponse,
  DocIndexJsonParams,
  DocIndexJsonResponse,
  DocListDBsParams,
  DocListDBsResponse,
  DocLoadJsonParams,
  DocLoadJsonResponse,
  DocOpenDBParams,
  DocOpenDBResponse,
  DocPutParams,
  DocPutResponse,
} from "./types";

const resourceName = "doc";

export class DocumentDB extends Base {
  docCreateDB({ pod_name, table_name, si, mutable }: DocCreateDBParams) {
    return this.postRequest<DocCreateDBResponse>(`${resourceName}/new`, {
      pod_name,
      table_name,
      si,
      mutable,
    });
  }

  docListDBs({ pod_name }: DocListDBsParams) {
    return this.getRequest<DocListDBsResponse>(`${resourceName}/ls`, {
      params: {
        pod_name,
      },
    });
  }

  docOpenDB({ pod_name, table_name }: DocOpenDBParams) {
    return this.postRequest<DocOpenDBResponse>(`${resourceName}/open`, {
      pod_name,
      table_name,
    });
  }

  docCount({ pod_name, table_name, expr }: DocCountParams) {
    return this.postRequest<DocCountResponse>(`${resourceName}/count`, {
      pod_name,
      table_name,
      expr,
    });
  }

  docDeleteDB({ pod_name, table_name }: DocDeleteDBParams) {
    return this.deleteRequest<DocDeleteDBResponse>(`${resourceName}/delete`, {
      data: {
        pod_name,
        table_name,
      },
    });
  }

  docFind({ pod_name, table_name, expr, limit }: DocFindParams) {
    return this.deleteRequest<DocFindResponse>(`${resourceName}/find`, {
      data: {
        pod_name,
        table_name,
        expr,
        limit,
      },
    });
  }

  docLoadJson({ pod_name, table_name }: DocLoadJsonParams) {
    return this.postRequest<DocLoadJsonResponse>(`${resourceName}/loadjson`, {
      pod_name,
      table_name,
    });
  }

  docIndexJson({ pod_name, table_name, file }: DocIndexJsonParams) {
    return this.postRequest<DocIndexJsonResponse>(`${resourceName}/indexjson`, {
      pod_name,
      table_name,
      file,
    });
  }

  docPut({ pod_name, table_name, doc }: DocPutParams) {
    return this.postRequest<DocPutResponse>(`${resourceName}/entry/put`, {
      pod_name,
      table_name,
      doc,
    });
  }

  docGet({ pod_name, table_name, id }: DocGetParams) {
    return this.getRequest<DocGetResponse>(`${resourceName}/entry/get`, {
      params: {
        pod_name,
        table_name,
        id,
      },
    });
  }

  docDelete({ pod_name, table_name, id }: DocDeleteParams) {
    return this.deleteRequest<DocDeleteResponse>(`${resourceName}/entry/del`, {
      data: {
        pod_name,
        table_name,
        id,
      },
    });
  }
}
