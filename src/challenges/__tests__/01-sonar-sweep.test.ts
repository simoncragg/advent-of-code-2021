import {
  countIncreasedDepths,
  countSlidingWindowIncreasedDepths,
} from "../01-sonar-sweep";

describe("Day 1", () => {
  const depths = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  describe("countIncreasedDepths", () => {
    it("must return 7", () => {
      expect(countIncreasedDepths(depths)).toEqual(7);
    });
  });

  describe("countSlidingWindowIncreasedDepths", () => {
    it("given window size is 3, must return 5", () => {
      expect(countSlidingWindowIncreasedDepths(depths, 3)).toEqual(5);
    });
  });
});
