import { NegociationMargin } from "./NegociationMargin";

describe("NegociationMargin", () => {
  test("when margin on target sale is lower than maxNegociationMargin then apply negociated margin", () => {
    const finalOfferPrice = 75;
    const targetSalePrice = 100;
    const maxNegociationMargin = 5;

    const negociationMargin = new NegociationMargin(
      finalOfferPrice,
      targetSalePrice,
      maxNegociationMargin
    );

    expect(negociationMargin.marginToApply()).toBe(
      targetSalePrice / finalOfferPrice - 1
    );
  });

  test("when margin on target sale is greater than maxNegociationMargin then apply maxNegociationMargin", () => {
    const finalOfferPrice = 75;
    const targetSalePrice = 100;
    const maxNegociationMargin = 0.1;

    const negociationMargin = new NegociationMargin(
      finalOfferPrice,
      targetSalePrice,
      maxNegociationMargin
    );

    expect(negociationMargin.marginToApply()).toBe(maxNegociationMargin);
  });

  test("when no maxNegociationMargin is specified then apply 7%", () => {
    const finalOfferPrice = 10;
    const targetSalePrice = 100;
    const defaultMaxNegociationMargin = 7;

    const negociationMargin = new NegociationMargin(
      finalOfferPrice,
      targetSalePrice
    );

    expect(negociationMargin.marginToApply()).toBe(defaultMaxNegociationMargin);
  });
});
