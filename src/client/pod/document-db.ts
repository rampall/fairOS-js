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

  async docCreateDB({ table_name, si, mutable }: omit<DocCreateDB>) {
    return super.docCreateDB({
      pod_name: this.podName,
      table_name,
      si,
      mutable,
    });
  }

  docListDBs() {
    return super.docListDBs({
      pod_name: this.podName,
    });
  }

  async docOpenDB({ table_name }: omit<DocOpenDB>) {
    return super.docOpenDB({
      pod_name: this.podName,
      table_name,
    });
  }

  docCount({ table_name, expr }: omit<DocCount>) {
    return super.docCount({
      pod_name: this.podName,
      table_name,
      expr,
    });
  }

  docDeleteDB({ table_name }: omit<DocDeleteDB>) {
    return super.docDeleteDB({
      pod_name: this.podName,
      table_name,
    });
  }

  docFind({ table_name, expr, limit }: omit<DocFind>) {
    return super.docFind({
      pod_name: this.podName,
      table_name,
      expr,
      limit,
    });
  }

  docLoadJson({ file_buffer, file_name, table_name }: omit<DocLoadJson>) {
    return super.docLoadJson({
      pod_name: this.podName,
      table_name,
      file_buffer,
      file_name,
    });
  }

  docIndexJson({ table_name, file }: omit<DocIndexJson>) {
    return super.docIndexJson({
      pod_name: this.podName,
      table_name,
      file,
    });
  }

  docPut({ table_name, doc }: omit<DocPut>) {
    return super.docPut({
      pod_name: this.podName,
      table_name,
      doc,
    });
  }

  docGet({ table_name, id }: omit<DocGet>) {
    return super.docGet({
      pod_name: this.podName,
      table_name,
      id,
    });
  }

  docDelete({ table_name, id }: omit<DocDelete>) {
    return super.docDelete({
      pod_name: this.podName,
      table_name,
      id,
    });
  }
}
