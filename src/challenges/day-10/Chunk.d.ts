interface Chunk {
  id: uuid4;
  isOpen: boolean;
  openingCharacter: string;
  parent: Chunk | undefined;
  children: Array<Chuck>;
  hasError: boolean;
}
