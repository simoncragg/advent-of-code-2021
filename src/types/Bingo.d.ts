interface GameResult {
  orderedWinningBoards: Array<Board>;
  lastDrawnNumber: number;
}

interface Board {
  rows: Array<Row>;
  hasWon: boolean;
}

interface Row {
  cells: Array<Cell>;
}

interface Cell {
  number: number;
  isMarked: boolean;
}
