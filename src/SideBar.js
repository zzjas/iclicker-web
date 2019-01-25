import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const styles = theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    }
});


class SideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
        }
    }

    render() {
        let titles = [];
        for(let catId in this.props.categories) {
            titles.push(this.props.categories[catId].title)
        }

        return(
            <div>
                <SwipeableDrawer
                    open={this.props.drawerOpen}
                    onClose={() => {
                        this.props.handleDrawer(false)
                    }}
                    onOpen={() => {
                        this.props.handleDrawer(true)
                    }}
                >
                        <List>
                            {titles.map((title, index) => (
                                <ListItem
                                    button
                                    key={title}
                                    selected={this.state.selectIdx === index}
                                    onClick={(event) => {
                                            this.props.chooseCategory(index);
                                            this.setState({selectIdx: index});
                                    }}
                                >
                                    <ListItemText primary={title} />
                                </ListItem>
                            ))}
                        </List>
                </SwipeableDrawer>
            </div>
        );
    }
}


export default withStyles(styles, { withTheme: true })(SideBar);