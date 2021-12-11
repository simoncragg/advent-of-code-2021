import uuid4 from "uuid4";

export const computeErrorScore = (lines: Array<string>): number => {
  let errorScore = 0;
  for (const line of lines) {
    const chunks = Array<Chunk>();
    const characters = line.split("");

    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
      const character = characters[charIndex];
      if (isOpening(character)) {
        addChunk(character, chunks);
      } else {
        try {
          const chunkToClose = findChunkToCloseRecursive(character, chunks);
          if (chunkToClose) {
            chunkToClose.isOpen = false;
          }
        } catch (error: any) {
          if (error.message === "Syntax Error") {
            errorScore += getCharacterPoints(character);
            break;
          }
        }
      }
    }
  }

  return errorScore;
};

export const computeMiddleAutoCompleteScore = (
  lines: Array<string>
): number => {
  const lineCompletionResults = getLineCompletions(lines).map((lc) => {
    return { syntax: lc, score: 0 } as any;
  });
  const pointsLookup = "0)]}>";

  for (const lineCompletionResult of lineCompletionResults) {
    for (const closingCharacter of lineCompletionResult.syntax.split("")) {
      const point = pointsLookup.indexOf(closingCharacter);
      lineCompletionResult.score *= 5;
      lineCompletionResult.score += point;
    }
  }

  const orderedLineCompletionResultsByScore = lineCompletionResults.sort(
    (a, b) => a.score - b.score
  );

  for (let i = 0; i < orderedLineCompletionResultsByScore.length; i++) {
    const resultsBelow = i;
    const resultsAbove = orderedLineCompletionResultsByScore.length - 1 - i;

    if (resultsBelow === resultsAbove) {
      return orderedLineCompletionResultsByScore[i].score;
    }
  }

  return 0;
};

export const getLineCompletions = (lines: Array<string>): Array<string> => {
  const incompleteLines = findIncompleteLines(lines);
  return incompleteLines.map(getLineCompletion);
};

function findIncompleteLines(syntaxLines: Array<string>): Array<Array<Chunk>> {
  const incompleteLines = Array<Array<Chunk>>();
  for (const syntaxLine of syntaxLines) {
    const chunks = Array<Chunk>();
    const characters = syntaxLine.split("");

    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
      const character = characters[charIndex];
      processCharacter(character, chunks);
    }

    if (!hasError(chunks)) {
      incompleteLines.push(chunks);
    }
  }

  return incompleteLines;
}

function processCharacter(character: string, chunks: Array<Chunk>) {
  if (isOpening(character)) {
    addChunk(character, chunks);
  } else {
    try {
      const chunkToClose = findChunkToCloseRecursive(character, chunks);
      if (chunkToClose) {
        chunkToClose.isOpen = false;
      }
    } catch (error: any) {
      if (error.message === "Syntax Error") {
        chunks.forEach((chunk) => (chunk.hasError = true));
        return;
      }
    }
  }
}

function getLineCompletion(chunks: Array<Chunk>): string {
  let completedSyntax = "";
  let done = false;
  while (!done) {
    const rightMostOpenChunk = getRightMostOpenChunkRecursive(chunks);
    if (rightMostOpenChunk) {
      rightMostOpenChunk.isOpen = false;
      completedSyntax += getClosingCharacter(
        rightMostOpenChunk.openingCharacter
      );
    } else {
      done = true;
    }
  }

  return completedSyntax;
}

function addChunk(character: string, chunks: Array<Chunk>): Chunk {
  const chunk = {
    id: uuid4(),
    isOpen: true,
    openingCharacter: character,
    parent: findParentRecursive(chunks),
    children: [],
    hasError: false,
  };

  if (chunk.parent) {
    chunk.parent.children.push(chunk);
  } else {
    chunks.push(chunk);
  }
  return chunk;
}

function isOpening(character: string): boolean {
  return "([{<".indexOf(character) > -1;
}

function getOpeningCharacter(closingCharacter: string) {
  const iterator = getCharacterMappings().entries();
  while (true) {
    const entry = iterator.next();
    if (entry.value[1] === closingCharacter) {
      return entry.value[0];
    }
  }
}

function getClosingCharacter(openingCharacter: string) {
  return getCharacterMappings().get(openingCharacter);
}

function getCharacterMappings(): Map<string, string> {
  return new Map<string, string>([
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
    ["<", ">"],
  ]);
}

function findParentRecursive(chunks: Array<Chunk>): Chunk | undefined {
  if (chunks.length === 0) {
    return undefined;
  }

  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i];
    if (chunk.isOpen) {
      if (hasChildren(chunk)) {
        const childChunk = findParentRecursive(chunk.children);
        if (childChunk) {
          return childChunk;
        }
      }
      return chunk;
    }
  }

  return undefined;
}

function findChunkToCloseRecursive(
  closingCharacter: string,
  chunks: Array<Chunk>
): Chunk | undefined {
  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i];
    if (chunk.isOpen) {
      if (hasChildren(chunk)) {
        const childChunkToClose = findChunkToCloseRecursive(
          closingCharacter,
          chunk.children
        );
        if (childChunkToClose) {
          return childChunkToClose;
        }
      }

      const openingCharacter = getOpeningCharacter(closingCharacter);
      if (openingCharacter === chunk.openingCharacter) {
        return chunk;
      } else {
        throw new Error("Syntax Error");
      }
    }
  }

  return undefined;
}

function getCharacterPoints(character: string) {
  switch (character) {
    case ")":
      return 3;
    case "]":
      return 57;
    case "}":
      return 1197;
    case ">":
      return 25137;
    default:
      throw new Error(`No points defined for character '${character}'`);
  }
}
function hasChildren(chunk: Chunk) {
  return chunk.children.length > 0;
}

function getRightMostOpenChunkRecursive(
  chunks: Array<Chunk>
): Chunk | undefined {
  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i];
    if (chunk.isOpen) {
      if (hasChildren(chunk)) {
        const childChunk = getRightMostOpenChunkRecursive(chunk.children);
        if (childChunk) {
          return childChunk;
        }
      }
      return chunk;
    }
  }

  return undefined;
}
function hasError(chunks: Array<Chunk>): boolean {
  for (const chunk of chunks) {
    if (chunk.hasError) {
      return true;
    }
    if (hasChildren(chunk)) {
      const childHasError = hasError(chunk.children);
      if (childHasError) {
        return true;
      }
    }
  }

  return false;
}
