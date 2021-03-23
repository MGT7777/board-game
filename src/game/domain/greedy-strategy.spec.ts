import { Board } from './game-engine';
import { GreedyStrategy } from './greedy-strategy';

describe('GreedyStrategy', () => {
  let greedyStrategy: GreedyStrategy;

  beforeEach(() => (greedyStrategy = new GreedyStrategy()));

  it('should select highest surrounded color', () => {
    const board: Board = [
      [1, 1, 2],
      [1, 3, 2],
      [3, 2, 2],
    ];
    const actual = greedyStrategy.nextMove(board);
    const expected = 3;

    expect(actual).toEqual(expected);
  });

  it('should select lowest rank color if tie', () => {
    const board: Board = [
      [1, 1, 2],
      [1, 1, 3],
      [3, 2, 2],
    ];
    const actual = greedyStrategy.nextMove(board);
    const expected = 2;

    expect(actual).toEqual(expected);
  });

  it('should not select anything if all are same color', () => {
    const board: Board = [
      [1, 1],
      [1, 1],
    ];
    const actual = greedyStrategy.nextMove(board);

    expect(actual).toBeFalsy();
  });

  it('should select only available option', () => {
    const board: Board = [
      [1, 1],
      [1, 2],
    ];
    const actual = greedyStrategy.nextMove(board);
    const expected = 2;

    expect(actual).toEqual(expected);
  });
});
