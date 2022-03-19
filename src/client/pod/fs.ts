import {
  FSDeleteFile,
  FSDirPresent,
  FSDownloadFile,
  FSListDir,
  FSMakeDir,
  FSReceiveFileInfo,
  FSReceiveFile,
  FSRemoveDir,
  FSShareFile,
  FSStatDir,
  FSStatInfo,
  FSUploadFile,
  FSModel,
} from "../../internal";

type omit<T> = Omit<T, "pod_name">;

export class PodFS extends FSModel {
  public readonly podName: string = "";

  /**
   * make a new directory inside the pod
   */
  async makeDir({ dir_path }: omit<FSMakeDir>) {
    return super.fsMakeDir({ pod_name: this.podName, dir_path });
  }

  /**
   * open an existing directory inside the pod
   */
  openDir({ dir_path }: omit<FSMakeDir>) {
    return super.fsOpenDir({ pod_name: this.podName, dir_path });
  }

  /**
   * remove a directory inside the pod
   */
  removeDir({ dir_path }: omit<FSRemoveDir>) {
    return super.fsRemoveDir({ pod_name: this.podName, dir_path });
  }

  /**
   * List all the files and directory inside a directory
   */
  listDir({ dir_path }: omit<FSListDir>) {
    return super.fsListDir({ pod_name: this.podName, dir_path });
  }

  /**
   * Show a directory related information
   */
  statDir({ dir_path }: omit<FSStatDir>) {
    return super.fsStatDir({ pod_name: this.podName, dir_path });
  }

  /**
   * Is directory present
   */
  isDirPresent({ dir_path }: omit<FSDirPresent>) {
    return super.fsDirPresent({ pod_name: this.podName, dir_path });
  }

  /**
   * upload a file to dfs
   */
  uploadFile({
    file_buffer,
    file_name,
    dfs_compression,
    pod_dir,
    block_size,
  }: omit<FSUploadFile>) {
    return super.fsUploadFile({
      file_buffer,
      file_name,
      pod_name: this.podName,
      pod_dir,
      dfs_compression,
      block_size,
    });
  }

  /**
   * Download a file from the pod tp the local dir
   */
  downloadFile({ file_path }: omit<FSDownloadFile>) {
    return super.fsDownloadFile({ pod_name: this.podName, file_path });
  }

  /**
   * Share a file with another user
   */
  shareFile({ pod_path_file, dest_user }: omit<FSShareFile>) {
    return super.fsShareFile({
      pod_name: this.podName,
      pod_path_file,
      dest_user,
    });
  }

  /**
   * Receive file that was shared by another user
   */
  receiveFile({ sharing_ref, dir_path }: omit<FSReceiveFile>) {
    return super.fsReceiveFile({
      pod_name: this.podName,
      sharing_ref,
      dir_path,
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
   * Delete a file in the pod
   */
  deleteFile({ file_path }: omit<FSDeleteFile>) {
    return super.fsDeleteFile({
      pod_name: this.podName,
      file_path,
    });
  }

  /**
   * Get the information about a file in the pod
   */
  statInfo({ file_path }: omit<FSStatInfo>) {
    return super.fsStatInfo({
      pod_name: this.podName,
      file_path,
    });
  }
}
