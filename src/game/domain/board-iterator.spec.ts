import { allCondition, BoardIterator } from './board-iterator';
import { Board, Tile } from './game-engine';

describe('BoardIterator', () => {
  it('should iterate over everything once', () => {
    const board: Board = [
      [1, 2],
      [3, 4],
    ];
    const boardIterator = BoardIterator(board, [0, 0], allCondition());
    const expected = [1, 2, 3, 4];

    expect([...boardIterator].map((tile) => tile.color)).toEqual(expected);
  });

  it('should not iterate over anything', () => {
    const board: Board = [[]];
    const boardIterator = BoardIterator(board, [0, 0], allCondition());
    const expected = [];

    expect([...boardIterator].map((tile) => tile.color)).toEqual(expected);
  });

  it('should not iterate over anything', () => {
    const board: Board = [[]];
    const boardIterator = BoardIterator(board, [0, 0], allCondition());
    const expected = [];

    expect([...boardIterator].map((tile) => tile.color)).toEqual(expected);
  });

  it('should not iterate over anything other then the origin', () => {
    const board: Board = [
      [1, 1, 1],
      [1, 4, 4],
      [4, 1, 5],
      [5, 1, 6],
    ];
    const boardIterator = BoardIterator(board, [0, 0], () => false);
    const expected = [{ color: 1, coords: [0, 0] } as Tile];
    const actual = [...boardIterator];

    expect(actual).toEqual(expected);
  });

  it('should iterate over connected colors', () => {
    const board: Board = [
      [1, 1],
      [1, 4],
      [4, 1],
      [1, 1],
    ];
    const boardIterator = BoardIterator(
      board,
      [0, 0],
      (tile) => tile.color === 1,
    );
    const expected = [1, 1, 1];
    const actual = [...boardIterator]
      .filter((tile) => tile.color === 1)
      .map((tile) => tile.color);

    expect(actual).toEqual(expected);
  });

  it('should return all direct connect colors', () => {
    const board: Board = [
      [1, 1, 1],
      [1, 4, 2],
      [4, 1, 5],
    ];
    const boardIterator = BoardIterator(
      board,
      [0, 0],
      (tile) => tile.color === 1,
    );
    const expected = [1, 1, 1, 1, 4, 4, 2];
    const actual = [...boardIterator].map((tile) => tile.color);

    expect(actual).toEqual(expected);
  });
});
