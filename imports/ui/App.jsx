import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Gathers } from '../api/gathers/gathers.js';

import {List} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';

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
	constructor(props) {
		super(props);

		this.state = {
			selectedTab: "PRIVATE",
		};
	}

	renderGathers() {
		let filteredGathers = this.props.gathers;
	    // if (this.state.selectedTab) {
	    let conditional;

	      filteredGathers = filteredGathers.filter(gather => gather.type === this.state.selectedTab);
	    // }
		return filteredGathers.map((gather) => (
				<Gather key={gather._id} gather={gather} />
			));
	}

	onClickPlace(e) {
		console.log("you clicked this place: ", this)
		console.log("you clicked this place: ", e)
	}

	onTabChange = (value) => {

		// let selectedTab
		// switch(value){
		// 	case 0:
		// 		selectedTab = "PRIVATE"
		// 		break;
		// 	case 1: 
		// 		selectedTab = "PUBLIC"
		// 		break;
		// 	case 2: 
		// 		selectedTab = "SCHEDULE"
		// 		break;
		// }

    this.setState({
      selectedTab: value,
    });
  };

	render() {

		const styles = {
			tabs: {
				position: "fixed",
				zIndex: 1
			},
			tabItem: {
				paddingTop: "48px",
				zIndex: 0
			},
			inkBar: {
				position: "fixed",
				zIndex: 20,
				top: "112px",
				bottom: "auto"
			}
		}

		return (
			<div>
				<MuiThemeProvider>
					<NavBar />
				</MuiThemeProvider>

				<div className="tabs">
					<MuiThemeProvider>
						<Pickers /> 
              	</MuiThemeProvider>
              	<MuiThemeProvider>
						<Tabs
					        value={this.state.selectedTab}
					        onChange={this.onTabChange}
					        tabItemContainerStyle={styles.tabs}
					        inkBarStyle={styles.inkBar}
					        contentContainerStyle={styles.tabItem}
					    >
							<Tab label="Private" value="PRIVATE" >
								<div className="tab container">
									<div className="gathers-list">
										<List>	
											{this.renderGathers()}
										</List>
									</div>
								</div>
							</Tab>
							<Tab label="Public" value="PUBLIC" >	
								<div className="tab container">
									<div className="gathers-list">
										<List>	
											{this.renderGathers()}
										</List>
									</div>
								</div>
							</Tab>
							<Tab label="Schedule" value="SCHEDULE" >	
								<div className="tab container">   
									<div className="gathers-list">
										<List>	
											{this.renderGathers()}
										</List>
									</div>
								</div>
							</Tab>
						</Tabs>
					</MuiThemeProvider>
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