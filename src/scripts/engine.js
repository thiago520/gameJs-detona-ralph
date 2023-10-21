const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#lifes"),
    },
    values: {        
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lifesLeft: 3,
    },
    actions: {
        timerId: 0,
        countDownTimerId: 0,
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        state.values.lifesLeft--;
        state.view.lifes.textContent = "x" + state.values.lifesLeft;
        restart();

        if (state.values.lifesLeft <= 0) {
            alert("Acabou suas vidas! Ultima pontuação: " + state.values.result);
            state.values.lifesLeft = 3;
            state.view.lifes.textContent = "x" + state.values.lifesLeft;            
        }
    }

}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }

        })
    })
}

function restart() {
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.values.gameVelocity = 1000;
    state.values.hitPosition = 0;
    state.values.result = 0;
    state.values.currentTime = 60;    
    state.view.score.textContent = 0
}

function initialize() {   
    restart()
    addListenerHitBox();
}

initialize();