import {
  countUniqueOutputInstances,
  decodeNumber,
} from "./seven-segment-search";
import { readFile } from "../../utils/file-util";
import { createInputFiles } from "typescript";

describe("seven segment search", () => {
  describe("countUniqueOutInstances", () => {
    it.each([
      ["example.txt", 26],
      ["challenge.txt", 284],
    ])(
      "when passed %p input, returns %p",
      (filename: string, expected: number) => {
        const input = readFile(`input/day-08/${filename}`).split("\n");
        expect(countUniqueOutputInstances(input)).toEqual(expected);
      }
    );
  });

  describe("decodeNumber", () => {
    it("decodes a single line input", () => {
      const input = [
        "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
      ];
      expect(decodeNumber(input)).toEqual(5353);
    });

    it("decodes a multiline input", () => {
      const input = [
        "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
        "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
      ];
      expect(decodeNumber(input)).toEqual(10706);
    });

    it.each([
      ["example.txt", 61229],
      ["challenge.txt", 973499],
    ])(
      "when passed %p input, returns %p",
      (filename: string, expected: number) => {
        const input = readFile(`input/day-08/${filename}`).split("\n");
        expect(decodeNumber(input)).toEqual(expected);
      }
    );
  });
});
