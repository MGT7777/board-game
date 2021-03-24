import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { BoardDto, GenerateGameDto, SolveResponseDto } from './dto';
import { GreedyStrategy } from './domain/greedy-strategy';
import { PlayerStrategy } from './domain/player-strategy';

describe('GameService', () => {
  let service: GameService;
  let playerStrategy: PlayerStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: 'PlayerStrategy',
          useClass: GreedyStrategy,
        },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
    playerStrategy = module.get<PlayerStrategy>('PlayerStrategy');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a new game board', () => {
    const input = { rows: 4, columns: 4, distinctColors: 5 } as GenerateGameDto;
    const { board } = service.generateGame(input);

    expect(board).toHaveLength(input.rows);
    expect(board[0]).toHaveLength(input.columns);
    board
      .flat()
      .forEach((color) =>
        expect(color).toBeLessThanOrEqual(input.distinctColors),
      );
  });

  it('should be able to solve the game', () => {
    const boardDto: BoardDto = {
      board: [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 1, 5, 6],
        [1, 1, 1, 1, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 1, 3, 4, 5, 6],
      ],
    };
    const solveResponseDto: SolveResponseDto = service.solve(boardDto);

    expect(solveResponseDto.moveSequence).toEqual([2, 3, 4, 5, 6]);
    expect(solveResponseDto.numberOfMoves).toEqual(5);
  });

  it('should not do anything if game is done', () => {
    const boardDto: BoardDto = {
      board: [
        [1, 1],
        [1, 1],
      ],
    };
    const solveResponseDto: SolveResponseDto = service.solve(boardDto);

    expect(solveResponseDto.moveSequence).toHaveLength(0);
    expect(solveResponseDto.numberOfMoves).toEqual(0);
  });

  it('should be able to solve random game', () => {
    const boardDto: BoardDto = service.generateGame({
      rows: 5,
      columns: 5,
      distinctColors: 5,
    });
    const solveResponseDto: SolveResponseDto = service.solve(boardDto);

    expect(solveResponseDto.moveSequence.length).toBeGreaterThanOrEqual(1);
    expect(solveResponseDto.numberOfMoves).toBeGreaterThanOrEqual(1);
  });

  it('should call nextMove on player', () => {
    const input = {
      board: [
        [1, 1],
        [1, 2],
      ],
    } as BoardDto;

    const spy = jest
      .spyOn(playerStrategy, 'nextMove')
      .mockImplementation(() => 2);
    const actual: SolveResponseDto = service.solve(input);
    const expected = {
      moveSequence: [2],
      numberOfMoves: 1,
      board: [
        [2, 2],
        [2, 2],
      ],
    } as SolveResponseDto;

    expect(spy).toHaveBeenCalledTimes(1);
    expect(actual).toEqual(expected);
  });
});
