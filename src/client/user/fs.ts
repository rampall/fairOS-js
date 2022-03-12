import { Request } from "../../request";
import { Directory } from "../fs/directory";
import { File } from "../fs/file";

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

export class FS extends Request {
  async fsMakeDir({ pod_name, dir_path }: FSMakeDir) {
    const response = await this.postRequest<FSMakeDirResponse>("dir/mkdir", {
      pod_name,
      dir_path,
    });

    const dir = new Directory({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      podName: pod_name,
      path: dir_path,
    });

    return dir;
  }

  fsRemoveDir({ pod_name, dir_path }: FSRemoveDir) {
    return this.deleteRequest<FSRemoveDirResponse>("dir/rmdir", {
      data: {
        pod_name,
        dir_path,
      },
    });
  }

  fsListDir({ pod_name, dir_path }: FSListDir) {
    return this.getRequest<FSListResponse>("dir/ls", {
      params: {
        pod_name,
        dir_path,
      },
    });
  }

  fsStatDir({ pod_name, dir_path }: FSStatDir) {
    return this.getRequest<FSStatDirResponse>("dir/stat", {
      params: {
        pod_name,
        dir_path,
      },
    });
  }

  fsDirPresent({ pod_name, dir_path }: FSDirPresent) {
    return this.getRequest<FSStatDirResponse>("dir/present", {
      params: {
        pod_name,
        dir_path,
      },
    });
  }

  async fsUploadFile({
    dfs_compression,
    pod_name,
    pod_dir,
    block_size,
  }: FSUploadFile) {
    const response = await this.postRequest<FSUploadFileResponse>(
      "file/upload",
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

    const file = new File({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      podName: pod_name,
      podDir: pod_dir,
      fileName: response.file_name,
      reference: response.reference,
    });

    return file;
  }

  fsDownloadFileGet({ pod_name, file_path }: FSDownloadFile) {
    return this.getRequest<FSDownloadFileResponse>("file/download", {
      params: {
        pod_name,
        file_path,
      },
    });
  }

  fsDownloadFilePost({ pod_name, file_path }: FSDownloadFile) {
    return this.postRequest<FSDownloadFileResponse>("file/download", {
      pod_name,
      file_path,
    });
  }

  fsShareFile({ pod_name, pod_path_file, dest_user }: FSShareFile) {
    return this.postRequest<FSShareFileResponse>("file/share", {
      pod_name,
      pod_path_file,
      dest_user,
    });
  }

  fsReceiveFile({ pod_name, sharing_ref, dir_path }: FSReceiveFile) {
    return this.getRequest<FSReceiveFileResponse>("file/receive", {
      params: {
        pod_name,
        sharing_ref,
        dir_path,
      },
    });
  }

  fsReceiveFileInfo({ pod_name, sharing_ref }: FSReceiveFileInfo) {
    return this.getRequest<FSReceiveFileInfoResponse>("file/receiveinfo", {
      params: {
        pod_name,
        sharing_ref,
      },
    });
  }

  fsDeleteFile({ pod_name, file_path }: FSDeleteFile) {
    return this.deleteRequest<FSDeleteFileResponse>("file/delete", {
      params: {
        pod_name,
        file_path,
      },
    });
  }

  fsStatInfo({ pod_name, file_path }: FSStatInfo) {
    return this.getRequest<FSStatInfoResponse>("file/stat", {
      params: {
        pod_name,
        file_path,
      },
    });
  }
}
