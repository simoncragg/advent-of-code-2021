export class Pair extends Object {
  public left: Pair | number | null = 0;
  public right: Pair | number | null = 0;
  public depth: number = 0;
  public isVisited: boolean = false;

  public Pair() {}

  public static createFromString(str: string): Pair {
    const pair = new Pair();
    pair.initFromString(str);
    return pair;
  }

  public static createFromPairs(left: Pair, right: Pair): Pair {
    let pair = new Pair();
    pair.left = left;
    pair.right = right;
    return pair;
  }

  public setDepth(depth: number): void {
    this.depth = depth;
    if (this.left instanceof Pair) {
      this.left.setDepth(depth + 1);
    }
    if (this.right instanceof Pair) {
      this.right.setDepth(depth + 1);
    }
    this.isVisited = false;
  }

  public explode(): Pair {
    let pair: Pair | null = null;
    if (this.left instanceof Pair) {
      pair = this.left.explode();
    }

    if (pair === null && this.right instanceof Pair) {
      pair = this.right.explode();
    }

    if (
      this.depth > 4 &&
      this.isNumber(this.left) &&
      this.isNumber(this.right)
    ) {
      return this;
    }

    if (pair !== null) {
      if (this.left === pair) {
        this.left = 0;
        this.isVisited = true;
        if (this.right instanceof Pair) {
          if (this.right.isVisited) {
            return pair;
          }
          return this.right.setRight(pair);
        } else {
          this.right = (this.right as number) + (pair.right as number);
          pair.right = -1;
          return pair;
        }
      } else if (this.right === pair) {
        this.right = 0;
        this.isVisited = true;
        if (this.left instanceof Pair) {
          if (this.left.isVisited) {
            return pair;
          }
          return this.left.setLeft(pair);
        } else {
          this.left = (this.left as number) + (pair.left as number);
          pair.left = -1;
          return pair;
        }
      } else {
        if ((pair.left as number) > 0) {
          if (this.left instanceof Pair) {
            if (this.left.isVisited) {
              this.isVisited = true;
              return pair;
            }
            return this.left.setLeft(pair);
          } else {
            this.left = (this.left as number) + (pair.left as number);
            pair.left = -1;
          }
        }
        if ((pair.right as number) > 0) {
          if (this.right instanceof Pair) {
            if (this.right.isVisited) {
              this.isVisited = true;
              return pair;
            }
            return this.right.setRight(pair);
          } else {
            this.right = (this.right as number) + (pair.right as number);
            pair.right = -1;
            return pair;
          }
        }
      }
    }
    return pair!;
  }

  private setLeft(pair: Pair): Pair {
    if (this.right instanceof Pair) {
      return this.right.setLeft(pair);
    } else {
      this.right = (this.right as number) + (pair.left as number);
      pair.left = -1;
      return pair;
    }
  }

  private setRight(pair: Pair): Pair {
    if (this.left instanceof Pair) {
      return this.left.setRight(pair);
    } else {
      this.left = (this.left as number) + (pair.right as number);
      pair.right = -1;
      return pair;
    }
  }

  public split(): boolean {
    if (this.left instanceof Pair) {
      if (this.left.split()) {
        return true;
      }
    } else {
      let val = this.left as number;
      if (val > 9) {
        let pair = new Pair();
        pair.left = Math.floor(val / 2);
        pair.right = val - Math.floor(val / 2);
        this.left = pair;
        return true;
      }
    }
    if (this.right instanceof Pair) {
      if (this.right.split()) {
        return true;
      }
    } else {
      let val = this.right as number;
      if (val > 9) {
        let pair = new Pair();
        pair.left = Math.floor(val / 2);
        pair.right = val - Math.floor(val / 2);
        this.right = pair;
        return true;
      }
    }
    return false;
  }

  public getMagnitude(): number {
    let magnitude = 0;
    if (this.left instanceof Pair) {
      let leftMagnitude = this.left.getMagnitude();
      magnitude = magnitude + leftMagnitude * 3;
    } else {
      magnitude = magnitude + (this.left as number) * 3;
    }
    if (this.right instanceof Pair) {
      let rightMagnitude = this.right.getMagnitude();
      magnitude = magnitude + rightMagnitude * 2;
    } else {
      magnitude = magnitude + (this.right as number) * 2;
    }
    return magnitude;
  }

  public maxDepth(): number {
    let currentDepth = this.depth;
    if (this.left instanceof Pair) {
      let leftDepth = this.left.maxDepth();
      if (leftDepth > currentDepth) {
        currentDepth = leftDepth;
      }
    }
    if (this.right instanceof Pair) {
      let rightDepth = this.right.maxDepth();
      if (rightDepth > currentDepth) {
        currentDepth = rightDepth;
      }
    }
    return currentDepth;
  }

  public maxNum(): number {
    let currentNum = 0;
    if (this.left instanceof Pair) {
      let leftDepth = this.left.maxNum();
      if (leftDepth > currentNum) {
        currentNum = leftDepth;
      }
    } else {
      let leftNum = this.left as number;
      if (leftNum > currentNum) {
        currentNum = leftNum;
      }
    }
    if (this.right instanceof Pair) {
      let rightDepth = this.right.maxNum();
      if (rightDepth > currentNum) {
        currentNum = rightDepth;
      }
    } else {
      let rightNum = this.right as number;
      if (rightNum > currentNum) {
        currentNum = rightNum;
      }
    }
    return currentNum;
  }

  public override toString(): string {
    let depth = this.depth > 4 ? "*" : "";
    return "[" + this.left + "," + this.right + "]" + depth;
  }

  private initFromString(str: string) {
    let begin = 0;
    let end = str.length;
    if (str.startsWith("[")) begin++;
    if (str.endsWith("]")) end--;

    let terms = this.splitTerms(str.substring(begin, end));

    let leftStr = terms.split("|")[0];
    if (leftStr.indexOf(",") > -1) {
      this.left = Pair.createFromString(leftStr);
    } else {
      this.left = parseInt(leftStr, 10);
    }

    let rightStr = terms.split("|")[1];
    if (rightStr.indexOf(",") > -1) {
      this.right = Pair.createFromString(rightStr);
    } else {
      this.right = parseInt(rightStr, 10);
    }
  }

  private splitTerms(str: string): string {
    if (str.startsWith("[")) {
      let myChars = str.split("");
      let balance = 1;
      let split: number;
      for (split = 1; split < str.length; split++) {
        if ("[" === myChars[split]) balance++;
        if ("]" === myChars[split]) balance--;
        if (balance === 0) break;
      }
      return `${str.substring(0, split + 1)}|${str.substring(split + 2)}`;
    } else {
      return str.replace(",", "|");
    }
  }

  private isNumber(value: Pair | number | null): boolean {
    return value !== null && !isNaN(Number(value.toString()));
  }
}
