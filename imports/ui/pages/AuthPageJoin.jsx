import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
// import { Accounts, STATES } from 'meteor/std:accounts-material';
import { Accounts } from 'meteor/accounts-ui';
// import { Accounts, STATES } from 'meteor/zetoff:accounts-material-ui';
import AuthPage from './AuthPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class JoinPage extends Component {
  constructor(props) {
    super(props);
    console.log(this)
    console.log(this.props)
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
        <Link to="/signin" className="link-auth-alt">
          Have an account? Sign in
        </Link>
      </div>
    );

    return (
      <div className="join-page">
        <AuthPage content={content} link={link} />)
      </div>
      );
  }
}

JoinPage.contextTypes = {
  router: React.PropTypes.object,
};

// <Accounts.ui.LoginForm formState={STATES.SIGN_UP} />
