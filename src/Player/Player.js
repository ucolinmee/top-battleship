import Gameboard from "../Gameboard/Gameboard"

export default class Player {
    constructor(type) {
        this.type = type // 'real' or 'computer' players
        this.board = new Gameboard();
    }

    attack(move=null) {
        if (this.type == 'computer') {
            move = this.getRandomMove();
        }
        this.board.receiveAttack(move);
    }

    getRandomMove() {
        let row, col;
        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
        } while (this.board.missedShots.includes(JSON.stringify([row, col])));
        return [row, col];
    }
}