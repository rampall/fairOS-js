import { BaseResponse } from "../types";

export type DocIndexType = "string" | "number" | "map" | "list";

export interface DocCreateDBParams {
  pod_name: string;
  table_name: string;
  si: string;
  mutable?: boolean;
}

export interface DocCreateDBResponse extends BaseResponse {}

export interface DocListDBsParams {
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

export interface DocOpenDBParams {
  pod_name: string;
  table_name: string;
}

export interface DocOpenDBResponse extends BaseResponse {}

export interface DocCountParams {
  pod_name: string;
  table_name: string;
  expr?: string;
}

export interface DocCountResponse extends BaseResponse {}

export interface DocDeleteDBParams {
  pod_name: string;
  table_name: string;
}

export interface DocDeleteDBResponse extends BaseResponse {}

export interface DocFindParams {
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

export interface DocLoadJsonParams {
  pod_name: string;
  table_name: string;
}

export interface DocLoadJsonResponse extends BaseResponse {}

export interface DocIndexJsonParams {
  pod_name: string;
  table_name: string;
  file: string;
}

export interface DocIndexJsonResponse extends BaseResponse {}

export interface DocPutParams {
  pod_name: string;
  table_name: string;
  doc: string;
}

export interface DocPutResponse extends BaseResponse {}

export interface DocGetParams {
  pod_name: string;
  table_name: string;
  id: string;
}

export interface DocGetResponse extends BaseResponse {}

export interface DocGetParams {
  pod_name: string;
  table_name: string;
  id: string;
}

export interface DocGetResponse extends BaseResponse {}

export interface DocDeleteParams {
  pod_name: string;
  table_name: string;
  id: string;
}

export interface DocDeleteResponse extends BaseResponse {}
