export default class Ship {
    constructor(length) {
        this.length = length;
        this.numHits = 0;
        this.sunk = false;
    }

    hit() {
        this.numHits++;
    }

    isSunk() {
        if (this.length === this.numHits) this.sunk = true;
        return this.sunk;
    }
}