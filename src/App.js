import React, { Component } from 'react';
import SideBar from './SideBar';
import Graph from './Graph';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';


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
        this.state = {
            courseID: 'ece15',
            categories: this.getCategories(), 
            chosenCategory: [],
            poll: this.getPoll(),
            parsedResult: this.getParsedResult(),
            colorSet: this.getColorSet()
        };

        this.chooseCategory = this.chooseCategory.bind(this);
    }

    chooseCategory(category) {
        this.setState({chosenCategory: [category]});
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


    getCategories() {
        function cat(t, opts) {
            return {
                title: t,
                options: opts
            };
        }

        return [
            cat("Know Programming Or Not",
                ["Expert","Familiar","Medium","A little","New"]),
            cat("Which Steak",
                ["Rare","Medium Rare","Medium","Medium Well","Well Done"]),
            cat("How much do you like C language",
                ["10","9","8","7","6","5","4","3","2","1"])
        ];
    }

    getPoll() {
        return {

        };
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
                        { (this.state.chosenCategory.length > 0) ? this.state.chosenCategory[0] : "iClicker" }
                        </Typography>
                    </Toolbar>
                </AppBar>
                <SideBar categories={this.state.categories}
                         chooseCategory={this.chooseCategory} 
                ></SideBar>
                <main className={classes.content}>
                    <Graph />
                </main>
            </div>
        </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);