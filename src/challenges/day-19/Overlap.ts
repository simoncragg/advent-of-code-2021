export class Overlap {
  beacon1Index: number;
  beacon2Index: number;

  constructor(beacon1Index: number, beacon2Index: number) {
    this.beacon1Index = beacon1Index;
    this.beacon2Index = beacon2Index;
  }

  reverse(): Overlap {
    return new Overlap(this.beacon2Index, this.beacon1Index);
  }
}
