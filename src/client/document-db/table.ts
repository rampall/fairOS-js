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

  /**
   * Open then current documentDB
   */
  open() {
    return super.docOpenDB({
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  /**
   * Count all the documents based on the expression
   */
  countDoc({ expr }: omit<DocCount>) {
    return super.docCount({
      pod_name: this.podName,
      table_name: this.tableName,
      expr,
    });
  }

  /**
   * Delete the document DB and all its documents and indexes
   */
  delete() {
    return super.docDeleteDB({
      pod_name: this.podName,
      table_name: this.tableName,
    });
  }

  /**
   * Find documents from the DB based on a expression
   */
  findDoc({ expr, limit }: omit<DocFind>) {
    return super.docFind({
      pod_name: this.podName,
      table_name: this.tableName,
      expr,
      limit,
    });
  }

  /**
   * load a json file in to the documentDB
   */
  loadJson({ file_buffer, file_name }: omit<DocLoadJson>) {
    return super.docLoadJson({
      pod_name: this.podName,
      table_name: this.tableName,
      file_buffer,
      file_name,
    });
  }

  /**
   * Index the json file present in the pod
   */
  indexJson({ file }: omit<DocIndexJson>) {
    return super.docIndexJson({
      pod_name: this.podName,
      table_name: this.tableName,
      file,
    });
  }

  /**
   * Insert the document in the documentDB
   */
  putDoc({ doc }: omit<DocPut>) {
    return super.docPut({
      pod_name: this.podName,
      table_name: this.tableName,
      doc,
    });
  }

  /**
   * Get the document from the documentDB given the id
   */
  getDoc({ id }: omit<DocGet>) {
    return super.docGet({
      pod_name: this.podName,
      table_name: this.tableName,
      id,
    });
  }

  /**
   * Delete the document from the documentDB given the id
   */
  deleteDoc({ id }: omit<DocDelete>) {
    return super.docDelete({
      pod_name: this.podName,
      table_name: this.tableName,
      id,
    });
  }
}
