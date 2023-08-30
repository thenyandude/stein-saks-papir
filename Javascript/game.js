imgs = ["Rock.png", "Scissor.png", "Paper.png"];

playerImg = document.getElementById("player-choise-img");

playerImg.src = "../Imgs/" + "Scissor.png";

let intervalId = null; // Variable to hold the interval ID

rockButton = document.getElementById("rock-button");

rockButton.addEventListener('click', function() {
    changeImage("Rock");
    stopLoopPlayer(); 
});

scissorButton = document.getElementById("scissor-button");

scissorButton.addEventListener('click', function() {
    changeImage("Scissor");
    stopLoopPlayer();
});

paperButton = document.getElementById("paper-button");

paperButton.addEventListener('click', function() {
    changeImage("Paper");
    stopLoopPlayer();
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

function submitMove(move){
    
}

playerPoints = 0
cpuPoints = 0

function compareMoves(move1,move2){
    if(move1 == "scissor"&& move2 =="rock" ||move1 == "paper"&& move2 =="scissor" || move1 == "rock"&& move2 =="paper" ){
        cpuPoints ++  
        console.log(cpuPoints)
  
    } else if(move2 == "scissor"&& move1 =="rock" ||move2 == "paper"&& move1 =="scissor" || move2 == "rock"&& move1 =="paper"){
        playerPoints ++
        console.log(playerPoints)
    } else {
        console.log("draw")
    }
}

compareMoves("scissor","rock")

compareMoves("paper","rock")

compareMoves("rock","rock")





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