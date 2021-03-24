import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GreedyStrategy } from './domain/greedy-strategy';

@Module({
  controllers: [GameController],
  providers: [
    GameService,
    {
      provide: 'PlayerStrategy',
      useClass: GreedyStrategy,
    },
  ],
})
export class GameModule {}
