import React, { Component, PropTypes } from 'react';

//Gather Component --represents a single gather item
export default class Gather extends Component {
	render() {
		console.log(this.props)
		return (
			<li>{this.props.gather.locationName || "poop"}</li>
		);
	}
}

Gather.propTypes = {
	gather: PropTypes.object.isRequired,
}