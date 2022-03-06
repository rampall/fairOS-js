import { Base } from "./base";
import { applyMixins } from "./utils";

// import { DocumentDB } from './document-db'
// import { FileSystem } from './file-system'
// import { KeyValueStore } from './key-value-store'
// import { Pod } from './pod'
import { User } from "./user";

class FairOS extends Base {}
interface FairOS extends User {} //DocumentDB, FileSystem, KeyValueStore, Pod, User {}
applyMixins(FairOS, [User]); //[DocumentDB, FileSystem, KeyValueStore, Pod, User])

export default FairOS;
