imgs = ["Rock.png", "Scissor.png", "Paper.png"];

playerImg = document.getElementById("player-choise-img");

playerImg.src = "../Imgs/" + "Scissor.png";

<<<<<<< Updated upstream
let intervalId = null; // Variable to hold the interval ID
=======

let intervalSpeedPlayer = null;
let intervalSpeedCpu = null;
let playerLoopRunning = false;
let cpuLoopRunning = false;
>>>>>>> Stashed changes

rockButton = document.getElementById("rock-button");

rockButton.addEventListener('click', function() {
    changeImage("Rock");
    stopLoop(); 
});

scissorButton = document.getElementById("scissor-button");

scissorButton.addEventListener('click', function() {
    changeImage("Scissor");
    stopLoop(); 
});

paperButton = document.getElementById("paper-button");

paperButton.addEventListener('click', function() {
    changeImage("Paper");
    stopLoop();
});

function changeImage(string) {
    playerImg.src = "../Imgs/" + string + ".png";
}

<<<<<<< Updated upstream
function loopImages() {
    let i = 0;

    intervalSpeed = setInterval(function() {
        playerImg.src = "../Imgs/" + imgs[i];
        i = (i + 1) % imgs.length;
    }, 250);
}

function stopLoop() {
    clearInterval(intervalSpeed);
}

loopImages();
=======
function loopImagesPlayer() {
    if (!playerLoopRunning) {
        intervalSpeedPlayer = setInterval(function() {
            const randomIndex = Math.floor(Math.random() * imgs.length);
            playerImg.src = "../Imgs/" + imgs[randomIndex];
        }, 250);
        playerLoopRunning = true;
    }
}

function loopCpuImages() {
    if (!cpuLoopRunning) {
        intervalSpeedCpu = setInterval(function() {
            const randomIndex = Math.floor(Math.random() * imgs.length);
            cpuImg.src = "../Imgs/" + imgs[randomIndex];
        }, 250);
        cpuLoopRunning = true;
    }
}




cpuMove = " "
playerMove = " "

playerPoints = 0 
playerPointsScreen = document.getElementById("player-points")

cpuPoints = 0
cpuPointsScreen = document.getElementById("cpu-points")

drawScreen = document.getElementById("draw")

const moves = ["rock", "scissor", "paper"];

function cpuChooseMove(movesArray,imgsArray) {
    if (countdown.innerText == "3" || countdown.innerText == "2" || countdown.innerText == "1") {
        if (playerMove === "paper") {
            cpuMove = movesArray[1];
            cpuImg.src = "../Imgs/" + imgsArray[1]
            stopLoopPlayer();
            console.log("Scissor CPU")
        } else if (playerMove === "scissor") {
            cpuMove = movesArray[0];
            cpuImg.src = "../Imgs/" + imgsArray[0]
            stopLoopPlayer();
            console.log("Rock CPU")
        } else if (playerMove === "rock") {
            cpuMove = movesArray[1];
            cpuImg.src = "../Imgs/" + imgsArray[2]
            console.log("Paper CPU")
            stopLoopPlayer();
        }
    } else {
        const randomIndex = Math.floor(Math.random() * movesArray.length);
        cpuMove = movesArray[randomIndex];
        console.log("Random " + cpuMove)

    }
    return cpuMove;
}

function compareMoves(move1,move2){
    cpuMove = cpuChooseMove(moves,imgs);
    if(move1 == "scissor"&& move2 =="rock" ||move1 == "paper"&& move2 =="scissor" || move1 == "rock"&& move2 =="paper" ){
        cpuPoints ++  
        cpuPointsScreen.innerText = cpuPoints;
  
    } else if(move2 == "scissor"&& move1 =="rock" ||move2 == "paper"&& move1 =="scissor" || move2 == "rock"&& move1 =="paper"){
        playerPoints ++
        playerPointsScreen.innerText = playerPoints
    } else if(move1==move2) {
        drawScreen.style.display = "block";
        console.log("Draw")
    }
}

function stopLoopPlayer() {
    clearInterval(intervalSpeedPlayer);
    clearInterval(intervalSpeedCpu);
}

function startMatch(){
    loopImagesPlayer();
    loopCpuImages();
    countDown();
    drawScreen.style.display = "none";
}

function countDown() {
    const countdownElement = document.getElementById("countdown");
    drawScreen.style.display = "none";

    let i = 3;
    let countdownRound = 0;

    function updateCountDown() {
        if (i >= 0) {
            countdownElement.innerText = i;
        } else {
            countdownElement.innerText = "Show";
        }

        i--;

        if (i < -1) {
            countdownRound++;
            i = 3;
            drawScreen.style.display = "none";
            playerLoopRunning = false;
            cpuLoopRunning = false;
        }

        if (countdownRound < 3) {
            if (!playerLoopRunning) {
                loopImagesPlayer();
            }
            if (!cpuLoopRunning) {
                loopCpuImages();
            }
            setTimeout(updateCountDown, 1000);
        }
    }

    updateCountDown();
}
>>>>>>> Stashed changes
