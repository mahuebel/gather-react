import React, {Component} from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Drawer from 'material-ui/Drawer';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';



import { lightBlue800 } from 'material-ui/styles/colors.js';


class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Sign out" onTouchTap={props.onLogOut} />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class NavBar extends Component {
  state = {
    // logged: (this.props.currentUser != undefined),
    logged: this.props.isLoggedIn
  };


  render() {
    return (
      <div>
        <AppBar
          title="Gather"
          style={{position: 'fixed', background: lightBlue800}}
          className="nav-bar"
          onLeftIconButtonTouchTap={this.props.handleDrawerToggle}
          iconElementRight={this.props.isLoggedIn ? <Logged {...this.props} /> : <Login />}
        />
      </div>
    );
  }
}

export default NavBar;