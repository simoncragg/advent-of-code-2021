import {
  computePowerConsumption,
  computeLifeSupportRating,
} from "../03-binary-diagnostic";

describe("Day 3", () => {
  const diagnostics = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];

  describe("computePowerConsumption", () => {
    it("must compute power consumption as 198", () => {
      expect(computePowerConsumption(diagnostics)).toEqual(198);
    });
  });

  describe("computeLifeSupportRating", () => {
    it("must compute life support rating as 230", () => {
      expect(computeLifeSupportRating(diagnostics)).toEqual(230);
    });
  });
});
