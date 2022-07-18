import createGameBoard from '../gameboard/gameboard';

export default function createPlayer(name) {
    return {
        name,
        playerGameBoard: createGameBoard(),
        turn: false,

        positionShip(row, collumn, axis, ship) {
            return this.playerGameBoard.positionShip(row, collumn, axis, ship);
        },
    };
}
