let allCells = document.querySelectorAll('.cell');
let turn = 'X';
let xArray = [];
let oArray = [];

let winningCombination = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
let winningMessageDiv = document.querySelector('[data-winning-message-text]');
let winningMessage = "";
let gameDone = false;
let modal = document.querySelector('.modal');
let messageContainer = document.querySelector('.winning-message');
let turnMessage = document.querySelector('.player-turn-message');

allCells.forEach( (item, index) => {
  item.addEventListener('click', () => {
    if(gameDone === false){
      let valid = addMark(item, index);
      console.log(valid);

      if(valid === true){
        checkForWin();
        checkForDraw();
        switchTurns();
        console.log(turn + " Hello World");
        console.log(`x array : ${xArray} \n o array : ${oArray}`);
      }
    }
  });
})

const restartBtn = document.getElementById('restartButton');
restartBtn.addEventListener('click', () => {
  restartGame();
});

function addMark(item, index){
  // Check if an X or O has been placed, to make sure that another mark can't be placed
  if(item.textContent === 'X' || item.textContent === 'O'){
    return false;
  }

  // Based on the turn the index of the cell is pushed to the players, whos turn it is, array
  turn === 'X' ? xArray.push(index) : oArray.push(index);
  item.textContent = turn;
  return true;
}

function switchTurns(){
  turn === 'X' ? turn = 'O' : turn === 'O' ? turn = 'X' : turn = "Error";
  turnMessage.textContent = displayPlayerTurn();
}

function checkForWin() {
  for (let i = 0; i < winningCombination.length; i++) {
    const combo = winningCombination[i];
    if (isWinningCombo(combo)) {
      declareWinner();
      return;
    }
  }
}

function isWinningCombo(combo) {
  const targetArray = turn === 'X' ? xArray : oArray;
  return combo.every(position => {
    return targetArray.includes(position);
  });
}

function declareWinner() {
  winningMessageDiv.textContent = `${turn} Won!!!`;
  gameDone = true;
  showModal();
}

function checkForDraw(){
  if (xArray.length + oArray.length === 9 && gameDone !== true) {
    showModal();
    winningMessageDiv.textContent = "It's a draw!";
  }
}

/**
 * Resets the game by setting the variables to their starting values. 
 * As well as removing classes that display the winnning message, and removes the marks in the cells.
 */
function restartGame(){
  gameDone = false;
  xArray = [];
  oArray = [];
  turn = 'X';
  winningMessageDiv.textContent = "";
  modal.classList.remove('active');
  messageContainer.classList.remove('active');
  turnMessage.textContent = "X's turn";
  clearAllCells();
}

function clearAllCells(){
  allCells.forEach((item) => {
    item.textContent = '';
  })
}

function showModal(){
  modal.classList.toggle('active');
  messageContainer.classList.toggle('active');
}

function displayPlayerTurn(){
  let result = turn === 'X' ? "X's turn" : "O's turn";
  return result;
}