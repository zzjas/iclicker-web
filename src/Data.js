let randomColor = (numColors) => {
    let c = [];
    for(let i = 0; i < numColors; i++) {
        let o = Math.round, r = Math.random, s = 255;
        c.push("rgba(" + o(r()*s) + ", " + o(r()*s) + ", " + o(r()*s) + ", 0.5)");
    }
    return c;
};

class Data {
    constructor() {
        this.categories = this.getCategories();
        console.log(this.categories);
        this.students = this.getStudentsInfo();
    }

    getCategories() {
        function cat(t, opts, c) {
            return {
                title: t,
                options: opts,
                colors: c,
            };
        }

        let categories = {};
        Object.assign(categories, [
            cat('Test for Bigger Number',
                ['First Dataset', 'Second Dataset'],
                randomColor(2),
            ),
            cat('Do You Know Programming Or Not',
                ['Expert', 'Familiar', 'Medium', 'A little', 'New'],
                randomColor(5),
            ),
            cat('Which Steak',
                ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done'],
                randomColor(5),
            ),
            cat('What is your favorite programming language?',
                ['C/C++', 'Java', 'Python', 'JavaScript'],
                randomColor(4),
            ),
        ]);

        return categories;
    }

    getStudentsInfo() {
        return {
            "9b87a1bd": {0:0, 1:1, 2:0, 3:1},
            "9d750ae2": {0:1, 1:3, 2:4, 3:2},
        };
    }

    getParsedResult(idx, poll) {
        // The example data for chart.js
        if (idx === 0) {
            return {
                labels: ['A: 93', 'B: 107', 'C: 120', 'D: 100', 'E: 142'],
                datasets: [
                    {
                        label: 'My First dataset',
                        data: [65, 59, 80, 81, 56],
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                    },
                    {
                        label: 'My Second dataset',
                        data: [28, 48, 40, 19, 86],
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                    },
                    {
                        label: 'My Third dataset',
                        data: [52, 34, 41, 21, 38],
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                    }
                ]
            };
        }
        // The real data for chart.js
        else {
            if (poll !== {}) {
                let labels = ["", "", "", "", ""];
                let labelCounts = [0, 0, 0, 0, 0];
                let datasets = [];
                for(let i = 0; i < this.categories[idx].options.length; i++) {
                    datasets.push({
                        label: this.categories[idx].options[i],
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: this.categories[idx].colors[i],
                        borderColor: this.categories[idx].colors[i],
                    })
                }

                // Fulfill datasets with poll results
                for (let id in poll) {
                    console.log(idx);
                    // Get the category of the student
                    let pos = this.students[id][idx];

                    // Get the index of the student's answer
                    let index = poll[id].charCodeAt(0) - "A".charCodeAt(0)

                    // Increment the count of the answer by 1
                    labelCounts[index]++;

                    // Increment the count of the answer in that category by 1
                    datasets[pos].data[index]++;
                }

                // Convert label counts to label strings
                labelCounts.forEach((value, i) => {
                    labels[i] = String.fromCharCode(i + "A".charCodeAt(0)) + ": " + value;
                });

                return {
                    labels: labels,
                    datasets: datasets,
                };
            }
            else {
                return {
                    labels: ['A', 'B', 'C', 'D', 'E'],
                    datasets: [{
                        label: 'No Data',
                        data: [0, 0, 0, 0, 0]
                    }]
                }
            }
        }
    }
}

export default Data;

