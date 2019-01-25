import React, { Component } from 'react';
import firebase from 'firebase'

import { withStyles } from '@material-ui/core/styles';

import BottomBar from './BottomBar';
import SideBar from './SideBar';
import Graph from './Graph';

const firebaseConfig = {
    apiKey: "AIzaSyAIx7g02y5LBOg427Pg3nXaR7zeHT33D5A",
    authDomain: "iclicker-web.firebaseapp.com",
    databaseURL: "https://iclicker-web.firebaseio.com",
    projectId: "iclicker-web",
    storageBucket: "iclicker-web.appspot.com",
    messagingSenderId: "673662120586"
};

const styles = theme => ({});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            drawerOpen: false,
            categoryId: -1,
            graphData: this.getGraphData(-1, {}),
            selectOne: false,
        };

        this.db = !firebase.apps.length ?
            firebase.initializeApp(firebaseConfig).firestore() :
            firebase.app().firestore();

        this.students = {};
        this.categories = {};
        let studentsPromise = this.db.collection('students').get();
        let categoriesPromise = this.db.collection('categories').get();
        Promise.all([studentsPromise, categoriesPromise])
            .then((snapshot) => {
                snapshot[0].forEach(doc => {
                    this.students[doc.id] = doc.data();
                });

                snapshot[1].forEach(doc => {
                    this.categories[doc.id] = doc.data();
                });


                let idx = Object.keys(this.categories).length - 1;
                this.setState({
                    loading: false,
                    categoryId: idx,
                    graphData: this.getGraphData(idx, this.poll),
                })
            })
            .catch((err) => {
                console.log(err)
            });

        this.poll = {};
        this.db.collection('polls').doc('currentPoll').onSnapshot(docSnapshot => {
            this.poll = docSnapshot.data();

            this.setState({
                graphData: this.getGraphData(this.state.categoryId, this.poll)
            })
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }

    getGraphData(categoryId, poll) {
        if (categoryId !== -1) {
            if (poll !== {}) {
                let labels = ["", "", "", "", ""];
                let labelCounts = [0, 0, 0, 0, 0];
                let datasets = [];
                for(let i = 0; i < this.categories[categoryId].options.length; i++) {
                    datasets.push({
                        label: this.categories[categoryId].options[i],
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: this.categories[categoryId].colors[i],
                        borderColor: this.categories[categoryId].colors[i],
                    })
                }

                // Fulfill datasets with poll results
                for (let id in poll) {
                    // Get the category of the student
                    let pos = this.students[id][categoryId];

                    // Get the index of the student's answer
                    let index = poll[id].charCodeAt(0) - "A".charCodeAt(0);

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
        else return {};
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.loading ? 'loading' :
                        <div>
                            <BottomBar
                                toggleDrawer={() => {
                                    this.setState({drawerOpen: !this.state.drawerOpen})
                                }}
                                categories={this.categories}
                                categoryId={this.state.categoryId}
                                setSelectOne={(checked) => {
                                    this.setState({selectOne: checked})
                                }}
                            />

                            <SideBar
                                categories={this.categories}
                                chooseCategory={(idx) => {
                                    this.setState({
                                        categoryId: idx,
                                        graphData: this.getGraphData(idx, this.poll),
                                    });
                                }}
                                drawerOpen={this.state.drawerOpen}
                                handleDrawer={(open) => {
                                    this.setState({drawerOpen: open});
                                }}
                            />

                            <Graph
                                graphData={this.state.graphData}
                                selectOne={this.state.selectOne}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);