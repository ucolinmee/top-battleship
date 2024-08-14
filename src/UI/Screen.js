import Element from "./Element";
import { toggleHoveredClass, handleAttack, handleReset } from "../DOM";
import { user, bot, userShipCoordinates, shipsSunkCoordinates } from "../GameLogic";
import Ship2 from "../assets/ship2.svg";
import Ship3 from "../assets/ship3.svg";
import Ship4 from "../assets/ship4.svg";
import Ship5 from "../assets/ship5.svg";

const shipsImg = [
    Ship2,
    Ship3,
    Ship4,
    Ship5
]

let gameStarted = false;

export const disableButton = () => {
    gameStarted = true;
}

export const displayGameOver = (player) => {
    const feedback = document.getElementById('feedback');
    if (player.type == 'bot') {
        feedback.innerHTML = 'You won! Good job!'
    } else {
        feedback.innerHTML = 'The enemy beat you first... try again next time.'
    }
}

const renderUserBoard = (board) => {
    const boardSection = new Element('section').setAttributes({class: 'board-section'});

    const boardHtml = new Element('div').setAttributes({class: 'board', id: 'user-board'});

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cellHtml = new Element('div').setAttributes({
                class: 'cell', 
                'data-x': row, 
                'data-y': col, 
                'data-ship': board[row][col].ship,
                'data-visited': board[row][col].visited
            })

            if (board[row][col].visited) {
                if (board[row][col].ship) {
                    cellHtml.setAttributes({class: 'cell hit'})
                } else {
                    cellHtml.setAttributes({class: 'cell miss'})
                }
            }

            boardHtml.addChild(cellHtml);
        }
    }

    boardSection.addChild(boardHtml);
    boardSection.addChild(new Element('div').setTextContent('You').setAttributes({class: 'board-label'}));

    const randomShipsBtn = new Element('button').setTextContent('Randomize Ships').appendEventListener('click', handleReset)
    gameStarted ? randomShipsBtn.setAttributes({class: 'random-btn', disabled: true}) : randomShipsBtn.setAttributes({class: 'random-btn'});
    boardSection.addChild(randomShipsBtn);
    
    return boardSection.buildElement();
}

const renderBotBoard = (board) => {
    const feedback = document.getElementById('feedback');

    const boardSection = new Element('section').setAttributes({class: 'board-section'});

    const boardHtml = new Element('div').setAttributes({class: 'board', id: 'bot-board'});

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cellHtml = new Element('div').setAttributes({
                class: 'cell', 
                'data-x': row, 
                'data-y': col, 
                'data-ship': board[row][col].ship,
                'data-visited': board[row][col].visited
            }).appendEventListener('mouseover', toggleHoveredClass)
              .appendEventListener('mouseout', toggleHoveredClass)
              .appendEventListener('click', handleAttack)

            if (board[row][col].visited) {
                cellHtml.removeEventListener('mouseover', toggleHoveredClass)
                .removeEventListener('mouseout', toggleHoveredClass)
                .removeEventListener('click', handleAttack)
                if (board[row][col].ship) {
                    cellHtml.setAttributes({class: 'cell hit'})
                } else {
                    cellHtml.setAttributes({class: 'cell miss'})
                }
            } 

            boardHtml.addChild(cellHtml);
        }
    }

    boardSection.addChild(boardHtml);
    boardSection.addChild(new Element('div').setTextContent('Computer').setAttributes({class: 'board-label'}));

    return boardSection.buildElement();
}

export const loadScreen = () => {
    const battlefield = document.getElementById('battlefield');
    battlefield.innerHTML = "";
    battlefield.appendChild(renderUserBoard(user.board.board));
    battlefield.appendChild(renderBotBoard(bot.board.board));

    userShipCoordinates.forEach(coords => {
        displayShipImg(coords, 'user');
    });

    shipsSunkCoordinates.forEach(coords => {
        displayShipImg(coords, 'bot');
    });

    const restart = document.getElementById('restart');
    restart.innerHTML = "";
    restart.appendChild(new Element('button').setTextContent('RESTART').appendEventListener('click', handleReset).buildElement());
}

export const displayShipImg = (coordinates, player) => {
    const imgLink = shipsImg[coordinates.length - 2];

    // Determine if the ship is placed vertically or horizontally, check if col-coordinates remain the same
    const isVertical = coordinates[0][1] === coordinates[1][1];

    // Get start and end coordinates of ship
    const start = coordinates[0];
    const end = coordinates[coordinates.length - 1];

    const cellSize = document.querySelector('.cell').offsetWidth;

    const shipImg = new Element('img')
        .setAttributes({
            src: imgLink,
            class: 'ship',
            style: `
                grid-area: ${start[0] + 1} / ${start[1] + 1} / ${end[0] + 1} / ${end[1] + 1}; 
                width: ${`${coordinates.length * cellSize}px`}; 
                height: ${`${cellSize}px`};
                transform: ${isVertical ? 'rotate(90deg) translate(0, -100%)' : 'none'};
                transform-origin: ${isVertical ? 'left top' : 'none'};
                `
        });
    const board = player == 'bot' ? document.getElementById('bot-board') : document.getElementById('user-board')
    board.appendChild(shipImg.buildElement());
}

