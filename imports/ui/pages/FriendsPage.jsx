import React, { Component, PropTypes } from 'react';

//Material UI Components
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Subheader from 'material-ui/Subheader';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';

//Gather Components
import UserItem from '../components/UserItem.jsx'; 
import Loading from '../components/Loading.jsx'; 
import AddFriendsPage from './AddFriendsPage.jsx'
import { addFriends } from '../../api/users/methods.js';

import { pink100, pinkA200, lightBlueA400 } from 'material-ui/styles/colors.js';


export default class FriendsPage extends Component {
	constructor(props) {
		super(props)
		this.renderFriends = this.renderFriends.bind(this)

		this.state = {
			addingFriends: false,
			search: ''
		};
	}

    //actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
  	//subtitle={<span>by <b>{tile.author}</b></span>}

  	handleSearch = (event) => {
  		this.setState({
  			search: event.target.value
  		})
  	}

  	handleAddFriends = (event) => {
  		event.preventDefault()
  		let { currentUser } = this.props
  		let currentFriends = currentUser.friends()
  		let cFriendIds = currentUser.friendsList || []
  		let newInvites = []
  		let checkedUsers = []
		let $inputs = $(event.target).find('input')

		// iterate over all the form's inputs and on the checked ones, 
		// add them to the appropriate array
		for (var i=0; i<$inputs.length; i++) {
			let input = $inputs[i]
			let userId = input.value.split("user-")[1]
			if (input.checked) {
				if (checkedUsers.indexOf(userId) === -1) {
					checkedUsers.push(userId)
				}
				if (newInvites.indexOf(userId) === -1
						&& cFriendIds.indexOf(userId) === -1) {
					newInvites.push(userId)
				}
			} else {
				if (checkedUsers.indexOf(userId) > -1) {
					checkedUsers.splice(userId)
				}
			}

		}

		// call the method to add the new list of invitees
		// if (newInvites.length > 0){
		let addObj = {
			userId: currentUser._id,
			inviteeIds: newInvites,
			allFriends: checkedUsers
		}
		addFriends.call(addObj)
		// }

		this.toggleAddFriends()
  	}

  	toggleAddFriends = () => {
  		let { addingFriends } = this.state
  		if (addingFriends === null || addingFriends === undefined) {
			addingFriends = false
		}
		this.setState({addingFriends: !addingFriends})
  	}

	renderFriends() {
	    let { friends } = this.props
	    let { search } = this.state

	    let filteredFriends = friends.filter(
	    	(user) => {
	    		return (user.profile ? user.profile.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 : user.username.toLowerCase().indexOf(search.toLowerCase()) !== -1)
	    	}
	    )

	    if (!filteredFriends || filteredFriends.length === 0) {
	    	return (
	    		<div className="center-align">
	    			No friends yet. 
	    		</div>
	    	)
	    }

	    return filteredFriends.map((user) => (
	        <UserItem 
	          key={user._id} 
	          user={user}
	          onSelect={this.handleFriendSelect} 
	        />
	    ));
	}


	
	render() {

		let { loading, friends, users } = this.props
		let { addingFriends, search } = this.state

		if (loading) {
			return <Loading />
		}

		if (addingFriends) {
			let { users, friends, currentUser } = this.props
			return (

				<AddFriendsPage 
					currentUser={currentUser}
					friends={friends} 
					users={users}
					onDone={this.handleAddFriends} 
					onCancel={this.toggleAddFriends}
				/> 

			); 
		} 

		const styles = {
	      button: {
	        marginTop: 12,
	        marginRight: 12,
	        zIndex: 0,
	      },
	      fab: {
	        position: "fixed",
	        bottom: "45px",
	        right: "24px",
	        zIndex: 15,
	      },
	      dialog: {
	        width: '90%',
	        height: '100%',
	        maxWidth: 'none',
	      }
	    }

		return (
			<div className="container">
				<TextField
					hintText="Search..."
					fullWidth={true}
					value={search}
					onChange={this.handleSearch}
				/>
				<List>
			    	<Subheader>Friends</Subheader>
			    	{this.renderFriends()}
			    </List>
			    <FloatingActionButton 
		            style={styles.fab}
		            onTouchTap={this.toggleAddFriends}
		            backgroundColor={lightBlueA400}
		        >
		            <SocialPersonAdd />
		        </FloatingActionButton>
			</div>
		)

	}	
}

FriendsPage.propTypes = {
  currentUser: PropTypes.object,
  users: React.PropTypes.array,
  friends: React.PropTypes.array,
  inviteLists: React.PropTypes.array,
  loading: React.PropTypes.bool,

};