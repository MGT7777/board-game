import { BoardDto } from './board.dto';

export class SolveResponseDto extends BoardDto {
  moveSequence: number[];
  numberOfMoves: number;
}
