import { getInputDirection } from "./input.js";

let snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

function expandSnake() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}

export function update() {
    expandSnake();

    let inputDir = getInputDirection();

    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += inputDir.x;
    snakeBody[0].y += inputDir.y;
}

export function draw(gameBoard) {
    snakeBody.forEach((segment) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    });
}

export function onSnake(item, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) {
            return false;
        } else {
            return segment.x === item.x && segment.y === item.y;
        }
    });
}

export function addSegments(amount) {
    newSegments += amount;
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true });
}

export function resetSnakeBody() {
    let gridSize = parseFloat(document.getElementById("grid-size").value);
    console.log(gridSize);
    snakeBody = [{ x: (gridSize + 1) / 2, y: (gridSize + 1) / 2 }];
    console.log(snakeBody);
}
