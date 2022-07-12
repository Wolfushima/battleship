import createGameBoard from './gameboard';

test('Contains 100 cells', () => {
    const gameBoard1 = createGameBoard();
    const totalLength = gameBoard1.gameBoard.reduce((count, current) => count + current.length, 0);

    expect(totalLength).toBe(100);
});

test('Valid position match coordinates', () => {
    const gameBoard1 = createGameBoard();

    expect(gameBoard1.positionShip(0, 1, 'destroyer')).toBe(true);
    expect(gameBoard1.positionShip(0, 1, 'destroyer')).toBe(false);
    expect(gameBoard1.positionShip(0, 0, 'carrier')).toBe(false);
    expect(gameBoard1.positionShip(0, 2, 'destroyer')).toBe(false);
    expect(gameBoard1.positionShip(0, 3, 'destroyer')).toBe(true);
});

test('Ship position fits game board', () => {
    const gameBoard1 = createGameBoard();

    expect(gameBoard1.positionShip(0, 8, 'carrier')).toBe(false);
    expect(gameBoard1.positionShip(5, 9, 'carrier')).toBe(false);
    expect(gameBoard1.positionShip(0, 4, 'carrier')).toBe(true);
});

test('Received attack hit ship', () => {
    const gameBoard1 = createGameBoard();
    gameBoard1.positionShip(0, 1, 'destroyer');

    expect(gameBoard1.ships.destroyer.healthPoints).toBe(2);
    expect(gameBoard1.receiveAttack(0, 1)).toBe(true);
    expect(gameBoard1.ships.destroyer.healthPoints).toBe(1);
    expect(gameBoard1.receiveAttack(0, 1)).toBe(false);
    expect(gameBoard1.ships.destroyer.healthPoints).toBe(1);
    expect(gameBoard1.receiveAttack(0, 2)).toBe(true);
    expect(gameBoard1.ships.destroyer.healthPoints).toBe(0);
});

test('Are positioned ships sunked?', () => {
    const gameBoard1 = createGameBoard();
    gameBoard1.positionShip(0, 1, 'destroyer');
    gameBoard1.positionShip(1, 1, 'submarine');
    gameBoard1.positionShip(2, 1, 'cruiser');
    gameBoard1.positionShip(3, 1, 'battleship');
    gameBoard1.positionShip(4, 1, 'carrier');

    gameBoard1.receiveAttack(0, 1);
    gameBoard1.receiveAttack(0, 2);

    gameBoard1.receiveAttack(1, 1);
    gameBoard1.receiveAttack(1, 2);
    gameBoard1.receiveAttack(1, 3);

    gameBoard1.receiveAttack(2, 1);
    gameBoard1.receiveAttack(2, 2);
    gameBoard1.receiveAttack(2, 3);

    gameBoard1.receiveAttack(3, 1);
    gameBoard1.receiveAttack(3, 2);
    gameBoard1.receiveAttack(3, 3);
    gameBoard1.receiveAttack(3, 4);

    gameBoard1.receiveAttack(4, 1);
    gameBoard1.receiveAttack(4, 2);
    gameBoard1.receiveAttack(4, 3);
    gameBoard1.receiveAttack(4, 4);
    gameBoard1.receiveAttack(4, 5);

    expect(gameBoard1.ships.destroyer.healthPoints).toBe(0);
    expect(gameBoard1.ships.submarine.healthPoints).toBe(0);
    expect(gameBoard1.ships.cruiser.healthPoints).toBe(0);
    expect(gameBoard1.ships.battleship.healthPoints).toBe(0);
    expect(gameBoard1.ships.carrier.healthPoints).toBe(0);

    expect(gameBoard1.areShipsSunk()).toBe(true);
});
