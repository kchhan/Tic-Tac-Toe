class TicTacToe {
	constructor() {
		this.xIsNext = true;
		this.gameover = false;
		this.board = [null, null, null, null, null, null, null, null, null];
	}

	createGameBoard() {
		const container = document.querySelector('.grid-container');
		const grid = document.createElement('div');
		grid.classList.add('grid');
		for (let i = 0; i < 9; i++) {
			let cell = document.createElement('div');
			cell.className = `grid-item cell-${i}`;
			cell.addEventListener('click', this.play);
			grid.appendChild(cell);
		}
		container.appendChild(grid);
	}

	enableReset() {
		const resetBtn = document.querySelector('.reset');
		resetBtn.addEventListener('click', this.reset);
	}

	play(e) {
		if (tictactoe.gameover === true) return;

		// gets cell number from classlist
		let cellNum = e.target.classList[1].split('-')[1];

		if (tictactoe.xIsNext === true) {
			tictactoe.board[cellNum] = 'x';
			tictactoe.xIsNext = false;
			e.target.innerHTML = '<i class="fas fa-times fa-3x"></i>';
			e.target.removeEventListener('click', tictactoe.play);
		} else {
			tictactoe.board[cellNum] = 'o';
			tictactoe.xIsNext = true;
			e.target.innerHTML = '<i class="far fa-circle fa-3x"></i>';
			e.target.removeEventListener('click', tictactoe.play);
		}

		tictactoe.checkWin();
	}

	checkWin() {
		// horizontal
		if (
			(tictactoe.board[0] === tictactoe.board[1] &&
				tictactoe.board[1] === tictactoe.board[2] &&
				tictactoe.board[0] === tictactoe.board[2] &&
				tictactoe.board[0] !== null &&
				tictactoe.board[1] !== null &&
				tictactoe.board[2] !== null) ||
			(tictactoe.board[3] === tictactoe.board[4] &&
				tictactoe.board[4] === tictactoe.board[5] &&
				tictactoe.board[3] === tictactoe.board[5] &&
				tictactoe.board[3] !== null &&
				tictactoe.board[4] !== null &&
				tictactoe.board[5] !== null) ||
			(tictactoe.board[6] === tictactoe.board[7] &&
				tictactoe.board[7] === tictactoe.board[8] &&
				tictactoe.board[6] === tictactoe.board[8] &&
				tictactoe.board[6] !== null &&
				tictactoe.board[7] !== null &&
				tictactoe.board[8] !== null)
		) {
			tictactoe.gameover = true;
		}

		// vertical
		if (
			(tictactoe.board[0] === tictactoe.board[3] &&
				tictactoe.board[3] === tictactoe.board[6] &&
				tictactoe.board[0] === tictactoe.board[6] &&
				tictactoe.board[0] !== null &&
				tictactoe.board[3] !== null &&
				tictactoe.board[6] !== null) ||
			(tictactoe.board[1] === tictactoe.board[4] &&
				tictactoe.board[4] === tictactoe.board[7] &&
				tictactoe.board[1] === tictactoe.board[7] &&
				tictactoe.board[1] !== null &&
				tictactoe.board[4] !== null &&
				tictactoe.board[7] !== null) ||
			(tictactoe.board[2] === tictactoe.board[5] &&
				tictactoe.board[5] === tictactoe.board[8] &&
				tictactoe.board[2] === tictactoe.board[8] &&
				tictactoe.board[2] !== null &&
				tictactoe.board[5] !== null &&
				tictactoe.board[8] !== null)
		) {
			tictactoe.gameover = true;
		}

		// diagonal
		if (
			(tictactoe.board[0] === tictactoe.board[4] &&
				tictactoe.board[4] === tictactoe.board[8] &&
				tictactoe.board[0] === tictactoe.board[8] &&
				tictactoe.board[0] !== null &&
				tictactoe.board[4] !== null &&
				tictactoe.board[8] !== null) ||
			(tictactoe.board[2] === tictactoe.board[4] &&
				tictactoe.board[4] === tictactoe.board[6] &&
				tictactoe.board[2] === tictactoe.board[6] &&
				tictactoe.board[2] !== null &&
				tictactoe.board[4] !== null &&
				tictactoe.board[6] !== null)
		) {
			tictactoe.gameover = true;
		}
	}

	reset() {
		const container = document.querySelector('.grid-container');
		const grid = document.querySelector('.grid');
		container.removeChild(grid);

		tictactoe.board = [null, null, null, null, null, null, null, null, null];
		tictactoe.gameover = false;

		tictactoe.createGameBoard();
	}
}

let tictactoe = new TicTacToe();
tictactoe.createGameBoard();
tictactoe.enableReset();
