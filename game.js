import {
    SNAKE_SPEED,
    update as snakeUpdate,
    draw as snakeDraw,
    snakeIntersection,
    getSnakeHead,
} from "./snake.js";

import { update as foodUpdate, draw as foodDraw } from "./food.js";

import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
    if (gameOver) {
        if (confirm("You Lost! Click OK to Restart!")) {
            window.location("/");
        }
        return;
    }

    window.requestAnimationFrame(main);
    let delta = (currentTime - lastRenderTime) / 1000;
    if (delta < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    snakeUpdate();
    foodUpdate();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = "";
    snakeDraw(gameBoard);
    foodDraw(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
