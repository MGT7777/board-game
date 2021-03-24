import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { BoardDto, GenerateGameDto, SolveResponseDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/game')
@ApiTags('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/generate')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'The game has been successfully created.',
    type: BoardDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  generate(@Body() generateGameDto: GenerateGameDto): BoardDto {
    generateGameDto = Object.assign(new GenerateGameDto(), generateGameDto);
    return this.gameService.generateGame(generateGameDto);
  }

  @Post('/solve')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'The sequence and number of turn to solve the game.',
    type: SolveResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  solve(@Body() board: BoardDto): SolveResponseDto {
    return this.gameService.solve(board);
  }
}
