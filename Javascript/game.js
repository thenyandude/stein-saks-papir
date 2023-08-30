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

compareMoves(move1,move2){
    if(move == "scissor"&& move2 =="rock" ||move == "paper"&& move2 =="scissor" || move == "rock"&& move2 =="paper" ){
        
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