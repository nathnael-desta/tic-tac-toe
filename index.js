let game = document.querySelector(".game");
let score = document.querySelector(".score");
let box = document.querySelector(".board");
let restart = document.querySelector(".restart");
let picker = document.querySelector(".picker");

let gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    let direction = '';

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

    let turn = "X";

    const turnChange = () => {
        turn = turn == "X" ? "O" : "X";
    }

    const winChecker = (board) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let winning of winningCombinations) {
            const [a, b, c] = winning;
            if (board[a] != "" &&
                board[a] == board[b] &&
                board[b] == board[c]) {
                // return board[a];
                if (a == 0 && b == 1) {
                    return {
                        winner: board[a],
                        line: "firstHorizontal"
                    }
                } else if (a == 3 && b == 4) {
                    return {
                        winner: board[a],
                        line: "secondHorizontal"
                    }
                } else if (a == 6 && b == 7) {
                    return {
                        winner: board[a],
                        line: "thirdHorizontal"
                    }
                } else if (a == 0 && b == 3) {
                    return {
                        winner: board[a],
                        line: "firstVertical"
                    }
                } else if (a == 1 && b == 4) {
                    return {
                        winner: board[a],
                        line: "secondVertical"
                    }
                } else if (a == 2 && b == 5) {
                    return {
                        winner: board[a],
                        line: "thirdVertical"
                    }
                } else if (a == 0 && b == 4) {
                    return {
                        winner: board[a],
                        line: "crossr"
                    }
                } else {
                    return {
                        winner: board[a],
                        line: "crossl"
                    }
                }
            }
        }

        return "";

    }


    let p1Score = 0;
    let p2Score = 0;

    const pressed = (element) => {
        console.log("called")
        console.log(board)
        let lis = element.target.parentNode.classList;
        let index = +lis[0][1];
        if (board[index]) {
            return
        }

        board[index] = turn;


        element.target.innerHTML = turn == "X" ? "X" : "O";

        turnChange();

        if (turn == "X"){
            picker.classList.add("p1");
            picker.classList.remove("p2");
            picker.innerText = "P1";
        } else {
            picker.classList.add("p2");
            picker.classList.remove("p1");
            picker.innerText = "P2"; 
        }

        function winnerChange() {
            let element = document.querySelector(".end");
            if (turn == "X") {
                element.style.setProperty('--after-content', '"O WON"');
                p2Score++
            }
            else {
                element.style.setProperty('--after-content', '"X WON"');
                p1Score++;
            }

        }


        function handleInteraction() {

            game.classList.remove("end");

            
            box.classList.remove(`${direction}`);
            
            

            let square = document.querySelectorAll(".text");
            square.forEach((element) => {
                element.innerText = "";
            })

            document.addEventListener("DOMContentLoaded", function () { winnerChange(); })

            board = ["", "", "", "", "", "", "", "", ""];

            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("keypress", handleInteraction);

        }


        if (gameboard.winChecker(board)) {
            let crosser = gameboard.winChecker(board);
            direction = crosser.line;
            box.classList.add(`${direction}`);

            game.classList.add("end");


            setTimeout(function () {
                document.addEventListener('click', handleInteraction);
                document.addEventListener('keypress', handleInteraction);
            }, 500);


            
        

            winnerChange();

            score.innerHTML  = `${p1Score} - ${p2Score}`



        }

    }

    const reset = () => {
        board = board = ["", "", "", "", "", "", "", "", ""];
        score.innerHTML = "0 - 0";
        picker.classList.add("p1");
            picker.classList.remove("p2");
            picker.innerText = "P1";
            let square = document.querySelectorAll(".text");
            square.forEach((element) => {
                element.innerText = "";
            })
            turn = "X";
    }


    return { board, newBoard, add, pressed, winChecker,reset }
})();


let displayController = (() => {
    let count = 0;
    const pressed = () => {
        if (count % 2 == 0) {
            this.textContent = "X"
        }
    }
})



let square = document.querySelectorAll(".text");

square.forEach((element) => {
    element.addEventListener("click", gameboard.pressed);
})

restart.addEventListener('click', gameboard.reset);






