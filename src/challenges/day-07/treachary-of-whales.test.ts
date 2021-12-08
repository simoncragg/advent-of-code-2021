import { computeCheapestAlignment } from "./treachery-of-whales";
import { readFile } from "../../utils/file-util";

describe("the treachery of whales", () => {
  describe("computeCheapestAlignment", () => {
    it.each([
      ["example.txt", 37],
      ["challenge.txt", 353800],
    ])(
      "when passed %p input, returns  %p when using static fuel cost",
      (filename: string, expected: number) => {
        const positons = readFile(`input/day-07/${filename}`)
          .split(",")
          .map((n) => parseInt(n, 10));

        expect(computeCheapestAlignment(positons, false)).toEqual(expected);
      }
    );

    it.each([
      ["example.txt", 168],
      ["challenge.txt", 98119739],
    ])(
      "when passed %p input, returns  %p when using incremental fuel cost",
      (filename: string, expected: number) => {
        const positons = readFile(`input/day-07/${filename}`)
          .split(",")
          .map((n) => parseInt(n, 10));

        expect(computeCheapestAlignment(positons, true)).toEqual(expected);
      }
    );
  });
});
