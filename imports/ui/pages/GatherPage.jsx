import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { inviteMany, inviteList, toggleAttendee } from '../../api/gathers/methods.js';
import { Gathers } from '../../api/gathers/gathers.js';

import NotFoundPage from '../pages/NotFoundPage.jsx';

import UserItem from '../components/UserItem.jsx'; 
import Loading from '../components/Loading.jsx'; 
import InvitationPage from '../components/InvitationPage.jsx'; 


import FloatingActionButton from 'material-ui/FloatingActionButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {Card, CardMedia, CardTitle, CardActions, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

import SocialGroupAdd from 'material-ui/svg-icons/social/group-add';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import ActionFavoriteBorder  from 'material-ui/svg-icons/action/favorite-border';
import ActionFavorite  from 'material-ui/svg-icons/action/favorite';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { pink100, pinkA200, lightBlueA400 } from 'material-ui/styles/colors.js';


export default class GatherPage extends Component {
	constructor(props) {
		super(props);
		let { isFav } = this.props

		this.state = { 
			editingGather: false, 
			isFav: isFav, 
		};
	}

	renderAttendees() {
		let filteredUsers = this.props.gather.attendingUsers();

		return filteredUsers.map((user) => (
				<UserItem key={user._id} user={user} currentUser={this.props.currentUser} />
			));
	}

	renderInvited() {
		let { gather } = this.props

		let filteredUsers = gather.invitedUsers();
		let attendingUsers = gather.attendees

		return filteredUsers.map((user) => (
				<UserItem key={user._id} user={user} currentUser={this.props.currentUser} />
			));
	}

	toggleInvitation = () => {
		let { editingGather } = this.state
		if (editingGather === null || editingGather === undefined) {
			editingGather = false
		}
		this.setState({editingGather: !editingGather})
	}

	handleFav = () => {
		let { isFav } = this.state
		this.setState({isFav: !isFav})

		let updateObject = {
			gatherId: this.props.gather._id,
    		attendeeId: this.props.currentUser._id,
		}
		toggleAttendee.call(updateObject)
	}

	handleInvitation = (event) => {
		event.preventDefault()
		let { gather, currentUser } = this.props

		let newInvites = []
		let listInvites = []
		let $inputs = $(event.target).find('input')

		// iterate over all the form's inputs and on the checked ones, 
		// add them to the appropriate array
		for (var i=0; i<$inputs.length; i++) {
			let input = $inputs[i]
			if (input.checked) {
				if (input.value.indexOf("user-") > -1) {
					// its a user!
					let userId = input.value.split("user-")[1]

					if (newInvites.indexOf(userId) === -1
							&& gather.invited.indexOf(userId) === -1) {
						newInvites.push(userId)
					}
				}
				else {
					// its a list!
					let listId = input.value.split("list-")[1]
					if (listInvites.indexOf(listId) === -1) {
						listInvites.push(listId)
					}
				}
			}

		}

		// call the method to add the new list of invitees
		if (newInvites.length > 0){
			inviteMany.call({
				gatherId: gather._id,
				inviteeIds: newInvites,
				userId: currentUser._id
			})
		}

		// call the method to invite a whole list, 
		// one list at a time
		if (listInvites.length > 0) {
			for(var j=0; j<listInvites.length; j++) {
				inviteList.call({
					gatherId: gather._id,
				    inviteListId: listInvites[j],
				    userId: currentUser._id
				})
			}
		}

		this.toggleInvitation()
	}

	componentWillMount() {
	    let { gather, loading, currentUser } = this.props;
	    if (!loading) {
			let isFav = (gather.attendees.indexOf(currentUser._id) > -1)
		    this.setState({isFav})
		}
	}

  	render() {
	    let { gather, loading, currentUser } = this.props;

	    let { editingGather } = this.state

	    if (loading) { return <Loading /> }

	    if (!gather) {
			return <NotFoundPage />
		}

		let isFav = (gather.attendees.indexOf(currentUser._id) > -1)

		if (editingGather) { 
			let { inviteLists } = this.props
			console.log(currentUser)
			let friends = Meteor.users.find({}).fetch()
			console.log(friends)
			return (
				<MuiThemeProvider>
					<InvitationPage 
						currentUser={this.props.currentUser}
						invited={gather.invited} 
						friends={friends}
						inviteLists={inviteLists}
						onDone={this.handleInvitation} 
						onCancel={this.toggleInvitation}
					/> 
				</MuiThemeProvider>
			);
		}


	    let loc     = gather.loc

		let latTrans = .0007312 + loc.coordinates[0]
		let lngTransZ14 = .0192011 + loc.coordinates[1]
	    let lngTransZ13 = .035000 + loc.coordinates[1]

		let mapType = "&maptype=roadmap";
	    let url     = "http://maps.google.com/maps/api/staticmap?center=" 
	    			  + loc.coordinates[0] + "," + loc.coordinates[1] +
	                  "&zoom=14&size=600x250&key=AIzaSyCbhTFXENjzhlS2P4nQyHlyRwqhzkeToSs"
	                  +mapType+"&scale=2&sensor=false&markers=color:0x03A9F4%7C"
	                 + loc.coordinates[0] + "," + loc.coordinates[1] 
	                 + "&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0xE1F5FE%7Cvisibility:on";
	    // if (!listExists) {
	    //   return <NotFoundPage />;
	    // }
	    let splitPlace = gather.place.split(",")[0]

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
			<MuiThemeProvider>
				<div>
					<div className="page gather-show container">
						<Card>
							<CardMedia>
								<img src={url} />
							</CardMedia>
							<CardTitle title={gather.displayName()} />
							<CardActions>
								<Checkbox
							      checkedIcon={<ActionFavorite />}
							      uncheckedIcon={<ActionFavoriteBorder />}
							      label="Count me in!"
							      checked={this.state.isFav}
							      onCheck={this.handleFav}
							      inputStyle={{color: "#03A9F4"}}
							    />
							</CardActions>
						</Card>

						<List>
							<Subheader>Attendees</Subheader>
							{this.renderAttendees()}
							<Divider />
							<Subheader>Invited</Subheader>
							{this.renderInvited()}
						</List>
					</div>
					<FloatingActionButton 
			            style={styles.fab}
			            onTouchTap={this.toggleInvitation}
			            backgroundColor={lightBlueA400}
			        >
			            <SocialGroupAdd />
			        </FloatingActionButton>
		        </div>
			</MuiThemeProvider>
	    );
  	}	
}

GatherPage.propTypes = {
  gather: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  inviteLists: React.PropTypes.array,
  isFav: React.PropTypes.bool,
  // attendees: React.PropTypes.object,
  // invited: React.PropTypes.object,
  loading: React.PropTypes.bool,
  // listExists: React.PropTypes.bool,
};

