export abstract class AbstractPacket {
  protected version: number;
  protected type: number;
  protected hasSubPackets: boolean;
  protected binary: string;
  public size: number;

  constructor(version: number, type: number, binary: string, size: number) {
    this.version = version;
    this.type = type;
    this.binary = binary;
    this.size = size;
    this.hasSubPackets = false;
  }

  public abstract parse(): void;
  public abstract getVersionSum(): number;
  public abstract getValue(): number;
}
