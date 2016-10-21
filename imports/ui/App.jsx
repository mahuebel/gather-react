import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Gathers } from '../api/gathers.js';


import Gather from './Gather.jsx';
import Pickers from './components/Pickers.jsx';
import NavBar from './components/NavBar.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const Place = ({prediction, onClick}) => {
    return (
      <div onClick={onClick.bind(this, prediction.description)} className='item-component'>
        {prediction.description}
      </div>
    )
}
 
class App extends Component {
	renderGathers() {
		return this.props.gathers.map((gather) => (
				<Gather key={gather._id} gather={gather} />
			));
	}

	onClickPlace(e) {
		console.log("you clicked this place: ", this)
		console.log("you clicked this place: ", e)
	}

	render() {
		return (
			<div>
				<MuiThemeProvider>
					<NavBar />
				</MuiThemeProvider>

				<div className="container">
					<header>
						<Pickers />
					</header>

					<ul>
						{this.renderGathers()}
					</ul>
				</div>
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