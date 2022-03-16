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
  async docCreateDB({ pod_name, table_name, si, mutable }: DocCreateDB) {
    return super.docCreateDB({
      pod_name,
      table_name,
      si,
      mutable,
    });
  }

  docListDBs({ pod_name }: DocListDBs) {
    return super.docListDBs({
      pod_name,
    });
  }

  async docOpenDB({ pod_name, table_name }: DocOpenDB) {
    return super.docOpenDB({
      pod_name,
      table_name,
    });
  }

  docCount({ pod_name, table_name, expr }: DocCount) {
    return super.docCount({
      pod_name,
      table_name,
      expr,
    });
  }

  docDeleteDB({ pod_name, table_name }: DocDeleteDB) {
    return super.docDeleteDB({
      pod_name,
      table_name,
    });
  }

  docFind({ pod_name, table_name, expr, limit }: DocFind) {
    return super.docFind({
      pod_name,
      table_name,
      expr,
      limit,
    });
  }

  docLoadJson({ pod_name, table_name }: DocLoadJson) {
    return super.docLoadJson({
      pod_name,
      table_name,
    });
  }

  docIndexJson({ pod_name, table_name, file }: DocIndexJson) {
    return super.docIndexJson({
      pod_name,
      table_name,
      file,
    });
  }

  docPut({ pod_name, table_name, doc }: DocPut) {
    return super.docPut({
      pod_name,
      table_name,
      doc,
    });
  }

  docGet({ pod_name, table_name, id }: DocGet) {
    return super.docGet({
      pod_name,
      table_name,
      id,
    });
  }

  docDelete({ pod_name, table_name, id }: DocDelete) {
    return super.docDelete({
      pod_name,
      table_name,
      id,
    });
  }
}
