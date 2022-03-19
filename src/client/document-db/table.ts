import {
  DocumentDBModel,
  DocCount,
  DocDelete,
  DocFind,
  DocGet,
  DocIndexJson,
  DocPut,
  DocLoadJson,
} from "../../internal";

type Config = {
  providerUrl: string;
  cookies?: string;
  podName: string;
  tableName: string;
};

type omit<T> = Omit<T, "pod_name" | "table_name">;

export class DocumentTableClient extends DocumentDBModel {
  public readonly podName: string;
  public readonly tableName: string;

  constructor(config: Config) {
    super(config);
    this.podName = config.podName;
    this.tableName = config.tableName;
  }

  countDoc({ expr }: omit<DocCount>) {
    return super.docCount({
      pod_name: this.podName,
      table_name: this.tableName,
      expr,
    });
  }

  delete() {
    return super.docDeleteDB({
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  findDoc({ expr, limit }: omit<DocFind>) {
    return super.docFind({
      pod_name: this.podName,
      table_name: this.tableName,
      expr,
      limit,
    });
  }

  loadJson({ file_buffer, file_name }: omit<DocLoadJson>) {
    return super.docLoadJson({
      pod_name: this.podName,
      table_name: this.tableName,
      file_buffer,
      file_name,
    });
  }

  indexJson({ file }: omit<DocIndexJson>) {
    return super.docIndexJson({
      pod_name: this.podName,
      table_name: this.tableName,
      file,
    });
  }

  putDoc({ doc }: omit<DocPut>) {
    return super.docPut({
      pod_name: this.podName,
      table_name: this.tableName,
      doc,
    });
  }

  getDoc({ id }: omit<DocGet>) {
    return super.docGet({
      pod_name: this.podName,
      table_name: this.tableName,
      id,
    });
  }

  deleteDoc({ id }: omit<DocDelete>) {
    return super.docDelete({
      pod_name: this.podName,
      table_name: this.tableName,
      id,
    });
  }
}
