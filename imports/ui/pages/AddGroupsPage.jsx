import React, { Component, PropTypes } from 'react';

//Material UI Components
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';

//Gather Components
import SelectableUserItem from '../components/SelectableUserItem.jsx'; 
import Loading from '../components/Loading.jsx'; 

export default class AddGroupsPage extends Component {
	constructor(props) {
		super(props)
		this.renderUsers = this.renderUsers.bind(this)
	}

	renderUsers() {
	    let { friends, currentUser, groupUsers } = this.props

	    if (!friends|| friends.length === 0) {
	    	return (
	    		<div className="center-align">
	    			No friends yet. 
	    		</div>
	    	)
	    }

	    let list = groupUsers || []

	    return friends.map((user) => (
	        <SelectableUserItem 
	          key={user._id} 
	          user={user}
	          checked={(list.indexOf(user._id) > -1)}
	        />
	    ));
	}

	render() {
		return (
			<div className="container">
				<form className="add-invite-list" onSubmit={this.props.onDone}>
					<TextField
					hintText="Group Name"
					fullWidth={true}
					/>
					<List>
						<Divider />
						<Subheader>Friends</Subheader>
						{this.renderUsers()}
					</List>
					<div className="center-align">
						<FlatButton 
						label="Cancel"
						onTouchTap={this.props.onCancel}
						icon={ <NavigationClose /> }
						/>
						<FlatButton 
						label="Done"
						type="Submit"
						icon={ <NavigationCheck /> }
						/>
					</div>
				</form>
			</div>
	    );
	}
}

AddGroupsPage.propTypes = {
	currentUser: React.PropTypes.object,
	friends: React.PropTypes.array,
	groupUsers: React.PropTypes.array,
}