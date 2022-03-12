import { BaseResponse } from "./base";

export interface PodReceiveInfo {
  reference: string;
}

export interface PodReceiveInfoResponse {
  pod_name: string;
  pod_address: string;
  user_name: string;
  user_address: string;
  shared_time: string;
}

export interface PodReceive {
  reference: string;
}

export interface PodReceiveResponse extends BaseResponse {}

export interface PodNew {
  pod_name: string;
  password: string;
}

export interface PodNewResponse extends BaseResponse {}

export interface PodOpen {
  pod_name: string;
  password: string;
}

export interface PodOpenResponse extends BaseResponse {}

export interface PodClose {
  pod_name: string;
}

export interface PodCloseResponse extends BaseResponse {}

export interface PodSync {
  pod_name: string;
}

export interface PodSyncResponse extends BaseResponse {}

export interface PodShare {
  pod_name: string;
  password: string;
}

export interface PodShareResponse {
  pod_sharing_reference: string;
}

export interface PodDelete {
  pod_name: string;
  password: string;
}

export interface PodDeleteResponse extends BaseResponse {}

export interface PodListResponse {
  pod_name: string[];
  shared_pod_name: string[];
}

//TODO: documentation says it is body
export interface PodStat {
  pod_name: string;
}

export interface PodStatResponse {
  pod_name: string;
  address: string;
}

export interface PodPresent {
  pod_name: string;
}

export interface PodPresentResponse {
  present: boolean;
  error: string;
}
