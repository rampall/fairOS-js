import "jest";
import { FairOS } from "fairos-js";

describe("User", () => {
  jest.setTimeout(30000);

  beforeAll(() => {
    const fairOS = new FairOS({ providerUrl: process.env.FAIROS_API! });
  });

  it("", async () => {});
});
