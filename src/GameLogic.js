import Player from "./Player/Player";
import { displayShipImg } from "./UI/Screen";

const randomInitialShips = (player) => {
    let directions = ['H', 'V'];
    let shipsToPlace = [2, 2, 3, 4, 5];
    let allCoordinates = [];
    
    for (let i = 0; i < shipsToPlace.length; i++) {
        let successfullyPlaced = false;
        let coordinates = [];
        while (!successfullyPlaced) {
            let direction = _.sample(directions); // _.sample() is from lodash library for making random choice from array
            coordinates = [];
            if (direction == 'H') { // Places ship horizontally, checks for collision with other already placed ships
                let rowStart = Math.floor((Math.random() * 10));
                let colStart = Math.floor(Math.random() * (10 - shipsToPlace[i]));
                for (let j = 0; j < shipsToPlace[i]; j++) {
                    if (player.board.board[rowStart][colStart + j].ship) continue
                    coordinates.push([rowStart, colStart + j]);
                }                
            } else { // Places ship vertically, checks for collision with other already placed ships
                let rowStart = Math.floor(Math.random() * (10 - shipsToPlace[i]));
                let colStart = Math.floor((Math.random() * 10));
                for (let j = 0; j < shipsToPlace[i]; j++) {
                    if (player.board.board[rowStart + j][colStart].ship) continue
                    coordinates.push([rowStart + j, colStart]);
                }  
            }
            successfullyPlaced = coordinates.length == shipsToPlace[i] ? true : false;
        }
        player.board.placeShip(coordinates);
        allCoordinates.push(coordinates);
    }
    return allCoordinates;
}

let user = new Player('user');
const userShipCoordinates = randomInitialShips(user);

let bot = new Player('bot');
randomInitialShips(bot);
const shipsSunkCoordinates = [];

export {user, bot, userShipCoordinates, shipsSunkCoordinates}