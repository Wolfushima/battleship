import createGameBoard from '../gameboard/gameboard';

export default function createPlayer(name) {
    return {
        name,
        playerGameBoard: createGameBoard(),
        turn: false,
        randomAttackCoords: [],

        updateTurn(boolean) {
            this.turn = boolean;
        },

        receiveAttack(row, collumn) {
            return this.playerGameBoard.receiveAttack(row, collumn);
        },

        attack(player, row, collumn) {
            this.turn = false;
            player.receiveAttack(row, collumn);
            player.updateTurn(true);
        },

        attackRandomly(player) {
            const getRandomInt = (maxNumber) => Math.floor(Math.random() * maxNumber);
            let row = getRandomInt(10);
            let collumn = getRandomInt(10);

            while (this.randomAttackCoords.includes(`${row}, ${collumn}`)) {
                row = getRandomInt(10);
                collumn = getRandomInt(10);
            }

            this.randomAttackCoords.push(`${row}, ${collumn}`);
            this.turn = false;

            player.receiveAttack(row, collumn);
            player.updateTurn(true);
        },

        positionShip(row, collumn, axis, ship) {
            return this.playerGameBoard.positionShip(row, collumn, axis, ship);
        },

        positionShipsRandomly() {
            const getRandomInt = (maxNumber) => Math.floor(Math.random() * maxNumber);
            const getRandomRow = (maxRow) => getRandomInt(maxRow);
            const getRandomCollumn = (maxCollumn) => getRandomInt(maxCollumn);
            const axis = ['x', 'y'];
            const getRandomAxis = () => axis[getRandomInt(2)];

            let availableRow;
            let availableCollumn;

            const isPositionPosible = (maxRow, maxCollumn, randomAxis, ship) => {
                availableRow = getRandomRow(maxRow);
                availableCollumn = getRandomCollumn(maxCollumn);
                // eslint-disable-next-line max-len
                return this.playerGameBoard.isCoordinateAvailable(availableRow, availableCollumn, randomAxis, ship);
            };

            const doRandomPosition = (maxRowX, maxCollumnX, maxRowY, maxCollumnY, ship) => {
                if (getRandomAxis(2) === 'x') {
                    while (isPositionPosible(maxRowX, maxCollumnX, 'x', ship) !== true) {
                        isPositionPosible(maxRowX, maxCollumnX, 'x', ship);
                    }
                    return this.positionShip(availableRow, availableCollumn, 'x', ship);
                }

                while (isPositionPosible(maxRowY, maxCollumnY, 'y', ship) !== true) {
                    isPositionPosible(maxRowY, maxCollumnY, 'y', ship);
                }
                return this.positionShip(availableRow, availableCollumn, 'y', ship);
            };

            Object.keys(this.playerGameBoard.ships).forEach((ship) => {
                switch (ship) {
                case 'destroyer':
                    doRandomPosition(10, 9, 9, 10, 'destroyer');
                    break;
                case 'submarine':
                    doRandomPosition(10, 8, 8, 10, 'submarine');
                    break;
                case 'cruiser':
                    doRandomPosition(10, 8, 8, 10, 'cruiser');
                    break;
                case 'battleship':
                    doRandomPosition(10, 7, 7, 10, 'battleship');
                    break;
                case 'carrier':
                    doRandomPosition(10, 6, 6, 10, 'carrier');
                    break;
                default:
                    break;
                }
            });
        },
    };
}
