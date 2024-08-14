export default class Ship {
    constructor(length, coordinates) {
        this.length = length;
        this.numHits = 0;
        this.sunk = false;
        this.coordinates = coordinates;
    }

    hit() {
        this.numHits++;
    }

    isSunk() {
        if (this.length === this.numHits) this.sunk = true;
        return this.sunk;
    }
}