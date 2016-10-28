import React, { Component, PropTypes } from 'react';

import { toggleAttendee } from '../../api/gathers/methods.js';
import { Router, Link } from 'react-router'

import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MapsPlace from 'material-ui/svg-icons/maps/place';

import ActionFavoriteBorder  from 'material-ui/svg-icons/action/favorite-border';
import ActionFavorite  from 'material-ui/svg-icons/action/favorite';

import { pinkA200, pink100, lightBlueA400 } from 'material-ui/styles/colors.js';

import moment from 'moment';

//Gather Component --represents a single gather item
export default class Gather extends Component {
	constructor(props) {
		super(props)
		this.handleFav = this.handleFav.bind(this)
		this.handleClick = this.handleClick.bind(this)
		let gather = this.props.gather

		this.state = {
			isFav: (gather.attendees.indexOf(this.props.currentUser._id) > -1)
		}
	}

	handleFav = () => {
		let updateObject = {
			gatherId: this.props.gather._id,
    		attendeeId: this.props.currentUser._id,
		}
		toggleAttendee.call(updateObject)
	}

	handleClick = () => {

		this.context.router.push(`gather/${this.props.gather._id}`)
	}

	render() {
		// console.log(this.props)
		let date    = moment(this.props.gather.start)

  		const favButton = (
			<ActionFavoriteBorder 
			  	onTouchTap={this.handleFav}
			  	color={pink100} 
			  	hoverColor={pinkA200}
		    />
		);

		const favFilled = (
			<ActionFavorite 
			  	onTouchTap={this.handleFav}
			  	color={pink100} 
			  	hoverColor={pinkA200}
		    /> 
		);

		return (
			<div>
					<ListItem
						leftIcon={<MapsPlace />}
						onTouchTap={this.handleClick}
						primaryText={this.props.gather.displayName() || "poop"}
						secondaryText={date.format("ddd MMM Do, h:mm a")}
						rightIconButton={ this.state.isFav ? favFilled : favButton}
					/>
					<Divider />
			</div>
		);
	}
}

Gather.propTypes = {
	gather: PropTypes.object.isRequired,
}

Gather.contextTypes = {
  router: React.PropTypes.object,
};