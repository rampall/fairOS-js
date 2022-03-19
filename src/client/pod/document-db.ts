import {
  DocumentDBModel,
  DocCount,
  DocCreateDB,
  DocDeleteDB,
  DocDelete,
  DocFind,
  DocGet,
  DocIndexJson,
  DocLoadJson,
  DocOpenDB,
  DocPut,
} from "../../internal";

type omit<T> = Omit<T, "pod_name">;

export class PodDocumentDB extends DocumentDBModel {
  public readonly podName: string = "";

  /**
   * create a document DB with the given fields as indexes
   */
  async docCreateDB({ table_name, si, mutable }: omit<DocCreateDB>) {
    return super.docCreateDB({
      pod_name: this.podName,
      table_name,
      si,
      mutable,
    });
  }

  /**
   * list all the document dbs of the pod
   */
  docListDBs() {
    return super.docListDBs({
      pod_name: this.podName,
    });
  }

  /**
   * open a already created documentDB
   */
  docOpenDB({ table_name }: omit<DocOpenDB>) {
    return super.docOpenDB({
      pod_name: this.podName,
      table_name,
    });
  }

  /**
   * Count all the documents on the given documentDB based on the expression
   */
  docCount({ table_name, expr }: omit<DocCount>) {
    return super.docCount({
      pod_name: this.podName,
      table_name,
      expr,
    });
  }

  /**
   * Delete the given documentDB on the pod and all its documents and indexes
   */
  docDeleteDB({ table_name }: omit<DocDeleteDB>) {
    return super.docDeleteDB({
      pod_name: this.podName,
      table_name,
    });
  }

  /**
   * Find documents from the given DB on the pod based on a expression
   */
  docFind({ table_name, expr, limit }: omit<DocFind>) {
    return super.docFind({
      pod_name: this.podName,
      table_name,
      expr,
      limit,
    });
  }

  /**
   * load a json file in to the given documentDB in the pod
   */
  docLoadJson({ file_buffer, file_name, table_name }: omit<DocLoadJson>) {
    return super.docLoadJson({
      pod_name: this.podName,
      table_name,
      file_buffer,
      file_name,
    });
  }

  /**
   * Index the json file present in the pod
   */
  docIndexJson({ table_name, file }: omit<DocIndexJson>) {
    return super.docIndexJson({
      pod_name: this.podName,
      table_name,
      file,
    });
  }

  /**
   * Insert the document in the given documentDB
   */
  docPut({ table_name, doc }: omit<DocPut>) {
    return super.docPut({
      pod_name: this.podName,
      table_name,
      doc,
    });
  }

  /**
   * Get the document from the documentDB given the id
   */
  docGet({ table_name, id }: omit<DocGet>) {
    return super.docGet({
      pod_name: this.podName,
      table_name,
      id,
    });
  }

  /**
   * Delete the document from the documentDB given the id
   */
  docDelete({ table_name, id }: omit<DocDelete>) {
    return super.docDelete({
      pod_name: this.podName,
      table_name,
      id,
    });
  }
}
