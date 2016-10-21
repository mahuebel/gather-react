import React, { Component, PropTypes } from 'react';
import {ListItem} from 'material-ui/List';

import moment from 'moment';

//Gather Component --represents a single gather item
export default class Gather extends Component {
	render() {
		console.log(this.props)
		let date = moment(this.props.gather.start)
		return (
			<ListItem
			primaryText={this.props.gather.displayName() || "poop"}
			secondaryText={date.format("ddd MMM Do, h:mm:ss a")}
			/>
				
		);
	}
}

Gather.propTypes = {
	gather: PropTypes.object.isRequired,
}