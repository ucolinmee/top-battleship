import Element from "./Element";
import { toggleHoveredClass, handleAttack, handleReset } from "../DOM";
import { user, bot } from "../GameLogic";

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
                'data-x': col, 
                'data-y': row, 
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
                'data-x': col, 
                'data-y': row, 
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

    const restart = document.getElementById('restart');
    restart.innerHTML = "";
    restart.appendChild(new Element('button').setTextContent('RESTART').appendEventListener('click', handleReset).buildElement());
}