class Data {
    constructor(props) {
        this.categories = this.getCategories();
    }

    getCategories() {
        function cat(t, opts) {
            return {
                title: t,
                options: opts
            };
        }

        return [
            cat("Know Programming Or Not",
                ["Expert","Familiar","Medium","A little","New"]),
            cat("Which Steak",
                ["Rare","Medium Rare","Medium","Medium Well","Well Done"]),
            cat("How much do you like C language",
                ["10","9","8","7","6","5","4","3","2","1"])
        ];
    }

    getParsedResult(category, poll) {
        return {
            labels: ["A", "B", "C", "D", "E"],
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [65, 59, 80, 81, 56]
                },
                {
                    label: "My Second dataset",
                    data: [28, 48, 40, 19, 86]
                }
            ]
        };
    }
}

export default Data;