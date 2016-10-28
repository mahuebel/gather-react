import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import { Accounts } from 'meteor/accounts-base';

import AuthPage from './AuthPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { lightBlue500, lightBlue900 } from 'material-ui/styles/colors.js';

export default class JoinPage extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
  }

  onSubmit(event) {
    event.preventDefault();
    const username = this.username.input.value;
    const password = this.password.input.value;
    const confirm = this.confirm.input.value;
    const errors = {};

    if (!username) {
      errors.username = "Username Required"
    }
    if (!password) {
      errors.password = "Password Required"
    }

    if (confirm !== password) {
      errors.confirm = "Please confirm your password";
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Accounts.createUser({
      username,
      password,
    }, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      }
      this.context.router.push('/');
    });
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

  onComponentWillMount() {
    this.setState({ errors: {} });
  }

  render() {
    console.log("render() AuthPageJoin", this)
    const errors = this.state ? this.state.errors : {}
    console.log("errors", errors)

    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const styles = {
      button: {
        width: "256px",
        backgroundColor: lightBlue500,
        background: lightBlue500
      },
      facebook: {
        backgroundColor: lightBlue900,
        background: lightBlue900,
        width: "256px",

      }
    }

    const content = (
      <div>
      <MuiThemeProvider>
        <div className="container center-align">
          <form onSubmit={this.onSubmit}>
            <div className="list-errors">
              {errorMessages.map(msg => (
                <div className="list-item" key={msg}>{msg}</div>
              ))}
            </div>
            <div className={`input-symbol ${errorClass('username')}`}>
              <TextField
                hintText="Username"
                ref={(c) => { this.username = c; }}
              />
            </div>
            <div className={`input-symbol ${errorClass('password')}`}>
              <TextField
                hintText="Password"
                type="password"
                ref={(c) => { this.password = c; }}
              />
            </div>
            <div className={`input-symbol ${errorClass('confirm')}`}>
              <TextField
                hintText="Confirm Password"
                type="password"
                ref={(c) => { this.confirm = c; }}
              />
            </div>
            <div className="center-align">
              <RaisedButton label="Join" style={styles.button} type="submit" />
            </div>
          </form>
          <div className="facebook-login">
            <span>Or Login with:</span> <br />
            <RaisedButton label="Facebook" style={styles.facebook} onTouchTap={this.handleFacebookLogin} />
          </div>
        </div>
      </MuiThemeProvider>
      </div>
    );

    const link = (
      <div className="sign-in-toggle center-align">
        <Link to="/signin" className="link-auth-alt">
          Have an account? Sign in
        </Link>
      </div>
    );

    return (
      <div className="join-page">
        <AuthPage content={content} link={link} />
      </div>
      );
  }
}

JoinPage.contextTypes = {
  router: React.PropTypes.object,
};

