import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { BoardDto, GenerateGameDto, SolveResponseDto } from './dto';
import { GreedyStrategy } from './domain/greedy-strategy';

describe('GameController', () => {
  let controller: GameController;
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        GameService,
        {
          provide: 'PlayerStrategy',
          useClass: GreedyStrategy,
        },
      ],
    }).compile();

    controller = module.get<GameController>(GameController);
    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return new game board', () => {
    const input = {
      board: [
        [1, 1],
        [1, 1],
      ],
    } as BoardDto;
    const spy = jest
      .spyOn(service, 'generateGame')
      .mockImplementation(() => input);
    const actual: BoardDto = controller.generate({} as GenerateGameDto);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(actual).toBe(input);
  });

  it('should return the solve solution', () => {
    const input = {
      board: [
        [1, 2],
        [2, 3],
      ],
    } as BoardDto;
    const expected = {
      moveSequence: [1, 2, 3],
      numberOfMoves: 3,
    } as SolveResponseDto;
    const spy = jest.spyOn(service, 'solve').mockImplementation(() => expected);
    const actual: SolveResponseDto = controller.solve(input);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(actual).toBe(expected);
  });
});
