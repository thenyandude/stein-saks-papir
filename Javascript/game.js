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

    setTimeout(function() {
        loopImagesPlayer();
        loopCpuImages();
        setInterval(function(){
            stopLoops()
        },4000)
    }, 1000);
}


function loopImagesPlayer() {
    intervalSpeedPlayerLoop = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * imgs.length);
        playerImg.src = "../Imgs/" + imgs[randomIndex];
    }, 250);
}

function loopCpuImages() {
    intervalSpeedCpuLoop = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * imgs.length);
        cpuImg.src = "../Imgs/" + imgs[randomIndex];
    }, 250);
}



cpuMove = " "
playerMove = "blank"


playerWins = 0
playerWinsScreen = document.getElementById("player-wins")
playerPoints = 0 
playerPointsScreen = document.getElementById("player-points")


cpuWins = 0
cpuWinsScreen = document.getElementById("cpu-wins")
cpuPoints = 0
cpuPointsScreen = document.getElementById("cpu-points")

drawScreen = document.getElementById("draw")

const moves = ["rock", "scissor", "paper"];

function cpuChooseMove(movesArray,imgsArray) {
    if (countdown.innerText == "3" || countdown.innerText == "2" || countdown.innerText == "1") {
        if (playerMove === "paper") {
            cpuMove = movesArray[1];
            cpuImg.src = "../Imgs/" + imgsArray[1]
            stopLoops();
            console.log("Scissor CPU")
        } else if (playerMove === "scissor") {
            cpuMove = movesArray[0];
            cpuImg.src = "../Imgs/" + imgsArray[0]
            stopLoops();
            console.log("Rock CPU")
        } else if (playerMove === "rock") {
            cpuMove = movesArray[1];
            cpuImg.src = "../Imgs/" + imgsArray[2]
            console.log("Paper CPU")
            stopLoops();
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

    if(playerPoints >= 2){
        playerWins++
        playerWinsScreen.innerText = playerWins;
    
        playerPoints = 0;
    }

    if(cpuPoints >= 2){
        cpuWins++
        cpuPointsScreen.innerText = cpuWins
        cpuPoints = 0
    }
}

function stopLoops() {
    clearInterval(intervalSpeedPlayerLoop);
    clearInterval(intervalSpeedCpuLoop);
}

function startMatch(){
    countDown();
    drawScreen.style.display = "none";
}

function stopMatch(){
    drawScreen.style.display = "none";
    stopLoops()
}

function countDown() {
    const countdownElement = document.getElementById("countdown");
    drawScreen.style.display = "none";

    let i = 3;
    let countdownRound = 0;

    loopImagesPlayer();
    loopCpuImages();

    function updateCountDown() {
        if (i >= 0) {
            countdownElement.innerText = i;
        } else {
            countdownElement.innerText = "Show";
        }

        i--;


        if(playerMove == "blank" && countdownElement.innerText == "Show" ){
            cpuPoints++
            cpuPointsScreen.innerText = cpuPoints;

        }

        if (i < -1) {
            countdownRound++;
            playerMove = "blank";
            i = 3;
            drawScreen.style.display = "none";
        }

        if (countdownRound < 3) {
            setTimeout(updateCountDown, 1000);
        }

        if (countdownRound == 3){
            stopMatch();
        }
    }

    updateCountDown();
}