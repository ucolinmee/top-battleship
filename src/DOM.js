import Player from "./Player/Player";

// const human = new Player('human');
// const bot = new Player('bot');

export const toggleHoveredClass = (e) => {
    e.target.classList.toggle('hovered');
}

export const handleAttack = (e) => {
    const col = e.target.getAttribute('data-x');
    const row = e.target.getAttribute('data-y');
    
}