var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];

// 2d array which will hold all the img tags, so that we can access them for updating the candies, we're going to changes the image candies every time we crush the candies and generate new ones
var board = []; 
var rows = 9;
var cols = 9;
var score = 0; // variable to keep track of the score

var currTile;
var otherTile;

window.onload = function() {
    startGame();
    window.setInterval(function() {
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]; // 0 - 5.99 
}

// initialize the board by generating random candies and placing them on the board
function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = []; // holding all the img tags for that specific row, then we'r going to append to the board
        for (let c = 0; c < cols; c++) {
            // <img id="0-0" src="./images/Red.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString(); // 0-0, 0-1.... creating img tags with id as its 2d coordinates
            tile.src = './images/' + randomCandy() + '.png';

            // Drag functionality
            tile.addEventListener("dragstart", dragStart); // click on a candy, initialize drag process
            tile.addEventListener("dragover", dragOver); // clicking on candy, moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter); // dragging candy onto another candy
            tile.addEventListener("dragleave", dragLeave); // leave candy over another candy
            tile.addEventListener("drop", dragDrop); // dropping a candy over another candy
            tile.addEventListener("dragend", dragEnd); // after drag process completed, we swap candies

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart() {
    // this refers to tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    // this refers to the target tile that was dropped on
    otherTile = this;
}

function dragEnd() {

    // to make sure that we don't swap a candy with a blank tile
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return; // make sure that we do not swap a candy with a blank tile
    }

    // check for adjacency -- only allow swapping between adjacent candies
    let currCoords = currTile.id.split("-"); // id = "0-0" --> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c - 1 && r == r2; // r2, c2 -- target candy and r, c -- current candy
    let moveRight = c2 == c + 1 && r == r2;
    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        // swap
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
        
        // when we swap with 2 candies we can crush 3 candies in a row or column atleast
        let validMove = checkValid();
        if (!validMove) { // i tried to swap but nothing to crush then swap back
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}

function crushCandy() {
    // crushFive();
    crushFour();
    crushThree(); 
    document.getElementById("score").innerText = score;
}

function crushThree() {
    // check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    // check columns
    for(let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function crushFour() {
    // check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    // check columns
    for(let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    // check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    // check columns
    for(let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function slideCandy() {
    for (let c = 0; c < cols; c++) {
        let ind = rows - 1;
        for (let r = cols - 1; r >=0; r--) { // it starts from bottom of each column and goes up
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < cols; c++) {
        if(board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}