import {
  computeTotalFlashes,
  computeFirstStepWhenAllFlash,
} from "./dumbo-octopus";
import { readFile } from "../../utils/file-util";

describe("dumbo octopus", () => {
  describe("computeTotalFlashes", () => {
    it.each([
      ["example.txt", 100, 1656],
      ["challenge.txt", 100, 1647],
    ])(
      "when passed %p input with %p ticks, returns %p",
      (filename: string, steps: number, expected: number) => {
        const energyMatrix = readFile(`input/day-11/${filename}`)
          .split("\n")
          .map((s) => s.trim())
          .map((s) => s.split("").map((n) => parseInt(n, 10)));

        expect(computeTotalFlashes(energyMatrix, steps)).toEqual(expected);
      }
    );
  });

  describe("computeFirstStepWhenAllOctopusesFlash", () => {
    it.each([
      ["example.txt", 195],
      ["challenge.txt", 348],
    ])(
      "when passed %p input, returns %p",
      (filename: string, expected: number) => {
        const energyMatrix = readFile(`input/day-11/${filename}`)
          .split("\n")
          .map((s) => s.trim())
          .map((s) => s.split("").map((n) => parseInt(n, 10)));

        expect(computeFirstStepWhenAllFlash(energyMatrix)).toEqual(expected);
      }
    );
  });
});
