import React, { Component, PropTypes } from 'react';

import { Router, Link } from 'react-router'
// import { toggleAttendee } from '../../api/gathers/methods.js';

import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import UserItem from '../components/UserItem.jsx'; 


import ActionList from 'material-ui/svg-icons/action/list';

export default class SelectableInviteListItem extends Component {
	constructor(props) {
		super(props)

	}
	render() {
		let { list } = this.props

		let users = list.users()

		let userItems = []

	    for (var i=0; i<users.length; i++) {
	    	userItems.push(
	    		<UserItem 
	          		key={users[i]._id} 
	          		user={users[i]} 
	        	/>
	        )
	    }

	    console.log(users)
	    console.log(userItems)

		return (
			<div>
				<ListItem
					leftCheckbox={ <Checkbox value={'list-'+list._id} /> }
					primaryText={list.name}
					nestedItems={userItems}
					initiallyOpen={true}
					primaryTogglesNestedList={true}
					rightIcon={ <ActionList />}
				/>
				<Divider />
			</div>
		);
	}
}

