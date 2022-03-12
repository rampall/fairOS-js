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

const resourceName = "doc";

export class DocumentDB extends Request {
  docCreateDB({ pod_name, table_name, si, mutable }: DocCreateDB) {
    return this.postRequest<DocCreateDBResponse>(`${resourceName}/new`, {
      pod_name,
      table_name,
      si,
      mutable,
    });
  }

  docListDBs({ pod_name }: DocListDBs) {
    return this.getRequest<DocListDBsResponse>(`${resourceName}/ls`, {
      params: {
        pod_name,
      },
    });
  }

  docOpenDB({ pod_name, table_name }: DocOpenDB) {
    return this.postRequest<DocOpenDBResponse>(`${resourceName}/open`, {
      pod_name,
      table_name,
    });
  }

  docCount({ pod_name, table_name, expr }: DocCount) {
    return this.postRequest<DocCountResponse>(`${resourceName}/count`, {
      pod_name,
      table_name,
      expr,
    });
  }

  docDeleteDB({ pod_name, table_name }: DocDeleteDB) {
    return this.deleteRequest<DocDeleteDBResponse>(`${resourceName}/delete`, {
      data: {
        pod_name,
        table_name,
      },
    });
  }

  docFind({ pod_name, table_name, expr, limit }: DocFind) {
    return this.deleteRequest<DocFindResponse>(`${resourceName}/find`, {
      data: {
        pod_name,
        table_name,
        expr,
        limit,
      },
    });
  }

  docLoadJson({ pod_name, table_name }: DocLoadJson) {
    return this.postRequest<DocLoadJsonResponse>(`${resourceName}/loadjson`, {
      pod_name,
      table_name,
    });
  }

  docIndexJson({ pod_name, table_name, file }: DocIndexJson) {
    return this.postRequest<DocIndexJsonResponse>(`${resourceName}/indexjson`, {
      pod_name,
      table_name,
      file,
    });
  }

  docPut({ pod_name, table_name, doc }: DocPut) {
    return this.postRequest<DocPutResponse>(`${resourceName}/entry/put`, {
      pod_name,
      table_name,
      doc,
    });
  }

  docGet({ pod_name, table_name, id }: DocGet) {
    return this.getRequest<DocGetResponse>(`${resourceName}/entry/get`, {
      params: {
        pod_name,
        table_name,
        id,
      },
    });
  }

  docDelete({ pod_name, table_name, id }: DocDelete) {
    return this.deleteRequest<DocDeleteResponse>(`${resourceName}/entry/del`, {
      data: {
        pod_name,
        table_name,
        id,
      },
    });
  }
}
