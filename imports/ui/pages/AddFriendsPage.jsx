import React, { Component, PropTypes } from 'react';

//Material UI Components
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
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
		this.state = {
			search: ''
		}
	}

	handleSearch = (event) => {
  		this.setState({
  			search: event.target.value
  		})
  	}

	renderUsers() {
	    let { users, currentUser } = this.props
	    let { search } = this.state

	    let filteredUsers  = users.filter(
	    	(user) => {
	    		return (user.profile ? user.profile.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 : user.username.toLowerCase().indexOf(search.toLowerCase()) !== -1)
	    	}
	    )

	    if (!filteredUsers|| filteredUsers.length === 0) {
	    	return (
	    		<div className="center-align">
	    			No users yet. 
	    		</div>
	    	)
	    }

	    let list = currentUser.friendsList || []

	    return filteredUsers.map((user) => (
	        <SelectableUserItem 
	          key={user._id} 
	          user={user}
	          checked={(list.indexOf(user._id) > -1)}
	          onSelect={this.handleUserSelect} 
	        />
	    ));
	}

	render() {
	    let { search } = this.state
		return (
	      <div className="container">
	      	<TextField
					hintText="Search..."
					fullWidth={true}
					value={search}
					onChange={this.handleSearch}
			/>
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