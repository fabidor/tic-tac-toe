let gameBoard = [];

const GameBoard = (() => {
    const populateBoard = () =>{
    for(let i = 0; i < 9; i++){
        gameBoard.push(null);
    }
    return gameBoard;
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

    return {populateBoard, updateBoard, checkForWin};
})();

const Player = s => {
    const symbol = s;
    return { symbol };
}

const PlayerX = Player('X');
const PlayerO=Player('O');

const PerformTurn = (() => {
    let turn=PlayerX.symbol;
    const updateTurn = (turn) => {
        if (turn == PlayerX.symbol){
            return turn=PlayerO.symbol;
        } else if (turn==PlayerO.symbol){
            return turn=PlayerX.symbol;
        }
    }
    const updateGame = (index) => {
        if(gameBoard[index] == 'X' || gameBoard[index] == 'O'){
            console.log("NO");
            return;
        } else{
        GameBoard.updateBoard(turn, index);
        let gameStatus = GameBoard.checkForWin(turn);
        if(gameStatus == "Win"){
            alert(`${turn} Wins!`);
        }
        turn = updateTurn(turn);
        
        }
    };
    return {updateGame};
})();
