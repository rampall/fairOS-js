import { Base } from "../base";
import {
  FSDeleteFileParams,
  FSDeleteFileResponse,
  FSDirPresentParams,
  FSDownloadFileParams,
  FSDownloadFileResponse,
  FSListDirParams,
  FSListResponse,
  FSMakeDirParams,
  FSMakeDirResponse,
  FSReceiveFileInfoParams,
  FSReceiveFileInfoResponse,
  FSReceiveFileParams,
  FSReceiveFileResponse,
  FSRemoveDirParams,
  FSRemoveDirResponse,
  FSShareFileParams,
  FSShareFileResponse,
  FSStatDirParams,
  FSStatDirResponse,
  FSStatInfoParams,
  FSStatInfoResponse,
  FSUploadFileParams,
  FSUploadFileResponse,
} from "./types";

const dirResourceName = "dir";
const fileResourceName = "file";

export class FileSystem extends Base {
  fsMakeDir({ pod_name, dir_path }: FSMakeDirParams) {
    return this.postRequest<FSMakeDirResponse>(`${dirResourceName}/mkdir`, {
      pod_name,
      dir_path,
    });
  }

  fsRemoveDir({ pod_name, dir_path }: FSRemoveDirParams) {
    return this.deleteRequest<FSRemoveDirResponse>(`${dirResourceName}/rmdir`, {
      data: {
        pod_name,
        dir_path,
      },
    });
  }

  fsListDir({ pod_name, dir_path }: FSListDirParams) {
    return this.getRequest<FSListResponse>(`${dirResourceName}/ls`, {
      params: {
        pod_name,
        dir_path,
      },
    });
  }

  fsStatDir({ pod_name, dir_path }: FSStatDirParams) {
    return this.getRequest<FSStatDirResponse>(`${dirResourceName}/stat`, {
      params: {
        pod_name,
        dir_path,
      },
    });
  }

  fsDirPresent({ pod_name, dir_path }: FSDirPresentParams) {
    return this.getRequest<FSStatDirResponse>(`${dirResourceName}/present`, {
      params: {
        pod_name,
        dir_path,
      },
    });
  }

  fsUploadFile({
    dfs_compression,
    pod_name,
    pod_dir,
    block_size,
  }: FSUploadFileParams) {
    return this.postRequest<FSUploadFileResponse>(
      `${fileResourceName}/upload`,
      {
        pod_name,
        pod_dir,
        block_size,
      },
      {
        headers: {
          "fairOS-dfs-Compression": dfs_compression,
        },
      }
    );
  }

  fsDownloadFileGet({ pod_name, file_path }: FSDownloadFileParams) {
    return this.getRequest<FSDownloadFileResponse>(
      `${fileResourceName}/download`,
      {
        params: {
          pod_name,
          file_path,
        },
      }
    );
  }

  fsDownloadFilePost({ pod_name, file_path }: FSDownloadFileParams) {
    return this.postRequest<FSDownloadFileResponse>(
      `${fileResourceName}/download`,
      {
        pod_name,
        file_path,
      }
    );
  }

  fsShareFile({ pod_name, pod_path_file, dest_user }: FSShareFileParams) {
    return this.postRequest<FSShareFileResponse>(`${fileResourceName}/share`, {
      pod_name,
      pod_path_file,
      dest_user,
    });
  }

  fsReceiveFile({ pod_name, sharing_ref, dir_path }: FSReceiveFileParams) {
    return this.getRequest<FSReceiveFileResponse>(
      `${fileResourceName}/receive`,
      {
        params: {
          pod_name,
          sharing_ref,
          dir_path,
        },
      }
    );
  }

  fsReceiveFileInfo({ pod_name, sharing_ref }: FSReceiveFileInfoParams) {
    return this.getRequest<FSReceiveFileInfoResponse>(
      `${fileResourceName}/receiveinfo`,
      {
        params: {
          pod_name,
          sharing_ref,
        },
      }
    );
  }

  fsDeleteFile({ pod_name, file_path }: FSDeleteFileParams) {
    return this.deleteRequest<FSDeleteFileResponse>(
      `${fileResourceName}/delete`,
      {
        params: {
          pod_name,
          file_path,
        },
      }
    );
  }

  fsStatInfo({ pod_name, file_path }: FSStatInfoParams) {
    return this.getRequest<FSStatInfoResponse>(`${fileResourceName}/stat`, {
      params: {
        pod_name,
        file_path,
      },
    });
  }
}
