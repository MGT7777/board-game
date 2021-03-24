import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { BoardDto, GenerateGameDto, SolveResponseDto } from './dto';

@Controller('/api/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/generate')
  @HttpCode(200)
  generate(@Body() generateGameDto: GenerateGameDto): BoardDto {
    generateGameDto = Object.assign(new GenerateGameDto(), generateGameDto);
    return this.gameService.generateGame(generateGameDto);
  }

  @Post('/solve')
  @HttpCode(200)
  solve(@Body() board: BoardDto): SolveResponseDto {
    return this.gameService.solve(board);
  }
}
