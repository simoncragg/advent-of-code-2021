import { AbstractPacket } from "./types/AbstractPacket";
import { PacketFactory } from "./types/PacketFactory";

export const sumVersionNumbers = (hexadecimalTransmission: string): number => {
  return parse(hexadecimalTransmission).getVersionSum();
};

export const getValue = (hexadecimalTransmission: string): number => {
  const parser = parse(hexadecimalTransmission);
  return parser.getValue();
};

export const parse = (hexadecimalTransmission: string): AbstractPacket => {
  const binaryMap = new Map<String, String>();
  binaryMap.set("0", "0000");
  binaryMap.set("1", "0001");
  binaryMap.set("2", "0010");
  binaryMap.set("3", "0011");
  binaryMap.set("4", "0100");
  binaryMap.set("5", "0101");
  binaryMap.set("6", "0110");
  binaryMap.set("7", "0111");
  binaryMap.set("8", "1000");
  binaryMap.set("9", "1001");
  binaryMap.set("A", "1010");
  binaryMap.set("B", "1011");
  binaryMap.set("C", "1100");
  binaryMap.set("D", "1101");
  binaryMap.set("E", "1110");
  binaryMap.set("F", "1111");

  let binary = "";
  for (let s of hexadecimalTransmission.split("")) {
    binary += binaryMap.get(s);
  }

  let packet = PacketFactory.create(binary);
  packet.parse();
  console.log(packet);
  return packet;
};
