/**
 * @description the player 
 * @param {integer} max_depth the maximum depth to search for in minimax algorithm. default value -1 (search until terminal state found)
 */
class Player {
	constructor(max_depth = -1) {
		this.max_depth = max_depth;
		this.nodes_map = new Map();
	}

	/**
	 * minimax algorithm
	 * @param {array} board.state
	 * @param {boolean} maximizing 'x' maximizes and 'o' minimizes
	 * @param {*} callback 
	 * @param {*} depth how far into recursion, 0 is main function call
	 * @returns 
	 */
	getBestMove(board, maximizing = true, callback = () => {}, depth = 0) {
		// clear nodes_map if the function is called for a new move
		if (depth == 0) this.nodes_map.clear();

		// if the board state is a terminal one, return the heurisitic value
		// adding or subtracting depth will change value, we want shortest route to terminal state
		if (board.isTerminal() || depth == this.max_depth) {
			// maximizing
			if (board.isTerminal().winner == "x") {
				return 100 - depth;
			// minimizing
			} else if (board.isTerminal().winner == "o") {
				return -100 + depth;
			}
			return 0;
		}

		// if computer is x
		if (maximizing) {
			// initizlize best to the lowest possible value
			let best = -100;

			// loop through all empty cells
			board.getAvailableMoves().forEach((index) => {
				// initialize a new board with the current state (slice() is sued to create a new array and not modify the original)
				let child = new Board(board.state.slice());
				// create a child node by inserting the maximizing symbox x into the current empty cell
				child.insert("x", index);
				// recursively calling getBestMove this time with the new board and minimizing turn and incrementing the depth
				let node_value = this.getBestMove(child, false, callback, depth + 1);
				// updating best value
				best = Math.max(best, node_value);
				// if it's the main function call, not a recursive one, map each heuristic value with it's move indices
				if (depth == 0) {
					// comma separated indices if multiple moves have the same heuristic value
					let moves = this.nodes_map.has(node_value)
						? `${this.nodes_map.get(node_value)},${index}`
						: index;
					this.nodes_map.set(node_value, moves);
				}
			});

			// if its the main function call, return the index of the best move or a random index if multiple indicies have the same value
			if (depth == 0) {
				let ret = 0;
				if (typeof this.nodes_map.get(best) == "string") {
					let arr = this.nodes_map.get(best).split(",");
					let rand = Math.floor(Math.random() * arr.length);
					ret = arr[rand];
				} else {
					ret = this.nodes_map.get(best);
				}

				// run a callback after calculation and return the index
				callback(ret);
				return ret;
			}

			// if not main function call (recursive) return teh heuristic value for next calculation
			return best;
		}

		// if computer is o
		if (!maximizing) {
			// initizlize best to the highest possible value
			let best = 100;
			
			// loop through all empty cells
			board.getAvailableMoves().forEach((index) => {
				// initialize a new board with the current state (slice() is sued to create a new array and not modify the original)
				let child = new Board(board.state.slice());
				// create a child node by inserting the maximizing symbox x into the current empty cell
				child.insert("o", index);
				// recursively calling getBestMove this time with the new board and minimizing turn and incrementing the depth
				let node_value = this.getBestMove(child, true, callback, depth + 1);
				// updating best value
				best = Math.min(best, node_value);

				// if it's the main function call, not a recursive one, map each heuristic value with it's move indices
				if (depth == 0) {
					// comma separated indices if multiple moves have the same heuristic value
					let moves = this.nodes_map.has(node_value)
						? `${this.nodes_map.get(node_value)},${index}`
						: index;
					this.nodes_map.set(node_value, moves);
				}
			});

			// if its the main function call, return the index of the best move or a random index if multiple indicies have the same value
			if (depth == 0) {
				let ret = 0;
				if (typeof this.nodes_map.get(best) == "string") {
					let arr = this.nodes_map.get(best).split(",");
					let rand = Math.floor(Math.random() * arr.length);
					ret = arr[rand];
				} else {
					ret = this.nodes_map.get(best);
				}

				// run a callback after calculation and return the index
				callback(ret);
				return ret;
			}

			// if not main function call (recursive) return the heuristic value for next calculation
			return best;
		}
	}
}
