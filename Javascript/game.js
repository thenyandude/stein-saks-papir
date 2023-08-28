imgs = ["Rock.png", "Scissor.png", "Paper.png"]

playerImg = document.getElementById("player-choise-img");

playerImg.src = "../Imgs/" + "Scissor.png"


rockButton = document.getElementById("rock-button");

rockButton.addEventListener('click', function() {
    changeImage("Rock");
});

rockButton = document.getElementById("scissor-button");

rockButton.addEventListener('click', function() {
    changeImage("Scissor");
});

rockButton = document.getElementById("paper-button");

rockButton.addEventListener('click', function() {
    changeImage("Paper");
});

function changeImage (string){
    playerImg.src = "../Imgs/" + string + ".png"
}
