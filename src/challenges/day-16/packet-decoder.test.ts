import { sumVersionNumbers, getValue } from "./packet-decoder";
import { readFile } from "../../utils/file-util";

describe("packet decoder", () => {
  describe("sumVersionNumbers", () => {
    it.each([
      ["8A004A801A8002F478", 16],
      ["620080001611562C8802118E34", 12],
      ["C0015000016115A2E0802F182340", 23],
      ["A0016C880162017C3686B18A3D4780", 31],
    ])(
      "when passed %p returns %p",
      (hexadecimalTransmission: string, expected: number) => {
        expect(sumVersionNumbers(hexadecimalTransmission)).toEqual(expected);
      }
    );

    it("when passed challenge input returns 951", () => {
      const hexadecimalTransmission = readFile("input/day-16/challenge.txt");
      expect(sumVersionNumbers(hexadecimalTransmission)).toEqual(951);
    });
  });

  describe("getValue", () => {
    it.each([
      ["C200B40A82", 3],
      ["04005AC33890", 54],
      ["880086C3E88112", 7],
      ["CE00C43D881120", 9],
      ["D8005AC2A8F0", 1],
      ["F600BC2D8F", 0],
      ["9C005AC2F8F0", 0],
      ["9C0141080250320F1802104A08", 1],
    ])(
      "when passed %p returns %p",
      (hexadecimalTransmission: string, expected: number) => {
        expect(getValue(hexadecimalTransmission)).toEqual(expected);
      }
    );

    it("when passed challenge input returns x", () => {
      const hexadecimalTransmission = readFile("input/day-16/challenge.txt");
      expect(getValue(hexadecimalTransmission)).toEqual(902198718880);
    });
  });
});
