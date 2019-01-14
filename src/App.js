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
import Poll from './Poll';


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
        this.poll = new Poll();

        let f_categories = this.data.getCategories();
        let f_chosenCategory = f_categories[0];
        let f_poll = this.poll.getPoll();

        this.state = {
            categories: f_categories,
            chosenCategory: f_chosenCategory,
            poll: f_poll,
            parsedResult: this.data.getParsedResult(f_chosenCategory, f_poll)
        };

        this.chooseCategory = this.chooseCategory.bind(this);
    }



    chooseCategory(category) {
        this.setState({ 
            chosenCategory: [category],
            parsedResult: this.data.getParsedResult(category)
        });
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
                    <div className={classes.toolbar} />
                    <Graph parsedResult={this.state.parsedResult} />
                </main>
            </div>
        </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);