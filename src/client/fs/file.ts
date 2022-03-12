import { Request } from "../../request";
import { join } from "path";
//TODO: does path exists in js?
type Config = {
  providerUrl: string;
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
}
