import { computePopulation1, computePopulation2 } from "../06-lanternfish";

describe("lanternfish", () => {
  const initialPopulation = [3, 4, 3, 1, 2];

  it("computePopulation returns 26 fish after 18 days", () => {
    expect(computePopulation1(18, initialPopulation)).toEqual(26);
    expect(computePopulation2(18, initialPopulation)).toEqual(26);
  });

  it("computePopulation returns 5934 fish after 80 days", () => {
    expect(computePopulation1(18, initialPopulation)).toEqual(26);
    expect(computePopulation2(80, initialPopulation)).toEqual(5934);
  });

  it("computePopulation2 returns 1609058859115 fish after 256 days", () => {
    expect(computePopulation2(256, initialPopulation)).toEqual(26984457539);
  });
});
