let champ = document.getElementById("champ");
let bouton = document.getElementById("buttonScanner");
let photo = document.getElementById("photo");
let ingredients = document.getElementById("ingredients");
let allergenes = document.getElementById("allergenes");
let nova = document.getElementById("nova");
let nutriscore = document.getElementById("nutriscore");
let huile = document.getElementById("huile");
let info = document.getElementById("info");
let footer = document.getElementById("footer");
let presentation = document.getElementById("presentation");
bouton.addEventListener("click", afficherProduit);

function afficherProduit() {
    axios.get('https://world.openfoodfacts.org/api/v2/product/' + champ.value)
        .then(function (response){
            // en cas de réussite de la requête
            console.log(response.data);
            photo.innerHTML ="<img src=" + response.data.product.image_front_small_url + ">";
            ingredients.innerHTML = "Les ingrédients : " + response.data.product.ingredients_text;
            allergenes.innerHTML ="Les allergènes : " + response.data.product.allergens_from_user;
            nova.innerHTML ="Les novas : " + response.data.product.nova_group;
            nutriscore.innerHTML = "Le nutriscore : " +response.data.product.nutriscore_grade;
            huile.innerHTML ="Présence huile de palme ? " + response.data.product.ingredients_from_palm_oil_n;
            info.innerHTML = response.data.product.stores;
            presentation.innerHTML = 
            "Code barre : " + response.data.code + 
            " Produit : " + response.data.product.brands_tags +
            " Magasin : " + response.data.product.stores;
        })
        .catch(function (error) {
            // en cas d’échec de la requête
            console.log(error)
        })
        .finally(function () {
            // dans tous les cas
            console.log()
        });
}















