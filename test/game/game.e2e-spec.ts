import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { GameModule } from '../../src/game/game.module';
import {
  BoardDto,
  GenerateGameDto,
  SolveResponseDto,
} from '../../src/game/dto';

describe('GameController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GameModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });
  describe('success', () => {
    it('/api/game/generate (POST)', (done) => {
      const body: GenerateGameDto = {
        rows: 6,
        columns: 6,
        distinctColors: 3,
      } as GenerateGameDto;

      return request(app.getHttpServer())
        .post('/api/game/generate')
        .send(body)
        .expect(200)
        .then((response) => {
          const { board }: BoardDto = response.body;
          expect(board).toHaveLength(body.rows);
          board.forEach((column) => expect(column).toHaveLength(body.columns));
          board.flat().forEach((color) => expect(color).toBeLessThanOrEqual(3));
          done();
        });
    });

    it('/api/game/solve (POST)', (done) => {
      const body: BoardDto = {
        board: [
          [1, 2, 3, 4, 5, 6],
          [1, 2, 3, 1, 5, 6],
          [1, 1, 1, 1, 5, 6],
          [1, 2, 3, 4, 5, 6],
          [1, 2, 3, 4, 5, 6],
          [1, 1, 3, 4, 5, 6],
        ],
      };

      return request(app.getHttpServer())
        .post('/api/game/solve')
        .send(body)
        .expect(
          200,
          {
            moveSequence: [2, 3, 4, 5, 6],
            numberOfMoves: 5,
            board: body.board.map((row) => row.map(() => 6)),
          } as SolveResponseDto,
          done,
        );
    });
  });

  describe('client error', () => {
    it('/api/game/generate (POST)', (done) => {
      const body: GenerateGameDto = {
        rows: -1,
        columns: -1,
        distinctColors: -1,
      } as GenerateGameDto;

      return request(app.getHttpServer())
        .post('/api/game/generate')
        .send(body)
        .expect(400)
        .then((response) => {
          const message: string[] = response.body.message;
          expect(message).toHaveLength(3);
          expect(message[0]).toEqual(expect.stringContaining('rows '));
          expect(message[1]).toEqual(expect.stringContaining('columns '));
          expect(message[2]).toEqual(
            expect.stringContaining('distinctColors '),
          );
          done();
        });
    });

    it('/api/game/solve (POST)', (done) => {
      const body: BoardDto = {
        board: [[1], null],
      };

      return request(app.getHttpServer())
        .post('/api/game/solve')
        .send(body)
        .expect(400)
        .then((response) => {
          const message: string[] = response.body.message;
          expect(message).toHaveLength(3);
          message.forEach((msg) =>
            expect(msg).toEqual(expect.stringContaining('board ')),
          );
          done();
        });
    });
  });
});
