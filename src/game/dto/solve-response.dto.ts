import {BoardDto} from '.';
import {ApiProperty} from '@nestjs/swagger';

export class SolveResponseDto extends BoardDto {
    @ApiProperty({
        description: 'The color sequence to finishing the game',
        type: Number,
        isArray: true
    })
    moveSequence: number[];
    @ApiProperty({description: 'The number of move to finishing the game'})
    numberOfMoves: number;
}
