import "jest";
import { FairOS } from "fairos-js";

describe("User", () => {
  jest.setTimeout(30000);

  beforeAll(() => {});

  it("", async () => {
    const fairOS = new FairOS({ providerUrl: process.env.FAIROS_API! });

    const user = await fairOS.userLogin({
      user_name: "soheil",
      password: "123",
    });

    const pod = await user.podNew({ pod_name: "test", password: "123" });

    await pod.share({ password: "123" });

    const dir = await pod.makeDir({ dir_path: "/" });

    const file = await dir.uploadFile({
      dfs_compression: "gzip",
      block_size: "1000",
    });

    await file.delete();

    const kvTable = await pod.kvNewTable({
      table_name: "test2",
      indexType: "number",
    });

    const pairs = await kvTable.countPairs();

    console.log(
      `table: ${pairs.table_name}, key-value pairs count: ${pairs.count}`
    );
  });
});
