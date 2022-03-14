import { FairOSClient as FairOS } from "./client/fair-os";

export { UserClient as User } from "./client/user";
export { FSDirectoryClient as FSDirectory } from "./client/fs/directory";
export { FSFileClient as FSFile } from "./client/fs/file";
export { PodClient as Pod } from "./client/pod";
export { KVTableClient as KVTable } from "./client/kv-store/table";
export { DocumentTableClient as DocumentTable } from "./client/document-db/table";

export { FairOS };
export default FairOS;
