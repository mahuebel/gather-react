import React, { Component, PropTypes } from 'react';

import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import MapsPlace from 'material-ui/svg-icons/maps/place';

import moment from 'moment';

//Gather Component --represents a single gather item
export default class Gather extends Component {
	render() {
		// console.log(this.props)
		let date    = moment(this.props.gather.start)
		// let loc     = this.props.gather.loc

		// let latTrans = .0007312 + loc.coordinates[0]
		// let lngTransZ14 = .0192011 + loc.coordinates[1]
  //       let lngTransZ13 = .035000 + loc.coordinates[1]

		// let mapType = "&maptype=roadmap";
  //       let url     = "http://maps.google.com/maps/api/staticmap?center=" + latTrans + "," + lngTransZ13 +
  //                   "&zoom=13&size=100x100"+mapType+"&scale=2&sensor=false&markers=color:0x6069BC%7C"
  //                    + loc.coordinates[0] + "," + loc.coordinates[1] 
  //                    + "&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0xDEDEEC%7Cvisibility:on";

		return (
			<ListItem
			leftIcon={<MapsPlace />}
			primaryText={this.props.gather.displayName() || "poop"}
			secondaryText={date.format("ddd MMM Do, h:mm a")}
			/>
				
		);
	}
}

Gather.propTypes = {
	gather: PropTypes.object.isRequired,
}