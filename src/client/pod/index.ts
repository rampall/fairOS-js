import { Request } from "../../request";
import { Directory } from "../fs/directory";

import {
  PodCloseResponse,
  PodDelete,
  PodDeleteResponse,
  PodPresentResponse,
  PodShare,
  PodShareResponse,
  PodStatResponse,
  PodSyncResponse,
} from "../../types/pod";

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
} from "../../types/fs";
import { File } from "../fs/file";

type Config = {
  providerUrl: string;
  authCookie?: string;
  name: string;
};

type omit<T> = Omit<T, "pod_name">;

export class Pod extends Request {
  public name: string;

  constructor(config: Config) {
    super(config);
    this.name = config.name;
  }

  close() {
    return this.postRequest<PodCloseResponse>("pod/close", {
      pod_name: this.name,
    });
  }

  sync() {
    return this.postRequest<PodSyncResponse>("pod/sync", {
      pod_name: this.name,
    });
  }

  share({ password }: omit<PodShare>) {
    return this.postRequest<PodShareResponse>("pod/share", {
      pod_name: this.name,
      password,
    });
  }

  delete({ password }: omit<PodDelete>) {
    return this.postRequest<PodDeleteResponse>("pod/delete", {
      pod_name: this.name,
      password,
    });
  }

  stat() {
    return this.getRequest<PodStatResponse>("pod/stat", {
      data: {
        pod_name: this.name,
      },
    });
  }

  isPresent() {
    return this.getRequest<PodPresentResponse>("pod/present", {
      data: {
        pod_name: this.name,
      },
    });
  }

  async makeDir({ dir_path }: omit<FSMakeDir>) {
    const response = await this.postRequest<FSMakeDirResponse>("dir/mkdir", {
      pod_name: this.name,
      dir_path,
    });

    const dir = new Directory({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      podName: this.name,
      path: dir_path,
    });

    return dir;
  }

  removeDir({ dir_path }: omit<FSRemoveDir>) {
    return this.deleteRequest<FSRemoveDirResponse>("dir/rmdir", {
      data: {
        pod_name: this.name,
        dir_path,
      },
    });
  }

  listDir({ dir_path }: omit<FSListDir>) {
    return this.getRequest<FSListResponse>("dir/ls", {
      params: {
        pod_name: this.name,
        dir_path,
      },
    });
  }

  statDir({ dir_path }: omit<FSStatDir>) {
    return this.getRequest<FSStatDirResponse>("dir/stat", {
      params: {
        pod_name: this.name,
        dir_path,
      },
    });
  }

  isDirPresent({ dir_path }: omit<FSDirPresent>) {
    return this.getRequest<FSStatDirResponse>("dir/present", {
      params: {
        pod_name: this.name,
        dir_path,
      },
    });
  }

  async uploadFile({
    dfs_compression,
    pod_dir,
    block_size,
  }: omit<FSUploadFile>) {
    const response = await this.postRequest<FSUploadFileResponse>(
      "file/upload",
      {
        pod_name: this.name,
        pod_dir,
        block_size,
      },
      {
        headers: {
          "fairOS-dfs-Compression": dfs_compression,
        },
      }
    );

    const file = new File({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      podName: this.name,
      podDir: pod_dir,
      fileName: response.file_name,
      reference: response.reference,
    });

    return file;
  }

  downloadFileGet({ file_path }: omit<FSDownloadFile>) {
    return this.getRequest<FSDownloadFileResponse>("file/download", {
      params: {
        pod_name: this.name,
        file_path,
      },
    });
  }

  downloadFilePost({ file_path }: omit<FSDownloadFile>) {
    return this.postRequest<FSDownloadFileResponse>("file/download", {
      pod_name: this.name,
      file_path,
    });
  }

  shareFile({ pod_path_file, dest_user }: omit<FSShareFile>) {
    return this.postRequest<FSShareFileResponse>("file/share", {
      pod_name: this.name,
      pod_path_file,
      dest_user,
    });
  }

  receiveFile({ sharing_ref, dir_path }: omit<FSReceiveFile>) {
    return this.getRequest<FSReceiveFileResponse>("file/receive", {
      params: {
        pod_name: this.name,
        sharing_ref,
        dir_path,
      },
    });
  }

  receiveFileInfo({ sharing_ref }: omit<FSReceiveFileInfo>) {
    return this.getRequest<FSReceiveFileInfoResponse>("file/receiveinfo", {
      params: {
        pod_name: this.name,
        sharing_ref,
      },
    });
  }

  deleteFile({ file_path }: omit<FSDeleteFile>) {
    return this.deleteRequest<FSDeleteFileResponse>("file/delete", {
      params: {
        pod_name: this.name,
        file_path,
      },
    });
  }

  statInfo({ file_path }: omit<FSStatInfo>) {
    return this.getRequest<FSStatInfoResponse>("file/stat", {
      params: {
        pod_name: this.name,
        file_path,
      },
    });
  }
}
