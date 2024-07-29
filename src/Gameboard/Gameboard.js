import Ship from "../Ship/Ship";

export default class Gameboard {
    constructor() {
        this.board = this.createBoard();
        this.numShips = 0;
        this.shipsSunk = 0;
        this.allSunk = false;
        this.missedShots = [];
    }

    createBoard() {
        let BOARD_SIZE = 10;
        let board = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            let row = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                row.push({
                    ship: null,
                    visited: false
                });
            }
            board.push(row);
        }
        return board;
    }

    placeShip(coordinates) {
        const s = new Ship(coordinates.length);
        coordinates.forEach(([row, col]) => {
            this.board[row][col].ship = s;
        })
        this.numShips++;
    }

    receiveAttack(coordinates) {
        let [row, col] = coordinates;
        this.board[row][col].visited = true;
        let ship = this.board[row][col].ship;
        if (ship) {
            ship.hit();
            if (ship.isSunk()) {
                this.shipsSunk++;
            }
        } else {
            this.missedShots.push(JSON.stringify(coordinates));
        }
    }

    allShipsSunk() {
        return this.numShips == this.shipsSunk;
    }
}