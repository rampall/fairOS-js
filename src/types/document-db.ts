import { BaseResponse } from "./base";

export type DocIndexType = "string" | "number" | "map" | "list";

export interface DocCreateDB {
  pod_name: string;
  table_name: string;
  si: string;
  mutable?: boolean;
}

export interface DocCreateDBResponse extends BaseResponse {}

export interface DocListDBs {
  pod_name: string;
}

export interface DocListDBsResponse {
  keys: {
    table_name: string;
    properties: {
      name: string;
      type: DocIndexType;
    }[];
  };
}

export interface DocOpenDB {
  pod_name: string;
  table_name: string;
}

export interface DocOpenDBResponse extends BaseResponse {}

export interface DocCount {
  pod_name: string;
  table_name: string;
  expr?: string;
}

export interface DocCountResponse extends BaseResponse {}

export interface DocDeleteDB {
  pod_name: string;
  table_name: string;
}

export interface DocDeleteDBResponse extends BaseResponse {}

export interface DocFind {
  pod_name: string;
  table_name: string;
  expr: string;
  limit?: number;
}

export interface DocFindResponse {
  keys: {
    docs: string;
    properties: {
      doc: string;
    }[];
  };
}

export interface DocLoadJson {
  pod_name: string;
  table_name: string;
  file_buffer: Buffer | Blob;
  file_name: string;
}

export interface DocLoadJsonResponse extends BaseResponse {}

export interface DocIndexJson {
  pod_name: string;
  table_name: string;
  file: string;
}

export interface DocIndexJsonResponse extends BaseResponse {}

export interface DocPut {
  pod_name: string;
  table_name: string;
  doc: string;
}

export interface DocPutResponse extends BaseResponse {}

export interface DocGet {
  pod_name: string;
  table_name: string;
  id: string;
}

export interface DocGetResponse extends BaseResponse {}

export interface DocGet {
  pod_name: string;
  table_name: string;
  id: string;
}

export interface DocGetResponse extends BaseResponse {}

export interface DocDelete {
  pod_name: string;
  table_name: string;
  id: string;
}

export interface DocDeleteResponse extends BaseResponse {}
