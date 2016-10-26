import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

// import { Accounts, STATES } from 'meteor/std:accounts-material';
import { Accounts, STATES } from 'meteor/zetoff:accounts-material-ui';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    console.log(this)
    console.log(this.props)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <Accounts.ui.LoginForm state={STATES.SIGN_IN} />
        </div>
      </MuiThemeProvider>
    );
  }
}

SignInPage.contextTypes = {
  router: React.PropTypes.object,
};
