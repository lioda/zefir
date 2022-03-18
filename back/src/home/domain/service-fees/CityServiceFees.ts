import { FeeThreshold, ComputeServiceFees } from "./FeeThreshold";
import { ServiceFees } from "./ServiceFees";

/**
 * Class used by composition to map thresholds.
 */
class FeeThresholds {
  private readonly thresholds: FeeThreshold[];
  private readonly defaultComputation: ComputeServiceFees;
  constructor(thresholds: {
    lessthan100_000: number;
    lessthan145_000: number;
    lessthan200_000: number;
    lessthan400_000: number;
    lessthan650_000: number;
    moreThan650_000: number;
  }) {
    this.thresholds = [
      new FeeThreshold(100_000, thresholds.lessthan100_000),
      new FeeThreshold(145_000, thresholds.lessthan145_000),
      new FeeThreshold(200_000, thresholds.lessthan200_000),
      new FeeThreshold(400_000, (price) => price * thresholds.lessthan400_000),
      new FeeThreshold(650_000, (price) => price * thresholds.lessthan650_000),
    ];
    this.defaultComputation = (price) => price * thresholds.moreThan650_000;
  }

  computeForPrice(price: number): number {
    for (const threshold of this.thresholds) {
      if (threshold.canApply(price)) {
        return threshold.apply(price);
      }
    }
    return this.defaultComputation(price);
  }
}

export class LilleServiceFees implements ServiceFees {
  private readonly feeThresholdConfiguration = new FeeThresholds({
    lessthan100_000: 15_000,
    lessthan145_000: 19_000,
    lessthan200_000: 20_000,
    lessthan400_000: 0.1,
    lessthan650_000: 0.8,
    moreThan650_000: 0.3,
  });
  computeFeeForPrice(price: number): number {
    return this.feeThresholdConfiguration.computeForPrice(price);
  }
}
export class ParisServiceFees implements ServiceFees {
  private readonly feeThresholdConfiguration = new FeeThresholds({
    lessthan100_000: 20_000,
    lessthan145_000: 22_000,
    lessthan200_000: 23_000,
    lessthan400_000: 0.11,
    lessthan650_000: 0.8,
    moreThan650_000: 0.1,
  });
  computeFeeForPrice(price: number): number {
    return this.feeThresholdConfiguration.computeForPrice(price);
  }
}
export class NantesAndLyonServiceFees implements ServiceFees {
  private readonly feeThresholdConfiguration = new FeeThresholds({
    lessthan100_000: 20_000,
    lessthan145_000: 22_000,
    lessthan200_000: 23_000,
    lessthan400_000: 0.11,
    lessthan650_000: 0.8,
    moreThan650_000: 99.9999 / 100,
  });
  computeFeeForPrice(price: number): number {
    return this.feeThresholdConfiguration.computeForPrice(price);
  }
}
