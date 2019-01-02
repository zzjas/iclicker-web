export function createCategory(cat) {
    var catElement = document.createElement("li");
    var catTitle = `<label class="ui large label violet">${cat.title}</label>`;
    var catOpts  = `<select name=${cat.title} multiple="" class="ui fluid dropdown">`;

    cat.options.forEach(element => {
        catOpts += `<option>${element}</option>`; 
    });
    catOpts += "</select>";

    catElement.innerHTML += catTitle;
    catElement.innerHTML += catOpts;
    return catElement;
}