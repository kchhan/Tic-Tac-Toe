// Initialize game board
const gameBoard = (() => {
  return (board = () => {
    const _container = document.querySelector('.grid-container');
    let _grid = document.createElement('div');
    _grid.classList.add('grid');
    for (let i = 1; i <= 9; i++) {
      let _cell = document.createElement('div');
      _cell.className = `grid-item cell-${i}`;
      _cell.value = i;
      _grid.appendChild(_cell);
    }
    _container.appendChild(_grid);
  });
})();
gameBoard();

// Game will continue until win is true
let win = false;

// Factory Function for players
const playerFactory = (player) => {
  const hand = [];

  const _play = (e) => {
    if (
      e.target.classList.contains('grid-item') &&
      !e.target.classList.contains('active') &&
      !win
    ) {
      e.target.classList.add('active');
      if (player === 'one') {
        e.target.innerHTML = `
          <i class="fas fa-times fa-6x"></i>
        `;
        // Push value to playerOne's hand
        playerOne.hand.push(e.target.value);
        _showAlert("Player Two's turn", 'neutral');
      } else {
        e.target.innerHTML = `
          <i class="far fa-circle fa-5x"></i>
        `;
        // Push value to playerTwo's hand
        playerTwo.hand.push(e.target.value);
        _showAlert("Player One's turn", 'neutral');
      }
      // Checks if play makes a winning combo or a draw
      _checkForWin();
      _checkForDraw();
      // Changes to other player for next turn if game continues
      if (!_checkForWin() && !_checkForDraw()) {
        player = player === 'one' ? 'two' : 'one';
      }
    }
  };

  // Event Listener for each cell
  document.querySelector('.grid-container').addEventListener('click', _play);

  // All possible winning combinations
  const _winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  // Checks current player's hand if there is a combo
  const _checkForWin = (current) => {
    current = player === 'one' ? (current = playerOne) : (current = playerTwo);
    for (let i = 0; i < _winningCombos.length; i++) {
      // Return true if hand includes a winning combo
      win = _winningCombos[i].every((value) => current.hand.includes(value));
      if (win) {
        _showAlert(`GAME! PLAYER ${player.toUpperCase()} WINS!`, 'win');
        return true;
      }
    }
    return false;
  };

  // Checks if game is a draw
  const _checkForDraw = () => {
    const _grid = document.querySelector('.grid');
    const children = Array.prototype.slice.call(_grid.childNodes);

    function _containsActive(e) {
      if (e.classList.contains('active')) {
        return true;
      }
      return false;
    }

    // Returns true if every node is active
    const _draw = children.every(_containsActive);
    if (_draw) {
      win = true;
      _showAlert("It's a Draw!", 'draw');
      return true;
    }
    return false;
  };

  // Changes alert depending on situation
  const _showAlert = (message, className) => {
    const messageBox = document.querySelector('#message-box');
    messageBox.className = className;
    messageBox.textContent = message;
  };

  // Resets Game
  document.querySelector('.reset').addEventListener('click', () => {
    win = false;
    playerOne.hand = [];
    playerTwo.hand = [];
    let _grid = document.querySelector('.grid');
    document.querySelector('.grid-container').removeChild(_grid);
    player = 'one';
    gameBoard();
    _showAlert('Game Reset. Go Player One', 'neutral');
  });

  return { hand };
};
const playerOne = playerFactory('one');
const playerTwo = playerFactory('two');
