import { Request } from "../../request";
import { join } from "path";
//TODO: does path exists in js?

import {
  FSDownloadFileResponse,
  FSShareFileResponse,
  FSDeleteFileResponse,
  FSStatInfoResponse,
} from "../../types/fs";

type Config = {
  providerUrl: string;
  authCookie?: string;
  podName: string;
  podDir: string;
  fileName: string;
  reference: string;
};

export class File extends Request {
  public readonly podName: string;
  public readonly podDir: string;
  public readonly fileName: string;
  public readonly reference: string;
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
    return this.getRequest<FSDownloadFileResponse>("file/download", {
      params: {
        pod_name: this.podName,
        file_path: this.filePath,
      },
    });
  }

  downloadPost() {
    return this.postRequest<FSDownloadFileResponse>("file/download", {
      pod_name: this.podName,
      file_path: this.filePath,
    });
  }

  shareFile({ dest_user }: { dest_user: string }) {
    return this.postRequest<FSShareFileResponse>("file/share", {
      pod_name: this.podName,
      pod_path_file: this.filePath,
      dest_user,
    });
  }

  delete() {
    return this.deleteRequest<FSDeleteFileResponse>("file/delete", {
      params: {
        pod_name: this.podName,
        file_path: this.filePath,
      },
    });
  }

  stat() {
    return this.getRequest<FSStatInfoResponse>("file/stat", {
      params: {
        pod_name: this.podName,
        file_path: this.filePath,
      },
    });
  }
}
