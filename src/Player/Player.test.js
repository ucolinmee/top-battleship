import Player from "./Player";
import Ship from "../Ship/Ship";

describe('Real user plays a move', () => {
    const p = new Player('real');
    const s = new Ship(2);
    p.board.placeShip(s, [[0, 0], [0, 1]]);
    test('Real user hits a ship, board updates', () => {
        p.attack([0, 0]);
        let ship = p.board.board[0][0].ship;
        expect(ship.numHits).toBe(1);
    })

    test('Real user misses their attack, missed shots updates', () => {
        let move = [2, 2];
        p.attack(move);
        expect(p.board.missedShots.includes(JSON.stringify(move))).toBeTruthy();
    })
})

describe('Computer plays a move', () => {
    const c = new Player('computer');

    test('Get random move returns a valid move', () => {
        let move = c.getRandomMove();
        expect((0 <= move[0] <= 9) && (0 <= move[1] <= 9)).toBeTruthy();
    })

    test('Random move gets registered onto gameboard', () => {
        c.attack();
        let visitedCells = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (c.board.board[i][j].visited) visitedCells++;
            }
        }
        expect(visitedCells).toBe(1);
    })
})