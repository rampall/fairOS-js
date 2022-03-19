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
  DocListDBs,
} from "../../internal";

export class UserDocumentDB extends DocumentDBModel {
  /**
   * create a document DB with the given fields as indexes
   */
  async docCreateDB({ pod_name, table_name, si, mutable }: DocCreateDB) {
    return super.docCreateDB({
      pod_name,
      table_name,
      si,
      mutable,
    });
  }

  /**
   * list all the document dbs of the pod
   */
  docListDBs({ pod_name }: DocListDBs) {
    return super.docListDBs({
      pod_name,
    });
  }

  /**
   * open a already created document DB
   */
  async docOpenDB({ pod_name, table_name }: DocOpenDB) {
    return super.docOpenDB({
      pod_name,
      table_name,
    });
  }

  /**
   * Count all the documents based on the expression
   */
  docCount({ pod_name, table_name, expr }: DocCount) {
    return super.docCount({
      pod_name,
      table_name,
      expr,
    });
  }

  /**
   * Delete the given document DB and all its documents and indexes
   */
  docDeleteDB({ pod_name, table_name }: DocDeleteDB) {
    return super.docDeleteDB({
      pod_name,
      table_name,
    });
  }

  /**
   * Find documents from the DB based on a expression
   */
  docFind({ pod_name, table_name, expr, limit }: DocFind) {
    return super.docFind({
      pod_name,
      table_name,
      expr,
      limit,
    });
  }

  /**
   * load a json file in to a given documentDB
   */
  docLoadJson({ file_buffer, file_name, pod_name, table_name }: DocLoadJson) {
    return super.docLoadJson({
      pod_name,
      table_name,
      file_buffer,
      file_name,
    });
  }

  /**
   * Index the json file present in the pod
   */
  docIndexJson({ pod_name, table_name, file }: DocIndexJson) {
    return super.docIndexJson({
      pod_name,
      table_name,
      file,
    });
  }

  /**
   * Insert the document in the documentDB
   */
  docPut({ pod_name, table_name, doc }: DocPut) {
    return super.docPut({
      pod_name,
      table_name,
      doc,
    });
  }

  /**
   * Get the document from the documentDB given the id
   */
  docGet({ pod_name, table_name, id }: DocGet) {
    return super.docGet({
      pod_name,
      table_name,
      id,
    });
  }

  /**
   * Delete the document from the documentDB given the id
   */
  docDelete({ pod_name, table_name, id }: DocDelete) {
    return super.docDelete({
      pod_name,
      table_name,
      id,
    });
  }
}
