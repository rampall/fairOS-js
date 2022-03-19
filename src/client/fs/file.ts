import { FSModel, buildPath } from "../../internal";

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
    this.filePath = buildPath(this.podDir, this.fileName);
  }

  /**
   * Download the file from the pod tp the local dir
   */
  download() {
    return super.fsDownloadFile({
      pod_name: this.podName,
      file_path: this.filePath,
    });
  }

  /**
   * Share the file with another user
   */
  share({ dest_user }: { dest_user: string }) {
    return super.fsShareFile({
      pod_name: this.podName,
      pod_path_file: this.filePath,
      dest_user,
    });
  }

  /**
   * Delete the file in the pod
   */
  delete() {
    return super.fsDeleteFile({
      pod_name: this.podName,
      file_path: this.filePath,
    });
  }

  /**
   * Get the information about the file in the pod
   */
  stat() {
    return super.fsStatInfo({
      pod_name: this.podName,
      file_path: this.filePath,
    });
  }
}
