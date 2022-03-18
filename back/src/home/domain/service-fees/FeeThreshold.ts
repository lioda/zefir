export type ComputeServiceFees = (price: number) => number;
/**
 * Represent a threshold to compute service fees.
 */
export class FeeThreshold {
  private readonly compute: ComputeServiceFees;
  constructor(
    private readonly threshold: number,
    compute: number | ComputeServiceFees
  ) {
    if (typeof compute === "function") {
      this.compute = compute;
    } else {
      this.compute = () => compute;
    }
  }

  canApply(price: number): boolean {
    return price < this.threshold;
  }
  apply(price: number): number {
    return this.compute(price);
  }
}
