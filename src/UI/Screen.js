import Element from "./Element";
import { toggleHoveredClass, handleAttack } from "../DOM";
import { user, bot } from "../main";

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
    boardSection.addChild(new Element('button').setTextContent('Randomize Ships').setAttributes({class: 'random-btn'}));
    
    return boardSection.buildElement();
}

const renderBotBoard = (board) => {
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
}