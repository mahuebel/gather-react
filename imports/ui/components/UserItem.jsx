import React, { Component, PropTypes } from 'react';

import { Router, Link } from 'react-router'
// import { toggleAttendee } from '../../api/gathers/methods.js';

import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import SocialPerson from 'material-ui/svg-icons/social/person';

export default class UserItem extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		let { user } = this.props
		// console.log(user.displayName())
		return (
			<div>
				<ListItem
					leftIcon={<Avatar src={user.avatarUrl()} />}
					primaryText={user.displayName()}
					rightIcon={ <SocialPerson />}
				/>
				<Divider />
			</div>
		);
	}
}