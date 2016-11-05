import React, { Component, PropTypes } from 'react';

import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Subheader from 'material-ui/Subheader';
import SocialGroupAdd from 'material-ui/svg-icons/social/group-add';
import { lightBlueA400 } from 'material-ui/styles/colors.js';
// import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';

import Loading from '../components/Loading.jsx'; 
import UserItem from '../components/UserItem.jsx'; 
import GroupList from '../components/GroupList.jsx'; 

import { insert } from '../../api/invite-lists/methods.js';

import AddGroupsPage from './AddGroupsPage.jsx';




export default class GroupPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			editingList: false,
			search: '',
			groupUsers: []
		};
	}

	handleSearch = (event) => {
		this.setState({
			search: event.target.value
		})
	}

	renderGroups() {
		let { inviteLists } = this.props
		let { search } = this.state

		let filteredLists = inviteLists.filter(
			(list) => {
				return (list.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
			}	
		)


		if (!filteredLists || filteredLists.length === 0) {
			return (
	    		<div className="center-align">
	    			No groups yet. 
	    		</div>
	    	)
		}

		return filteredLists.map((list) => (
			<GroupList key={list._id} users={list.users()} name={list.name} onClick={this.onGroupSelect} />
		))
	}

	handleAddGroup = (event) => {
		event.preventDefault()

		let { groupUsers } = this.state

		let $inputs = $(event.target).find('input')
		let cFriendIds = groupUsers || []
  		let newInvites = []
  		let userIds = []

		let name = $inputs[0].value

		// iterate over all the form's inputs and on the checked ones, 
		// add them to the appropriate array
		for (var i=1; i<$inputs.length; i++) {
			let input = $inputs[i]
			let userId = input.value.split("user-")[1]
			if (input.checked) {
				if (userIds.indexOf(userId) === -1) {
					userIds.push(userId)
				}
				if (newInvites.indexOf(userId) === -1
						&& cFriendIds.indexOf(userId) === -1) {
					newInvites.push(userId)
				}
			} else {
				if (userIds.indexOf(userId) > -1) {
					userIds.splice(userId)
				}
			}
		}

		let addGroupObj = {
			name,
			userIds,
		}

		insert.call(addGroupObj)

		this.setState({
			groupUsers: []
		})

		this.toggleAddGroup()
	}

	toggleAddGroup = () => {
		let { editingList } = this.state
  		if (editingList === null || editingList === undefined) {
			editingList = false
		}
		this.setState({editingList: !editingList})
	}

	onGroupSelect = (event) => {
		console.log('woooo selected group!')
		console.log(event)
		console.log(event.target)

		//Add groupUsers (ids) to state
		// this.setState({
		// 	groupUsers: 
		// })

	}

	onComponentWillMount() {

	}

	render() {
		let { loading, currentUser, friends, users } = this.props
		let { editingList, groupUsers, search } = this.state

		if (loading) {
			return <Loading />
		}

		if (editingList) {
			return <AddGroupsPage
				currentUser={currentUser}
				friends={friends}
				groupUsers={groupUsers}
				onDone={this.handleAddGroup}
				onCancel={this.toggleAddGroup}	
			/>
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
			    	<Subheader>Groups</Subheader>
			    	{this.renderGroups()}
			    </List>
			    <FloatingActionButton 
		            style={styles.fab}
		            onTouchTap={this.toggleAddGroup}
		            backgroundColor={lightBlueA400}
		        >
		            <SocialGroupAdd />
		        </FloatingActionButton>
	    	</div>
	    )

	}
} 

GroupPage.propTypes = {
	loading: React.PropTypes.bool,
	currentUser: React.PropTypes.object,
	inviteLists: React.PropTypes.array,
	friends: React.PropTypes.array,
	users: React.PropTypes.array
}