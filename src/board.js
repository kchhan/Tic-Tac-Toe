/**
 * @description This class represents the board, containes methods that check board state, inserting symbol at position
 * @param {Array} state - an array representing the state of the board
 */
class Board {
	constructor(state = ["", "", "", "", "", "", "", "", ""]) {
		this.state = state;
		this.gameOver = false;
	}

	/**
	 * Logs a visualised board with the current state to the console
	 */
	printFormattedBoard() {
		let formattedString = "";
		this.state.forEach((cell, index) => {
			formattedString += cell ? ` ${cell} |` : "   |";
			if ((index + 1) % 3 == 0) {
				formattedString = formattedString.slice(0, -1);
				if (index < 8)
					formattedString +=
						"\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
			}
		});
		console.log("%c" + formattedString, "color: #6d4e42;font-size:16px");
	}

	/**
	 * inserts symbol into board state position
	 * @param {string} symbol either 'x' or 'o'
	 * @param {array[index]} position
	 * @returns {boolean} function returns true if successful, false otherwise
	 */
	insert(symbol, position) {
		if (position > 8 || this.state[position]) return false;

		this.state[position] = symbol;
		return true;
	}

	/**
	 * @returns {array} of available cells
	 */
	getAvailableMoves() {
		const moves = [];
		this.state.forEach((cell, index) => {
			if (!cell) moves.push(index);
		});
		return moves;
	}

	/**
	 * @returns {boolean} true if all cells in board state is empty
	 */
	isEmpty() {
		return this.state.every((cell) => !cell);
	}

	/**
	 * @returns {boolean} true if all cells in board state is full
	 */
	isFull() {
		return this.state.every((cell) => cell);
	}

	/**
	 * return winner if game in final state
	 * @returns {boolean} false if not terminal
	 * @returns { winner, cells }
	 * winner: string either 'x' or 'o', or 'draw'
	 * cells: array of cells to color 
	 */
	isTerminal() {
		// return false if board is empty
		if (this.isEmpty()) return false;

		//Checking Horizontal Wins
		if (
			this.state[0] == this.state[1] &&
			this.state[0] == this.state[2] &&
			this.state[0]
		) {
			return { winner: this.state[0], cells: [0, 1, 2] };
		}
		if (
			this.state[3] == this.state[4] &&
			this.state[3] == this.state[5] &&
			this.state[3]
		) {
			return { winner: this.state[3], cells: [3, 4, 5] };
		}
		if (
			this.state[6] == this.state[7] &&
			this.state[6] == this.state[8] &&
			this.state[6]
		) {
			return { winner: this.state[6], cells: [6, 7, 8] };
		}

		//Checking Vertical Wins
		if (
			this.state[0] == this.state[3] &&
			this.state[0] == this.state[6] &&
			this.state[0]
		) {
			return { winner: this.state[0], cells: [0, 3, 6] };
		}
		if (
			this.state[1] == this.state[4] &&
			this.state[1] == this.state[7] &&
			this.state[1]
		) {
			return { winner: this.state[1], cells: [1, 4, 7] };
		}
		if (
			this.state[2] == this.state[5] &&
			this.state[2] == this.state[8] &&
			this.state[2]
		) {
			return { winner: this.state[2], cells: [3, 5, 8] };
		}

		//Checking Diagonal Wins
		if (
			this.state[0] == this.state[4] &&
			this.state[0] == this.state[8] &&
			this.state[0]
		) {
			return { winner: this.state[0], cells: [0, 4, 8] };
		}
		if (
			this.state[2] == this.state[4] &&
			this.state[2] == this.state[6] &&
			this.state[2]
		) {
			return { winner: this.state[2], cells: [2, 4, 6] };
		}

		//If no winner but the board is full, then it's a draw
		if (this.isFull()) {
			return { winner: "draw" };
		}

		//return false otherwise
		return false;
	}
}
