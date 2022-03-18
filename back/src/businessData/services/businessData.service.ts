import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NegociationMargin } from "../domain/NegociationMargin";
import {
  parseZipCode,
  serviceFeesFactory,
} from "../domain/service-fees/ServiceFees";
import { BusinessData } from "../repositories/entities/businessData.entity";
import BusinessDataCustomRepository from "../repositories/businessData.custom.repository";
import HomeService from "../../home/services/home.service";

@Injectable()
export default class BusinessDataService {
  constructor(
    @InjectRepository(BusinessDataCustomRepository)
    private readonly businessDataRepository: BusinessDataCustomRepository,
    private readonly homeService: HomeService
  ) {}

  async generateBusinessDataForHome(
    homeUuid: string,
    initialOfferPrice: number,
    finalOfferPrice: number,
    targetSalePrice: number
  ): Promise<BusinessData> {
    const zipCode = (await this.homeService.findHome(homeUuid)).zipcode;

    const businessData = await this.businessDataRepository.createBusinessData({
      homeUuid,
      initialOfferPrice,
      finalOfferPrice,
      targetSalePrice,
      serviceFees: this.computeServiceFees(finalOfferPrice, zipCode),
      negociationMargin: this.computeNegotiationMargin(
        finalOfferPrice,
        targetSalePrice
      ),
    });
    await this.homeService.updateHome(homeUuid, {
      businessDataUuid: businessData.uuid,
    });
    return businessData;
  }

  private computeNegotiationMargin(
    finalOfferPrice: number,
    targetSalePrice: number
  ): NegociationMargin {
    return new NegociationMargin(finalOfferPrice, targetSalePrice);
  }
  private computeServiceFees(finalOfferPrice: number, zipCode: string): number {
    const feeRegion = parseZipCode(zipCode);
    if (!feeRegion) {
      throw new Error(`no applicable fees for ${zipCode}`);
    }
    return serviceFeesFactory(feeRegion).computeFeeForPrice(finalOfferPrice);
  }

  async findBusinessDataByHomeUuid(homeUuid: string): Promise<BusinessData> {
    const results = await this.businessDataRepository.find({ homeUuid });
    if (results.length !== 1) {
      throw Error(
        `Could not find business data from home with uuid ${homeUuid}`
      );
    }
    return results[0];
  }

  async findBusinessData(uuid: string): Promise<BusinessData> {
    const results = await this.businessDataRepository.findByIds([uuid]);
    if (results.length !== 1) {
      throw Error(`Could not find business data with uuid ${uuid}`);
    }
    return results[0];
  }

  async deleteBusinessData(uuid: string): Promise<number> {
    const result = await this.businessDataRepository.delete({ uuid: uuid });
    if (!result.affected) {
      throw Error(`Could not delete business data with uuid ${uuid}`);
    }
    return result.affected;
  }
}
