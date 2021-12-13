import { computeNumOfPathsThatVisitSmallCavesAtMostOnce } from "./passage-pathing";
import { readFile } from "../../utils/file-util";

describe("passage pathing", () => {
  describe("computeNumOfPathsThatVisitSmallCavesAtMostOnce", () => {
    it.each([
      ["example1.txt", 10],
      ["example2.txt", 19],
      ["example3.txt", 226],
      ["challenge.txt", 3421],
    ])("when passed %p, returns %p", (filename: string, expected: number) => {
      const caveConnections = readFile(`input/day-12/${filename}`)
        .split("\n")
        .map((s) => s.trim());

      expect(
        computeNumOfPathsThatVisitSmallCavesAtMostOnce(caveConnections)
      ).toEqual(expected);
    });
  });
});
