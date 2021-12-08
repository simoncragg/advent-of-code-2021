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
      "when passed %p input returns %p",
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
      ["example.txt", 3, 5],
      ["challenge.txt", 3, 1538],
    ])(
      "when passed %p input and window size is %p returns %p",
      (filename: string, windowSize: number, expected: number) => {
        const depths = readFile(`input/day-01/${filename}`)
          .split("\n")
          .map((n) => parseInt(n, 10));

        expect(countSlidingWindowIncreasedDepths(depths, windowSize)).toEqual(
          expected
        );
      }
    );
  });
});
