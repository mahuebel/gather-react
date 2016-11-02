import React, { Component, PropTypes } from 'react';

import { Router, Link } from 'react-router'
// import { toggleAttendee } from '../../api/gathers/methods.js';

import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import ActionList from 'material-ui/svg-icons/action/list';

export default class SelectableInviteListItem extends Component {
	constructor(props) {
		super(props)

	}
	render() {
		let { list } = this.props
		return (
			<div>
				<ListItem
					leftCheckbox={ <Checkbox value={'list-'+list._id} /> }
					primaryText={list.name}
					rightIcon={ <ActionList />}
				/>
				<Divider />
			</div>
		);
	}
}

