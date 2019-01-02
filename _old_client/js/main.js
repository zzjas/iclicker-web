import * as Category from "./categories.js";
import * as Data from "./data.js";
var cats = Data.getCategories();

function genereateCategories(cats) {
    var l = document.getElementById("catList");
    cats.forEach(element => {
        l.appendChild(Category.createCategory(element));
    });
}

function main() {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(cats));
    genereateCategories(cats);
    // eslint-disable-next-line
    $("select.dropdown").dropdown("set selected", ["meteor", "ember"]);
}

window.onload = main;