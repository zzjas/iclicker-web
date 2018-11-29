export function getCategories() {
    return [
        cat("Know Programming Or Not",
            ["Expert","Familiar","Medium","A little","New"]),
        cat("Which Steak",
            ["Rare","Medium Rare","Medium","Medium Well","Well Done"]),
        cat("How much do you like C language",
            ["10","9","8","7","6","5","4","3","2","1"])
    ];
}

function getData(session) {
}

function cat(t, opts) {
    return {
        title: t,
        options: opts
    };
}