import {
  computeHighestY,
  countAllDistinctInitialVelocitiesThatAreSuccessful,
} from "./trick-shot";

describe("trick shot", () => {
  describe("computeHighestY", () => {
    it("when target area is x=20..30, y=-10..-5, returns 45", () => {
      const target = { leftX: 20, topY: -5, rightX: 30, botY: -10 };
      expect(computeHighestY(target)).toEqual(45);
    });

    it("when target area is x=217..240, y=-126..-69, returns 7875", () => {
      const target = { leftX: 217, topY: -69, rightX: 240, botY: -126 };
      expect(computeHighestY(target)).toEqual(7875);
    });
  });

  describe("countAllDistinctInitialVelocitiesThatAreSuccessful", () => {
    it("when target area is x=20..30, y=-10..-5, returns 112", () => {
      const target = { leftX: 20, topY: -5, rightX: 30, botY: -10 };
      expect(
        countAllDistinctInitialVelocitiesThatAreSuccessful(target)
      ).toEqual(112);
    });

    it("when target area is x=217..240, y=-126..-69, returns 2321", () => {
      const target = { leftX: 217, topY: -69, rightX: 240, botY: -126 };
      expect(
        countAllDistinctInitialVelocitiesThatAreSuccessful(target)
      ).toEqual(2321);
    });
  });
});
