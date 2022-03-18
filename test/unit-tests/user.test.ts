import "jest";
import { FairOS } from "../../src";

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

      const kvTable = await pod.kvOpenTable({
        table_name: "test2_kv_table",
      });

      await kvTable.putPair({ key: "test2", value: "12345" });

      const pair = await kvTable.getValue({
        key: "test2",
        format: "byte-string",
      });

      console.log(pair);
    } catch (err) {
      console.log(err);
    }
  });
});
