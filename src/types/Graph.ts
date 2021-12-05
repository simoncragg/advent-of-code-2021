interface GraphPoint extends Point {
  plottedLinePoints: number;
}

interface Point {
  x: number;
  y: number;
}

interface Line {
  startPoint: Point;
  endPoint: Point;
}
