import Element from "./Element";
import { toggleHoveredClass, handleAttack } from "../DOM";
import { user, bot } from "../main";

const renderBoard = (board, type) => {
    console.log(type);
    const boardSection = new Element('section').setAttributes({class: 'board-section'});

    let boardId = type == 'user' ? 'user-board' : 'bot-board';
    const boardHtml = new Element('div').setAttributes({class: 'board', id: boardId});

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cellHtml = new Element('div').setAttributes({
                class: 'cell', 
                'data-x': col, 
                'data-y': row, 
                'data-ship': board[row][col].ship,
                'data-visited': board[row][col].visited
            });

            if (type == 'bot') {
                cellHtml.appendEventListener('mouseover', toggleHoveredClass)
                        .appendEventListener('mouseout', toggleHoveredClass)
                        .appendEventListener('click', handleAttack)
            }
            boardHtml.addChild(cellHtml);
        }
    }

    boardSection.addChild(boardHtml);

    let text = type == 'user' ? 'You' : 'Computer';
    boardSection.addChild(new Element('div').setTextContent(text).setAttributes({class: 'board-label'}));

    if (type == 'user') {
        boardSection.addChild(new Element('button').setTextContent('Randomize Ships').setAttributes({class: 'random-btn'}));
    }

    return boardSection.buildElement();
}

export const loadScreen = () => {
    const battlefield = document.getElementById('battlefield');
    battlefield.appendChild(renderBoard(user.board.board, user.type));
    battlefield.appendChild(renderBoard(bot.board.board, bot.type));
}