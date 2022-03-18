import { EntityRepository, Repository } from "typeorm";
import { NegociationMargin } from "../domain/NegociationMargin";
import { BusinessData } from "./entities/businessData.entity";

@EntityRepository(BusinessData)
export default class BusinessDataCustomRepository extends Repository<BusinessData> {
  async createBusinessData(inputBusinessData: {
    homeUuid: string;
    initialOfferPrice: number;
    finalOfferPrice: number;
    targetSalePrice: number;
    serviceFees: number;
    negociationMargin: NegociationMargin;
  }) {
    const businessData = await this.create({
      ...inputBusinessData,
      negociationMargin: inputBusinessData.negociationMargin.marginToApply(),
    });
    return this.save(businessData);
  }
}
