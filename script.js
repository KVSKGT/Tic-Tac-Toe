const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const INITIAL_STATUS = "Player X's turn";

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;

function checkWinner() {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'Draw';
}

function handleClick(event) {
  const index = parseInt(event.target.dataset.index, 10);

  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(currentPlayer.toLowerCase());
  event.target.disabled = true;

  const result = checkWinner();

  if (result) {
    gameOver = true;
    statusEl.textContent = result === 'Draw' ? "It's a draw!" : `Player ${result} wins!`;
    cells.forEach((cell) => (cell.disabled = true));
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  statusEl.textContent = INITIAL_STATUS;

  cells.forEach((cell) => {
    cell.textContent = '';
    cell.className = 'cell';
    cell.disabled = false;
  });
}

cells.forEach((cell) => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
