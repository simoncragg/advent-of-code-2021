import { countUniqueOutputInstances } from "./seven-segment-search";
import { readFile } from "../../utils/file-util";

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
});
