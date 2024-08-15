# Battleship

Welcome to Battleship. This project is an implementation of the classic Battleship game using HTML, CSS and JavaScript. It features both human and bot players, randomized ship placements, and an interactive game board.

Test it out for yourself [here](https://ucolinmee.github.io/top-battleship/)

![screenshot](/src/assets/battleship.png)

## Features

* Interactive game board 
* Randomized ship placement
* Real-time updates for hits, misses, and sunken ships
* Play again functionality to reset the game

## Technologies Used
* JavaScript (ES6+)
* Jest (for testing)
* Webpack (bundling)
* HTML5
* CSS

### Installing

To run this project locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/your-username/top-battleship.git
```

2. Navigate to the project directory:
```
cd top-battleship
```

3. Install the dependencies:
```
npm install
```

### Game Rules

1. The game board consists of a 10x10 grid for both players.
2. Each player has a fleet of ships of varying lengths.
3. Ships can be placed either horizontally or vertically.
4. Players take turns to select a cell on the opponent's grid to attack.
5. A hit is marked with an 'X', and a miss is marked with a dot.
6. The game continues until all the ships of one player are sunk.

## Running Tests

This project uses Jest for testing. To run the tests, use the following command:
```
npm test Gameboard.test.js
```
