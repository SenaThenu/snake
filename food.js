import { addSegments, onSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const EXPANSION_RATE = 5;

export function update() {
    if (onSnake(food)) {
        console.log("Snake's on the food!");
        addSegments(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let randomPosition;

    while (randomPosition == null || onSnake(randomPosition)) {
        randomPosition = randomGridPosition();
    }

    return randomPosition;
}
