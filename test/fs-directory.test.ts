import FairOS from "../src";

describe("FS Directory", () => {
  it("should upload a file", async () => {
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

    const buffer = Buffer.from("test file", "utf-8");
    await dir.uploadFile({
      file_buffer: buffer,
      file_name: "test.txt",
      dfs_compression: "gzip",
      block_size: "1Mb",
    });
  });
});
