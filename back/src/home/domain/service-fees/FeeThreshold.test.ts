import { FeeThreshold } from "./FeeThreshold";

describe("FeeThreshold", () => {
  describe("canApply", () => {
    const threshold = 145_000;
    const feeThreshold = new FeeThreshold(threshold, 1_000);

    test("when currentPrice is strictly under threshold then it can apply", () => {
      expect(feeThreshold.canApply(145_000 - 1)).toBe(true);
      expect(feeThreshold.canApply(145_000)).toBe(false);
      expect(feeThreshold.canApply(145_000 + 1)).toBe(false);
    });
  });
  describe("apply", () => {
    const threshold = 145_000;
    const price = threshold - 100;

    test("when compute is a constant number then returns it", () => {
      const constantServiceFees = 1000;
      const feeThreshold = new FeeThreshold(threshold, constantServiceFees);

      expect(feeThreshold.apply(price)).toBe(constantServiceFees);
    });
    test("when compute is a function then apply it on price", () => {
      const computedServiceFees = (price: number) => price / 2;
      const feeThreshold = new FeeThreshold(threshold, computedServiceFees);

      expect(feeThreshold.apply(price)).toBe(computedServiceFees(price));
    });
  });
});
