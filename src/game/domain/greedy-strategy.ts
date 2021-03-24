import { PlayerStrategy } from './player-strategy';
import { Board, Coordinates, TileColor } from './game-engine';
import { BoardIterator, sameColorCondition } from './board-iterator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GreedyStrategy implements PlayerStrategy {
  public nextMove(board: Board): TileColor | undefined {
    return GreedyStrategy.getMostSurroundedColor(board);
  }

  private static getMostSurroundedColor(board: Board): number | undefined {
    const start: Coordinates = [0, 0];
    const colorCounts = GreedyStrategy.findSurroundingColors(
      board,
      start,
    ).reduce(
      (acc, color) => acc.set(color, (acc.get(color) || 0) + 1),
      new Map<TileColor, number>(),
    );

    const [choice] = GreedyStrategy.sortByCountAndRank(
      Array.from(colorCounts.entries()),
    );

    return choice && choice[0];
  }

  private static sortByCountAndRank(colorCounts: [TileColor, number][]) {
    return colorCounts.sort(([color1, value1], [color2, value2]) => {
      return value1 === value2 ? color1 - color2 : value2 - value1;
    });
  }

  private static findSurroundingColors(board: Board, coords: Coordinates) {
    const [x, y] = coords;
    const neighborColors: number[] = [];
    const startColor = board[x][y];
    const boardIterator = BoardIterator(
      board,
      coords,
      sameColorCondition(startColor),
    );

    for (const tile of boardIterator) {
      tile.color !== startColor && neighborColors.push(tile.color);
    }

    return neighborColors;
  }
}
