import { computeBeaconCount, computeLargestDistance } from "./beacon-scanner";
import { readFile } from "../../utils/file-util";

describe("beacon-scanner", () => {
  describe("computeBeaconCount", () => {
    it.each([
      ["example.txt", 79],
      ["challenge.txt", 445],
    ])("when passed %p, returns %p", (filename: string, expected: number) => {
      const input = readFile(`input/day-19/${filename}`);
      expect(computeBeaconCount(input)).toEqual(expected);
    });
  });

  describe("computeLargestDistance", () => {
    it.each([
      ["example.txt", 3621],
      ["challenge.txt", 13225],
    ])("when passed %p, returns %p", (filename: string, expected: number) => {
      const input = readFile(`input/day-19/${filename}`);
      expect(computeLargestDistance(input)).toEqual(expected);
    });
  });
});
