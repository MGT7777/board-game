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
});
