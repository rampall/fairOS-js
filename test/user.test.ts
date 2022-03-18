import "jest";
import { FairOS } from "../src";

describe("User", () => {
  jest.setTimeout(30000);

  it("", async () => {
    const fairOS = new FairOS({ providerUrl: process.env.FAIROS_API! });

    try {
      const user = await fairOS.userLogin({
        user_name: "soheil123456",
        password: "123456",
      });
      const pod = await user.podOpen({
        pod_name: "test_pod",
        password: "123456",
      });

      const kvTables = await pod.kvListTables();

      console.log(kvTables.Tables[1]);

      // await fsDir.uploadFile({
      //   local_path: "/home/soheil/Downloads/soheil.png",
      //   block_size: "1Mb",
      //   dfs_compression: "gzip",
      // });

      // const fsDirParent = pod.openDir({ dir_path: "/test" });
      // const fsDir = await fsDirParent.makeDir({ dir_name: "test3" });

      // const ls = await fsDirParent.ls();

      // console.log(ls);
    } catch (err) {
      console.log(err);
    }
  });
});
