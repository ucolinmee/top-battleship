import { user, bot } from "./GameLogic";
import { loadScreen, disableButton, displayGameOver } from "./UI/Screen";


export const toggleHoveredClass = (e) => {
    e.target.classList.toggle('hovered');
}

export const handleAttack = (e) => {
    disableButton();
    const row = e.target.getAttribute('data-x');
    const col = e.target.getAttribute('data-y');
    if (e.target.parentNode.id == 'bot-board') {
        bot.board.receiveAttack([row, col]);
    } else {
        user.board.receiveAttack([row, col]);
    }
    if (isGameOver(user)) {
        displayGameOver(user);
    } else if (isGameOver(bot)) {
        displayGameOver(bot);
    }
    loadScreen();
}

export const handleReset = () => {
    location.reload();
}

const isGameOver = (player) => {
    if (player.board.allShipsSunk()) {
        displayGameOver(player)
        return true;
    }
    return false
}