import { createTestConf, Fixtures } from "../../shared/test.helper";

describe("businessData test", () => {
  let fixtures: Fixtures;

  beforeEach(async () => {
    fixtures = await createTestConf();
  });
  afterEach(async () => {
    await fixtures.close();
  });

  describe("createBusinessData", () => {
    it("can create a businessData and retrieve it", async () => {
      const initialOfferPrice = 100_000;
      const finalOfferPrice = 95_000;
      const targetSalePrice = 98_000;

      const home = await fixtures.homeResolver.createHome({
        zipcode: "75016",
        surfaceM2: 20,
      });

      const expectedBusinessData =
        await fixtures.businessDataResolver.generateBusinessDataForHome(
          home.uuid,
          initialOfferPrice,
          finalOfferPrice,
          targetSalePrice
        );

      const actual =
        await fixtures.businessDataResolver.getBusinessDataFromHomeUuid(
          home.uuid
        );
      expect(actual).toEqual(expectedBusinessData);
    });

    it("create a businessData with all informations", async () => {
      const initialOfferPrice = 100_000;
      const finalOfferPrice = 95_000;
      const targetSalePrice = 98_000;

      const home = await fixtures.homeResolver.createHome({
        zipcode: "75016",
        surfaceM2: 20,
      });

      await fixtures.businessDataResolver.generateBusinessDataForHome(
        home.uuid,
        initialOfferPrice,
        finalOfferPrice,
        targetSalePrice
      );

      const completeBusinessData =
        await fixtures.businessDataService.findBusinessDataByHomeUuid(
          home.uuid
        );
      expect(completeBusinessData).toMatchObject({
        homeUuid: home.uuid,
        initialOfferPrice,
        finalOfferPrice,
        targetSalePrice,
        serviceFees: 20_000,
        negociationMargin: targetSalePrice / finalOfferPrice - 1,
      });
    });
  });
});
