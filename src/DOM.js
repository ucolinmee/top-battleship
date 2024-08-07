import { user, bot } from "./main";
import { loadScreen } from "./UI/Screen";

// const human = new Player('human');
// const bot = new Player('bot');

export const toggleHoveredClass = (e) => {
    e.target.classList.toggle('hovered');
}

export const handleAttack = (e) => {
    const col = e.target.getAttribute('data-x');
    const row = e.target.getAttribute('data-y');
    if (e.target.parentNode.id == 'bot-board') {
        bot.board.board[row][col].visited = true;
    } else {
        user.board.board[col][row].visited = true
    }
    loadScreen();
}