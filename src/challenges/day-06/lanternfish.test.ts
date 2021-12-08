import { computePopulation1, computePopulation2 } from "./lanternfish";
import { readFile } from "../../utils/file-util";

describe("lanternfish", () => {
  describe("computePopulation1", () => {
    it.each([
      ["example.txt", 18, 26],
      ["example.txt", 80, 5934],
      ["challenge.txt", 80, 354564],
    ])(
      "after %p days returns %p",
      (filename: string, daysToSimulate: number, expected: number) => {
        const initialPopulation = readFile(`input/day-06/${filename}`)
          .split(",")
          .map((n) => parseInt(n, 10));
        expect(computePopulation1(daysToSimulate, initialPopulation)).toEqual(
          expected
        );
      }
    );
  });

  describe("computePopulation2", () => {
    it.each([["challenge.txt", 256, 1609058859115]])(
      "after %p days returns %p",
      (filename: string, daysToSimulate: number, expected: number) => {
        const initialPopulation = readFile(`input/day-06/${filename}`)
          .split(",")
          .map((n) => parseInt(n, 10));
        expect(computePopulation2(daysToSimulate, initialPopulation)).toEqual(
          expected
        );
      }
    );
  });
});
