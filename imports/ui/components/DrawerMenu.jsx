import React, { Component, PropTypes } from 'react';

import { Session } from 'meteor/session';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import { browserHistory } from 'react-router';



import ActionAllOut from 'material-ui/svg-icons/action/all-out';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialPeopleOutline from 'material-ui/svg-icons/social/people-outline';

export default class DrawerMenu extends Component {
	constructor(props) {
		super(props)
		Session.set('menuOpen', false)
	}

	toggleMenu() {
	    Session.set('menuOpen', !Session.get('menuOpen'));
	  }

	  handleSignIn = () => {
	  	browserHistory.push('signin')
	  }

	  handleGoHome = () => {
	  	browserHistory.push('/')
	  }

	render() {
		return (
			<div>
				<Drawer
				docked={false}
				width={280}
				open={Session.get('menuOpen')}
				onRequestChange={(menuOpen) => Session.set('menuOpen', menuOpen)}
				>
					<MenuItem onTouchTap={this.handleGoHome} leftIcon={ <ActionHome /> }>Home</MenuItem>
					<MenuItem onTouchTap={this.props.onClose} leftIcon={ <SocialPeople /> }>Friends</MenuItem>
					<MenuItem onTouchTap={this.props.onClose} leftIcon={ <SocialPeopleOutline /> }>Groups</MenuItem>
					<Divider />
					<MenuItem onTouchTap={this.props.onClose} leftIcon={ <ActionAllOut /> }>Radius</MenuItem>
					<Divider />
					<MenuItem onTouchTap={this.handleSignIn} rightIcon={ <SocialPerson /> }>Sign in</MenuItem>
		        </Drawer>
			</div>
		);
	}
}


DrawerMenu.contextTypes = {
  router: React.PropTypes.object,
};
// DrawerMenu.propTypes = {
// 	gather: PropTypes.object.isRequired,
// }