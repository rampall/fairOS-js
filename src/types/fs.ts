import { BaseResponse } from "./base";

export type Compression = "gzip" | "snappy";

export interface FSMakeDir {
  pod_name: string;
  dir_path: string;
}

export interface FSOpenDir {
  pod_name: string;
  dir_path: string;
}

export interface FSMakeDirResponse extends BaseResponse {}

export interface FSRemoveDir {
  pod_name: string;
  dir_path: string;
}

export interface FSRemoveDirResponse extends BaseResponse {}

export interface FSListDir {
  pod_name: string;
  dir_path: string;
}

export interface FSListResponse {
  dirs?: {
    name: string;
    type?: string;
    size?: string;
    content_type?: string;
    creation_time: string;
    modification_time: string;
    access_time: string;
  }[];
  files: {
    name: string;
    type?: string;
    size: string;
    block_size: string;
    creation_time: string;
    modification_time: string;
    access_time: string;
  }[];
}

export interface FSStatDir {
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

export interface FSDirPresent {
  pod_name: string;
  dir_path: string;
}

export interface FSDirStatResponse {
  present: boolean;
  error: string;
}

export interface FSUploadFile {
  file_path: string;
  pod_name: string;
  pod_dir: string;
  block_size: string;
  dfs_compression: Compression;
}

export interface FSUploadFileResponse {
  Responses: {
    file_name: string;
    message: string;
    reference?: string;
    error?: string;
  }[];
}

export interface FSDownloadFile {
  pod_name: string;
  file_path: string;
}

export interface FSDownloadFileResponse extends BaseResponse {}

export interface FSShareFile {
  pod_name: string;
  pod_path_file: string;
  dest_user: string;
}

export interface FSShareFileResponse {
  file_sharing_reference: string;
}

export interface FSReceiveFile {
  pod_name: string;
  sharing_ref: string;
  dir_path: string;
}

export interface FSReceiveFileResponse {
  file_name: string;
}

export interface FSReceiveFileInfo {
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

export interface FSDeleteFile {
  pod_name: string;
  file_path: string;
}

export interface FSDeleteFileResponse extends BaseResponse {}

export interface FSStatInfo {
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
