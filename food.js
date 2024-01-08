import { addSegments, onSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();

// animation related stuff
let animFrame = 0;
let scaleFactor = 1; // Initial scale
let easing = 0; // Easing variable
const animationDuration = 7; // Animation duration in milliseconds

export function update(expansion_rate) {
    if (onSnake(food)) {
        addSegments(expansion_rate);
        food = getRandomFoodPosition();
    }
}

export function draw(gameBoard, snakeSpeed) {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");

    animFrame += animationDuration / snakeSpeed;

    // Easing function based on ease-in-out (approximate)
    easing = Math.sin((Math.PI * animFrame) / animationDuration);
    scaleFactor = 1 + 0.15 * easing; // Adjust scaling amount as needed

    if (animFrame < animationDuration) {
        foodElement.style.transform = `scale(${scaleFactor})`;
    } else {
        animFrame = 0;
    }
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
