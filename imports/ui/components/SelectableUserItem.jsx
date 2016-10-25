import React, { Component, PropTypes } from 'react';

import { Router, Link } from 'react-router'
// import { toggleAttendee } from '../../api/gathers/methods.js';

import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import SocialPerson from 'material-ui/svg-icons/social/person';

export default class SelectableUserItem extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		let { user } = this.props
		let uProfile = user.profile
		let picUrl = uProfile ? uProfile.picture : ""
		return (
			<div>
				<ListItem
					leftCheckbox={ <Checkbox value={'user-'+user._id} /> }
					primaryText={uProfile ? uProfile.name : user.username}
					rightIcon={ <Avatar src={picUrl} />}
					onTouchTap={this.props.onSelect}

				/>
				<Divider />
			</div>
		);
	}
}

