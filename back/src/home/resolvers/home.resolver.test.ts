import { createTestConf, Fixtures } from "../../shared/test.helper";

describe("home test", () => {
  let fixtures: Fixtures;

  beforeEach(async () => {
    fixtures = await createTestConf();
  });
  afterEach(async () => {
    await fixtures.close();
  });

  describe("createHome", () => {
    it("can create a home adn retrieve it", async () => {
      const home = await fixtures.homeResolver.createHome({
        zipcode: "75016",
        surfaceM2: 20,
      });
      expect(home.surfaceM2).toBe(20);
      expect(home.zipcode).toBe("75016");
      expect(await fixtures.homeResolver.getHome(home.uuid)).toEqual(home);
    });
  });
});
