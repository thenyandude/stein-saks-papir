const imgs = ["rock.png", "scissor.png", "paper.png"];

playerImg = document.getElementById("player-choise-img");

cpuImg = document.getElementById("cpu-choise-img");


let intervalId = null;

rockButton = document.getElementById("rock-button");

rockButton.addEventListener('click', function() {
    changeImage("rock", cpuMove);
    playerMove="rock"
    stopLoops(); 
    compareMoves(playerMove,cpuMove);
});

scissorButton = document.getElementById("scissor-button");

scissorButton.addEventListener('click', function() {
    changeImage("scissor", cpuMove);
    playerMove="scissor"
    stopLoops();

    compareMoves(playerMove,cpuMove);
});

paperButton = document.getElementById("paper-button");

paperButton.addEventListener('click', function() {
    changeImage("paper", cpuMove);
    playerMove="paper"
    stopLoops();

    compareMoves(playerMove,cpuMove);
});

function changeImage(string, cpu) {
    playerImg.src = "../Imgs/" + string + ".png";
    cpuImg.src = "../Imgs/" + cpu + ".png"; 
}

let intervalSpeedPlayerLoop = null; 
let intervalSpeedCpuLoop = null;


function loopImagesPlayer() {
    clearInterval(intervalSpeedPlayerLoop)
    intervalSpeedPlayerLoop = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * imgs.length);
        playerImg.src = "../Imgs/" + imgs[randomIndex];
    }, 400);
}

function loopCpuImages() {
    clearInterval(intervalSpeedCpuLoop)
    intervalSpeedCpuLoop = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * imgs.length);
        cpuImg.src = "../Imgs/" + imgs[randomIndex];
    }, 400);
}



let matchHistory = [];
let matchHistoryScreen = document.getElementById("match-history");

let cpuMove = " "
let playerMove = "blank"


let playerWins = 0
let playerWinsStore = 0
let playerWinsScreen = document.getElementById("player-wins");
let playerPoints = 0 
let playerPointsScreen = document.getElementById("player-points");


let cpuWins = 0
let cpuWinsScreen = document.getElementById("cpu-wins");
let cpuWinsStore = 0
let cpuPoints = 0
let cpuPointsScreen = document.getElementById("cpu-points");

drawScreen = document.getElementById("draw")

const moves = ["rock", "scissor", "paper"];

const countdownElement = document.getElementById("countdown");

function cpuChooseMove(movesArray,imgsArray) {
    if (countdownElement.innerText == "3" || countdownElement.innerText == "2" || countdownElement.innerText == "1") {
        if (playerMove === "paper") {
            cpuMove = movesArray[1];
            cpuImg.src = "../Imgs/" + imgsArray[1]
            stopLoops();

        } else if (playerMove === "scissor") {
            cpuMove = movesArray[0];
            cpuImg.src = "../Imgs/" + imgsArray[0]
            stopLoops();
        } else if (playerMove === "rock") {
            cpuMove = movesArray[1];
            cpuImg.src = "../Imgs/" + imgsArray[2]
            stopLoops();
        }
    } else {
        const randomIndex = Math.floor(Math.random() * movesArray.length);
        cpuMove = movesArray[randomIndex];

    }
    return cpuMove;
}

function compareMoves(move1,move2){
    cpuMove = cpuChooseMove(moves,imgs);
    if(move1 == "scissor"&& move2 =="rock" ||move1 == "paper"&& move2 =="scissor" || move1 == "rock"&& move2 =="paper" ){
        cpuPoints ++  
        cpuPointsScreen.innerText = cpuPoints;
        matchHistory.push("Cpu Win" + `<br>`)
        matchHistoryScreen.innerHTML = matchHistory.join("<br>");
  
    } else if(move2 == "scissor"&& move1 =="rock" ||move2 == "paper"&& move1 =="scissor" || move2 == "rock"&& move1 =="paper"){
        playerPoints ++
        playerPointsScreen.innerText = playerPoints
        matchHistory.push("Player Win" + `<br>`)
        matchHistoryScreen.innerHTML = matchHistory.join("<br>");

    } else if(move1==move2) {
        drawScreen.style.display = "block";
        matchHistory.push("Draw" + `<br>`)
        matchHistoryScreen.innerHTML = matchHistory.join("<br>");
    }

    if(playerPoints >= 2    ){
        playerWins++
        playerWinsScreen.innerText = playerWinsStore;

        playerWinsStore ++;
    
        playerPoints = 0;
        playerPointsScreen.innerText = playerPoints;
    }

    if(cpuPoints >= 2){
        cpuWins++
        
        cpuPointsScreen.innerText = cpuWinsStore;

        cpuWinsStore ++;

        cpuPoints = 0;
        cpuPointsScreen.innerText = cpuPoints;
    }
}

function stopLoops() {
    clearInterval(intervalSpeedPlayerLoop);
    clearInterval(intervalSpeedCpuLoop);
}

function startMatch(){
    countDown();
    drawScreen.style.display = "none";

    playerWinsScreen.innerText = playerWinsStore;
    cpuWinsScreen.innerText = cpuWinsStore;
}

let countdownTimer = null;

function stopMatch(){
    drawScreen.style.display = "none";
    stopLoops();
    stopLoops();
    clearTimeout(countdownTimer);
    countdownElement.innerText = "Match over"
    countdownElement.style.fontSize = "60px"
    countdownElement.style.bottom = "670px"
    playerWinsScreen.innerText = playerWinsStore;
    cpuWinsScreen.innerText = cpuWinsStore;
    matchHistory = [];

    playerWins = 0;
    cpuWins = 0;

    playerPoints = 0;
    playerPointsScreen.innerText = playerPoints;
    cpuPoints = 0;
    cpuPointsScreen.innerText = cpuPoints;

}

winSound = new Audio("../Audio/WinSound.mp3")
loseSound = new Audio("../Audio/LoseSound.wav")

function countDown() {
    const countdownElement = document.getElementById("countdown");
    drawScreen.style.display = "none";

    let i = 3;
    loopImagesPlayer();
    loopCpuImages();

    function updateCountDown() {
        if (i >= 1) {
            countdownElement.innerText = i;
        } else {
            countdownElement.innerText = "Show";
        }
        i--;

        if(playerMove == "blank" && i == -2 ){
            cpuPoints++
            cpuPointsScreen.innerText = cpuPoints;
            matchHistory.push("Cpu Win" + `<br>`)
            matchHistoryScreen.innerHTML = matchHistory.join("<br>");
        }

        if (i == -2) {
            playerMove = "blank";
            compareMoves(playerMove, cpuMove)
            i = 3;
            drawScreen.style.display = "none";
            loopImagesPlayer();
            loopCpuImages();
        }

        if (playerWins >= 1){
            stopMatch();
            startMatchButton.innerText = "PLAY AGAIN?"
            winSound.play();
        } else if(cpuWins >= 1) {
            stopMatch();
            startMatchButton.innerText = "PLAY AGAIN?"
            loseSound.play();
        } else {
            countdownTimer = setTimeout(updateCountDown, 1000);
        }
    }

    updateCountDown();
}

startMatchButton = document.getElementById("start-match");