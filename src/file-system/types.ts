import { BaseResponse } from "../types";

export type Compression = "gzip" | "snappy";

export interface FSMakeDirParams {
  pod_name?: string;
  dir_path: string;
}

export interface FSMakeDirResponse extends BaseResponse {}

export interface FSRemoveDirParams {
  pod_name: string;
  dir_path: string;
}

export interface FSRemoveDirResponse extends BaseResponse {}

export interface FSListDirParams {
  pod_name: string;
  dir_path: string;
}

//TODO: implement this
export interface FSListResponse {
  dirs: {};
  files: {};
}

export interface FSStatDirParams {
  pod_name: string;
  dir_path: string;
}

export interface FSStatDirResponse {
  pod_name: string;
  dir_path: string;
  dir_name: string;
  creation_time: string;
  modification_time: string;
  access_time: string;
  no_of_directories: number;
  no_of_files: number;
}

export interface FSDirPresentParams {
  pod_name: string;
  dir_path: string;
}

export interface FSDirStatResponse {
  present: boolean;
  error: string;
}

export interface FSUploadFileParams {
  pod_name: string;
  pod_dir: string;
  block_size: string;
  dfs_compression: Compression;
}

export interface FSUploadFileResponse {
  file_name: string;
  reference: string;
  error: string;
}

export interface FSDownloadFileParams {
  pod_name: string;
  file_path: string;
}

export interface FSDownloadFileResponse extends BaseResponse {}

export interface FSShareFileParams {
  pod_name: string;
  pod_path_file: string;
  dest_user: string;
}

export interface FSShareFileResponse {
  file_sharing_reference: string;
}

export interface FSReceiveFileParams {
  pod_name: string;
  sharing_ref: string;
  dir_path: string;
}

export interface FSReceiveFileResponse {
  file_name: string;
}

export interface FSReceiveFileInfoParams {
  pod_name: string;
  sharing_ref: string;
}

export interface FSReceiveFileInfoResponse {
  name: string;
  size: number;
  block_size: string;
  number_of_blocks: number;
  content_type: string;
  compression: Compression;
  pod_name: string;
  meta_ref: string;
  source_address: string;
  dest_address: string;
  shared_time: string;
}

//TODO: delete a file not delete info
export interface FSDeleteFileParams {
  pod_name: string;
  file_path: string;
}

export interface FSDeleteFileResponse extends BaseResponse {}

//TODO: good name?
export interface FSStatInfoParams {
  pod_name: string;
  file_path: string;
}

export interface FSStatInfoResponse {
  pod_name: string;
  file_path: string;
  file_name: string;
  file_size: number;
  block_size: string;
  compression: Compression;
  content_type: string;
  creation_time: string;
  modification_time: string;
  access_time: string;
  properties: {
    name: string;
    reference: string;
    size: number;
    compressed_size: number;
  }[];
}
