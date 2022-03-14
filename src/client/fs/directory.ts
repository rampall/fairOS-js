import { join } from "path";

import { FSReceiveFile, FSReceiveFileInfo, FSUploadFile } from "../../types/fs";
import { FSModel } from "../../models/fs";

type Config = {
  providerUrl: string;
  authCookie?: string;
  podName: string;
  path: string;
};

type omit<T> = Omit<T, "pod_name" | "pod_dir" | "dir_path">;

export class FSDirectoryClient extends FSModel {
  public podName: string;
  public path: string;

  constructor(config: Config) {
    super(config);
    this.path = config.path;
    this.podName = config.podName;
  }

  remove() {
    return super.fsRemoveDir({
      pod_name: this.podName,
      dir_path: this.path,
    });
  }

  ls() {
    return super.fsListDir({
      pod_name: this.podName,
      dir_path: this.path,
    });
  }

  stat() {
    return super.fsStatDir({
      pod_name: this.podName,
      dir_path: this.path,
    });
  }

  isPresent() {
    return super.fsDirPresent({
      pod_name: this.podName,
      dir_path: this.path,
    });
  }

  uploadFile({ dfs_compression, block_size }: omit<FSUploadFile>) {
    return super.fsUploadFile({
      pod_name: this.podName,
      pod_dir: this.path,
      dfs_compression,
      block_size,
    });
  }

  downloadFileGet({ file_name }: { file_name: string }) {
    const file_path = join(this.path, file_name);

    return super.fsDownloadFileGet({
      pod_name: this.podName,
      file_path,
    });
  }

  downloadFilePost({ file_name }: { file_name: string }) {
    const file_path = join(this.path, file_name);

    return super.fsDownloadFilePost({
      pod_name: this.podName,
      file_path,
    });
  }

  shareFile({
    file_name,
    dest_user,
  }: {
    file_name: string;
    dest_user: string;
  }) {
    const file_path = join(this.path, file_name);

    return super.fsShareFile({
      pod_name: this.podName,
      pod_path_file: file_path,
      dest_user,
    });
  }

  receiveFile({ sharing_ref }: omit<FSReceiveFile>) {
    return super.fsReceiveFile({
      pod_name: this.podName,
      sharing_ref,
      dir_path: this.path,
    });
  }

  receiveFileInfo({ sharing_ref }: omit<FSReceiveFileInfo>) {
    return super.fsReceiveFileInfo({
      pod_name: this.podName,
      sharing_ref,
    });
  }

  deleteFile({ file_name }: { file_name: string }) {
    const file_path = join(this.path, file_name);

    return super.fsDeleteFile({
      pod_name: this.podName,
      file_path,
    });
  }

  statInfo({ file_name }: { file_name: string }) {
    const file_path = join(this.path, file_name);

    return super.fsStatInfo({
      pod_name: this.podName,
      file_path,
    });
  }
}
