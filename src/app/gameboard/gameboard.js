import createShip from '../ship/ship';

export default function createGameBoard() {
    const gameBoard = new Array(10);
    for (let i = 0; i < gameBoard.length; i += 1) {
        gameBoard[i] = new Array(10);
    }

    const ships = {
        carrier: createShip(5),
        battleship: createShip(4),
        cruiser: createShip(3),
        submarine: createShip(3),
        destroyer: createShip(2),
    };

    return {
        gameBoard,
        ships,
        isCoordinateAvailable(row, collumn, ship) {
            for (let i = 0; i < ships[ship].length; i += 1) {
                if (gameBoard[row][collumn + i] !== undefined
                || collumn + i > gameBoard[collumn].length) {
                    return false;
                }
            }
            return true;
        },

        positionShip(row, collumn, ship) {
            if (this.isCoordinateAvailable(row, collumn, ship)) {
                for (let i = 0; i < ships[ship].length; i += 1) {
                    gameBoard[row][collumn + i] = ship;
                }
                return true;
            }
            return false;
        },

        isShip(coordinate) {
            if (Object.prototype.hasOwnProperty.call(ships, coordinate)) {
                return true;
            }
            return false;
        },

        receiveAttack(row, collumn) {
            if (this.isShip(gameBoard[row][collumn])) {
                ships[gameBoard[row][collumn]].hit();
                gameBoard[row][collumn] = 'hit';
                return true;
            }
            return false;
        },
    };
}
