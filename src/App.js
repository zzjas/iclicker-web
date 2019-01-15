import React, { Component } from 'react';
import SideBar from './SideBar';
import Graph from './Graph';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import Data from './Data';


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});



class App extends Component {
    constructor(props) {
        super(props);

        this.data = new Data();
        this.state = {
            data: this.data,
            categories: this.data.getCategories(),
            poll: {},
            chosenCategory: 0,
            graphData: this.data.getParsedResult(0, {}),
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            fetch('http://localhost:5000/')
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        graphData: this.data.getParsedResult(this.state.chosenCategory, this.state.poll),
                        poll: res
                    })
                });
            }, 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="App">
                <div className={classes.root}>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                {(this.state.chosenCategory.length === -1) ? "iClicker" : this.state.categories[this.state.chosenCategory].title}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <SideBar
                        categories={this.state.categories}
                        chooseCategory={(idx) => {
                            this.setState({
                                chosenCategory: idx,
                            });
                        }}
                    />

                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Graph parsedResult={this.state.graphData} />
                    </main>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);