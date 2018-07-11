function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

export function getInitialState() {
    return {
        arena: createMatrix(12, 20),
        player: {
            matrix: getRandomPiece(),
            position: {x: 0, y: 0},
            score: 0
        }
    }
}

export function getRandomPiece() {
    const pieces = 'ILJOTSZ';
    return createPiece(pieces[pieces.length * Math.random() | 0]);
}

export function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2]
        ]
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ]
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0]
        ]
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0]
        ]
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0]
        ]
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
        ]
    }
}

export function arenaSweep(state) {
    let rowCount = 1;
    outer: for (let y = state.arena.length - 1; y > 0; --y) {
        for (let x = 0; x < state.arena[y].length; ++x) {
             if (state.arena[y][x] === 0) {
                 continue outer;
             }
        }

        const row = state.arena.splice(y, 1)[0].fill(0);
        state.arena.unshift(row);
        ++y;

        state.player.score += rowCount * 10;
        rowCount *= 2;
    }

    return state;
}

export function collide(arena, player) {
    const [m, o] = [player.matrix, player.position];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                    return true;
            }
        }
    }
    return false;
}

export function mergePlayerAndArena(state) {
    state.player.matrix.forEach((row, y) => {
        row.forEach ((value, x) => {
            if (value !== 0) {
                state.arena[y + state.player.position.y][x + state.player.position.x] = value;
            }
        });
    });
    return state;
}

export function playerReset(state) {
    state.player.matrix = getRandomPiece();
    state.player.position = {
        y: 0,
        x: (state.arena[0].length / 2 | 0) -
        (state.player.matrix[0].length / 2 | 0)
    };

    if (collide(state.arena, state.player)) {
        state.arena.forEach(row => row.fill(0));
        state.player.score = 0;
    }
    return state;
}

export function playerMove(state, dir) {
    state.player.position.x += dir;
    if (collide(state.arena, state.player)) {
        state.player.position.x -= dir;
    }
    return state;
}

export function playerDrop(state) {
    state.player.position.y++;
    if (collide(state.arena, state.player)) {
        state.player.position.y--;
        state = arenaSweep(playerReset(mergePlayerAndArena(state)));;
    }

    return state;
}

export function playerRotate(state) {
    const position = state.player.position.x;
    let offset = 1;
    state.player.matrix = rotate(state.player.matrix);
    while (collide(state.arena, state.player)) {
        state.player.position.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (Math.abs(offset) > state.player.matrix[0].length + 1) {
            state.player.matrix = rotate(state.player.matrix, -1);
            state.player.position.x = position;
            return state;
        }
    }
    return state;
}

// Assuming a square matrix
export function rotate(matrix, dir = 1) {
    var newMatrix = matrix.map((row, i) => {
        return row.map((_, j) => {
            var rowNumber = dir < 0 ? j : matrix.length - 1 - j;
            return matrix[rowNumber][i];
        })
    })

    return dir < 0 ? newMatrix.reverse() : newMatrix;
}