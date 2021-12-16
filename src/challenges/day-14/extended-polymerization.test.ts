import {
  extendPolymer,
  mapInputs,
  computePolymerizationSum,
} from "./extended-polymerization";
import { readFile } from "../../utils/file-util";

describe("extendPolymer", () => {
  describe("extended polymerization", () => {
    it.each([
      [1, "NCNBCHB"],
      [2, "NBCCNBBBCBHCB"],
      [3, "NBBBCNCCNBBNBNBBCHBHHBCHB"],
      [4, "NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB"],
    ])("when %p steps returns %p", (steps: number, expected: string) => {
      const input = readFile("input/day-14/example.txt").split("\r\n");
      const [polymerTemplate, pairInsertionRules] = mapInputs(input);
      let polymer = polymerTemplate;
      for (let step = 0; step < steps; step++) {
        polymer = extendPolymer(polymer, pairInsertionRules);
      }
      expect(polymer).toEqual(expected);
    });
  });

  describe("computePolymerizationSum", () => {
    it.only.each([
      ["example.txt", 10, 1588],
      ["challenge.txt", 10, 2321],
      ["challenge.txt", 40, 0],
    ])(
      "when passed %p with %p steps returns %p",
      (filename: string, steps: number, expected: number) => {
        const input = readFile(`input/day-14/${filename}`).split("\r\n");
        expect(computePolymerizationSum(input, steps)).toEqual(expected);
      }
    );
  });
});
