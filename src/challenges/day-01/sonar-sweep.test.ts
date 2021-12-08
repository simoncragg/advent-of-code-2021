import {
  countIncreasedDepths,
  countSlidingWindowIncreasedDepths,
} from "./sonar-sweep";

import { readFile } from "../../utils/file-util";

describe("Day 1", () => {
  describe("countIncreasedDepths", () => {
    it.each([
      ["example.txt", 7],
      ["challenge.txt", 1502],
    ])(
      "returns %p when passed %p input",
      (filename: string, expected: number) => {
        const depths = readFile(`input/day-01/${filename}`)
          .split("\n")
          .map((n) => parseInt(n, 10));

        expect(countIncreasedDepths(depths)).toEqual(expected);
      }
    );
  });

  describe("countSlidingWindowIncreasedDepths", () => {
    it.each([
      ["example.txt", 5],
      ["challenge.txt", 1538],
    ])(
      "returns %p when passed %p input and window size is 3",
      (filename: string, expected: number) => {
        const depths = readFile(`input/day-01/${filename}`)
          .split("\n")
          .map((n) => parseInt(n, 10));

        expect(countSlidingWindowIncreasedDepths(depths, 3)).toEqual(expected);
      }
    );
  });
});
