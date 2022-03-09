import { Base } from "./base";
import { applyMixins } from "./utils";

import { DocumentDB } from "./document-db";
import { FileSystem } from "./file-system";
import { KeyValueStore } from "./key-value-store";
import { Pod } from "./pod";
import { User } from "./user";

class FairOS extends Base {}
interface FairOS extends User, Pod, FileSystem, KeyValueStore, DocumentDB {}
applyMixins(FairOS, [User, Pod, FileSystem, KeyValueStore, DocumentDB]);

export { FairOS };
