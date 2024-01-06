import { resetSnakeBody } from "./snake.js";
import { forceUpdateFoodPosition } from "./food.js";

let GRID_SIZE = 21;

export function randomGridPosition() {
    return {
        x: Math.round(Math.random() * GRID_SIZE),
        y: Math.round(Math.random() * GRID_SIZE),
    };
}

export function outsideGrid(head) {
    if (head.x > GRID_SIZE || head.x < 0) {
        return true;
    } else if (head.y > GRID_SIZE || head.y < 0) {
        return true;
    } else {
        return false;
    }
}

export function updateGridSize(newSize) {
    GRID_SIZE = newSize;
    let gameBoard = document.getElementById("game-board");
    gameBoard.style.gridTemplateColumns = `repeat(${GRID_SIZE}, auto)`;
    gameBoard.style.gridTemplateRows = `repeat(${GRID_SIZE}, auto)`;
    resetSnakeBody();
    forceUpdateFoodPosition();
}
