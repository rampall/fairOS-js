import { Base } from "../base";
import {
  FSDeleteFile,
  FSDeleteFileResponse,
  FSDirPresent,
  FSDownloadFile,
  FSDownloadFileResponse,
  FSListDir,
  FSListResponse,
  FSMakeDir,
  FSMakeDirResponse,
  FSReceiveFileInfo,
  FSReceiveFileInfoResponse,
  FSReceiveFile,
  FSReceiveFileResponse,
  FSRemoveDir,
  FSRemoveDirResponse,
  FSShareFile,
  FSShareFileResponse,
  FSStatDir,
  FSStatDirResponse,
  FSStatInfo,
  FSStatInfoResponse,
  FSUploadFile,
  FSUploadFileResponse,
} from "./types";

const dirResourceName = "dir";
const fileResourceName = "file";

export class FileSystem extends Base {
  fsMakeDir({ pod_name, dir_path }: FSMakeDir) {
    return this.postRequest<FSMakeDirResponse>(`${dirResourceName}/mkdir`, {
      pod_name,
      dir_path,
    });
  }

  fsRemoveDir({ pod_name, dir_path }: FSRemoveDir) {
    return this.deleteRequest<FSRemoveDirResponse>(`${dirResourceName}/rmdir`, {
      data: {
        pod_name,
        dir_path,
      },
    });
  }

  fsListDir({ pod_name, dir_path }: FSListDir) {
    return this.getRequest<FSListResponse>(`${dirResourceName}/ls`, {
      params: {
        pod_name,
        dir_path,
      },
    });
  }

  fsStatDir({ pod_name, dir_path }: FSStatDir) {
    return this.getRequest<FSStatDirResponse>(`${dirResourceName}/stat`, {
      params: {
        pod_name,
        dir_path,
      },
    });
  }

  fsDirPresent({ pod_name, dir_path }: FSDirPresent) {
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
  }: FSUploadFile) {
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

  fsDownloadFileGet({ pod_name, file_path }: FSDownloadFile) {
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

  fsDownloadFilePost({ pod_name, file_path }: FSDownloadFile) {
    return this.postRequest<FSDownloadFileResponse>(
      `${fileResourceName}/download`,
      {
        pod_name,
        file_path,
      }
    );
  }

  fsShareFile({ pod_name, pod_path_file, dest_user }: FSShareFile) {
    return this.postRequest<FSShareFileResponse>(`${fileResourceName}/share`, {
      pod_name,
      pod_path_file,
      dest_user,
    });
  }

  fsReceiveFile({ pod_name, sharing_ref, dir_path }: FSReceiveFile) {
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

  fsReceiveFileInfo({ pod_name, sharing_ref }: FSReceiveFileInfo) {
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

  fsDeleteFile({ pod_name, file_path }: FSDeleteFile) {
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

  fsStatInfo({ pod_name, file_path }: FSStatInfo) {
    return this.getRequest<FSStatInfoResponse>(`${fileResourceName}/stat`, {
      params: {
        pod_name,
        file_path,
      },
    });
  }
}
