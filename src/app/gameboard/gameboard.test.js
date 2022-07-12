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
