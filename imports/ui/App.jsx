import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data'

import { Gathers } from '../api/gathers.js';

import Gather from './Gather.jsx';

class App extends Component {
	renderGathers() {
		return this.props.gathers.map((gather) => (
				<Gather key={gather._id} gather={gather} />
			));
	}

	render() {
		return (
			<div className="container">
				<header>

				</header>

				<ul>
					{this.renderGathers()}
				</ul>
			</div>
		);
	}
}

App.propTypes = {
	gathers: PropTypes.array.isRequired,
};

export default createContainer(() => {
	return {
		gathers: Gathers.find({}).fetch(),
	};
}, App);