import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Gathers } from '../api/gathers/gathers.js';

import {List} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Gather from './Gather.jsx';
import Pickers from './components/Pickers.jsx';
import NavBar from './components/NavBar.jsx';

import MapsNearMe from 'material-ui/svg-icons/maps/near-me';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';


import { lightBlue700 } from 'material-ui/styles/colors.js';
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

	    let tab = this.state.selectedTab ;

		filteredGathers = filteredGathers.filter(gather => { 
			if (tab === "SCHEDULE") {
				return true
			} else {
				return gather.type === tab
			}
		});

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
				background: lightBlue700,
				zIndex: 1
			},
			tabItem: {
				paddingTop: "48px",
				zIndex: 0
			},
			inkBar: {
				position: "fixed",
				zIndex: 3,
				top: "112px",
				bottom: "auto"
			}
		}

		return (
			<MuiThemeProvider>
				<div>
					<NavBar />
					<div className="tabs">
						{ this.props.currentUser ?
							<div>
								<Pickers /> 
								<Tabs
							        value={this.state.selectedTab}
							        onChange={this.onTabChange}
							        tabItemContainerStyle={styles.tabs}
							        inkBarStyle={styles.inkBar}
							        contentContainerStyle={styles.tabItem}
							    >
									<Tab icon={<ContentInbox />} value="PRIVATE" >
										<div className="tab container">
											<div className="gathers-list">
												<List>	
													{this.renderGathers()}
												</List>
											</div>
										</div>
									</Tab>
									<Tab icon={<MapsNearMe />} value="PUBLIC" >	
										<div className="tab container">
											<div className="gathers-list">
												<List>	
													{this.renderGathers()}
												</List>
											</div>
										</div>
									</Tab>
									<Tab icon={<ActionFavorite />} value="SCHEDULE" >	
										<div className="tab container">   
											<div className="gathers-list">
												<List>	
													{this.renderGathers()}
												</List>
											</div>
										</div>
									</Tab>
								</Tabs>
								</div> : ''
						}
					</div>
					<AccountsUIWrapper />
				</div>
			</MuiThemeProvider>

		);
	}
}

App.propTypes = {
	gathers: PropTypes.array.isRequired,
};

export default createContainer(() => {
	return {
		gathers: Gathers.find({start: {$gte: new Date()}}, {sort: {start: 1}}).fetch(),
		currentUser: Meteor.user(),
	};
}, App);