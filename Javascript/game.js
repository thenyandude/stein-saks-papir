imgs = ["Rock.png", "Scissor.png", "Paper.png"];

playerImg = document.getElementById("player-choise-img");

playerImg.src = "../Imgs/" + "Scissor.png";

let intervalId = null; // Variable to hold the interval ID

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
