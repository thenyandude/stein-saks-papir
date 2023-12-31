const imgs = ["rock.png", "scissor.png", "paper.png"];

const playerImg = document.getElementById("player-choise-img");

const cpuImg = document.getElementById("cpu-choise-img");


let intervalId = null;

let madeMove = false;

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

const drawScreen = document.getElementById("draw");

let matchRunning = false;

const moves = ["rock", "scissor", "paper"];

const countdownElement = document.getElementById("countdown");

let intervalSpeedPlayerLoop = null; 
let intervalSpeedCpuLoop = null;

rockButton = document.getElementById("rock-button");
// Kanppene gjør at du gjør et move, bytter bildet, registrerer playerMove, stopper animasjonen og sammenligner moves
rockButton.addEventListener('click', function() {
    if(madeMove == false){
        madeMove = true;
        changeImage("rock", cpuMove);
        playerMove="rock"
        stopLoops(); 
        compareMoves(playerMove,cpuMove);
    }
});

scissorButton = document.getElementById("scissor-button");
// Kanppene gjør at du gjør et move, bytter bildet, registrerer playerMove, stopper animasjonen og sammenligner moves
scissorButton.addEventListener('click', function() {
    if(madeMove == false){
        madeMove = true;
        changeImage("scissor", cpuMove);
        playerMove="scissor"
        stopLoops();

        compareMoves(playerMove,cpuMove);
    }
});

paperButton = document.getElementById("paper-button");

// Kanppene gjør at du gjør et move, bytter bildet, registrerer playerMove, stopper animasjonen og sammenligner moves
paperButton.addEventListener('click', function() {
    if(madeMove == false){
        madeMove = true;
        changeImage("paper", cpuMove);
        playerMove="paper"
        stopLoops();
        compareMoves(playerMove,cpuMove);
    }
});

// Bytter bildet på skjermen
function changeImage(player, cpu) {
    playerImg.src = "../Imgs/" + player + ".png";
    cpuImg.src = "../Imgs/" + cpu + ".png"; 
}


//Animerer en tillfeldig loop av bilder
function loopImagesPlayer() {
    clearInterval(intervalSpeedPlayerLoop)
    intervalSpeedPlayerLoop = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * imgs.length);
        playerImg.src = "../Imgs/" + imgs[randomIndex];
    }, 400);
}

//Animerer en tillfeldig loop av bilder
function loopCpuImages() {
    clearInterval(intervalSpeedCpuLoop)
    intervalSpeedCpuLoop = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * imgs.length);
        cpuImg.src = "../Imgs/" + imgs[randomIndex];
    }, 400);
}


//CPU lager et valg, først sjekk om timer er før "VIS" og om den er det, gjør det som vinner, ellers gjør noe tilfeldig.
function cpuChooseMove(movesArray) {
    if (countdownElement.innerText == "3" || countdownElement.innerText == "2" || countdownElement.innerText == "1") {
        if (playerMove == "scissor") {
            cpuMove = "rock";
        } else if (playerMove == "paper") {
            cpuMove = "scissor";
        } else if (playerMove == "rock") {
            cpuMove = "paper";
        }

        // Update CPU's image source here
        } else {
        const randomIndex = Math.floor(Math.random() * movesArray.length);
        cpuMove = movesArray[randomIndex];

        // Update CPU's image source here
        changeImage(playerMove,cpuMove);
    }

    // Update both player and CPU images
    changeImage(playerMove, cpuMove);

    return cpuMove;
}



  //Sammenligner om move1 (spiller) og move2 (CPU) er vinner eller taper, så inkrementer matchhistory, og poengsum
  function compareMoves(move1, move2) {

     move2 = cpuChooseMove(moves);

    if (move1 === move2) {
        drawScreen.style.display = "block";
        matchHistory.push("Draw" + `<br>`);
        matchHistoryScreen.innerHTML = matchHistory.join("<br>");
    } else if (
        (move1 === "rock" && move2 === "scissor") ||
        (move1 === "scissor" && move2 === "paper") ||
        (move1 === "paper" && move2 === "rock")
    ) {
        playerPoints++;
        playerPointsScreen.innerText = playerPoints;
        matchHistory.push("Player Win" + `<br>`);
        matchHistoryScreen.innerHTML = matchHistory.join("<br>");
    } else {
        cpuPoints++;
        cpuPointsScreen.innerText = cpuPoints;
        matchHistory.push("Cpu Win" + `<br>`);
        matchHistoryScreen.innerHTML = matchHistory.join("<br>");
    }
}


//stopper animasjonsloopene

function stopLoops() {
    clearInterval(intervalSpeedPlayerLoop);
    clearInterval(intervalSpeedCpuLoop);
}

//Setter igang alle kodene som trengs for å ha en match

function startMatch(){
    countDown();
    drawScreen.style.display = "none";

    playerWinsScreen.innerText = playerWinsStore;
    cpuWinsScreen.innerText = cpuWinsStore;
    madeMove = false;
    matchRunning = true;
    checkMatch();
}

let countdownTimer = null;

// Gjør all koden som trengs for å stoppe en match
function stopMatch(){
    drawScreen.style.display = "none";
    stopLoops();
    clearTimeout(countdownTimer);
    countdownElement.innerText = "Match over"
    countdownElement.style.fontSize = "60px"
    countdownElement.style.bottom = "670px"
    playerWinsScreen.innerText = playerWinsStore;
    cpuWinsScreen.innerText = cpuWinsStore;
    matchHistory = [];

    matchRunning = false;
    checkMatch();

    madeMove = true;

    playerWins = 0;
    cpuWins = 0;

    playerPoints = 0;
    playerPointsScreen.innerText = playerPoints;
    cpuPoints = 0;
    cpuPointsScreen.innerText = cpuPoints;
    

}

winSound = new Audio("../Audio/WinSound.mp3")
loseSound = new Audio("../Audio/LoseSound.wav")

//Teller ned med en loop. Når loopen treffer 0 incrementes en ny variabel, for å få en ny runde, her defineres også timing på når spilleren må ha gjort noe.
// 

function countDown() {
    drawScreen.style.display = "none";

    let i = 3;
    loopImagesPlayer();
    loopCpuImages();

    function updateCountDown() {
        if (i >= 1) {
            countdownElement.innerText = i;
        } else {
            countdownElement.innerText = "Show";
            madeMove = false;
            playermove = "blank";
        }
        i--;
        console.log("player"+playerMove,"cpu" + cpuMove)
       checkMatch();

        if(madeMove == false && playerMove=="blank" && i == -2 ){
            cpuPoints++
            cpuPointsScreen.innerText = cpuPoints;
            matchHistory.push("Cpu Win" + `<br>`)
            matchHistoryScreen.innerHTML = matchHistory.join("<br>");
        }

        // Hvis noen vinner 2 runder får de en vinn, lagrer vinn-mengden, og resetter poengsumm 
        if(playerPoints >= 2){
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


        if (i == -2) {
            i = 3;
            drawScreen.style.display = "none";
            playerMove = "blank"
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

function checkMatch(){
    if(matchRunning == true){
        startMatchButton.style.display = "none";
    } else {
        startMatchButton.style.display = "block";
    }
}