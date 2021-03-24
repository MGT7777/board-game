# A Very Popular Game

## Description
This is the backend API for the board game. There are basically only two endpoints; one for generating and one for solving the game.
The API is fully stateless and requires a board configuration on every request. The board configuration is represented by a 2-dimensional number array, each number represents a color from 1 to 255
(see section [API-Documentation](#api-documentation) for more information).

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API-Documentation

To see the documentation run the app and got to http://localhost:3000/api/docs/

## Examples

The basic workflow would be to first generate a random game (see [generate-board](./example/generate-board.http)) and then solve (see [solve](./example/solve-game.http)).

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```