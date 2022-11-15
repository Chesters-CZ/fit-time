let interval = window.setInterval(function () {
    let rn = new Date();
    document.getElementById("timeDisplay").innerText = rn.getHours().toString().padStart(2, "0") +
        ":" + rn.getMinutes().toString().padStart(2, "0") + ":" + rn.getSeconds().toString().padStart(2, "0");
}, 100);

let isOdpocitava = false;
let casKonceOdpoctu = 0;
let countdowntimer;

function switchModes() {
    console.log("switching modes")
    if (!isOdpocitava) {
        document.getElementById("modeSwitch").innerText = "Hodiny";
        document.getElementById("timeDisplay").classList.add("hide");
        document.getElementById("countdown").classList.remove("hide");
    } else {
        document.getElementById("modeSwitch").innerText = "Odpočítávání";
        document.getElementById("countdown").classList.add("hide");
        document.getElementById("timeDisplay").classList.remove("hide");
        document.getElementById("timeSelector").classList.remove("hide");
    }

    isOdpocitava = !isOdpocitava;
}

function startTimer() {
    let ted = new Date();

    // datum plus time input v ms a timezone offset
    casKonceOdpoctu = new Date(ted.getTime()
        + timeToMillis(document.getElementById("hourInput").valueAsNumber,
            document.getElementById("minuteInput").valueAsNumber,
            document.getElementById("secondInput").valueAsNumber)
        + timeToMillis(0, ted.getTimezoneOffset(), 0));

    countdowntimer = window.setInterval(function () {
        let cas = casKonceOdpoctu - Date.now();
        cas = new Date(cas);
        console.log(cas);
        document.getElementById("countdownTimer").innerText = cas.getHours().toString().padStart(2, "0") +
            ":" + cas.getMinutes().toString().padStart(2, "0") + ":" + cas.getSeconds().toString().padStart(2, "0");

        if (document.getElementById("countdownTimer").innerText === "00:00:00") {
            clearInterval(countdowntimer);
            casKonceOdpoctu = 8;
            countdowntimer = window.setInterval(function () {
                if (casKonceOdpoctu === 0) {
                    clearInterval(countdowntimer);
                    document.getElementById("countdownTimer").classList.remove("red");
                } else if (casKonceOdpoctu % 2 === 1) {
                    document.getElementById("countdownTimer").classList.add("red");
                } else {
                    document.getElementById("countdownTimer").classList.remove("red");
                }
                casKonceOdpoctu--;
            }, 750);
        }
    }, 50);
}

function timeToMillis(hodiny, minuty, sekundy, milisekundy = 0) {
    return ((hodiny * 60 + minuty) * 60 + sekundy) * 1000 + milisekundy;
}
