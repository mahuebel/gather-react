import React, { Component, PropTypes } from 'react';

import { Gathers } from '../../api/gathers/gathers.js';

import NotFoundPage from '../pages/NotFoundPage.jsx';

import UserItem from '../components/UserItem.jsx'; 

import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class GatherPage extends Component {
	constructor(props) {
		super(props);
		this.state = Object.assign(this.state||{}, { editingGather: null });
	}

	renderAttendees() {
		/*
		let attendees = this.props.attendees;

		return attendees.map((user) => (
				<UserItem key={user._id} user={user} currentUser={this.props.currentUser} />
			));
		*/

		let filteredUsers = this.props.gather.attendingUsers();

		return filteredUsers.map((user) => (
				<UserItem key={user._id} user={user} currentUser={this.props.currentUser} />
			));
	}


  	render() {
	    let { gather } = this.props;

	    console.log(gather)
	    console.log(this.props)


	    if (!gather) {
			return <NotFoundPage />
		}

	    let loc     = gather.loc

		let latTrans = .0007312 + loc.coordinates[0]
		let lngTransZ14 = .0192011 + loc.coordinates[1]
	    let lngTransZ13 = .035000 + loc.coordinates[1]

		let mapType = "&maptype=roadmap";
	    let url     = "http://maps.google.com/maps/api/staticmap?center=" + loc.coordinates[0] + "," + loc.coordinates[1] +
	                "&zoom=14&size=600x250&key=AIzaSyAE50jz2KcryNZuELh4WCBGqCagnBU6MZI"+mapType+"&scale=2&sensor=false&markers=color:0x6069BC%7C"
	                 + loc.coordinates[0] + "," + loc.coordinates[1] 
	                 + "&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0xDEDEEC%7Cvisibility:on";
     	console.log(url)
	    // if (!listExists) {
	    //   return <NotFoundPage />;
	    // }
	    let splitPlace = gather.place.split(",")[0]

	    return (
			<MuiThemeProvider>
				<div className="page gather-show">
					<Card>
						<CardMedia>
							<img src={url} />
						</CardMedia>
						<CardTitle title={gather.displayName()} />
					</Card>
					<List>
						{this.renderAttendees()}
					</List>
				</div>
			</MuiThemeProvider>
	    );
  	}	
}

GatherPage.propTypes = {
  gather: PropTypes.object.isRequired,
  // attendees: React.PropTypes.object,
  // invited: React.PropTypes.object,
  // loading: React.PropTypes.bool,
  // listExists: React.PropTypes.bool,
};

