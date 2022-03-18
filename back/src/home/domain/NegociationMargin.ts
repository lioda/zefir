export class NegociationMargin {
  constructor(
    private readonly finalOfferPrice: number,
    private readonly targetSalePrice: number,
    private readonly maxNegociationMargin: number = 7
  ) {}

  marginToApply(): number {
    const marginOnSale = this.targetSalePrice / this.finalOfferPrice - 1;

    return Math.min(marginOnSale, this.maxNegociationMargin);
  }
}
