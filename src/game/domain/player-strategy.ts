import { Board, TileColor } from './game-engine';

export interface PlayerStrategy {
  nextMove(board: Board): TileColor | undefined;
}
