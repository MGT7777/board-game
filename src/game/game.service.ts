import { Inject, Injectable } from '@nestjs/common';
import { GameEngine, TileColor } from './domain/game-engine';
import { BoardDto, GenerateGameDto, SolveResponseDto } from './dto';
import { PlayerStrategy } from './domain/player-strategy';

@Injectable()
export class GameService {
  constructor(
    @Inject('PlayerStrategy') private readonly playerStrategy: PlayerStrategy,
  ) {}

  generateGame({ rows, columns, distinctColors }: GenerateGameDto): BoardDto {
    const gameEngine = GameEngine.generate(rows, columns, distinctColors);
    return { board: gameEngine.getBoard() } as BoardDto;
  }

  solve(board: BoardDto): SolveResponseDto {
    const gameEngine = new GameEngine(board.board);
    const moveSequence = [];
    let numberOfMoves = 0;
    while (!gameEngine.isDone()) {
      const move: TileColor = this.playerStrategy.nextMove(
        gameEngine.getBoard(),
      );
      gameEngine.connectTo(move);
      moveSequence.push(move);
      numberOfMoves++;
    }

    return {
      moveSequence,
      numberOfMoves,
      board: gameEngine.getBoard(),
    } as SolveResponseDto;
  }
}
