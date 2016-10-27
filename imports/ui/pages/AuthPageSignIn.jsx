import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

// import { Accounts, STATES } from 'meteor/std:accounts-material';
import { Accounts } from 'meteor/accounts-ui';
// import { Accounts, STATES } from 'meteor/zetoff:accounts-material-ui';
import AuthPage from './AuthPage.jsx';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class SignInPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const content = (
      <div>
      <MuiThemeProvider>
        <div className="container">
          <AccountsUIWrapper />
        </div>
      </MuiThemeProvider>
      </div>
    );

    const link = (
      <div className="center-align">
        <Link to="/signup" className="link-auth-alt">
          Need an account? Join Now.
        </Link>
      </div>
    );

    return (
      <div className="signin-page">
        <AuthPage content={content} link={link} />
      </div>
      );
  }
}

SignInPage.contextTypes = {
  router: React.PropTypes.object,
};

// <Accounts.ui.LoginForm formState={STATES.SIGN_IN} />
