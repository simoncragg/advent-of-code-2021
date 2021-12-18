import { AbstractPacket } from "./AbstractPacket";

export class ValuePacket extends AbstractPacket {
  private value: number = 0;

  public Value(version: number, type: number, binary: string, size: number) {
    this.version = version;
    this.type = type;
    this.binary = binary;
    this.size = size;
  }

  parse() {
    let val = "";
    let notLast = true;
    while (this.binary !== "" && notLast) {
      val += this.binary.substring(1, 5);
      if (this.binary.substring(0, 1) === "0") {
        notLast = false;
      }
      this.binary = this.binary.substring(5);
      this.size += 5;
    }
    this.value = parseInt(val, 2);
  }

  public override getVersionSum(): number {
    return this.version;
  }

  public getValue(): number {
    return this.value;
  }
}
