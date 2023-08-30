const imgs = ["rock.png", "scissor.png", "paper.png"];

playerImg = document.getElementById("player-choise-img");

cpuImg = document.getElementById("cpu-choise-img");


let intervalId = null;

rockButton = document.getElementById("rock-button");

rockButton.addEventListener('click', function() {
    changeImage("rock", cpuMove);
    playerMove="rock"
    stopLoopPlayer(); 
    compareMoves(playerMove,cpuMove);
});

scissorButton = document.getElementById("scissor-button");

scissorButton.addEventListener('click', function() {
    changeImage("scissor", cpuMove);
    playerMove="scissor"
    stopLoopPlayer();

    compareMoves(playerMove,cpuMove);
});

paperButton = document.getElementById("paper-button");

paperButton.addEventListener('click', function() {
    changeImage("paper", cpuMove);
    playerMove="paper"
    stopLoopPlayer();

    compareMoves(playerMove,cpuMove);
});

function changeImage(string, cpu) {
    playerImg.src = "../Imgs/" + string + ".png";

    cpuImg.src = "../Imgs/" + cpu + ".png";
}

function loopImagesPlayer() {
    intervalSpeedPlayer = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * imgs.length);
        playerImg.src = "../Imgs/" + imgs[randomIndex];
    }, 250);
}

function loopCpuImages() {
    intervalSpeedCpu = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * imgs.length);
        cpuImg.src = "../Imgs/" + imgs[randomIndex];
    }, 250);
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
    const countdown = document.getElementById("countdown");
    drawScreen.style.display = "none";
    
    let i = 3;

    function updateCountDown() {
        countdown.innerText = i;
        i--;

        if (i >= -1) {
            setTimeout(updateCountDown, 1000);
        }

        if(i==-2){
            countdown.innerText = "Show"
            countdown.style.fontSize="90px"
            countdown.style.height = "100px"
            countdown.style.bottom = "700px"
        }
    }

    updateCountDown();
}