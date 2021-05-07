class TicTacToe {
	main() {
		window.addEventListener("DOMContentLoaded", () => {
			// start a new game when page loads with default values
			this.newGame();

			// clear game board and start new game with selected values
			document.getElementById("new-game").addEventListener("click", () => {
				this.clearGameBoard();
				const starting_player = document.getElementById("starting").value;
				const depth = document.getElementById("depth").value;
				this.newGame(depth, starting_player);
			});
		});
	}

	/**
	 * starts a new game with a certain depth and a starting_player
	 * @param {string} depth default value -1 (unbeatable)
	 * @param {string} starting_player default value 1 (human)
	 */
	newGame(depth = -1, starting_player = 1) {
		// instaniating a new player and an empty board
		const p = new Player(parseInt(depth));
		const b = new Board(["", "", "", "", "", "", "", "", ""]);
		this.createGameBoard();
		const board = document.getElementById("board");
		const cells = [...board.children];

		// initializing some varaibles for internal use
		const starting = parseInt(starting_player);
		const maximizing = starting;
		let player_turn = starting;

		// if not starting then randomly choose corner or center to start
		if (!starting) {
			const center_and_corners = [0, 2, 4, 6, 8];
			const first_choice =
				center_and_corners[
					Math.floor(Math.random() * center_and_corners.length)
				];
			const symbol = !maximizing ? "x" : "o";
			// update board class instance and board ui
			b.insert(symbol, first_choice);
			this.drawSymbol(symbol, cells[first_choice]);
			// switch turns
			player_turn = 1;
		}

		cells.forEach((cell, index) => {
			cell.addEventListener("click", () => {
				if (
					cell.classList.contains("x") ||
					cell.classList.contains("o") ||
					b.isTerminal() ||
					!player_turn
				) {
					return false;
				}
				const symbol = maximizing ? "x" : "o";

				// update the board class instance as well as the board ui for your moves
				b.insert(symbol, index);
				this.drawSymbol(symbol, cells[index]);
				// if it's a terminal move and it's not a draw, then human won
				const winner = b.isTerminal().winner;
				if (winner === "x" || winner === "o") {
					const winner = b.isTerminal().cells;
					this.drawWinningLine(winner);
				} else if (winner === "draw") {
					this.drawGameDraw();
				}

				// switch turns
				player_turn = 0;

				// get computer's best move and update the ui
				p.getBestMove(b, !maximizing, (best) => {
					const symbol = !maximizing ? "x" : "o";
					b.insert(symbol, best);
					this.drawSymbol(symbol, cells[best]);
					const winner = b.isTerminal().winner;
					if (winner === "x" || winner === "o") {
						const winningCells = b.isTerminal().cells;
						this.drawWinningLine(winningCells);
					} else if (winner === "draw") {
						this.drawGameDraw();
					}
					// switch player
					player_turn = 1;
				});
			});
		});
	}

	/**
	 * draws game board and gives each cell a number
	 */
	createGameBoard() {
		const container = document.querySelector("#board-container");
		const board = document.createElement("div");
		board.id = "board";
		for (let i = 0; i < 9; i++) {
			let cell = document.createElement("div");
			cell.className = `cell cell-${i}`;
			board.appendChild(cell);
		}
		container.appendChild(board);
	}

	/**
	 * draws symbol on game grid
	 * @param {string} symbol
	 * @param {array[index]} cell
	 */
	drawSymbol(symbol, cell) {
		if (symbol == "x") {
			cell.classList.add(symbol, "fas", "fa-times", "fa-3x");
		} else if (symbol == "o") {
			cell.classList.add(symbol, "far", "fa-circle", "fa-3x");
		}
	}

	/**
	 * @param {array} winningCells array of winning cells to color
	 */
	drawWinningLine(winningCells) {
		const board = document.getElementById("board");
		const cells = [...board.children];
		winningCells.forEach((winningCell) => {
			cells[winningCell].classList.add("winning");
		});
	}

	/**
	 * game is a draw and color all squares
	 */
	drawGameDraw() {
		const board = document.getElementById("board");
		const cells = [...board.children];
		cells.forEach((cell) => {
			cell.classList.add("draw");
		});
	}

	/**
	 * Removes current grid
	 */
	clearGameBoard() {
		const board = document.getElementById("board");
		board.remove();
	}
}

const ttt = new TicTacToe();
ttt.main();
