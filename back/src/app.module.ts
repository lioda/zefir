import { Module, ModuleMetadata } from "@nestjs/common";
import { ConfigModule, ConfigModuleOptions } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessDataModule } from "./businessData/businessData.module";
import { HomeModule } from "./home/home.module";
import { UserModule } from "./user/user.module";

export const appFactory = (
  cfgOpts?: Omit<ConfigModuleOptions, "isGlobal">
): ModuleMetadata => {
  return {
    imports: [
      ConfigModule.forRoot({ ...cfgOpts, isGlobal: true }),
      TypeOrmModule.forRoot(),
      HomeModule,
      BusinessDataModule,
      UserModule,
    ],
  };
};

@Module(appFactory())
export class AppModule {
  configure(): void {}
}
