import { computeRiskLevel, findBasinsResult } from "./smoke-basin";
import { readFile } from "../../utils/file-util";

describe("seven segment search", () => {
  describe("computeRiskLevel", () => {
    it.each([
      ["example.txt", 15],
      ["challenge.txt", 526],
    ])(
      "when passed %p input, returns %p",
      (filename: string, expected: number) => {
        const input = readFile(`input/day-09/${filename}`).split("\n");

        expect(computeRiskLevel(input)).toEqual(expected);
      }
    );
  });

  describe("findBasinsResult", () => {
    it.each([
      ["example.txt", 1134],
      ["challenge.txt", 1123524],
    ])(
      "when passed %p input, returns %p",
      (filename: string, expected: number) => {
        const input = readFile(`input/day-09/${filename}`).split("\n");

        expect(findBasinsResult(input)).toEqual(expected);
      }
    );
  });
});
