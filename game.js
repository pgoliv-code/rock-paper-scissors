
document.addEventListener("DOMContentLoaded", () => {

    const buttonSection = document.querySelector("section");
    const playerChoiceImg = document.querySelector(".player-choice");
    const computerChoiceImg = document.querySelector(".computer-choice");
    const timerElement = document.getElementById("time-left");
    const options = [
        { src: "Images/paper.png", alt: "paper" },
        { src: "Images/rock.png", alt: "rock" },
        { src: "Images/scissors.png", alt: "scissors" },
    ];

    let playerScore = 0;
    let computerScore = 0;
    let roundsPlayed = 0;
    const maxRounds = 3;
    let timer;
    let timeLeft = 20;

    function startTimer() {
        timeLeft = 20; 
        updateTimerDisplay();

        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTimeOut();
            }
        }, 1000);
    }
    function updateTimerDisplay() {
        timerElement.textContent = timeLeft;
        if (timeLeft <= 5) {
            timerElement.parentElement.classList.add("critical");
        } else {
            timerElement.parentElement.classList.remove("critical");
        }
    }
    function handleTimeOut() {
        alert("Time's up! Random choice made for the player.");
        const randomChoice = options[Math.floor(Math.random() * options.length)];
        const computerChoice = options[Math.floor(Math.random() * options.length)];
        updateBattle(randomChoice, computerChoice);
    }
    function handleChoices(playerImg) {
        clearInterval(timer);

        const randomIndex = Math.floor(Math.random() * options.length);
        const computerChoice = options[randomIndex];

        const playerChoice = { src: playerImg.src, alt: playerImg.alt };
        updateBattle(playerChoice, computerChoice);
    }
    function updateBattle(playerChoice, computerChoice) {
        playerChoiceImg.src = playerChoice.src;
        playerChoiceImg.alt = playerChoice.alt;

        computerChoiceImg.src = computerChoice.src;
        computerChoiceImg.alt = computerChoice.alt;

        updateScore(playerChoice.alt, computerChoice.alt);
    }
    function updateScore(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            console.log("Empate");
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "scissors" && computerChoice === "paper") ||
            (playerChoice === "paper" && computerChoice === "rock")
        ) {
            playerScore++;
        } else {
            computerScore++;
        }

        document.querySelector(".score-player").textContent = playerScore;
        document.querySelector(".score-computer").textContent = computerScore;

        roundsPlayed++;

        if (roundsPlayed >= maxRounds) {
            declareFinalWinner();
        } else {
            startTimer(); 
        }
    }
    function declareFinalWinner() {
        let resultMessage = "";

        const winSound = new Audio("sound_effects/win.mp3");
        const loseSound = new Audio("sound_effects/lose.wav");
        const emptySound = new Audio("sound_effects/tie-sound.mp3");
        if (playerScore > computerScore) {
            resultMessage = "You Win!";
            winSound.play();
        } else if (computerScore > playerScore) {
            resultMessage = "You Lose";
            loseSound.play();
        } else {
            resultMessage = "Tie";
            emptySound.play();
        }

        showPopup(resultMessage);
        resetGame();
    }
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        roundsPlayed = 0;

        document.querySelector(".score-player").textContent = playerScore;
        document.querySelector(".score-computer").textContent = computerScore;

        startTimer();
    }
    const buttons = buttonSection.querySelectorAll(".botton-choice");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const img = button.querySelector("img");
            handleChoices(img);
        });
    });
    function showPopup(message) {
        const popup = document.getElementById("final-winner-popup");
        const popupText = document.getElementById("final-winner-text");
        const closePopupButton = document.getElementById("close-popup");
    
        popupText.textContent = message;
    
        popup.classList.remove("hidden");
    
        closePopupButton.addEventListener("click", () => {
            popup.classList.add("hidden");
        });
    }
    const winnersPopup = document.getElementById("winners-popup");
    const closeWinnersPopup = document.getElementById("close-winners-popup");
    const winnersList = document.getElementById("winners-list");
    const winnersButton = document.querySelector(".winners-list");

    let winnersData = [
        { name: "Player1", score: 3 },
        { name: "Player2", score: 2 },
        { name: "Player3", score: 5 },
    ];
    winnersButton.addEventListener("click", () => {
    
    winnersList.innerHTML = "";

    winnersData.forEach(winner => {
        const listItem = document.createElement("li");
        listItem.textContent = `${winner.name} - Score: ${winner.score}`;
        winnersList.appendChild(listItem);
    });

    winnersPopup.classList.remove("hidden");
});

closeWinnersPopup.addEventListener("click", () => {
    winnersPopup.classList.add("hidden");
});
});
