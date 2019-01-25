import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

let randomColor = (numColors) => {
    let c = [];
    for(let i = 0; i < numColors; i++) {
        let o = Math.round, r = Math.random, s = 255;
        c.push("rgba(" + o(r()*s) + ", " + o(r()*s) + ", " + o(r()*s) + ", 0.5)");
    }
    return c;
};

class Graph extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.chart = {};
        this.options ={
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        suggestedMin: 0,
                    }
                }]
            },
        };
        this.legend = {
            onClick: (event, item) => {
                let ci = this.chart.chartInstance;

                if(this.props.selectOne) {
                    for(let i = 0; i < ci.data.datasets.length; i++) {
                        let meta = ci.getDatasetMeta(i);
                        meta.hidden = (i === item.datasetIndex) ? null : true;
                    }

                }
                else {
                    let meta = ci.getDatasetMeta(item.datasetIndex);
                    meta.hidden = meta.hidden === null ? !meta.hidden : null;
                }

                // Rerender the chart
                ci.update();
            },
        };
    }

    render() {
        return (
            <div className="App">
                <Bar
                    ref={(reference) => this.chart = reference}
                    data={this.props.graphData}
                    options={this.options}
                    legend={this.legend}
                />
            </div>
        );
    }
}

export default Graph;
