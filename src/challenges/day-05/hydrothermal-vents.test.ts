import { computeOverlappingLinePoints } from "./hydrothermal-vents";
import { readFile } from "../../utils/file-util";

describe("hydrothermal vents", () => {
  describe("computeOverlappingLinePoints", () => {
    it.each([
      ["example.txt", 5],
      ["challenge.txt", 7380],
    ])(
      "when passed %p input, returns %p when excluding diagonals",
      (filename: string, expected: number) => {
        const hydrothermalVentLines = readFile(
          `input/day-05/${filename}`
        ).split("\n");
        expect(
          computeOverlappingLinePoints(hydrothermalVentLines, false)
        ).toEqual(expected);
      }
    );

    it.each([
      ["example.txt", 12],
      ["challenge.txt", 21373],
    ])(
      "when passed %p input, returns %p when including diagonals",
      (filename: string, expected: number) => {
        const hydrothermalVentLines = readFile(
          `input/day-05/${filename}`
        ).split("\n");
        expect(
          computeOverlappingLinePoints(hydrothermalVentLines, true)
        ).toEqual(expected);
      }
    );
  });
});
