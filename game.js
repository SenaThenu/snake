import {
    getSnakeHead,
    resetSnakeBody,
    snakeIntersection,
    update as snakeUpdate,
    draw as snakeDraw,
} from "./snake.js";

import {
    forceUpdateFoodPosition,
    update as foodUpdate,
    draw as foodDraw,
} from "./food.js";

import { outsideGrid, updateGridSize } from "./grid.js";

let SNAKE_SPEED = 7; // how many squares the snake moves per second!
let EXPANSION_RATE = 1; // how many squares the snake gains per food item!

// Adding event listeners to modify main game variables
const sliders = document.querySelectorAll(".slider");
const sliderValueSpans = document.querySelectorAll(".slider-value");

Array.from(sliders).forEach((slider, index) => {
    slider.addEventListener("input", () => {
        let sliderValue = parseFloat(slider.value);
        sliderValueSpans[index].innerHTML = sliderValue;
        if (slider.id === "snake-speed") {
            SNAKE_SPEED = slider.value;
        } else if (slider.id === "expansion-rate") {
            EXPANSION_RATE = slider.value;
        } else {
            updateGridSize(slider.value);
        }
    });
});

let lastRenderTime = 0;
let gameOver = false;

// dealing with game restarting
const restart = document.getElementById("restart");
restart.addEventListener("click", () => {
    resetGame();
});

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "Enter":
            if (gameOver) {
                resetGame();
            }
    }
});

const gameBoard = document.getElementById("game-board");

function main(currentTime) {
    window.requestAnimationFrame(main);
    if (gameOver) {
        displayGameOver();
    } else {
        let delta = (currentTime - lastRenderTime) / 1000;
        if (delta < 1 / SNAKE_SPEED) return;

        lastRenderTime = currentTime;

        update();
        draw();
    }
}

window.requestAnimationFrame(main);

function update() {
    snakeUpdate();
    foodUpdate(EXPANSION_RATE);
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = "";
    snakeDraw(gameBoard);
    foodDraw(gameBoard, SNAKE_SPEED);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function resetGame() {
    gameOver = false;

    let gameOverPane = document.getElementById("game-over-pane");
    gameOverPane.classList.add("hide");

    resetSnakeBody();
    forceUpdateFoodPosition();
}

function displayGameOver() {
    let gameOverPane = document.getElementById("game-over-pane");
    gameOverPane.classList.remove("hide");
}
