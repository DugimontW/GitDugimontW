// Je décclare les vairables dont j'ai beosin 
let span = document.querySelectorAll('span'); // querySelectroAll pour récupérer tous les span
let boutonStart = document.getElementById('start');
let boutonStop = document.getElementById('stop');
let boutonReset = document.getElementById('reset');
let t;
let mili;
let sec;
let min;
let heure;

// Premiere fonction au chargement de ma page
window.onload = function () {        
    mili = 0;
    sec = 0;
    min = 0;
    heure = 0;
    span[0].innerHTML = heure + " h ";
    span[1].innerHTML = min + " min ";
    span[2].innerHTML = sec + " sec ";
    span[3].innerHTML = mili + " ms ";
}

//Deuxieme fonction ou je définie les conditions pour afficher les numéros du chronomètre
function update_chrono() {
    mili += 1;
    if (mili == 10) {
        mili = 0;
        sec += 1;
    }
    if (sec == 60) {
        sec = 0;
        min += 1;
    }
    if (min == 60) {
        min = 0;
        heure += 1;
    }
    span[0].innerHTML = heure + " h ";
    span[1].innerHTML = min + " min ";
    span[2].innerHTML = sec + " sec ";
    span[3].innerHTML = mili + " ms ";
}

// Troisieme fonction où je déclare que mon boutonStart va effectuer cette fonction
boutonStart.addEventListener("click", function () {
    t = setInterval(update_chrono, 100); // on définit que la fonction update_chrono durera 100 milisecondes
    boutonStart.disabled = true; // désactive le boutonStart
});

// Quatrième fonction où je déclare que mon boutonStop va effectuer cette fonction
boutonStop.addEventListener("click", function () {
    clearInterval(t); // on arrete l'éxécution de la fonction 
    boutonStart.disabled = false; // réactivation du boutonStart
});

// Cinquième fonction où je déclare que mon boutonReset va effectuer cette fonction
boutonReset.addEventListener("click", function () {
    clearInterval(t);// on arrete l'éxécution de la fonction 
    boutonStart.disabled = false;// réactivation du boutonStart
    heure = 0;
    min = 0;
    sec = 0;
    mili = 0;
    span[0].innerHTML = heure + " h ";
    span[1].innerHTML = min + " min ";
    span[2].innerHTML = sec + " sec ";
    span[3].innerHTML = mili + " ms ";
});


















