import Gameboard from "./Gameboard";
import Ship from "../Ship/Ship";

describe('Gameboard board', () => {
    const g = new Gameboard();

    test('Initialises board with default values', () => {
        expect(g.board.every(row => row.every(cell => (
            (cell.ship == null) && (cell.visited == false)
        )))).toBeTruthy();
    });
})

describe('Add ship to board', () => {
    const g = new Gameboard();

    test('For coordinates corresponding to board cell, ship in each cell is the same ship object', () => {
        let coordinates = [[0, 0], [0, 1], [0, 2]];
        const s = new Ship(coordinates.length);
        g.placeShip(s, coordinates);

        expect(coordinates.every(([row, col]) => (
            g.board[row][col].ship === s
        ))).toBeTruthy();
        expect(g.board[1][1].ship === s).toBeFalsy();
    })
})

describe('Receive attack', () => {
    const g = new Gameboard();

    let coordinates = [[0, 0], [0, 1], [0, 2]];
    const s = new Ship(coordinates.length);
    g.placeShip(s, coordinates);

    test('Cell being attacked sets visited = true', () => {
        g.receiveAttack([5, 5]);
        expect(g.board[5][5].visited).toBeTruthy();
    })

    test('Attack hits ship, ship increases hit count by 1', () => {
        g.receiveAttack([0, 0]);
        expect(s.numHits).toBe(1);
    })

    test('Attack sinks ship, ships sunk increases by 1', () => {
        g.receiveAttack([0, 1]);
        g.receiveAttack([0, 2]);
        expect(g.shipsSunk).toBe(1);
    })

    test('Register missed shot', () => {
        g.receiveAttack([2, 2]);
        expect(g.missedShots.includes(JSON.stringify([2, 2]))).toBe(true);
    })

    test('All ships sunk', () => {
        expect(g.allShipsSunk()).toBeTruthy();
    })
})