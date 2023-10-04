let square = document.querySelectorAll(".square");

square.forEach((element) => {
    element.addEventListener("click", pressed);
})


let gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const newBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    const add = (player, position) => {
        if (!board[position]) {
            board[position] = player;
            return "cool";
        } else {
            return "";
        }
    }

    const turn = () => {
        
    }
})();


let displayController = (() => {
    let count = 0;
    const pressed = () => {
        if (count % 2 == 0) {
            this.textContent = "X"
        }
    }
} )


const playerFactory = (name,shape, score = 0 ) => {
    const changeName = (newName) => {
        name = newName;
    }

    const chageScore = (newScore) => {
        score = newScore;
    }

    return {name, score};
}

let player1 = playerFactory("P1", "X");
let player2 = playerFactory("P2", "O");
