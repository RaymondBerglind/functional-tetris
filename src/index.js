import * as core from './core';
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
var state = core.getInitialState();

context.scale(20, 20);

const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF'
]

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function draw(state) {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(state.arena, {x: 0, y: 0});
    drawMatrix(state.player.matrix, state.player.position);
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
function tick(state, time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        state = core.playerDrop(state);
        dropCounter = 0;
    }
    
    updateScoreLabel(state);
    draw(state);
    requestAnimationFrame(function (time) {
        tick(state, time);   
    });
}

function updateScoreLabel(state) {
    document.getElementById('score').innerText = state.player.score;
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        state = core.playerMove(state, -1);
    } else if (event.keyCode === 38) {
        state = core.playerRotate(state);
    } else if (event.keyCode === 39) {
        state = core.playerMove(state, 1);
    } else if (event.keyCode === 40) {
        state = core.playerDrop(state);
    }
});

tick(state);
