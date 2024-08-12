import Player from "./Player/Player";



let user = new Player('user');
user.board.placeShip([[0,0], [0,1], [0,2]]);
user.board.placeShip([[7,9], [8,9], [9,9]]);

let bot = new Player('bot');
bot.board.placeShip([[0,0], [0,1], [0,2]]);
bot.board.placeShip([[7,9], [8,9], [9,9]]);

export {user, bot}