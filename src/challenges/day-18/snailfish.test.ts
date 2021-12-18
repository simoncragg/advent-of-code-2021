import {
  computeMagnitudeOfFinalSum,
  computeLargestMagnitute,
} from "./snailfish";
import { readFile } from "../../utils/file-util";

describe("snailfish", () => {
  describe("computeMagnitudeOfFinalSum", () => {
    it.each([
      ["[9,1]", 29],
      ["[[9,1],[1,9]]", 129],
      ["[[1,2],[[3,4],5]]", 143],
      ["[[[[0,7],4],[[7,8],[6,0]]],[8,1]]", 1384],
      ["[[[[1,1],[2,2]],[3,3]],[4,4]]", 445],
      ["[[[[3,0],[5,3]],[4,4]],[5,5]]", 791],
      ["[[[[5,0],[7,4]],[5,5]],[6,6]]", 1137],
      ["[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]", 3488],
      ["[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]", 4140],
      ["[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]", 2736],
    ])(
      "when passed %p, returns %p",
      (snailfishNumber: string, expected: number) => {
        expect(computeMagnitudeOfFinalSum([snailfishNumber])).toEqual(expected);
      }
    );

    it.each([
      [
        [
          "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
          "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]",
        ],
        2736,
      ],
      [
        [
          "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
          "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]",
          "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]",
          "[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]",
          "[7,[5,[[3,8],[1,4]]]]",
          "[[2,[2,2]],[8,[8,1]]]",
          "[2,9]",
          "[1,[[[9,3],9],[[9,0],[0,7]]]]",
          "[[[5,[7,4]],7],1]",
          "[[[[4,2],2],6],[8,7]]",
        ],
        3488,
      ],
    ])(
      "when given %p to add up, returns magnitude of %p",
      (snailfishNumbers: Array<string>, expected: number) => {
        expect(computeMagnitudeOfFinalSum(snailfishNumbers)).toEqual(expected);
      }
    );

    it.each([
      ["example.txt", 4140],
      ["challenge.txt", 4641],
    ])("when passed %p, returns %p", (filename: string, expected: number) => {
      const snailFishNumbers = getSnailFishNumbers(filename);
      expect(computeMagnitudeOfFinalSum(snailFishNumbers)).toEqual(expected);
    });
  });

  describe("computeLargestMagnitute", () => {
    it.each([
      ["example.txt", 3993],
      ["challenge.txt", 4624],
    ])("when passed %p, returns %p", (filename: string, expected: number) => {
      const snailfishNumbers = getSnailFishNumbers(filename);
      expect(computeLargestMagnitute(snailfishNumbers)).toEqual(expected);
    });
  });

  const getSnailFishNumbers = (filename: string) => {
    return readFile(`input/day-18/${filename}`)
      .split("\n")
      .map((s) => s.trim());
  };
});
