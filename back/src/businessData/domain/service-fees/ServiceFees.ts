import {
  LilleServiceFees,
  NantesAndLyonServiceFees,
  ParisServiceFees,
} from "./CityServiceFees";

export interface ServiceFees {
  computeFeeForPrice(price: number): number;
}

export enum FeeRegion {
  Lille,
  Paris,
  NantesLyon,
}

export function parseZipCode(zipCode: string): FeeRegion | undefined {
  if (zipCode.startsWith("59")) return FeeRegion.Lille;
  if (zipCode.startsWith("44")) return FeeRegion.NantesLyon;
  if (zipCode.startsWith("69")) return FeeRegion.NantesLyon;
  if (
    zipCode.startsWith("75") ||
    zipCode.startsWith("92") ||
    zipCode.startsWith("93") ||
    zipCode.startsWith("94")
  )
    return FeeRegion.Paris;
  return undefined;
}

export function serviceFeesFactory(region: FeeRegion): ServiceFees {
  switch (region) {
    case FeeRegion.Lille:
      return new LilleServiceFees();
    case FeeRegion.NantesLyon:
      return new NantesAndLyonServiceFees();
    case FeeRegion.Paris:
      return new ParisServiceFees();
  }
}
