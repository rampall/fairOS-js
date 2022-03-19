import FairOS from "../src";

describe("FairOS", () => {
  let fairOS: FairOS;

  beforeAll(() => {
    fairOS = new FairOS({ providerUrl: process.env.FAIROS_API! });
  });

  it("should sign up, login user using user_name and password", async () => {
    const userName = "test" + new Date().getTime();
    const password = "123456";

    await fairOS.userSignup({
      user_name: userName,
      password,
    });

    await fairOS.userLogin({
      user_name: userName,
      password,
    });
  });
});
