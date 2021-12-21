export function arraysEqual<Type>(a: Array<Type>, b: Array<Type>): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function unorderedPairs<T>(items: Array<T>): Array<[T, T]> {
  const length = items.length;
  const pairs: Array<[T, T]> = [];
  for (let i = 0; i < length; i++) {
    const a = items[i];
    for (let j = i + 1; j < length; j++) {
      pairs.push([a, items[j]]);
    }
  }

  return pairs;
}

export function intersectSorted(a: Array<number>, b: Array<number>) {
  const result: Array<number> = [];
  let bIndex = 0;
  for (const item of a) {
    while (b[bIndex] < item) {
      bIndex++;
    }
    if (b[bIndex] === item) {
      result.push(item);
      bIndex++;
    }
  }

  return result;
}
