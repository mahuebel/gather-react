import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Tracker from 'tracker-component';
// import { Accounts, STATES } from 'meteor/std:accounts-material';
import { Accounts, STATES } from 'meteor/zetoff:accounts-material-ui';

import { Gathers } from '../../api/gathers/gathers.js';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

 
import NavBar from '../components/NavBar.jsx';
import DrawerMenu from '../components/DrawerMenu.jsx';
import Main from '../pages/Main.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Loading from '../components/Loading.jsx';


 
export default class App extends Tracker.Component {
	constructor(props) {
		super(props);

		this.autorun(() => {
			this.setState({
				isAuthenticated: Meteor.user(),
			});
		})
		this.state = {
			menuOpen: false,
		};
	}

	isLoggedIn() {
		return this.props.currentUser != undefined
	}

	handleLogout = () => {
		Meteor.logout()
		// browserHistory.push('/auth/signin')
	}

	handleDrawerToggle = () => {
		Session.set('menuOpen', !Session.get('menuOpen'));
	}

  	handleDrawerClose = () => this.setState({drawerOpen: false});

	

	componentWillMount() {
		// Check that the user is logged in before the component mounts
		let { currentUser } = this.props
		if (!currentUser) {
			// this.context.router.push('/signin');
		}
	}

	componentDidUpdate() {
	    // Navigate to a sign in page if the user isn't authenticated when data changes
	    // if (!this.state.isAuthenticated) {
	    //   browserHistory.push('/signin');
	    // }
	  }

	render() {

		

		let { currentUser } = this.props

		return (
			<MuiThemeProvider>
				<div>
					<NavBar 
						handleDrawerToggle={this.handleDrawerToggle} 
						onLogOut={this.handleLogout} 
					/>
					<DrawerMenu 
					onClose={this.handleDrawerClose}
					onToggle={this.handleDrawerToggle} 
					/>
					<div className="main-container">
						{this.props.children || "Welcome to Gather"}
					</div>
				</div>
				
			</MuiThemeProvider>

		);
	}
}

					// <div className="main-container">
					// 	{currentUser ? 
					// 	<Main gathers={gathers} currentUser={currentUser} />
					// 	: 
					// 	<div className="container">
					// 		<Accounts.ui.LoginForm formState={STATES.SIGN_IN} /> 
					// 	</div>
					// 	}
					// </div>

App.propTypes = {
	currentUser: React.PropTypes.object,
};

App.contextTypes = {
  router: React.PropTypes.object,
};