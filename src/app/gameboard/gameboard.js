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
        isCoordinateAvailable(row, collumn, axis, ship) {
            if (axis === 'x') {
                for (let i = 0; i < ships[ship].length; i += 1) {
                    if (collumn + i > 9 || collumn + i < 0
                        || gameBoard[row][collumn + i] !== undefined) {
                        return false;
                    }
                }
            }
            if (axis === 'y') {
                for (let i = 0; i < ships[ship].length; i += 1) {
                    if (row + i > 9 || row + i < 0
                        || gameBoard[row + i][collumn] !== undefined) {
                        return false;
                    }
                }
            }
            return true;
        },

        positionShip(row, collumn, axis, ship) {
            if (row > 9 || collumn > 9 || row < 0 || collumn < 0) {
                return false;
            }
            if (this.isCoordinateAvailable(row, collumn, axis, ship)) {
                for (let i = 0; i < ships[ship].length; i += 1) {
                    if (axis === 'x') {
                        gameBoard[row][collumn + i] = ship;
                    }
                    if (axis === 'y') {
                        gameBoard[row + i][collumn] = ship;
                    }
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
            gameBoard[row][collumn] = 'miss';
            return false;
        },

        areShipsSunk() {
            return Object.values(ships).every((ship) => ship.sunk === true);
        },
    };
}
