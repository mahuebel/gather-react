import React, { Component, PropTypes } from 'react';

//Material UI Components
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
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




export default class AddFriendsPage extends Component {
	constructor(props) {
		super(props)
		this.renderUsers = this.renderUsers.bind(this)
	}

	renderUsers() {
	    let { users, currentUser } = this.props

	    return users.map((user) => (
	        <SelectableUserItem 
	          key={user._id} 
	          user={user}
	          checked={(currentUser.friendsList.indexOf(user._id) > -1)}
	          onSelect={this.handleUserSelect} 
	        />
	    ));
	}

	render() {
		return (
	      <div className="container">
	        <form className="friend-invite" onSubmit={this.props.onDone}>
	          <List>
	            <Divider />
	            <Subheader>All Users</Subheader>
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

AddFriendsPage.propTypes = {
	users: React.PropTypes.array,
	currentUser: React.PropTypes.object,
	friends: React.PropTypes.array,

}