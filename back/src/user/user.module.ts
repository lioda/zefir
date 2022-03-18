import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserCustomRepository from "./repositories/user.custom.repository";
import { UserResolver } from "./resolvers/user.resolver";
import UserService from "./services/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserCustomRepository])],
  providers: [UserService, UserResolver],
  exports: [],
})
export class UserModule {}
