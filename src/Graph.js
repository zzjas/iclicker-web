import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Graph extends Component {
    constructor(props) {
        super(props);

        this.options ={
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            },
            animation: {
                duration: 0
            }
        }; 

    }

    render() {
        let coloredResult = this.props.parsedResult;
        coloredResult.datasets.forEach(dataset => {
            let color = this.randomColor();
            dataset.backgroundColor = color.backgroundColor;
            dataset.borderColor = color.borderColor;
            dataset.hoverBackgroundColor = color.hoverBackgroundColor;
            dataset.hoverBorderColor = color.hoverBorderColor;
            dataset.borderWidth = 1;
        });

        return (
            <div className="App">
                <Bar data={coloredResult} options={this.options}/>
            </div>
        );
    }


    randomColor() {
        let o = Math.round, r = Math.random, s = 255;
        let c = `${o(r()*s)}, ${o(r()*s)}, ${o(r()*s)}`
        return {
            backgroundColor: `rgba(${c}, 0.3)`,
            borderColor: `rgba(${c}, 1)`,
            hoverBackgroundColor: `rgba(${c}, 0.6)`,
            hoverBorderColor: `rgba(${c}, 1)`
        }
    }
    
}


export default Graph;
