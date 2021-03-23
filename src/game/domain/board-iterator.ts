import { Board, Coordinates, Tile, TileColor } from './game-engine';

type IterateCondition = (tile: Tile) => boolean;

const buildMemorizeTable = (board: Board) => {
  return Array(board.length)
    .fill(false)
    .map(() => Array(board[0].length).fill(false));
};

export const sameColorCondition = (color: TileColor): IterateCondition => {
  return (tile: Tile) => color === tile.color;
};

export const allCondition = (): IterateCondition => {
  return () => true;
};

/**
 * This generator will iterate over a given Board with BFS algorithm.
 * It will yield back each Tile one by one with not duplicates.
 *
 * @param board the gaming board
 * @param startCoords x and y coordinates for the starting point
 * @param iterateCondition decides which Tile qualify to be the bases for the next iteration
 * @constructor
 */
export function* BoardIterator(
  board: Board,
  startCoords: Coordinates,
  iterateCondition: IterateCondition,
): Iterable<Tile> {
  const visited = buildMemorizeTable(board);

  const queue: Coordinates[] = [startCoords];
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const color = board[x] && board[x][y];
    if (!color || visited[x][y]) {
      continue;
    }
    const tile = { color, coords: [x, y] } as Tile;
    yield tile;
    visited[x][y] = true;
    iterateCondition(tile) &&
      queue.push([x, y + 1], [x + 1, y], [x, y - 1], [x - 1, y]);
  }
}
