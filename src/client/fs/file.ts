import { FSModel } from "../../internal";

import { join } from "path";
//TODO: does path exists in js?

type Config = {
  providerUrl: string;
  cookies?: string;
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

  download() {
    return super.fsDownloadFile({
      pod_name: this.podName,
      file_path: this.filePath,
    });
  }

  share({ dest_user }: { dest_user: string }) {
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
