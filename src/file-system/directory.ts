import { Request } from "../request";

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
    return this.deleteRequest<FSRemoveDirResponse>(`dir/rmdir`, {
      data: {
        pod_name: this.podName,
        dir_path: this.path,
      },
    });
  }

  ls() {
    return this.getRequest<FSListResponse>(`dir/ls`, {
      params: {
        pod_name: this.podName,
        dir_path: this.path,
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
}
