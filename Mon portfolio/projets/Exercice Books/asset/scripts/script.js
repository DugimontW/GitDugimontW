let booksList = new Array();
let authorsList = new Array();
let categories = new Array();

let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

document.addEventListener("DOMContentLoaded", jsonOnLoad); //DOMcontent... après le chargment de la page
const selectAuthors = document.getElementById("listAuthors");
selectAuthors.addEventListener("change", chargeByAuthor); // change sert à selectionner dans ta liste déroulante
const selectCategories = document.getElementById("listCategories");
selectCategories.addEventListener("change", chargeByCategories);

let form = document.getElementById("form1");
form.addEventListener("change", ChargeBySearch);

function showContent() {
    document.querySelector(".btn").classList.add('hidden');
}
setTimeout(showContent, 3000);

function jsonOnLoad() {
    fetch("asset/data/books.json")
        .then((response) => {               // une fois que notre fichier est chargé on le converti en json
            return response.json();         // on converti en json
        })
        .then((booksData) => {              // maintenant qu'on a converti en json on affiche le booksdata
            console.log(booksData);
            CreateList(booksData);
        });
}

function CreateList(_data) { // _data = json     
    for (let i = 0; i < _data.length; i++) {     // On fait une boucle pour créé un tableau avec chaque livres 
        let book = _data[i];
        booksList.push(book);       // on rajoute dans le tableau book dans le tableau bookList avec un push 
        for (let index = 0; index < book.authors.length; index++) {
            const element = book.authors[index];
            if (authorsList.indexOf(element) == -1) {  // si l'auteur est deja present dans la liste on ne le rajoute pas !
                authorsList.push(element);
            }
        }
        for (let y = 0; y < book.categories.length; y++) {
            const element = book.categories[y];       // indexOf cherche dans le tableau la présence de l'élément entre()
            if (categories.indexOf(element) == -1) {      // si la categorie est présente on la retire 
                categories.push(element);
            }
        }
    }                               // On sort de la boucle pour tout trier une fois que le triage est terminé
    booksList.sort();               // On créé ici la liste des books  // .sort sert a trier par ordre alphabétique
    authorsList.sort();             // On créé ici la liste des auteurs 
    categories.sort();
    console.log(booksList);
    console.log(categories);
    console.log(authorsList);
    for (let index = 0; index < authorsList.length; index++) {
        const element = authorsList[index];
        let option = document.createElement("option"); // on créé des balises options dans " l'authorsList " du html
        option.value = element;               //la valuer des options s 'appliques aux elements
        option.innerText = element;   // on le li au html
        selectAuthors.appendChild(option);  // on dit que l'option est un enfant de selectautors qui est la liste de auteurs
    }
    for (let w = 0; w < categories.length; w++) {
        const element = categories[w];        // l'élément correspond au a toute les catégories;
        let option = document.createElement("option");
        option.value = element;
        option.innerText = element;
        selectCategories.appendChild(option); // option est un enfant de selectAuthors;
    }
    showBooks(booksList);
}

function showBooks(_data) {
    let bookListElement = document.getElementById("booksList");
    bookListElement.innerHTML = ""; // je définie une variable pour lier mon html(booksList) et je réinitialise à chaque entrées
    for (let index = 0; index < _data.length; index++) {
        const book = _data[index];
        let bookElement = document.createElement("div");  // on met les books dans une div
        bookElement.setAttribute("class", "card mb-4");   // qui seront dans une class 
        let titre = "";
        if (book.title.length > 20) {                         // si mon titre est plus grand que 20 caractères
            titre = book.title.substring(0, 20) + " (...) "; // le titre est égale au 20 premiers caractere + (...)
        } else {
            titre = book.title;
        }

        let description;
        let descriptionShort;
        if (book.shortDescription == null || book.shortDescription == undefined) {
            descriptionShort = "";// si il n'y a pas de description on affiche rien
            description = "";
        } else {
            if (book.shortDescription.length > 20) { // sinon si la description fait plus de 20 caractères
                descriptionShort = book.shortDescription.substring(0, 20) + "(...)";  // on affiche les 20 premiers caractères de la description et le reste correspond au (...)
                description = book.shortDescription;  // la description correspond au shortDescription du json
            } else { // sinon -20caractere
                descriptionShort = book.shortDescription; // on affiche la totalite
                description = book.shortDescription;
            }
        }

        let codeIsbn;
        if (book.isbn == null || book.isbn == undefined) {
            codeIsbn = "";// si le code est null ou si il est undefined 
        } else {
            codeIsbn = "Code Isbn : " + book.isbn;
        };

        let nombrePage;
        if (book.pageCount == 0 || book.pageCount == undefined) {
            nombrePage = "";// si nmbrePage=0 ou si nmbrePage undefined 
        } else {
            nombrePage = "page(s) : " + book.pageCount;
        }


        let image;
        if (book.thumbnailUrl == null || book.thumbnailUrl == undefined) {
            image = "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
        } else {
            image = book.thumbnailUrl;
        }
        bookElement.innerHTML = "<img src='" + image + "'/>" + "<h1>" + titre + "</h1>" + "<h2>" + nombrePage + "</h2>" + "<h1>" + codeIsbn + "</h1>";

        if (description != "") {
            bookElement.innerHTML +=
                "<h4>  <span class='infobulle' title='" +
                description +
                "'>" + descriptionShort
                + "</span> </h4>";
        }

        let datePubli; // date de publication
        try { // essaie de faire ca 
            datePubli = new Date(book.publishedDate.dt_txt).toLocaleDateString("fr-FR", options);
            // la datePubli est une nouvelle date qui a comme ressources (book.publishedDate.dt_txt) ensuite on lui précise que c'et en francais et qu'il prenne en compte les options 
        } catch (error) { // en cas d'erreurs
            datePubli = " Pas de date de publication ";
        }

        bookElement.innerHTML += "<h4>" + datePubli + "</h4>";
        bookListElement.appendChild(bookElement); // on déclare que bookElement est un enfant de bookListElement
    }
}

function chargeByAuthor() {
    let strAuthor = selectAuthors.options[selectAuthors.selectedIndex].text;
    let booksByAuthor = new Array();
    if (strAuthor == "") {
        showBooks(booksList);
    } else {
        for (let index = 0; index < booksList.length; index++) {
            const element = booksList[index];
            if (element.authors.indexOf(strAuthor) != -1) {
                booksByAuthor.push(element);
            }
        }
    }
    showBooks(booksByAuthor);
}

function chargeByCategories() {
    let strcategories = selectCategories.options[selectCategories.selectedIndex].text;
    let booksByCategories = new Array();
    if (strcategories == "") {
        showBooks(booksList);
    } else {
        for (let index = 0; index < booksList.length; index++) {
            const element = booksList[index];
            if (element.categories.indexOf(strcategories) != -1) {
                booksByCategories.push(element);
            }
        }
    }
    showBooks(booksByCategories);
}

const bouton = document.getElementById("submit");
bouton.addEventListener("click", ChargeBySearch);

function ChargeBySearch(event) {
    event.preventDefault();// empeche que la soumission d'un formulaire recharge la page entierement
    let strSearch = document.getElementById("saisie").value;
    let booksBySearch = new Array();
    if (strSearch == "") {
        showBooks(booksList);
    } else {
        for (let index = 0; index < booksList.length; index++) {
            const element = booksList[index]; //création d'une constant qui prend la valeur de la liste des livres
            if (element.title.includes(strSearch)) {// si dans le titre il y a la chaine de caractere saisi Bingo!
                booksBySearch.push(element);
            }
        }
        showBooks(booksBySearch);
    }
}
