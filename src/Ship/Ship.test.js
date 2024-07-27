import Ship from "./Ship";

const s = new Ship(2);

test('number of hits increases', () => {
    let hits = s.numHits;
    s.hit();
    expect(s.numHits).toBe(hits + 1);
})

test('ship sunk when numHits == length', () => {
    s.hit();
    expect(s.isSunk()).toBeTruthy();
})