import { random, cloneDeep } from 'lodash/fp';

export type Board = TileColor[][];
export type TileColor = number;

export class GameEngine {
  private readonly board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  public getBoard(): Board {
    return cloneDeep(this.board);
  }

  public isDone(): boolean {
    const startColor = this.board[0][0];
    return !this.board.flat().find((curColor) => startColor !== curColor);
  }

  public static generate(
    rows: number,
    columns: number,
    distinctColors: number,
  ): GameEngine {
    const board: Board = Array(rows)
      .fill(false)
      .map(() =>
        Array(columns)
          .fill(false)
          .map(() => random(distinctColors, 1)),
      );

    return new GameEngine(board);
  }
}
