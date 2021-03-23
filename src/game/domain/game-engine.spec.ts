import { Board, GameEngine } from './game-engine';

describe('GameEngine', () => {
  let gameEngine: GameEngine;

  it('should give back the board', () => {
    const board: Board = [
      [2, 1],
      [2, 1],
    ];
    gameEngine = new GameEngine(board);

    expect(gameEngine.getBoard()).toEqual(board);
    expect(gameEngine.getBoard()).not.toBe(board);
  });

  it('should check if game is done', () => {
    const board: Board = [
      [1, 1],
      [1, 1],
    ];
    gameEngine = new GameEngine(board);

    expect(gameEngine.isDone).toBeTruthy();
  });

  it('should check if game is not done', () => {
    const board: Board = [
      [1, 2],
      [1, 1],
    ];
    gameEngine = new GameEngine(board);

    expect(gameEngine.isDone()).toBeFalsy();
  });

  it('should generate a new game board', () => {
    gameEngine = GameEngine.generate(2, 2, 3);
    const board: Board = gameEngine.getBoard();

    expect(board).toHaveLength(2);
    expect(board[0]).toHaveLength(2);
    board.flat().forEach((color) => expect(color).toBeLessThanOrEqual(3));
  });

  it('should connect to origin', () => {
    const inputBoard: Board = [
      [1, 2],
      [1, 3],
    ];
    gameEngine = new GameEngine(inputBoard);
    gameEngine.connectTo(2);
    const outputBoard: Board = gameEngine.getBoard();
    const expected = [
      [2, 2],
      [2, 3],
    ];

    expect(outputBoard).toEqual(expected);
  });

  it('should not connect to anything but the origin point', () => {
    const inputBoard: Board = [
      [1, 2],
      [3, 4],
    ];
    gameEngine = new GameEngine(inputBoard);
    gameEngine.connectTo(5, [0, 0]);
    const outputBoard: Board = gameEngine.getBoard();
    const expected = [
      [5, 2],
      [3, 4],
    ];

    expect(outputBoard).toEqual(expected);
  });

  it('should connect to origin and finish', () => {
    const inputBoard: Board = [
      [1, 1],
      [1, 2],
    ];
    gameEngine = new GameEngine(inputBoard);
    gameEngine.connectTo(2, [0, 0]);
    const outputBoard: Board = gameEngine.getBoard();
    const expected = [
      [2, 2],
      [2, 2],
    ];

    expect(outputBoard).toEqual(expected);
    expect(gameEngine.isDone()).toBeTruthy();
  });
});
