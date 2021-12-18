import { AbstractPacket as AbstractPacket } from "./AbstractPacket";
import { PacketFactory } from "./PacketFactory";

export class OperatorPacket extends AbstractPacket {
  private subPackets = Array<AbstractPacket>();

  constructor(
    version: number,
    type: number,
    binary: string,
    size: number,
    hasSubPackets: boolean
  ) {
    super(version, type, binary, size);
    this.hasSubPackets = hasSubPackets;
  }

  public parse(): void {
    if (this.hasSubPackets) {
      let num = parseInt(this.binary.substring(0, 11), 2);
      let workBinary = this.binary.substring(11);
      this.size += 11;
      for (let i = 0; i < num; i++) {
        let subPacket = PacketFactory.create(workBinary);
        subPacket.parse();
        this.subPackets.push(subPacket);
        this.size += subPacket.size;
        workBinary = workBinary.substring(subPacket.size);
      }
    } else {
      let len = parseInt(this.binary.substring(0, 15), 2);
      let workBinary = this.binary.substring(15, 15 + len);
      this.size += 15;
      while (workBinary !== "") {
        let subPacket = PacketFactory.create(workBinary);
        subPacket.parse();
        this.subPackets.push(subPacket);
        this.size += subPacket.size;
        workBinary = workBinary.substring(subPacket.size);
      }
    }
  }

  public override getVersionSum(): number {
    let sum = this.version;
    for (let subPacket of this.subPackets) {
      sum += subPacket.getVersionSum();
    }
    return sum;
  }

  public override getValue(): number {
    let sum = 0;
    switch (this.type) {
      case 0:
        for (let sp of this.subPackets) {
          sum = sum + sp.getValue();
        }
        break;
      case 1:
        sum = 1;
        for (let sp of this.subPackets) {
          sum *= sp.getValue();
        }
        break;
      case 2:
        sum = this.subPackets[0].getValue();
        for (let sp of this.subPackets) {
          sum = Math.min(sum, sp.getValue());
        }
        break;
      case 3:
        for (let sp of this.subPackets) {
          sum = Math.max(sum, sp.getValue());
        }
        break;
      case 5:
        sum =
          this.subPackets[0].getValue() > this.subPackets[1].getValue() ? 1 : 0;
        break;
      case 6:
        sum =
          this.subPackets[0].getValue() < this.subPackets[1].getValue() ? 1 : 0;
        break;
      case 7:
        sum =
          this.subPackets[0].getValue() === this.subPackets[1].getValue()
            ? 1
            : 0;
        break;
    }
    return sum;
  }
}
