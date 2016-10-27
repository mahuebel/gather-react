import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

// import { Accounts, STATES } from 'meteor/std:accounts-material';
import { Accounts, STATES } from 'meteor/zetoff:accounts-material-ui';
import AuthPage from './AuthPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class SignInPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const content = (
      <MuiThemeProvider>
        <div className="container">
          <Accounts.ui.LoginForm formState={STATES.SIGN_IN} />
        </div>
      </MuiThemeProvider>
    );

    const link = (
      <div className="center-align">
        <Link to="/signup" className="link-auth-alt">
          Need an account? Join Now.
        </Link>
      </div>
    );

    return <AuthPage content={content} link={link} />
  }
}

SignInPage.contextTypes = {
  router: React.PropTypes.object,
};
