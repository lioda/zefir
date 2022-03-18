import { Test, TestingModule } from "@nestjs/testing";
import { appFactory } from "src/app.module";
import { BusinessDataResolver } from "src/businessData/resolvers/businessData.resolver";
import { HomeResolver } from "src/home/resolvers/home.resolver";
import { UserResolver } from "src/user/resolvers/user.resolver";
import BusinessDataService from "src/businessData/services/businessData.service";
import HomeService from "src/home/services/home.service";
import UserService from "src/user/services/user.service";

export class Fixtures {
  homeResolver: HomeResolver;
  homeService: HomeService;
  userResolver: UserResolver;
  userService: UserService;
  businessDataResolver: BusinessDataResolver;
  businessDataService: BusinessDataService;

  constructor(private readonly moduleRef: TestingModule) {
    this.homeResolver = moduleRef.get<HomeResolver>(HomeResolver);
    this.homeService = moduleRef.get<HomeService>(HomeService);
    this.userResolver = moduleRef.get<UserResolver>(UserResolver);
    this.userService = moduleRef.get<UserService>(UserService);
    this.businessDataResolver =
      moduleRef.get<BusinessDataResolver>(BusinessDataResolver);
    this.businessDataService =
      moduleRef.get<BusinessDataService>(BusinessDataService);
  }

  async close() {
    return this.moduleRef.close();
  }
}

export async function createTestConf(): Promise<Fixtures> {
  const moduleRef = await Test.createTestingModule(appFactory()).compile();
  return new Fixtures(moduleRef);
}
