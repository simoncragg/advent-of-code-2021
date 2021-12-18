import { OperatorPacket } from "./OperatorPacket";
import { ValuePacket as ValuePacket } from "./ValuePacket";

export class PacketFactory {
  public static create(binary: string) {
    const version = parseInt(binary.substring(0, 3), 2);
    const type = parseInt(binary.substring(3, 6), 2);
    if (type == 4) {
      return new ValuePacket(version, type, binary.substring(6), 6);
    } else {
      return new OperatorPacket(
        version,
        type,
        binary.substring(7),
        7,
        "1" === binary.substring(6, 7)
      );
    }
  }
}
