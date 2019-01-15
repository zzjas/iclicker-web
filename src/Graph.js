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
        return (
            <div className="App">
                <Bar data={this.props.parsedResult} options={this.options}/>
            </div>
        );
    }



}


export default Graph;
