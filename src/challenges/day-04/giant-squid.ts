const rowSize = 5;
const colSize = 5;

export const computeWinningScore = (
  boardsData: Array<Array<number>>,
  generatedNumbers: Array<number>
): number => {
  const boards = buildBoards(boardsData);

  const isGameOverPredicate = (orderedWinningBoards: Array<Board>) => {
    return orderedWinningBoards.length > 0;
  };
  const gameResult = playGame(boards, generatedNumbers, isGameOverPredicate);
  const winningBoard = gameResult.orderedWinningBoards[0];
  return computeBoardScore(winningBoard, gameResult.lastDrawnNumber);
};

export const computeLosingScore = (
  boardsData: Array<Array<number>>,
  generatedNumbers: Array<number>
): number => {
  const boards = buildBoards(boardsData);
  const isGameOverPredicate = (orderedWinningBoards: Array<Board>) =>
    orderedWinningBoards.length === boards.length;
  const gameResult = playGame(boards, generatedNumbers, isGameOverPredicate);
  const losingBoard =
    gameResult.orderedWinningBoards[gameResult.orderedWinningBoards.length - 1];
  return computeBoardScore(losingBoard, gameResult.lastDrawnNumber);
};

function playGame(
  boards: Array<Board>,
  generatedNumbers: Array<number>,
  isGameOver: (orderedWinningBoards: Array<Board>) => boolean
): GameResult {
  const orderedWinningBoards: Array<Board> = [];
  let currentGeneratedNumberIndex = 0;
  while (!isGameOver(orderedWinningBoards)) {
    const drawnNumber = generatedNumbers[currentGeneratedNumberIndex];
    const inflightBoards = boards.filter((board) => !board.hasWon);

    updateBoards(drawnNumber, inflightBoards);

    getWinningBoards(inflightBoards).forEach((board) =>
      orderedWinningBoards.push(board)
    );

    currentGeneratedNumberIndex++;
  }

  return {
    orderedWinningBoards: orderedWinningBoards,
    lastDrawnNumber: generatedNumbers[currentGeneratedNumberIndex - 1],
  };
}

function updateBoards(drawnNumber: number, boards: Array<Board>) {
  boards.forEach((board) => {
    board.rows.forEach((row) => {
      row.cells.forEach((cell) => {
        if (cell.number === drawnNumber) {
          cell.isMarked = true;
        }
      });
    });
  });
}

function getWinningBoards(boards: Array<Board>): Array<Board> {
  const completedBoards = [];
  for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    const board = boards[boardIndex];
    if ((!board.hasWon && hasCompleteRow(board)) || hasCompleteColumn(board)) {
      board.hasWon = true;
      completedBoards.push(board);
    }
  }
  return completedBoards;
}

function hasCompleteRow(board: Board): boolean {
  for (let rowIndex = 0; rowIndex < board.rows.length; rowIndex++) {
    const row = board.rows[rowIndex];
    if (row.cells.filter((cell) => cell.isMarked).length === row.cells.length) {
      return true;
    }
  }
  return false;
}

function hasCompleteColumn(board: Board): boolean {
  for (let colIndex = 0; colIndex < colSize; colIndex++) {
    let columnOfCells = [] as Array<Cell>;
    for (let rowIndex = 0; rowIndex < board.rows.length; rowIndex++) {
      const row = board.rows[rowIndex];
      columnOfCells.push(row.cells[colIndex]);
    }
    if (
      columnOfCells.filter((cell) => cell.isMarked).length ==
      columnOfCells.length
    ) {
      return true;
    }
  }
  return false;
}

function computeBoardScore(board: Board, lastDrawnNumber: number) {
  let sumOfAllUnMarkedNumbers = 0;
  board.rows.forEach((row) =>
    row.cells
      .filter((cell) => !cell.isMarked)
      .forEach((unmarkedCell) => {
        sumOfAllUnMarkedNumbers += unmarkedCell.number;
      })
  );
  return sumOfAllUnMarkedNumbers * lastDrawnNumber;
}

function buildBoards(boardData: Array<Array<number>>): Array<Board> {
  return boardData.map((boardNumbers) => {
    const board = { rows: [] as Array<Row> } as Board;
    for (let r = 0; r < rowSize; r++) {
      const row = {
        cells: [],
      } as Row;
      for (let c = 0; c < colSize; c++) {
        row.cells.push({
          number: boardNumbers[r * rowSize + c],
          isMarked: false,
        });
      }
      board.rows.push(row);
    }
    return board;
  });
}
