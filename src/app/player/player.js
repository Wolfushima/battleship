import createGameBoard from '../gameboard/gameboard';

export default function createPlayer(name) {
    return {
        name,
        gameBoard: createGameBoard(),
        turn: false,

        positionShip(row, collumn, ship) {
            return this.gameBoard.positionShip(row, collumn, ship);
        },
    };
}
