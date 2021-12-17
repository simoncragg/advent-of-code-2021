import { findPathWithLowestRisk } from "./chiton";
import { readFile } from "../../utils/file-util";

describe("chiton", () => {
  describe("findLowestRisk", () => {
    it.each([
      ["example.txt", 40],
      ["challenge.txt", 487],
    ])("when passed %p, returns %p", (filename: string, expected: number) => {
      const input = readFile(`input/day-15/${filename}`).split("\r\n");
      expect(findPathWithLowestRisk(input)).toEqual(expected);
    });
  });
});
