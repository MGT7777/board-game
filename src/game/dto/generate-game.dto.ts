import { IsInt, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateGameDto {
  @ApiPropertyOptional({ minimum: 2, maximum: 255, default: 6 })
  @IsInt()
  @Min(2)
  @Max(255)
  rows = 6;

  @ApiPropertyOptional({ minimum: 2, maximum: 255, default: 6 })
  @IsInt()
  @Min(2)
  @Max(255)
  columns = 6;

  @ApiPropertyOptional({ minimum: 2, maximum: 255, default: 3 })
  @IsInt()
  @Min(2)
  @Max(255)
  distinctColors = 3;
}
