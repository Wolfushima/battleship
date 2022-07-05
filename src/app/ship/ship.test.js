import createShip from './ship';

test('Check length', () => {
    const ship1 = createShip(5);
    const ship2 = createShip(9);

    expect(ship1.length).toBe(5);
    expect(ship2.healthPoints).toBe(9);
});

test('Check healthPoints', () => {
    const ship1 = createShip(5);

    expect(ship1.healthPoints).toBe(5);

    ship1.hit();
    expect(ship1.healthPoints).toBe(4);
    ship1.hit();
    ship1.hit();
    expect(ship1.healthPoints).toBe(2);
});

test('Check if sunk', () => {
    const ship1 = createShip(2);
    ship1.hit();
    ship1.hit();

    expect(ship1.isSunk()).toBe(true);
});

test('Check if ship gets hit after sunk', () => {
    const ship1 = createShip(2);

    expect(ship1.isSunk()).toBe(false);
    expect(ship1.hit()).toBe(true);
    expect(ship1.hit()).toBe(true);
    expect(ship1.hit()).toBe(false);
    expect(ship1.isSunk()).toBe(true);
});
