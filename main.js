//SCREEN TWO
const sound = new Audio();
sound.src = "sound_effects/2.wav";
sound.volume = 0.5;

function mute(){
    const backSound = document.getElementById('background_audio');
    const soundImg = document.querySelector(".sound-img");
    if(backSound.muted === false){
      backSound.muted = true;
      soundImg.src="icons/Volume_x.png";
    } else {
      backSound.muted = false;
      soundImg.src="icons/Volume_2.png";
    }
}

//SCREEN THREE
function closeScreenTwo (event) {
    event.preventDefault();
    const screenTwo = document.querySelector(".screen-two");
    const screenThree = document.querySelector(".screen-three");
    screenTwo.classList.add("hidden");
    screenThree.classList.remove("hidden");
}
const enterBtn = document.querySelector(".enter-button");
const registerBtn = document.querySelector(".register-button");
enterBtn.addEventListener("click", closeScreenTwo, false);
registerBtn.addEventListener("click", closeScreenTwo);

//SCREEN FOUR
function closeScreenThree () {
    const screenThree = document.querySelector(".screen-three");
    const screenFour = document.querySelector(".screen-four");
    screenThree.classList.add("hidden");
    screenFour.classList.remove("hidden");
}
const startGameBtn = document.querySelector(".start-button");
startGameBtn.addEventListener("click", closeScreenThree);
