import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Gathers } from '../api/gathers.js';

// import GooglePlaces from 'react-google-places-suggest';

import Gather from './Gather.jsx';
import PlacePicker from './components/PlacePicker.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DateTimePickers from './components/DateTimePickers.jsx';
import NavBar from './components/NavBar.jsx';

const Place = ({prediction, onClick}) => {
    return (
      <div onClick={onClick.bind(this, prediction.description)} className='item-component'>
        {prediction.description}
      </div>
    )
}
 
// const Places = function({onClickPlace}) {
//   return <GooglePlaces
//     options={{input: 'wrapTX'}}
//     itemComponent={Place}
//     itemProps={{onClick: onClickPlace}} />
// }


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
						<MuiThemeProvider>
							<DateTimePickers />
						</MuiThemeProvider>
						<PlacePicker />
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