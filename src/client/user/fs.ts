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
  async fsMakeDir({ pod_name, dir_path }: FSMakeDir) {
    return super.fsMakeDir({ pod_name, dir_path });
  }

  fsOpenDir({ pod_name, dir_path }: FSOpenDir) {
    return super.fsOpenDir({ pod_name, dir_path });
  }

  fsRemoveDir({ pod_name, dir_path }: FSRemoveDir) {
    return super.fsRemoveDir({ pod_name, dir_path });
  }

  fsListDir({ pod_name, dir_path }: FSListDir) {
    return super.fsListDir({ pod_name, dir_path });
  }

  fsStatDir({ pod_name, dir_path }: FSStatDir) {
    return super.fsStatDir({ pod_name, dir_path });
  }

  fsDirPresent({ pod_name, dir_path }: FSDirPresent) {
    return super.fsDirPresent({ pod_name, dir_path });
  }

  async fsUploadFile({
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

  fsDownloadFile({ pod_name, file_path }: FSDownloadFile) {
    return super.fsDownloadFile({ pod_name, file_path });
  }

  fsShareFile({ pod_name, pod_path_file, dest_user }: FSShareFile) {
    return super.fsShareFile({
      pod_name,
      pod_path_file,
      dest_user,
    });
  }

  fsReceiveFile({ pod_name, sharing_ref, dir_path }: FSReceiveFile) {
    return super.fsReceiveFile({
      pod_name,
      sharing_ref,
      dir_path,
    });
  }

  fsReceiveFileInfo({ pod_name, sharing_ref }: FSReceiveFileInfo) {
    return super.fsReceiveFileInfo({
      pod_name,
      sharing_ref,
    });
  }

  fsDeleteFile({ pod_name, file_path }: FSDeleteFile) {
    return super.fsDeleteFile({
      pod_name,
      file_path,
    });
  }

  fsStatInfo({ pod_name, file_path }: FSStatInfo) {
    return super.fsStatInfo({
      pod_name,
      file_path,
    });
  }
}
