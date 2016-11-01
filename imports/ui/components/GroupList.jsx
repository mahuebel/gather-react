import React, { Component, PropTypes } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ContentCreate from 'material-ui/svg-icons/content/create';

import UserItem from '../components/UserItem.jsx'; 

export default class GroupList extends Component {
	constructor(props) {
		super(props)
	}

	onComponentWillMount() {

	}

	render() {

		let { name, onClick, users } = this.props

		let userItems = []

	    for (var i=0; i<users.length; i++) {
	    	userItems.push(
	    		<UserItem 
	          		key={users[i]._id} 
	          		user={users[i]} 
	        	/>
	        )
	    }

		return (
			<div>
				<ListItem
					primaryText={name}
					leftIcon={<SocialGroup />}
					rightIcon={<ContentCreate />}
					nestedItems={userItems}
					primaryTogglesNestedList={true}
					onTouchTap={onClick}
				/>
			</div>	
		)
	}
}

GroupList.propTypes = {
	users: React.PropTypes.array,
}