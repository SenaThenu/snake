import { getInputDirection, resetInputs } from "./input.js";

let snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;
let inputDir;

function expandSnake() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}

export function update() {
    expandSnake();

    inputDir = getInputDirection();

    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += inputDir.x;
    snakeBody[0].y += inputDir.y;
}

function getHeadFacingDirection() {
    if (inputDir.x > 0) {
        return "right";
    } else if (inputDir.x < 0) {
        return "left";
    } else if (inputDir.y < 0) {
        return "up";
    } else if (inputDir.y > 0) {
        return "down";
    } else {
        return "up";
    }
}

function getTailFacingDirection(tail, neighbour) {
    let delta_x = tail.x - neighbour.x;
    let delta_y = tail.y - neighbour.y;

    if (delta_x < 0) {
        return "right";
    } else if (delta_x > 0) {
        return "left";
    } else if (delta_y > 0) {
        return "up";
    } else {
        return "down";
    }
}

export function draw(gameBoard) {
    for (let i in snakeBody) {
        i = parseFloat(i);
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = snakeBody[i].y;
        snakeElement.style.gridColumnStart = snakeBody[i].x;
        if (i === 0) {
            let facingDir = getHeadFacingDirection();
            snakeElement.classList.add(`head-${facingDir}`);
        } else if (i === snakeBody.length - 1) {
            let facingDir = getTailFacingDirection(
                snakeBody[i],
                snakeBody[i - 1]
            );
            snakeElement.classList.add(`tail-${facingDir}`);
        } else if (snakeBody[i] === snakeBody[i + 1]) {
            let facingDir = getTailFacingDirection(
                snakeBody[i],
                snakeBody[i - 1]
            );
            snakeElement.classList.add(`tail-${facingDir}`);
            gameBoard.appendChild(snakeElement);
            break;
        } else if (
            snakeBody[i - 1].x !== snakeBody[i + 1].x &&
            snakeBody[i - 1].y !== snakeBody[i + 1].y
        ) {
            let prevSegment = snakeBody[i - 1];
            let nextSegment = snakeBody[i + 1];

            let delta_x = prevSegment.x - nextSegment.x; // + means right & - means left
            let delta_y = prevSegment.y - nextSegment.y; // + means down & - means up

            // for adjacent differences, we are focusing on previous and current segments
            let adj_delta_y = prevSegment.y - snakeBody[i].y;

            if (delta_x > 0) {
                if (delta_y > 0) {
                    if (adj_delta_y === 0) {
                        snakeElement.classList.add("corner-bottom-left");
                    } else {
                        snakeElement.classList.add("corner-top-right");
                    }
                } else {
                    if (adj_delta_y === 0) {
                        snakeElement.classList.add("corner-top-left");
                    } else {
                        snakeElement.classList.add("corner-bottom-right");
                    }
                }
            } else {
                if (delta_y > 0) {
                    if (adj_delta_y === 0) {
                        snakeElement.classList.add("corner-bottom-right");
                    } else {
                        snakeElement.classList.add("corner-top-left");
                    }
                } else {
                    if (adj_delta_y === 0) {
                        snakeElement.classList.add("corner-top-right");
                    } else {
                        snakeElement.classList.add("corner-bottom-left");
                    }
                }
            }
        } else {
            snakeElement.classList.add("snake");
        }

        gameBoard.appendChild(snakeElement);
    }
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
    snakeBody = [{ x: (gridSize + 1) / 2, y: (gridSize + 1) / 2 }];
    resetInputs();
}
