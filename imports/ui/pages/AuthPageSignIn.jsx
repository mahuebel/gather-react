import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import AuthPage from './AuthPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { lightBlue900 } from 'material-ui/styles/colors.js';

export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
  } 

  onSubmit(event) {
    event.preventDefault();
    console.log(this)
    const username = this.username.input.value;
    const password = this.password.input.value;
    const errors = {};

    if (!username) {
      errors.username = "Username Required"
    }
    if (!password) {
      errors.password = "Password Required"
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      }
      this.context.router.push('/');
    });
  }

  onComponentWillMount() {
    this.setState({ errors: {} });
  }

  handleFacebookLogin(event) {
    Meteor.loginWithFacebook({
      requestPermissions: [/*'user_friends',*/ 'public_profile', 'email']
    }, (err) => {
      if (err) {
        // handle error
        this.setState({
          errors: { none: err.reason },
        });
      } else {
        // successful login!
        this.context.router.push('/');
      }
    });
  }

  render() {
    console.log("render() AuthPageSignin", this.state)
    const errors = this.state ? this.state.errors : {};
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const content = (
      <div>
      <MuiThemeProvider>
        <div className="container">
          <h1 className="title-auth">
            Sign In.
          </h1>
          <p className="subtitle-auth">
            Sign in to gather with your friends!
          </p>
          <form onSubmit={this.onSubmit}>
            <div className="list-errors">
              {errorMessages.map(msg => (
                <div className="list-item" key={msg}>{msg}</div>
              ))}
            </div>
            <div className={`input-symbol ${errorClass('username')}`}>
              <TextField
                hintText="Your username"
                ref={(c) => { this.username = c; }}
                fullWidth={true}
              />
            </div>
            <div className={`input-symbol ${errorClass('password')}`}>
              <TextField
                hintText="Your Password"
                type="password"
                ref={(c) => { this.password = c; }}
                fullWidth={true}
              />
            </div>
            <RaisedButton label="Sign in" type="submit" primary={true} />
          </form>
          <div className="facebook-login">
            Or Login with: <br />
            <RaisedButton label="Facebook" backgroundColor={lightBlue900} onTouchTap={this.handleFacebookLogin} primary={true} />
          </div>
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
