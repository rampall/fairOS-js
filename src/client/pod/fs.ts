import { Request } from "../../request";
import { Directory } from "../fs/directory";

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

type omit<T> = Omit<T, "pod_name">;

export class FileSystem extends Request {
  public readonly podName: string = "";

  async makeDir({ dir_path }: omit<FSMakeDir>) {
    const response = await this.postRequest<FSMakeDirResponse>("dir/mkdir", {
      pod_name: this.podName,
      dir_path,
    });

    const dir = new Directory({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      podName: this.podName,
      path: dir_path,
    });

    return dir;
  }

  removeDir({ dir_path }: omit<FSRemoveDir>) {
    return this.deleteRequest<FSRemoveDirResponse>("dir/rmdir", {
      data: {
        pod_name: this.podName,
        dir_path,
      },
    });
  }

  listDir({ dir_path }: omit<FSListDir>) {
    return this.getRequest<FSListResponse>("dir/ls", {
      params: {
        pod_name: this.podName,
        dir_path,
      },
    });
  }

  statDir({ dir_path }: omit<FSStatDir>) {
    return this.getRequest<FSStatDirResponse>("dir/stat", {
      params: {
        pod_name: this.podName,
        dir_path,
      },
    });
  }

  isDirPresent({ dir_path }: omit<FSDirPresent>) {
    return this.getRequest<FSStatDirResponse>("dir/present", {
      params: {
        pod_name: this.podName,
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
        pod_name: this.podName,
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
      podName: this.podName,
      podDir: pod_dir,
      fileName: response.file_name,
      reference: response.reference,
    });

    return file;
  }

  downloadFileGet({ file_path }: omit<FSDownloadFile>) {
    return this.getRequest<FSDownloadFileResponse>("file/download", {
      params: {
        pod_name: this.podName,
        file_path,
      },
    });
  }

  downloadFilePost({ file_path }: omit<FSDownloadFile>) {
    return this.postRequest<FSDownloadFileResponse>("file/download", {
      pod_name: this.podName,
      file_path,
    });
  }

  shareFile({ pod_path_file, dest_user }: omit<FSShareFile>) {
    return this.postRequest<FSShareFileResponse>("file/share", {
      pod_name: this.podName,
      pod_path_file,
      dest_user,
    });
  }

  receiveFile({ sharing_ref, dir_path }: omit<FSReceiveFile>) {
    return this.getRequest<FSReceiveFileResponse>("file/receive", {
      params: {
        pod_name: this.podName,
        sharing_ref,
        dir_path,
      },
    });
  }

  receiveFileInfo({ sharing_ref }: omit<FSReceiveFileInfo>) {
    return this.getRequest<FSReceiveFileInfoResponse>("file/receiveinfo", {
      params: {
        pod_name: this.podName,
        sharing_ref,
      },
    });
  }

  deleteFile({ file_path }: omit<FSDeleteFile>) {
    return this.deleteRequest<FSDeleteFileResponse>("file/delete", {
      params: {
        pod_name: this.podName,
        file_path,
      },
    });
  }

  statInfo({ file_path }: omit<FSStatInfo>) {
    return this.getRequest<FSStatInfoResponse>("file/stat", {
      params: {
        pod_name: this.podName,
        file_path,
      },
    });
  }
}
