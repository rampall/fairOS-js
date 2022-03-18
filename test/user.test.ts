import { FairOS, User } from "../src";

describe("User", () => {
  const userName = "test" + new Date().getTime();
  const password = "123456";
  let user: User;
  let fairOS: FairOS;

  beforeAll(async () => {
    fairOS = new FairOS({
      providerUrl: process.env.FAIROS_API!,
    });

    user = await fairOS.userSignup({
      user_name: userName,
      password,
    });
  });

  it("should stat user", async () => {
    const stat = await user.stat();

    expect(stat.address || stat.reference).toBeTruthy();
    expect(stat.user_name).toEqual(userName);
  });

  it("should check if user is logged in", async () => {
    const result = await user.isLoggedIn();
    expect(result.loggedin).toEqual(true);
  });

  it("should logout user", async () => {
    await user.logout();

    const result = await user.isLoggedIn();
    expect(result.loggedin).toEqual(false);
  });

  it("should delete user", async () => {
    user = await fairOS.userLogin({
      user_name: userName,
      password,
    });

    await user.delete({
      password,
    });

    try {
      await fairOS.userLogin({
        user_name: userName,
        password,
      });

      expect(true).toBe(false);
    } catch (err) {}
  });
});
