import React, { Component, PropTypes } from 'react';

//Gather Component --represents a single gather item
export default class Gather extends Component {
	render() {
		return (
			<li>{this.props.gather.type}</li>
		);
	}
}

Gather.propTypes = {
	gather: PropTypes.object.isRequired,
}