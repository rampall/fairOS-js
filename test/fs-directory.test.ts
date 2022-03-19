import FairOS from "../src";
import { readFileSync } from "fs";

describe("FS Directory", () => {
  it("should upload a file", async () => {
    try {
      const fairOS = new FairOS({ providerUrl: process.env.FAIROS_API! });
      const user = await fairOS.userSignup({
        user_name: "test" + new Date().getTime(),
        password: "123456",
      });

      const pod = await user.podNew({
        pod_name: "test_pod",
        password: "123456",
      });

      const dir = await pod.makeDir({
        dir_path: "/pdf",
      });

      const buf = readFileSync("/home/soheil/Downloads/soheil.png");
      await dir.uploadFile({
        file_buffer: buf,
        file_name: "test.png",
        dfs_compression: "gzip",
        block_size: "1Mb",
      });

      const ls = await dir.ls();
      console.log(ls);
    } catch (err) {
      console.log(err);
    }
  });
});
