import Element from "./Element";

const battlefield = document.getElementById('battlefield');

export const loadBoards = () => {
    const userSection = new Element('section').setAttributes({class: 'board-section'});
    const botSection = new Element('section').setAttributes({class: 'board-section'});

    const userBoardHtml = new Element('div').setAttributes({class: 'board', id: 'user-board'});
    const botBoardHtml = new Element('div').setAttributes({class: 'board', id: 'bot-board'});

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            userBoardHtml.addChild(new Element('div').setAttributes({class: 'cell', 'data-x': i, 'data-y': j}))
            botBoardHtml.addChild(new Element('div').setAttributes({class: 'cell', 'data-x': i, 'data-y': j}))
        }
    }

    userSection.addChild(userBoardHtml);
    botSection.addChild(botBoardHtml);

    userSection.addChild(new Element('div').setTextContent('You').setAttributes({class: 'board-label'}));
    botSection.addChild(new Element('div').setTextContent('Enemy').setAttributes({class: 'board-label'}));

    userSection.addChild(new Element('button').setTextContent('Randomize Ships').setAttributes({class: 'random-btn'}));

    battlefield.appendChild(userSection.buildElement());
    battlefield.appendChild(botSection.buildElement());
}