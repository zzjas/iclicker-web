import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
});

class BottomBar extends Component {
    constructor(props) {
        super(props);

        console.log(this.props)
    }
    render() {
        return (
            <div className={this.props.classes.root}>
                <AppBar position="fixed" color="primary" className={this.props.classes.appBar}>
                    <Toolbar className={this.props.classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={() => {
                                this.props.toggleDrawer()
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
                            {this.props.categoryId === -1 ? 'Iclicker-web' : this.props.categories[this.props.categoryId].title}
                        </Typography>

                        <Fab color="secondary" aria-label="Add" className={this.props.classes.fabButton}>
                            asdf
                        </Fab>

                        <Switch
                            checked={this.props.selectOne}
                            onChange={(event, checked) => {
                                this.props.setSelectOne(checked);
                            }}
                        />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(BottomBar);