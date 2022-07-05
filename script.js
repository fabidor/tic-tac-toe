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
    return {populateBoard, updateBoard};
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
        GameBoard.updateBoard(turn, index);
        turn = updateTurn(turn);
        console.log(gameBoard);
    };
    return {updateGame};
})();
