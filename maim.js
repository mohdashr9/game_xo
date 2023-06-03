let turn = 'x';
let gameOver = false;
let gameStarted = false;
let timerId;

function startGame(id) {
    if (gameStarted) {
        return;
    }
    
    gameStarted = true;
    timerId = setInterval(updateTimer, 1000);
    game(id);
}

function game(id) {
    if (gameOver) {
        return;
    }

    let element = document.getElementById(id);

    if (element.innerHTML === '') {
        element.innerHTML = turn;

        if (checkWin()) {
            clearInterval(timerId);
            highlightWinningCombination();
            announceWinner(turn);
            setTimeout(resetGame, 5000);
            return;
        }

        if (checkTie()) {
            clearInterval(timerId);
            announceTie();
            setTimeout(resetGame, 5000);
            return;
        }

        if (turn === 'x') {
            turn = 'o';
        } else {
            turn = 'x';
        }

        let title = document.querySelector('.title');
        title.innerHTML = turn.toUpperCase();
    }
}

function checkWin() {
    let squares = document.getElementsByClassName('square');
    let winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (
            squares[a].innerHTML !== '' &&
            squares[a].innerHTML === squares[b].innerHTML &&
            squares[a].innerHTML === squares[c].innerHTML
        ) {
            return true;
        }
    }

    return false;
}

function highlightWinningCombination() {
    let squares = document.getElementsByClassName('square');
    let winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (
            squares[a].innerHTML !== '' &&
            squares[a].innerHTML === squares[b].innerHTML &&
            squares[a].innerHTML === squares[c].innerHTML
        ) {
            squares[a].classList.add('highlight');
            squares[b].classList.add('highlight');
            squares[c].classList.add('highlight');
            break;
        }
    }
}

function checkTie() {
    let squares = document.getElementsByClassName('square');
    for (let square of squares) {
        if (square.innerHTML === '') {
            return false;
        }
    }
    return true;
}

function announceWinner(player) {
    let title = document.querySelector('.title');
    title.innerHTML = player.toUpperCase() + ' wins!';
}

function announceTie() {
    let title = document.querySelector('.title');
    title.innerHTML = 'It\'s a tie!';
}

function resetGame() {
    let squares = document.getElementsByClassName('square');
    for (let square of squares) {
        square.innerHTML = '';
        square.classList.remove('highlight');
    }
    let title = document.querySelector('.title');
    title.innerHTML = '<span>X O</span> Game';
    turn = 'x';
    gameOver = false;
    gameStarted = false;
}

function updateTimer() {
    let title = document.querySelector('.title');
    let timerText = title.innerHTML;
    let seconds = parseInt(timerText.split(' ')[1]);
    seconds++;
    title.innerHTML = `Timer: ${seconds}`;
}