import { cloneDeep, random } from 'lodash/fp';
import { BoardIterator, sameColorCondition } from './board-iterator';

export type Board = TileColor[][];
export type TileColor = number;
export type Coordinates = [number, number];
export type Tile = { color: TileColor; coords: Coordinates };

export class GameEngine {
  private readonly board: Board;

  constructor(board: Board) {
    this.board = cloneDeep(board);
  }

  connectTo(color: TileColor, startCoordinates: Coordinates = [0, 0]): void {
    const [x, y]: [number, number] = startCoordinates;
    const prevColor: TileColor = this.board[x][y];
    const gen = BoardIterator(
      this.board,
      [x, y],
      sameColorCondition(prevColor),
    );
    for (const tile of gen) {
      if (tile.color === prevColor) {
        this.changeTileColor(tile.coords, color);
      }
    }
  }

  getBoard(): Board {
    return cloneDeep(this.board);
  }

  isDone(): boolean {
    const startColor = this.board[0][0];
    return !this.board.flat().find((curColor) => startColor !== curColor);
  }

  static generate(
    rows: number,
    columns: number,
    distColor: number,
  ): GameEngine {
    const board: Board = Array(rows)
      .fill(false)
      .map(() =>
        Array(columns)
          .fill(false)
          .map(() => random(distColor, 1)),
      );

    return new GameEngine(board);
  }

  private changeTileColor(coords: Coordinates, newColor: TileColor) {
    this.board[coords[0]][coords[1]] = newColor;
  }
}
