import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
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
    state = {
        mobileOpen: false,
        selectIdx: -1
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, theme } = this.props;

        let titles = this.props.categories.map(cat => cat.title);

        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <List>
                    { titles.map((title, index) => (
                        <ListItem 
                            button
                            key={title}
                            selected={this.state.selectIdx === index}
                            onClick={
                                (event) => {
                                    this.props.chooseCategory(index);
                                    this.setState({selectIdx: index});
                                }
                            }>
                            <ListItemText primary={title} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );


        return(
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
        );
    }
}


export default withStyles(styles, { withTheme: true })(SideBar);