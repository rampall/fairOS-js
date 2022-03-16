import { FSModel } from "../../internal";

import { join } from "path";
//TODO: does path exists in js?

type Config = {
  providerUrl: string;
  authCookie?: string;
  podName: string;
  podDir: string;
  fileName: string;
  reference?: string;
};

export class FSFileClient extends FSModel {
  public readonly podName: string;
  public readonly podDir: string;
  public readonly fileName: string;
  public readonly reference?: string;
  public readonly filePath: string;

  constructor(config: Config) {
    super(config);
    this.podName = config.podName;
    this.podDir = config.podDir;
    this.fileName = config.fileName;
    this.reference = config.reference;
    this.filePath = join(this.podDir, this.fileName);
  }

  downloadGet() {
    return super.fsDownloadFileGet({
      pod_name: this.podName,
      file_path: this.filePath,
    });
  }

  downloadPost() {
    return super.fsDownloadFilePost({
      pod_name: this.podName,
      file_path: this.filePath,
    });
  }

  shareFile({ dest_user }: { dest_user: string }) {
    return super.fsShareFile({
      pod_name: this.podName,
      pod_path_file: this.filePath,
      dest_user,
    });
  }

  delete() {
    return super.fsDeleteFile({
      pod_name: this.podName,
      file_path: this.filePath,
    });
  }

  stat() {
    return super.fsStatInfo({
      pod_name: this.podName,
      file_path: this.filePath,
    });
  }
}
