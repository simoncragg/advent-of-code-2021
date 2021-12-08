import {
  computePowerConsumption,
  computeLifeSupportRating,
} from "./binary-diagnostic";

import { readFile } from "../../utils/file-util";

describe("Day 3", () => {
  describe("computePowerConsumption", () => {
    it.each([
      ["example.txt", 198],
      ["challenge.txt", 4006064],
    ])(
      "must compute power consumption as %p",
      (filename: string, expected: number) => {
        const diagnostics = readFile(`input/day-03/${filename}`)
          .split("\r\n")
          .map((b) => b.toString().trim());
        expect(computePowerConsumption(diagnostics)).toEqual(expected);
      }
    );
  });

  describe("computeLifeSupportRating", () => {
    it.each([
      ["example.txt", 230],
      ["challenge.txt", 5941884],
    ])(
      "must compute life support rating as %p",
      (filename: string, expected: number) => {
        const diagnostics = readFile(`input/day-03/${filename}`)
          .split("\r\n")
          .map((b) => b.toString().trim());
        expect(computeLifeSupportRating(diagnostics)).toEqual(expected);
      }
    );
  });
});
