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
		let uProfile = user.profile
		let picUrl = uProfile ? uProfile.picture : ""
		console.log(uProfile)
		console.log(user)
		return (
			<div>
				<ListItem
					leftIcon={<Avatar src={picUrl} />}
					primaryText={uProfile ? uProfile.name : user.username}
					rightIcon={ <SocialPerson />}
				/>
				<Divider />
			</div>
		);
	}
}