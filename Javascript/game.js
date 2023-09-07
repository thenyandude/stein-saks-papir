

class RockPaperScissors{
    profiles(){
        this.rockButton=document.getElementById("rock-button");
        this.scissorButton = document.getElementById("scissor-button");
        this.paperButton = document.getElementById("paper-button");

        this.imgs = ["rock.png", "scissor.png", "paper.png"];
        this.playerImg = document.getElementById("player-choise-img");

        this.moves = ["rock", "scissor", "paper"];
        this.cpuMove = " "
        this.playerMove = "blank"

        this.playerWins = 0
        this.playerWinsScreen = document.getElementById("player-wins");
        this.playerWinsStore = 0
        this.playerPointsScreen = document.getElementById("player-points");
        this.madeMove = false;

        this.cpuWins = 0
        this.cpuWinsScreen = document.getElementById("cpu-wins");
        this.cpuWinsStore = 0
        this.cpuPoints = 0
        this.cpuPointsScreen = document.getElementById("cpu-points");
    }

    match(){
        this.matchHistory = [];
        this.matchHistoryScreen = document.getElementById("match-history");

        this.drawScreen = document.getElementById("draw");

        this.matchRunning = false;

        this.countdownElement = document.getElementById("countdown");

        this.intervalSpeedPlayerLoop = null; 
        this.intervalSpeedCpuLoop = null;
    }

}

const game = new RockPaperScissors();

rockButton = document.getElementById("rock-button");
// Kanppene gjør at du gjør et move, bytter bildet, registrerer playerMove, stopper animasjonen og sammenligner moves
rockButton.addEventListener('click', function() {});

scissorButton = document.getElementById("scissor-button");

scissorButton.addEventListener('click', function() {});

paperButton = document.getElementById("paper-button");

paperButton.addEventListener('click', playerMakeMove("paper"));

// Bytter bildet på skjermen
function changeImage(player, cpu) {
    game.playerImg.src = `../Imgs/${player}.png`;
    game.playerImg.src = `../Imgs/${cpu}.png`;
}

function playerMakeMove(moveType){
    if(game.madeMove == false){
        game.madeMove = true;
        changeImage(moveType, cpuMove);
        game.playerMove=moveType
        stopLoops();
        compareMoves(playerMove,cpuMove);
    }
}


//Animerer en tillfeldig loop av bilder
function loopImagesPlayer() {
    clearInterval(intervalSpeedPlayerLoop)
    intervalSpeedPlayerLoop = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * imgs.length);
        playerImg.src = "../Imgs/" + game.imgs[randomIndex];
    }, 400);
}

//Animerer en tillfeldig loop av bilder
function loopCpuImages() {
    clearInterval(intervalSpeedCpuLoop)
    intervalSpeedCpuLoop = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * imgs.length);
        cpuImg.src = "../Imgs/" + game.imgs[randomIndex];
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