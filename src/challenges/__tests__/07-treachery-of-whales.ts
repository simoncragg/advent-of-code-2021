import { computeCheapestAlignment } from "../07-treachery-of-whales";

describe("treachary of whales", () => {
  const positions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

  describe("computeCheapestAlignment with fixed fuelCost", () => {
    it("returns 37", () => {
      expect(computeCheapestAlignment(positions, false)).toEqual(37);
    });
  });

  describe("computeCheapestAlignment with incremental fuelCost", () => {
    it("returns 168", () => {
      expect(computeCheapestAlignment(positions, true)).toEqual(168);
    });
  });
});
