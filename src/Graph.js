import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

let data = {
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

let options = {
    scales: {
        xAxes: [{
            stacked: true
        }],
        yAxes: [{
            stacked: true
        }]
    }
};

class Graph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Bar data={data} options={options}/>
                {"aadsf"}
            </div>
        );
    }
}

export default Graph;
