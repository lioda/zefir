import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import HomeCustomRepository from "./repositories/home.custom.repository";
import { HomeResolver } from "./resolvers/home.resolver";
import HomeService from "./services/home.service";

@Module({
  imports: [TypeOrmModule.forFeature([HomeCustomRepository])],
  providers: [HomeService, HomeResolver],
  exports: [HomeService],
})
export class HomeModule {}
