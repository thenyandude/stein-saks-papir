const imgs = ["Rock.png", "Scissor.png", "Paper.png"];

playerImg = document.getElementById("player-choise-img");

playerImg.src = "../Imgs/" + "Scissor.png";



let intervalId = null;

rockButton = document.getElementById("rock-button");

rockButton.addEventListener('click', function() {
    changeImage("Rock");
    playerMove="rock"
    stopLoopPlayer(); 

    compareMoves(playerMove,cpuMove)
});

scissorButton = document.getElementById("scissor-button");

scissorButton.addEventListener('click', function() {
    changeImage("Scissor");
    playerMove="scissor"
    stopLoopPlayer();

    compareMoves(playerMove,cpuMove)
});

paperButton = document.getElementById("paper-button");

paperButton.addEventListener('click', function() {
    changeImage("Paper");
    playerMove="paper"
    stopLoopPlayer();

    compareMoves(playerMove,cpuMove)
});

function changeImage(string) {
    playerImg.src = "../Imgs/" + string + ".png";
}

function loopImages() {
    let i = 0;

    intervalSpeed = setInterval(function() {
        playerImg.src = "../Imgs/" + imgs[i];
        i = (i + 1) % imgs.length;
    }, 250);
}


cpuMove = " "
playerMove = " "

playerPoints = 0 
playerPointsScreen = document.getElementById("player-points")

cpuPoints = 0
cpuPointsScreen = document.getElementById("cpu-points")

const moves = ["rock", "scissor", "paper"];

function cpuChooseMove(movesArray) {
    if (countdown.innerText == "3" || countdown.innerText == "2" || countdown.innerText == "1") {
        if (playerMove === "paper") {
            cpuMove = movesArray[1];
        } else if (playerMove === "scissor") {
            cpuMove = movesArray[0];
        } else if (playerMove === "rock") {
            cpuMove = movesArray[1];
        }
    } else {
        const randomIndex = Math.floor(Math.random() * movesArray.length);
        cpuMove = movesArray[randomIndex];
    }
    return cpuMove;
}

function compareMoves(move1,move2){
    cpuMove = cpuChooseMove(moves);
    if(move1 == "scissor"&& move2 =="rock" ||move1 == "paper"&& move2 =="scissor" || move1 == "rock"&& move2 =="paper" ){
        cpuPoints ++  
        cpuPointsScreen.innerText = cpuPoints;
  
    } else if(move2 == "scissor"&& move1 =="rock" ||move2 == "paper"&& move1 =="scissor" || move2 == "rock"&& move1 =="paper"){
        playerPoints ++
        playerPointsScreen.innerText = playerPoints
    } else {
        console.log("draw")
    }
}

function stopLoopPlayer() {
    clearInterval(intervalSpeed);
}

function startMatch(){
    loopImages();
    countDown();
}

function countDown() {
    const countdown = document.getElementById("countdown");
    
    let i = 3;

    function updateCountDown() {
        countdown.innerText = i;
        i--;

        if (i >= 0) {
            setTimeout(updateCountDown, 1000);
        }
    }

    updateCountDown();
}