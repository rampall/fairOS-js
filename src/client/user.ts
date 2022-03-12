import { Request } from "../request";
import { Pod } from "./pod";
import { Directory } from "./fs/directory";

import {
  UserLogoutResponse,
  UserExportResponse,
  UserDelete,
  UserStatReponse,
  UserDeleteResponse,
  UserPresentResponse,
  UserLoggedInResponse,
} from "../types/user";

import {
  PodClose,
  PodCloseResponse,
  PodDelete,
  PodDeleteResponse,
  PodListResponse,
  PodNew,
  PodNewResponse,
  PodOpen,
  PodOpenResponse,
  PodPresent,
  PodPresentResponse,
  PodReceiveInfo,
  PodReceiveInfoResponse,
  PodReceive,
  PodReceiveResponse,
  PodShare,
  PodShareResponse,
  PodStat,
  PodStatResponse,
  PodSync,
  PodSyncResponse,
} from "../types/pod";

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
} from "../types/file-system";

type Config = {
  providerUrl: string;
  authCookie?: string;
  username: string;
  address?: string;
};

export class User extends Request {
  public readonly username: string;
  public readonly address: string | undefined;

  constructor(config: Config) {
    super(config);
    this.username = config.username;
    this.address = config.address;
  }

  logout() {
    return this.postRequest<UserLogoutResponse>("user/logout");
  }

  export() {
    return this.postRequest<UserExportResponse>("user/export");
  }

  delete({ password }: UserDelete) {
    return this.deleteRequest<UserDeleteResponse>("user/delete", {
      data: {
        password,
      },
    });
  }

  stat() {
    return this.getRequest<UserStatReponse>("user/stat");
  }

  isPresent() {
    return this.getRequest<UserPresentResponse>("user/present", {
      params: {
        user_name: this.username,
      },
    });
  }

  isLoggedIn() {
    return this.getRequest<UserLoggedInResponse>("user/isloggedin", {
      params: {
        user_name: this.username,
      },
    });
  }

  podReceiveInfo({ reference }: PodReceiveInfo) {
    return this.getRequest<PodReceiveInfoResponse>("pod/receiveinfo", {
      params: {
        reference,
      },
    });
  }

  podReceive({ reference }: PodReceive) {
    return this.getRequest<PodReceiveResponse>("pod/receive", {
      params: {
        reference,
      },
    });
  }

  async podNew({ pod_name, password }: PodNew) {
    const response = await this.postRequest<PodNewResponse>("pod/new", {
      pod_name,
      password,
    });

    const pod = new Pod({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      name: pod_name,
    });

    return pod;
  }

  async podOpen({ pod_name, password }: PodOpen) {
    const response = await this.postRequest<PodOpenResponse>("pod/open", {
      pod_name,
      password,
    });

    const pod = new Pod({
      providerUrl: this.providerUrl,
      authCookie: response.cookies,
      name: pod_name,
    });

    return pod;
  }

  podClose({ pod_name }: PodClose) {
    return this.postRequest<PodCloseResponse>("user/close", {
      pod_name,
    });
  }

  podSync({ pod_name }: PodSync) {
    return this.postRequest<PodSyncResponse>("user/sync", {
      pod_name,
    });
  }

  podShare({ pod_name, password }: PodShare) {
    return this.postRequest<PodShareResponse>("user/share", {
      pod_name,
      password,
    });
  }

  podDelete({ pod_name, password }: PodDelete) {
    return this.postRequest<PodDeleteResponse>("user/delete", {
      pod_name,
      password,
    });
  }

  podList() {
    return this.getRequest<PodListResponse>("pod/ls");
  }

  podStat({ pod_name }: PodStat) {
    return this.getRequest<PodStatResponse>("user/stat", {
      data: {
        pod_name,
      },
    });
  }

  podPresent({ pod_name }: PodPresent) {
    return this.getRequest<PodPresentResponse>("user/present", {
      data: {
        pod_name,
      },
    });
  }

  async fsMakeDir({ pod_name, dir_path }: FSMakeDir) {
    await this.postRequest<FSMakeDirResponse>("dir/mkdir", {
      pod_name,
      dir_path,
    });

    const dir = new Directory({
      providerUrl: this.providerUrl,
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

  fsUploadFile({
    dfs_compression,
    pod_name,
    pod_dir,
    block_size,
  }: FSUploadFile) {
    return this.postRequest<FSUploadFileResponse>(
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
