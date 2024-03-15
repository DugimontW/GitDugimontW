document.getElementById("telecharger").addEventListener("click", function () {
    var lien = document.createElement('a');
    lien.href = 'chemin/vers/votre-cv.pdf';
    lien.download = 'VotreCV.pdf';
    lien.click();
});