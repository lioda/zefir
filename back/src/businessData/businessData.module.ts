import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeModule } from "src/home/home.module";
import BusinessDataCustomRepository from "./repositories/businessData.custom.repository";
import { BusinessDataResolver } from "./resolvers/businessData.resolver";
import BusinessDataService from "./services/businessData.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessDataCustomRepository]),
    HomeModule,
  ],
  providers: [BusinessDataService, BusinessDataResolver],
  exports: [],
})
export class BusinessDataModule {}
