let interval = window.setInterval(function () {
    let rn = new Date();
    document.getElementById("timeDisplay").innerText = rn.getHours().toString().padStart(2, "0") +
        ":" + rn.getMinutes().toString().padStart(2, "0") + ":" + rn.getSeconds().toString().padStart(2, "0");
}, 100); // Každých 100ms se aktualizuje čas

let isOdpocitava = false;
let casKonceOdpoctu = 0;

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
    // Date.now() nerespektuje timezóny
    let ted = new Date();

    // datum plus time input v ms a timezone offset
    casKonceOdpoctu = new Date(ted.getTime() +
        timeToMillis(0, 0, // absolutně netušim proč, ale rozbíjí se to, když tu funkci použiju normálně :(
            document.getElementById("secondInput").value
            + (document.getElementById("minuteInput").value * 60)
            + (document.getElementById("hourInput").value * 60 * 60))
        + timeToMillis(0, ted.getTimezoneOffset(), 0));

    window.setInterval(function () {
        console.log("------------------------------");
        console.log(casKonceOdpoctu);
        console.log(Date.now());
        console.log(ted.getTimezoneOffset())
        let cas = casKonceOdpoctu - Date.now();
        cas = new Date(cas);
        console.log(cas);
        document.getElementById("countdownTimer").innerText = cas.getHours().toString().padStart(2, "0") +
            ":" + cas.getMinutes().toString().padStart(2, "0") + ":" + cas.getSeconds().toString().padStart(2, "0");
    }, 50);
}

function timeToMillis(hodiny, minuty, sekundy, milisekundy = 0) {
    return ((hodiny * 60 + minuty) * 60 + sekundy) * 1000 + milisekundy;
}
