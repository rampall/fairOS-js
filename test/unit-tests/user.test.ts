import "jest";
import { FairOS } from "../../src/client/fair-os";

describe("User", () => {
  jest.setTimeout(30000);

  beforeAll(() => {});

  it("", async () => {
    const fairOS = new FairOS({ providerUrl: process.env.FAIROS_API! });

    const user = await fairOS.userSignup({
      user_name: "testtesttesttt",
      password: "1234567",
    });

    console.log(user.address);
    const stat = await user.stat();
    console.log(stat);
  });
});
