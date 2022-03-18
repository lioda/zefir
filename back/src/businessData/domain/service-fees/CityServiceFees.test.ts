import {
  LilleServiceFees,
  NantesAndLyonServiceFees,
  ParisServiceFees,
} from "./CityServiceFees";

describe("CityServiceFees", () => {
  describe("LilleServiceFees", () => {
    const serviceFeeLille = new LilleServiceFees();

    test.each([
      { price: 50_000, expectedFees: 15_000 },
      { price: 100_000 - 0.1, expectedFees: 15_000 },
      { price: 100_000, expectedFees: 19_000 },
      { price: 145_000 - 0.1, expectedFees: 19_000 },
      { price: 145_000, expectedFees: 20_000 },
      { price: 200_000 - 0.1, expectedFees: 20_000 },
      { price: 200_000, expectedFees: 0.1 * 200_000 },
      { price: 400_000 - 0.1, expectedFees: 0.1 * (400_000 - 0.1) },
      { price: 400_000, expectedFees: 0.8 * 400_000 },
      { price: 650_000 - 0.1, expectedFees: 0.8 * (650_000 - 0.1) },
      { price: 650_000, expectedFees: 0.3 * 650_000 },
    ])(
      "when price is $price then apply $expectedFees as service fees",
      ({ price, expectedFees }) => {
        const fees = serviceFeeLille.computeFeeForPrice(price);

        expect(fees).toBe(expectedFees);
      }
    );
  });

  describe("ParisServiceFees", () => {
    const serviceFeeLille = new ParisServiceFees();

    test.each([
      { price: 50_000, expectedFees: 20_000 },
      { price: 100_000 - 0.1, expectedFees: 20_000 },
      { price: 100_000, expectedFees: 22_000 },
      { price: 145_000 - 0.1, expectedFees: 22_000 },
      { price: 145_000, expectedFees: 23_000 },
      { price: 200_000 - 0.1, expectedFees: 23_000 },
      { price: 200_000, expectedFees: 0.11 * 200_000 },
      { price: 400_000 - 0.1, expectedFees: 0.11 * (400_000 - 0.1) },
      { price: 400_000, expectedFees: 0.8 * 400_000 },
      { price: 650_000 - 0.1, expectedFees: 0.8 * (650_000 - 0.1) },
      { price: 650_000, expectedFees: 0.1 * 650_000 },
    ])(
      "when price is $price then apply $expectedFees as service fees",
      ({ price, expectedFees }) => {
        const fees = serviceFeeLille.computeFeeForPrice(price);

        expect(fees).toBe(expectedFees);
      }
    );
  });

  describe("NantesAndLyonServiceFees", () => {
    const serviceFeeLille = new NantesAndLyonServiceFees();

    test.each([
      { price: 50_000, expectedFees: 20_000 },
      { price: 100_000 - 0.1, expectedFees: 20_000 },
      { price: 100_000, expectedFees: 22_000 },
      { price: 145_000 - 0.1, expectedFees: 22_000 },
      { price: 145_000, expectedFees: 23_000 },
      { price: 200_000 - 0.1, expectedFees: 23_000 },
      { price: 200_000, expectedFees: 0.11 * 200_000 },
      { price: 400_000 - 0.1, expectedFees: 0.11 * (400_000 - 0.1) },
      { price: 400_000, expectedFees: 0.8 * 400_000 },
      { price: 650_000 - 0.1, expectedFees: 0.8 * (650_000 - 0.1) },
      { price: 650_000, expectedFees: (99.9999 / 100) * 650_000 },
    ])(
      "when price is $price then apply $expectedFees as service fees",
      ({ price, expectedFees }) => {
        const fees = serviceFeeLille.computeFeeForPrice(price);

        expect(fees).toBe(expectedFees);
      }
    );
  });
});
