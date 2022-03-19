import { join } from "path";

import {
  FSReceiveFile,
  FSReceiveFileInfo,
  FSUploadFile,
  FSModel,
} from "../../internal";

type Config = {
  providerUrl: string;
  cookies?: string;
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

  /**
   * make a new directory inside the directory
   */
  makeDir({ dir_name }: { dir_name: string }) {
    const dir_path = join(this.path, dir_name);
    return super.fsMakeDir({ pod_name: this.podName, dir_path });
  }

  /**
   * open an existing directory inside the directory
   */
  openDir({ dir_name }: { dir_name: string }) {
    const dir_path = join(this.path, dir_name);
    return super.fsOpenDir({ pod_name: this.podName, dir_path });
  }

  /**
   * remove a directory inside the directory
   */
  removeDir({ dir_name }: { dir_name: string }) {
    const dir_path = join(this.path, dir_name);
    return super.fsRemoveDir({ pod_name: this.podName, dir_path });
  }

  /**
   * remove the current directory
   */
  remove() {
    return super.fsRemoveDir({
      pod_name: this.podName,
      dir_path: this.path,
    });
  }

  /**
   * List all the files and directory inside the directory
   */
  ls() {
    return super.fsListDir({
      pod_name: this.podName,
      dir_path: this.path,
    });
  }

  /**
   * Show the directory related information
   */
  stat() {
    return super.fsStatDir({
      pod_name: this.podName,
      dir_path: this.path,
    });
  }

  /**
   * Is directory present
   */
  isPresent() {
    return super.fsDirPresent({
      pod_name: this.podName,
      dir_path: this.path,
    });
  }

  /**
   * upload a file to dfs
   */
  uploadFile({
    file_buffer,
    file_name,
    dfs_compression,
    block_size,
  }: omit<FSUploadFile>) {
    return super.fsUploadFile({
      file_buffer,
      file_name,
      pod_name: this.podName,
      pod_dir: this.path,
      dfs_compression,
      block_size,
    });
  }

  /**
   * Download a file from the pod tp the local dir
   */
  downloadFile({ file_name }: { file_name: string }) {
    const file_path = join(this.path, file_name);

    return super.fsDownloadFile({
      pod_name: this.podName,
      file_path,
    });
  }

  /**
   * Share a file with another user
   */
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

  /**
   * Receive file that was shared by another user
   */
  receiveFile({ sharing_ref }: omit<FSReceiveFile>) {
    return super.fsReceiveFile({
      pod_name: this.podName,
      sharing_ref,
      dir_path: this.path,
    });
  }

  /**
   * Receive file info that is being shared by another user
   */
  receiveFileInfo({ sharing_ref }: omit<FSReceiveFileInfo>) {
    return super.fsReceiveFileInfo({
      pod_name: this.podName,
      sharing_ref,
    });
  }

  /**
   * Delete a file in the directory
   */
  deleteFile({ file_name }: { file_name: string }) {
    const file_path = join(this.path, file_name);

    return super.fsDeleteFile({
      pod_name: this.podName,
      file_path,
    });
  }

  /**
   * Get the information about a file in the directory
   */
  statInfo({ file_name }: { file_name: string }) {
    const file_path = join(this.path, file_name);

    return super.fsStatInfo({
      pod_name: this.podName,
      file_path,
    });
  }
}
