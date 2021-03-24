import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';

export class BoardDto {
  @ApiPropertyOptional({
    description:
      'The game board represented as a two dimensional array of numbers. Each number represents a distinct color.',
    minimum: 2,
    maximum: 255,
    isArray: true
  })
  @IsArray({ each: true })
  @ArrayMinSize(2)
  @ArrayMinSize(2, { each: true })
  @ArrayMaxSize(255, { each: true })
  board: number[][];
}
