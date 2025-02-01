window.onload = updateFont;

let interval = window.setInterval(function () {
    let rn = new Date();
    document.getElementById("timeDisplay").innerText = rn.getHours().toString().padStart(2, "0") +
        ":" + rn.getMinutes().toString().padStart(2, "0") + ":" + rn.getSeconds().toString().padStart(2, "0");
}, 100);

let isOdpocitava = false;
let casKonceOdpoctu = 0;
let countdowntimer;
let notifyAudio;

function switchModes() {
    console.log("switching modes")
    if (!isOdpocitava) {
        document.getElementById("modeSwitch").innerText = "Hodiny";
        document.getElementById("timeDisplay").classList.add("hide");
        document.getElementById("countdown").classList.remove("hide");
        document.getElementById("resetTimer").classList.add("hide");
    } else {
        document.getElementById("modeSwitch").innerText = "Odpočítávání";
        document.getElementById("countdown").classList.add("hide");
        document.getElementById("timeDisplay").classList.remove("hide");
        document.getElementById("timeSelector").classList.remove("hide");
        document.getElementById("countdownTimer").classList.remove("red");
    }

    isOdpocitava = !isOdpocitava;
}

function startTimer() {
    let ted = new Date();
    document.getElementById("countdownTimer").classList.remove("red");
    document.getElementById("timeSelector").classList.add("hide");

    // datum plus time input v ms a timezone offset
    casKonceOdpoctu = new Date(ted.getTime()
        + timeToMillis(parseInt(document.getElementById("hourInput").value),
            parseInt(document.getElementById("minuteInput").value),
            parseInt(document.getElementById("secondInput").value))
        + timeToMillis(0, ted.getTimezoneOffset(), 0));

    clearInterval(countdowntimer);
    countdowntimer = window.setInterval(function () {
        let cas = casKonceOdpoctu - Date.now();
        cas = new Date(cas);
        console.log(cas);
        document.getElementById("countdownTimer").innerText = cas.getHours().toString().padStart(2, "0") +
            ":" + cas.getMinutes().toString().padStart(2, "0") + ":" + cas.getSeconds().toString().padStart(2, "0");

        if (document.getElementById("countdownTimer").innerText === "00:00:00") {
            notifyAudio = new Audio("https://chesters.cz/assets/fit-time/o95.wav");
            notifyAudio.play();
            document.getElementById("resetTimer").classList.remove("hide");
            document.getElementById("resetTimer").addEventListener("click", resetTimer);
            clearInterval(countdowntimer);
            console.debug("Clear CasKonceOdpoctu");
            casKonceOdpoctu = 7;
            countdowntimer = window.setInterval(function () {
                console.debug("CasKonceOdpoctu "+ casKonceOdpoctu);
                if (casKonceOdpoctu <= 0) {
                    clearInterval(countdowntimer);
                    document.getElementById("countdownTimer").classList.add("red");
                } else if (casKonceOdpoctu % 2 === 1) {
                    document.getElementById("countdownTimer").classList.add("red");
                } else {
                    document.getElementById("countdownTimer").classList.remove("red");
                }
                casKonceOdpoctu--;
            }, 950);
        }
    }, 50);
}

function resetTimer() {
    document.getElementById("timeSelector").classList.remove("hide");
    document.getElementById("resetTimer").classList.add("hide");
}

function timeToMillis(hodiny, minuty, sekundy, milisekundy = 0) {
    return ((hodiny * 60 + minuty) * 60 + sekundy) * 1000 + milisekundy;
}

function updateFont(){
    let cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        if (cookie.indexOf("Font=") === 0){
            cookie = cookie.replace("Font=", "");
            if (cookie.toLowerCase() === "silly"){
                document.getElementsByClassName("container")[0].classList.add("silly");
                document.getElementById("timeDisplay").addEventListener("click", removeFont);
                document.getElementById("countdownTimer").addEventListener("click", removeFont);
            }
        }
    }
}

function removeFont(){
    document.getElementsByClassName("container")[0].classList.remove("silly");
}
