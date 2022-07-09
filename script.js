let gameBoard = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];

const GameBoard = (() => {
    const populateBoard = () =>{
    for(let i = 0; i < 9; i++){
        gameBoard.push(null);
    }
    return gameBoard;
}
    const startGame = () => {
        gameBoard=[];
        let boxes=document.querySelectorAll('.box');
        boxes.forEach(box => {box.textContent=null});
        const playerXScore = document.getElementById('player-x-score')
        playerXScore.textContent=(`${PlayerX.points}`);
        document.getElementById('player-o-score').innerHTML=(`${PlayerO.points}`);
        document.querySelector('#title').removeChild(document.querySelector('.start-button'));
        document.querySelector('.gameSpace').removeChild(document.querySelector('.endgame'));
    }
    const updateBoard = (symbol, index) => {
        gameBoard[index] = symbol;
        let fillBox = document.getElementById(index)
        fillBox.textContent=symbol;
    }
    const checkForWin = symbol => {
        if(gameBoard[0] == symbol && gameBoard[1] == symbol && gameBoard[2] == symbol){
            return "Win";
        } else if(gameBoard[3] == symbol && gameBoard[4] == symbol && gameBoard[5] == symbol){
            return "Win";
        } else if(gameBoard[6] == symbol && gameBoard[7] == symbol && gameBoard[8] == symbol){
            return "Win";
        } else if(gameBoard[0] == symbol && gameBoard[3] == symbol && gameBoard[6] == symbol){
            return "Win";
        } else if(gameBoard[1] == symbol && gameBoard[4] == symbol && gameBoard[7] == symbol){
            return "Win";
        } else if(gameBoard[2] == symbol && gameBoard[5] == symbol && gameBoard[8] == symbol){
            return "Win";
        } else if(gameBoard[0] == symbol && gameBoard[4] == symbol && gameBoard[8] == symbol){
            return "Win";
        } else if(gameBoard[2] == symbol && gameBoard[4] == symbol && gameBoard[6] == symbol){
            return "Win";
        } else {
            for(let i = 0; i<gameBoard.length; i++){
                if ((gameBoard[i] != "X" && gameBoard[i] != 'O') || gameBoard.length != 9){
                    return "Continue";
                }
            }
            return "Tie";
        }
    }
    const gameWin = (turn) => {
        turn.points++;
        let winner=document.createElement('div');
        winner.textContent=(`${turn.symbol} Wins!`)
        winner.className="endgame"
        document.querySelector('.gameSpace').appendChild(winner);
        let resetButton=document.createElement('button');
        resetButton.addEventListener('click', GameBoard.startGame);
        resetButton.textContent='New Game'
        resetButton.className=('start-button');
        document.querySelector('#title').appendChild(resetButton);
    }
    const gameTie = () => {
        let tie = document.createElement('div');
        tie.textContent=(`Tie Game!`);
        tie.className="endgame";
        document.querySelector('.gameSpace').appendChild(tie);
        let resetButton=document.createElement('button');
        resetButton.addEventListener('click', GameBoard.startGame);
        resetButton.textContent='New Game'
        resetButton.className=('start-button');
        document.querySelector('#title').appendChild(resetButton);
    }
    
    const resetGame = () => {
        let gameSpace=document.querySelector('.gameSpace');
        gameSpace.removeChild(gameSpace.querySelector('.resetButton'));
        
        return gameBoard;
    }
    return {startGame, populateBoard, updateBoard, checkForWin, gameWin, gameTie, resetGame};
})();

const Player = s => {
    const symbol = s;
    let points = 0;
    return { symbol, points };
}

const PlayerX = Player('X');

const PlayerO=Player('O');

const PerformTurn = (() => {
    let turn=PlayerX;
    const updateTurn = (turn) => {
        if (turn == PlayerX){
            return turn=PlayerO;
        } else if (turn==PlayerO){
            return turn=PlayerX;
        }
    }
    const updateGame = (index) => {
        if(gameBoard[index] == 'X' || gameBoard[index] == 'O'){
            console.log("NO");
            return;
        } else{
        GameBoard.updateBoard(turn.symbol, index);
        let gameStatus = GameBoard.checkForWin(turn.symbol);
        if(gameStatus == "Win"){
            GameBoard.gameWin(turn);
        } else if(gameStatus == "Tie"){
            GameBoard.gameTie();
        } else{
        turn = updateTurn(turn);
        
        }
     } };
    return {updateGame};
})();
