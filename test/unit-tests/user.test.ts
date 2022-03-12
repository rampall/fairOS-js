import "jest";
import { FairOS } from "../../src";

describe("User", () => {
  jest.setTimeout(30000);

  beforeAll(() => {});

  it("", async () => {
    const fairOS = new FairOS({ providerUrl: process.env.FAIROS_API! });
  });
});
