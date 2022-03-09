import { BaseResponse } from "../types";

export interface PodReceiveInfoParams {
  reference: string;
}

export interface PodReceiveInfoResponse {
  pod_name: string;
  pod_address: string;
  user_name: string;
  user_address: string;
  shared_time: string;
}

export interface PodReceiveParams {
  reference: string;
}

export interface PodReceiveResponse extends BaseResponse {}

export interface PodNewBody {
  pod_name: string;
  password: string;
}

export interface PodNewResponse extends BaseResponse {}

export interface PodOpenBody {
  pod_name: string;
  password: string;
}

export interface PodOpenResponse extends BaseResponse {}

export interface PodCloseBody {
  pod_name: string;
}

export interface PodCloseResponse extends BaseResponse {}

export interface PodSyncBody {
  pod_name: string;
}

export interface PodSyncResponse extends BaseResponse {}

export interface PodSharebody {
  pod_name: string;
  password: string;
}

export interface PodShareResponse {
  pod_sharing_reference: string;
}

export interface PodDeleteBody {
  pod_name: string;
  password: string;
}

export interface PodDeleteResponse extends BaseResponse {}

export interface PodListResponse {
  pod_name: string[];
  shared_pod_name: string[];
}

//TODO: documentation says it is body
export interface PodStatParams {
  pod_name: string;
}

export interface PodStatResponse {
  pod_name: string;
  address: string;
}

export interface PodPresentParams {
  pod_name: string;
}

export interface PodPresentResponse {
  present: boolean;
  error: string;
}
