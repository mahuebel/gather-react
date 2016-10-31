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

		this.state = {
			checked: this.props.checked
		}
	}

	handleCheck = () => {
		let { checked } = this.state 
		this.setState({
			checked: !checked
		})
	}

	render() {
		let { user } = this.props
		let { checked } = this.state
		return (
			<div>
				<ListItem
					leftCheckbox={ <Checkbox value={'user-'+user._id} checked={checked} onCheck={this.handleCheck} /> }
					primaryText={user.displayName()}
					rightIcon={ <Avatar src={user.avatarUrl()} />}
					onTouchTap={this.props.onSelect}

				/>
				<Divider />
			</div>
		);
	}
}

SelectableUserItem.propTypes = {
	checked: React.PropTypes.bool,
}

