import * as FormData from "form-data";
import { readFileSync } from "fs";

import {
  Request,
  FSDirectoryClient,
  FSFileClient,
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
  FSOpenDir,
} from "../internal";

const dirResourceName = "dir";
const fileResourceName = "file";

type Config = {
  providerUrl: string;
  cookies?: string;
};

export class FSModel extends Request {
  constructor(config: Config) {
    super(config);
  }

  protected async fsMakeDir({ pod_name, dir_path }: FSMakeDir) {
    const response = await this.postRequest<FSMakeDirResponse>(
      `${dirResourceName}/mkdir`,
      {
        pod_name,
        dir_path,
      }
    );

    const cookies = this.axiosInstance.defaults.headers.common[
      "Cookie"
    ] as string;

    const dir = new FSDirectoryClient({
      providerUrl: this.providerUrl,
      cookies,
      podName: pod_name,
      path: dir_path,
    });

    return dir;
  }

  protected fsOpenDir({ pod_name, dir_path }: FSOpenDir) {
    const cookies = this.axiosInstance.defaults.headers.common[
      "Cookie"
    ] as string;

    const dir = new FSDirectoryClient({
      providerUrl: this.providerUrl,
      cookies,
      podName: pod_name,
      path: dir_path,
    });

    return dir;
  }

  protected fsRemoveDir({ pod_name, dir_path }: FSRemoveDir) {
    return this.deleteRequest<FSRemoveDirResponse>(`${dirResourceName}/rmdir`, {
      data: {
        pod_name,
        dir_path,
      },
    });
  }

  protected fsListDir({ pod_name, dir_path }: FSListDir) {
    return this.getRequest<FSListResponse>(`${dirResourceName}/ls`, {
      params: {
        pod_name,
        dir_path,
      },
    });
  }

  protected fsStatDir({ pod_name, dir_path }: FSStatDir) {
    return this.getRequest<FSStatDirResponse>(`${dirResourceName}/stat`, {
      params: {
        pod_name,
        dir_path,
      },
    });
  }

  protected fsDirPresent({ pod_name, dir_path }: FSDirPresent) {
    return this.getRequest<FSStatDirResponse>(`${dirResourceName}/present`, {
      params: {
        pod_name,
        dir_path,
      },
    });
  }

  //TODO: dir_path in real but pod_dir in doc
  //TODO: response type is different from doc
  protected async fsUploadFile({
    local_path,
    dfs_compression,
    pod_name,
    pod_dir,
    block_size,
  }: FSUploadFile) {
    const form = new FormData();
    form.append("pod_name", pod_name);
    form.append("dir_path", pod_dir);
    form.append("block_size", block_size);

    const fileName = local_path.split("/").pop();
    const fileBuffer = readFileSync(local_path);

    form.append("files", fileBuffer, fileName);

    const response = await this.postRequest<FSUploadFileResponse>(
      `${fileResourceName}/upload`,
      form,
      {
        headers: {
          "fairOS-dfs-Compression": dfs_compression,
          ...form.getHeaders(),
        },
      }
    );

    const cookies = this.axiosInstance.defaults.headers.common[
      "Cookie"
    ] as string;

    const file = new FSFileClient({
      providerUrl: this.providerUrl,
      cookies,
      podName: pod_name,
      podDir: pod_dir,
      fileName: response["Responses"][0].file_name,
      reference: response["Responses"][0].reference,
    });

    return file;
  }

  //TODO: post download file is broken. says pod_name is required
  //TODO: handle errors. returned as buffer
  protected fsDownloadFile({ pod_name, file_path }: FSDownloadFile) {
    return this.getRequest<Buffer>(`${fileResourceName}/download`, {
      responseType: "arraybuffer",
      params: {
        pod_name,
        file_path,
      },
    });
  }

  protected fsShareFile({ pod_name, pod_path_file, dest_user }: FSShareFile) {
    return this.postRequest<FSShareFileResponse>(`${fileResourceName}/share`, {
      pod_name,
      pod_path_file,
      dest_user,
    });
  }

  protected fsReceiveFile({ pod_name, sharing_ref, dir_path }: FSReceiveFile) {
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

  protected fsReceiveFileInfo({ pod_name, sharing_ref }: FSReceiveFileInfo) {
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

  protected fsDeleteFile({ pod_name, file_path }: FSDeleteFile) {
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

  protected fsStatInfo({ pod_name, file_path }: FSStatInfo) {
    return this.getRequest<FSStatInfoResponse>(`${fileResourceName}/stat`, {
      params: {
        pod_name,
        file_path,
      },
    });
  }
}
