import React, { Component } from 'react';
import SideBar from './SideBar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseID: 'ece15',
            categories: this.getCategories(), 
            poll: this.getPoll(),
            parsedResult: this.getParsedResult(),
            colorSet: this.getColorSet()
        };
    }

    getColorSet() {
        return ["#2081C3", "#E3C0D3"];
    }

    getParsedResult() {
        return {
            A : [10, 5],
            B : [15, 10],
            C : [20, 10],
            D : [15, 5],
            E : [10, 10]
        }
    }

    cat = (t, opts) => {
        return {
            title: t,
            options: opts
        };
    }

    getCategories() {
        return [
            this.cat("Know Programming Or Not",
                ["Expert","Familiar","Medium","A little","New"]),
            this.cat("Which Steak",
                ["Rare","Medium Rare","Medium","Medium Well","Well Done"]),
            this.cat("How much do you like C language",
                ["10","9","8","7","6","5","4","3","2","1"])
        ];
    }

    getPoll() {
        return {

        };
    }



    render() {
        return (
        <div className="App">
            <SideBar categories={this.state.categories}></SideBar>
        </div>
        );
    }
}

export default App;
