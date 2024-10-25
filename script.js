// for node.js only -v 
// const prompt = require('prompt-sync')();

const gameboard = (function () {
    const gameState = [['[]', '[]', '[]'], ['[]', '[]', '[]'], ['[]', '[]', '[]']]
    const printState = () => gameState.forEach(row => console.log(row));
    const changeState = (row, col, player) => gameState[row][col] = player;
    const getState = () => gameState;
    return { printState, changeState, getState };
})();

const game = (function () {
    const playerOne = 'x';
    const playerTwo = 'o';
    const emptySpace = '[]'

    const playGame = (gameboard) => {
        gameboard.printState();
        let currentPlayer = playerOne;
        while (!isGameOver(gameboard.getState())) {
            let turnPlayed = playTurn(gameboard, currentPlayer);
            if (turnPlayed) {
                currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
            }
        }
        console.log("game over");
    }

    const playTurn = (gameboard, player) => {
        const row = prompt(`Hello ${player}, what is your next move? (row number)`);
        const col = prompt(`${player}, what is your next move? (col number)`);
        const canPlay = gameboard.getState()[row][col] === emptySpace;
        canPlay ? gameboard.changeState(row, col, player) : console.log("Game board space is not empty, Please choose an empty space");
        gameboard.printState();
        return canPlay;
    }

    const isGameOver = (gamestate) => {
        const isRowWon = gamestate.some(row => row[0] !== emptySpace && row.every(col => col === row[0]));
        const transpose = gamestate => gamestate[0].map((col, i) => gamestate.map(row => row[i]));
        const isColWon = transpose(gamestate).some(col => col[0] !== emptySpace && col.every(row => row === col[0]));
        const diagonals = [
            [gamestate[0][0], gamestate[1][1], gamestate[2][2]],
            [gamestate[0][2], gamestate[1][1], gamestate[2][0]]
        ];
        const isDiagonalWon = diagonals.some(diagonal => diagonal[0] === diagonal[1] && diagonal[1] === diagonal[2]);
        const isGameWon = isRowWon || isColWon || isDiagonalWon;

        return isGameWon;
    }
    return { playGame };
})();

game.playGame(gameboard);
