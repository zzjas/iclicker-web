import { parse } from 'path';

class Data {
    constructor(props) {
        this.categories = this.getCategories();
        this.students = this.getStudentsInfo();
    }

    getStudentsInfo() {
        let numOfStudents = 200;
        let toReturn = {};

        [...Array(numOfStudents).keys()].forEach(i => {
            let idx = 's@' + i.toString();
            toReturn[idx] = this.categories.map(i => {
                return Math.round(Math.random() * (i.options.length-1));
            })
        });

        return toReturn;
    }



    getParsedResult(idx, poll) {
        // The test data for chart.js
        if(idx === 0) {
            return {
                labels: ['A', 'B', 'C', 'D', 'E'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [65, 59, 80, 81, 56]
                    },
                    {
                        label: 'My Second dataset',
                        data: [28, 48, 40, 19, 86]
                    }
                ]
            };
        }
        else {
            return { 
                labels: ['A', 'B', 'C', 'D', 'E'],
                datasets: this.parse(idx, poll)
            };
        }        

    }

    parse(catIdx, poll) {
        if(poll.ok) {
            let parsedResult = this.categories[catIdx].options.map(opt => {
                return {
                    label: opt,
                    data: [0,0,0,0,0]
                };
            });

            
            poll.result.forEach(s => {
                let pos = this.students[s.id][catIdx];
                parsedResult[pos].data[parseInt(s.vote)]++;
            });

            return parsedResult;

        }
        else {
            return [
                {
                    label: 'No Data',
                    data: [100, 100, 100, 100, 100]
                }
            ];
        }

    }

    getCategories() {
        function cat(t, opts) {
            return {
                title: t,
                options: opts
            };
        }

        return [
            cat('Test for Bigger Number',
                ['First Dataset', 'Second Dataset']),
            cat('Know Programming Or Not',
                ['Expert','Familiar','Medium','A little','New']),
            cat('Which Steak',
                ['Rare','Medium Rare','Medium','Medium Well','Well Done']),
            cat('How much do you like C language',
                ['10','9','8','7','6','5','4','3','2','1'])
        ];
    }
}


export default Data;