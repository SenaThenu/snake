import { addSegments, onSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();

export function update(expansion_rate) {
    if (onSnake(food)) {
        addSegments(expansion_rate);
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

export function forceUpdateFoodPosition() {
    /* This is used to update the food position when changing the grid size */
    food = getRandomFoodPosition();
}

function getRandomFoodPosition() {
    let randomPosition;

    while (randomPosition == null || onSnake(randomPosition)) {
        randomPosition = randomGridPosition();
    }

    return randomPosition;
}
