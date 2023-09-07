class RockPaperScissors {
    constructor() {
        this.imgs = ["rock.png", "scissor.png", "paper.png"];
        this.playerImg = document.getElementById("player-choise-img");
        this.cpuImg = document.getElementById("cpu-choise-img");
        this.cpuMove = " ";
        this.playerMove = "blank";
        this.playerWins = 0;
        this.playerWinsStore = 0;
        this.playerPoints = 0;
        this.cpuWins = 0;
        this.cpuWinsStore = 0;
        this.cpuPoints = 0;

        this.matchHistory = [];
        this.matchHistoryScreen = document.getElementById("match-history");
        this.drawScreen = document.getElementById("draw");
        this.matchRunning = false;
        this.countdownElement = document.getElementById("countdown");
        this.intervalSpeedPlayerLoop = null;
        this.intervalSpeedCpuLoop = null;

        this.rockButton = document.getElementById("rock-button");
        this.scissorButton = document.getElementById("scissor-button");
        this.paperButton = document.getElementById("paper-button");
        this.startMatchButton = document.getElementById("start-match");
    }

    playerMakeMove(moveType) {
        if (this.madeMove === false) {
            this.madeMove = true;
            this.changeImage(moveType, this.cpuMove);
            this.playerMove = moveType;
            this.stopLoops();
            this.compareMoves(this.playerMove, this.cpuMove);
        }
    }

    changeImage(player, cpu) {
        this.playerImg.src = `../Imgs/${player}.png`;
        this.cpuImg.src = `../Imgs/${cpu}.png`
    }

    loopImagesPlayer() {
        clearInterval(this.intervalSpeedPlayerLoop);
        this.intervalSpeedPlayerLoop = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * this.imgs.length);
            this.playerImg.src = `../Imgs/${this.imgs[randomIndex]}`;
        }, 400);
    }

    loopCpuImages() {
        clearInterval(this.intervalSpeedCpuLoop);
        this.intervalSpeedCpuLoop = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * this.imgs.length);
            this.cpuImg.src = randomIndex;
        }, 400);
    }

    cpuChooseMove(movesArray) {
        if (this.countdownElement.innerText == "3" || this.countdownElement.innerText == "2" || this.countdownElement.innerText == "1") {
            if (this.playerMove == "scissor") {
                this.cpuMove = "rock";
            } else if (this.playerMove == "paper") {
                this.cpuMove = "scissor";
            } else if (this.playerMove == "rock") {
                this.cpuMove = "paper";
            }
            // Update CPU's image source here
        } else {
            const randomIndex = Math.floor(Math.random() * movesArray.length);
            this.cpuMove = movesArray[randomIndex];
            // Update CPU's image source here
        }
        // Update both player and CPU images
        this.changeImage(this.playerMove, this.cpuMove);
        return this.cpuMove;
    }

    compareMoves(move1, move2) {
        move2 = this.cpuChooseMove(this.moves);
        if (move1 === move2) {
            this.drawScreen.style.display = "block";
            this.matchHistory.push("Draw" + `<br>`);
            this.matchHistoryScreen.innerHTML = this.matchHistory.join("<br>");
        } else if (
            (move1 === "rock" && move2 === "scissor") ||
            (move1 === "scissor" && move2 === "paper") ||
            (move1 === "paper" && move2 === "rock")
        ) {
            this.playerPoints++;
            this.playerPointsScreen.innerText = this.playerPoints;
            this.matchHistory.push("Player Win" + `<br>`);
            this.matchHistoryScreen.innerHTML = this.matchHistory.join("<br>");
        } else {
            this.cpuPoints++;
            this.cpuPointsScreen.innerText = this.cpuPoints;
            this.matchHistory.push("Cpu Win" + `<br>`);
            this.matchHistoryScreen.innerHTML = this.matchHistory.join("<br>");
        }
    }

    stopLoops() {
        clearInterval(this.intervalSpeedPlayerLoop);
        clearInterval(this.intervalSpeedCpuLoop);
    }

    startMatch() {
        this.countDown();
        this.drawScreen.style.display = "none";
        this.playerWinsScreen.innerText = this.playerWinsStore;
        this.cpuWinsScreen.innerText = this.cpuWinsStore;
        this.madeMove = false;
        this.matchRunning = true;
        this.checkMatch();
    }

    countDown() {
        this.drawScreen.style.display = "none";
        let i = 3;
        this.loopImagesPlayer();
        this.loopCpuImages();
        const updateCountDown = () => {
            if (i >= 1) {
                this.countdownElement.innerText = i;
            } else {
                this.countdownElement.innerText = "Show";
                this.madeMove = false;
                this.playerMove = "blank";
            }
            i--;
            this.checkMatch();
            if (this.madeMove === false && this.playerMove === "blank" && i === -2) {
                this.cpuPoints++;
                this.cpuPointsScreen.innerText = this.cpuPoints;
                this.matchHistory.push("Cpu Win" + `<br>`);
                this.matchHistoryScreen.innerHTML = this.matchHistory.join("<br>");
            }
            if (this.playerPoints >= 2) {
                this.playerWins++;
                this.playerWinsScreen.innerText = this.playerWinsStore;
                this.playerWinsStore++;
                this.playerPoints = 0;
                this.playerPointsScreen.innerText = this.playerPoints;
            }
            if (this.cpuPoints >= 2) {
                this.cpuWins++;
                this.cpuPointsScreen.innerText = this.cpuWinsStore;
                this.cpuWinsStore++;
                this.cpuPoints = 0;
                this.cpuPointsScreen.innerText = this.cpuPoints;
            }
            if (i === -2) {
                i = 3;
                this.drawScreen.style.display = "none";
                this.playerMove = "blank";
                this.loopImagesPlayer();
                this.loopCpuImages();
            }
            if (this.playerWins >= 1) {
                this.stopMatch();
                this.startMatchButton.innerText = "PLAY AGAIN?";
                this.winSound.play();
            } else if (this.cpuWins >= 1) {
                this.stopMatch();
                this.startMatchButton.innerText = "PLAY AGAIN?";
                this.loseSound.play();
            } else {
                this.countdownTimer = setTimeout(updateCountDown, 1000);
            }
        };
        updateCountDown();
    }

    checkMatch() {
        if (this.matchRunning) {
            this.startMatchButton.style.display = "none";
        } else {
            this.startMatchButton.style.display = "block";
        }
    }
}

const game = new RockPaperScissors();

// Kanppene gjør at du gjør et move, bytter bildet, registrerer playerMove, stopper animasjonen og sammenligner moves
game.rockButton.addEventListener('click', () => game.playerMakeMove("rock"));
game.scissorButton.addEventListener('click', () => game.playerMakeMove("scissor"));
game.paperButton.addEventListener('click', () => game.playerMakeMove("paper"));
