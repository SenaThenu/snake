let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && lastInputDirection.x === 0) {
        inputDirection = { x: -1, y: 0 };
    } else if (e.key === "ArrowRight" && lastInputDirection.x === 0) {
        inputDirection = { x: 1, y: 0 };
    } else if (e.key === "ArrowDown" && lastInputDirection.y === 0) {
        inputDirection = { x: 0, y: 1 };
    } else if (e.key === "ArrowUp" && lastInputDirection.y === 0) {
        inputDirection = { x: 0, y: -1 };
    }
});

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}

export function resetInputs() {
    inputDirection = { x: 0, y: 0 };
    lastInputDirection = { x: 0, y: 0 };
}
