import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import { Bar } from 'react-chartjs-2';

class Graph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectOne: false,
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
                        suggestedMax: 200,
                    }
                }]
            },
        };
        this.legend = {
            onClick: (event, item) => {
                let ci = this.chart.chartInstance;

                if(this.state.selectOne) {
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
                    ref={(reference) => this.chart = reference }
                    data={this.props.parsedResult}
                    options={this.options}
                    legend={this.legend}
                />
                <Switch
                    checked={this.state.selectOne}
                    onChange={(event, checked) => {
                        this.setState({selectOne: checked})
                    }}
                />
                {this.state.selectOne ?
                    <span>Selection mode: click the legend to select one dataset to display.</span> :
                    <span>Selection mode: click the legend to hide that dataset.</span>
                }
            </div>
        );
    }
}

export default Graph;
