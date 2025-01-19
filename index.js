// player turn varibale
let currentPlayer = 'X'

//count the number of box filled 
let totalBoxFilled = 0;


//store the number of wins
let playerx = 0;
let playero = 0;
let drawn = 0;

//to store the wether one of the player won or not
let anyPlayerWin = false;

//grid to store the current state
let grid = [];


//create a grid

function createGrid(){
    for(let i=0;i<3;i++){
        let rowGrid = [];
        for(let j=0;j<3;j++){
            rowGrid.push('.');
        }
        grid.push(rowGrid);
    }
}

createGrid();




function checkPlayerWonOrNot(){
    let isPlayerWon = false;
    let diagonalCounter1 = 0;
    let diagonalCounter2 = 0;
    for(let i=0;i<3;i++){
        let rowCounter = 0;
        let columnCounter = 0;
        for(let j=0;j<3;j++){
            if(grid[j][i]==currentPlayer) columnCounter++;
            if(grid[i][j]==currentPlayer) rowCounter++;
        }

        if(columnCounter>=3 || rowCounter>=3 ) return true;
    }

    

    for(let i=0;i<3;i++){
        if(grid[i][i]==currentPlayer) diagonalCounter1++;
        if(grid[i][2-i]==currentPlayer) diagonalCounter2++;
    }

    if(diagonalCounter1>=3 || diagonalCounter2>=3) return true;
    return false;
}


//reset the board when the round end

function resetBoard(){
    let boxes = document.getElementsByClassName('box');

    for(let i=0;i<boxes.length;i++){
        let box = boxes[i];
        box.innerHTML = ''
    }

    //reset the winner tag
    let winnerTag = document.getElementById('winnerTag');
    winnerTag.innerText = null;

    //reset the grid
    grid = [];
    createGrid();
    totalBoxFilled = 0;
    anyPlayerWin = false;
    currentPlayer = 'X'

    let player = document.getElementById('player');
    player.innerHTML = currentPlayer
}


//add the event listner to the reset board button.
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click',resetBoard);



let box = document.getElementById('00');
let boxes = document.getElementsByClassName('box');

for(let i=0;i<boxes.length;i++){
    let box = boxes[i];
    box.addEventListener('click',()=>{
        let id = box.id;
        let row = id[0]-'0';
        let column = id[1]-'0';
        grid[row][column] = currentPlayer;

        
        if(currentPlayer=='X'){
            box.innerHTML = "<p class='fw-medium fs-semibig text-neutral-500'>X</p>"
            if(checkPlayerWonOrNot()) {
                let winnerTag = document.getElementById('winnerTag');
                winnerTag.innerHTML = `Player ${currentPlayer} Won the Round ❤️❤️`;
                playerx++;

                anyPlayerWin = true;

                //changing the scoreboard.
                let scorecard = document.getElementById('playerx');
                scorecard.innerText = playerx;
            }
            else{
                currentPlayer = 'O'
            }
            
        }
        else{
            box.innerHTML = "<p class='fw-medium fs-semibig text-neutral-500'>O</p>"
            if(checkPlayerWonOrNot()) {
                let winnerTag = document.getElementById('winnerTag');
                winnerTag.innerHTML = `Player ${currentPlayer} Won the Round ❤️❤️`;
                playero++;

                anyPlayerWin = true;

                //changing the score board.
                let scorecard = document.getElementById('playero');
                scorecard.innerText = playero;
            }
            else{
                currentPlayer = 'X'
            }
            
        }

        totalBoxFilled++;
        if(totalBoxFilled==9 && !anyPlayerWin){
            let winnerTag = document.getElementById('winnerTag');
            winnerTag.innerHTML = `Match is Drawn 🤝🤝`;

            drawn++;
            let drawnTag = document.getElementById('draw');
            drawnTag.innerText = drawn;
        }
        let player = document.getElementById('player');
        player.innerHTML = currentPlayer

        
    })
}








