import { Request } from "../../request";
import { File } from "./file";
import { join } from "path";

import {
  FSDownloadFile,
  FSDownloadFileResponse,
  FSListResponse,
  FSReceiveFile,
  FSReceiveFileResponse,
  FSRemoveDirResponse,
  FSShareFile,
  FSShareFileResponse,
  FSStatDirResponse,
  FSUploadFileResponse,
  FSReceiveFileInfo,
  FSReceiveFileInfoResponse,
  FSDeleteFile,
  FSDeleteFileResponse,
  FSStatInfoResponse,
} from "../../types/file-system";

type Config = {
  providerUrl: string;
  podName: string;
  path: string;
};

export class Directory extends Request {
  public podName: string;
  public path: string;

  constructor(config: Config) {
    super(config);
    this.path = config.path;
    this.podName = config.podName;
  }

  remove() {
    return this.deleteRequest<FSRemoveDirResponse>("dir/rmdir", {
      data: {
        pod_name: this.podName,
        dir_path: this.path,
      },
    });
  }

  ls() {
    return this.getRequest<FSListResponse>("dir/ls", {
      params: {
        pod_name: this.podName,
        dir_path: this.path,
      },
    });
  }

  stat() {
    return this.getRequest<FSStatDirResponse>("dir/stat", {
      params: {
        pod_name: this.podName,
        dir_path: this.path,
      },
    });
  }

  isPresent() {
    return this.getRequest<FSStatDirResponse>("dir/present", {
      params: {
        pod_name: this.podName,
        dir_path: this.path,
      },
    });
  }

  async uploadFile({ dfs_compression, block_size }) {
    const response = await this.postRequest<FSUploadFileResponse>(
      "file/upload",
      {
        pod_name: this.podName,
        pod_dir: this.path,
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
      podName: this.podName,
      podDir: this.path,
      fileName: response.file_name,
      reference: response.reference,
    });

    return file;
  }

  //TODO: change file_path = this.path + file_name
  downloadFileGet({ file_name }: { file_name: string }) {
    return this.getRequest<FSDownloadFileResponse>("file/download", {
      params: {
        pod_name: this.podName,
        file_path: join(this.path, file_name),
      },
    });
  }

  downloadFilePost({ file_name }: { file_name: string }) {
    return this.postRequest<FSDownloadFileResponse>("file/download", {
      pod_name: this.podName,
      file_path: join(this.path, file_name),
    });
  }

  shareFile({
    file_name,
    dest_user,
  }: {
    file_name: string;
    dest_user: string;
  }) {
    return this.postRequest<FSShareFileResponse>("file/share", {
      pod_name: this.podName,
      pod_path_file: join(this.path, file_name),
      dest_user,
    });
  }

  receiveFile({ sharing_ref }: FSReceiveFile) {
    return this.getRequest<FSReceiveFileResponse>("file/receive", {
      params: {
        pod_name: this.podName,
        sharing_ref,
        dir_path: this.path,
      },
    });
  }

  receiveFileInfo({ pod_name, sharing_ref }: FSReceiveFileInfo) {
    return this.getRequest<FSReceiveFileInfoResponse>("file/receiveinfo", {
      params: {
        pod_name,
        sharing_ref,
      },
    });
  }

  deleteFile({ pod_name, file_path }: FSDeleteFile) {
    return this.deleteRequest<FSDeleteFileResponse>("file/delete", {
      params: {
        pod_name,
        file_path,
      },
    });
  }

  statInfo({ file_name }: { file_name: string }) {
    return this.getRequest<FSStatInfoResponse>("file/stat", {
      params: {
        pod_name: this.podName,
        file_path: join(this.path, file_name),
      },
    });
  }
}
