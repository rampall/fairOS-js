export type PodReceiveInfoParams = {
  reference: string;
};

export type PodReceiveInfoResponse = {
  pod_name: string;
  pod_address: string;
  user_name: string;
  user_address: string;
  shared_time: string;
};

export type PodReceiveParams = {
  reference: string;
};

export type PodReceiveResponse = {
  message: string;
  code: number;
};

export type PodNewBody = {
  pod_name: string;
  password: string;
};

export type PodNewResponse = {
  message: string;
  code: number;
};

export type PodOpenBody = {
  pod_name: string;
  password: string;
};

export type PodOpenResponse = {
  message: string;
  code: number;
};

export type PodCloseBody = {
  pod_name: string;
};

export type PodCloseResponse = {
  message: string;
  code: number;
};

export type PodSyncBody = {
  pod_name: string;
};

export type PodSyncResponse = {
  message: string;
  code: number;
};

export type PodSharebody = {
  pod_name: string;
  password: string;
};

export type PodShareResponse = {
  pod_sharing_reference: string;
};

export type PodDeleteBody = {
  pod_name: string;
  password: string;
};

export type PodDeleteResponse = {
  message: string;
  code: number;
};

export type PodListResponse = {
  pod_name: string[];
  shared_pod_name: string[];
};

//TODO: documentation says it is body
export type PodStatParams = {
  pod_name: string;
};

export type PodStatResponse = {
  pod_name: string;
  address: string;
};

export type PodPresentParams = {
  pod_name: string;
};

export type PodPresentResponse = {
  present: boolean;
  error: string;
};
