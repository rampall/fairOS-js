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
  FSOpenDir,
} from "../../internal";

export class UserFS extends FSModel {
  /**
   * make a new directory inside a pod
   */
  async fsMakeDir({ pod_name, dir_path }: FSMakeDir) {
    return super.fsMakeDir({ pod_name, dir_path });
  }

  /**
   * open an existing directory inside a pod
   */
  fsOpenDir({ pod_name, dir_path }: FSOpenDir) {
    return super.fsOpenDir({ pod_name, dir_path });
  }

  /**
   * remove a directory inside a pod
   */
  fsRemoveDir({ pod_name, dir_path }: FSRemoveDir) {
    return super.fsRemoveDir({ pod_name, dir_path });
  }

  /**
   * List all the files and directory inside a directory
   */
  fsListDir({ pod_name, dir_path }: FSListDir) {
    return super.fsListDir({ pod_name, dir_path });
  }

  /**
   * Show a directory related information
   */
  fsStatDir({ pod_name, dir_path }: FSStatDir) {
    return super.fsStatDir({ pod_name, dir_path });
  }

  /**
   * Is directory present
   */
  fsDirPresent({ pod_name, dir_path }: FSDirPresent) {
    return super.fsDirPresent({ pod_name, dir_path });
  }

  /**
   * upload a file to dfs
   */
  fsUploadFile({
    file_buffer,
    file_name,
    pod_name,
    dfs_compression,
    pod_dir,
    block_size,
  }: FSUploadFile) {
    return super.fsUploadFile({
      file_buffer,
      file_name,
      pod_name,
      pod_dir,
      dfs_compression,
      block_size,
    });
  }

  /**
   * Download a file from the pod tp the local dir
   */
  fsDownloadFile({ pod_name, file_path }: FSDownloadFile) {
    return super.fsDownloadFile({ pod_name, file_path });
  }

  /**
   * Share a file with another user
   */
  fsShareFile({ pod_name, pod_path_file, dest_user }: FSShareFile) {
    return super.fsShareFile({
      pod_name,
      pod_path_file,
      dest_user,
    });
  }

  /**
   * Receive file that was shared by another user
   */
  fsReceiveFile({ pod_name, sharing_ref, dir_path }: FSReceiveFile) {
    return super.fsReceiveFile({
      pod_name,
      sharing_ref,
      dir_path,
    });
  }

  /**
   * Receive file info that is being shared by another user
   */
  fsReceiveFileInfo({ pod_name, sharing_ref }: FSReceiveFileInfo) {
    return super.fsReceiveFileInfo({
      pod_name,
      sharing_ref,
    });
  }

  /**
   * Delete a file in the pod
   */
  fsDeleteFile({ pod_name, file_path }: FSDeleteFile) {
    return super.fsDeleteFile({
      pod_name,
      file_path,
    });
  }

  /**
   * Get the information about a file in the pod
   */
  fsStatInfo({ pod_name, file_path }: FSStatInfo) {
    return super.fsStatInfo({
      pod_name,
      file_path,
    });
  }
}
