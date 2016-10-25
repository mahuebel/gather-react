import React, { Component, PropTypes } from 'react';

import { Gathers } from '../../api/gathers/gathers.js';
import { Session } from 'meteor/session';

import {List} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';

import Gather from '../components/Gather.jsx';
import Pickers from '../components/Pickers.jsx';
import NavBar from '../components/NavBar.jsx';
import DrawerMenu from '../components/DrawerMenu.jsx';

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
 
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: "PRIVATE",
			menuOpen: false
		};
	}

	renderGathers() {
		// console.log(this.props)

		let filteredGathers = this.props.gathers;

	    let tab = this.state.selectedTab ;

		filteredGathers = filteredGathers.filter(gather => { 
			let attendees = gather.attendees || []
			let invited   = gather.invited || []

			let isAttending = (attendees.indexOf(this.props.currentUser._id) > -1)
			let isInvited = (invited.indexOf(this.props.currentUser._id) > -1)

			if (tab === "SCHEDULE") {
				return isAttending
			} else {
				if (tab === "PRIVATE") {
					return (gather.type === tab && !isAttending && isInvited)
				} else { 
					return (gather.type === tab && !isAttending)
				}
			}
		});

		return filteredGathers.map((gather) => (
				<Gather key={gather._id} gather={gather} currentUser={this.props.currentUser} />
			));
	}

	isLoggedIn() {
		return this.props.currentUser != undefined
	}

	handleLogout = () => {Meteor.logout()}

	handleDrawerToggle = () => {
		Session.set('menuOpen', !Session.get('menuOpen'));
	}

  	handleDrawerClose = () => this.setState({drawerOpen: false});

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
					<NavBar 
						currentUser={this.props.currentUser} 
						handleDrawerToggle={this.handleDrawerToggle} 
						isLoggedIn={this.isLoggedIn}
						onLogOut={this.handleLogout} 
					/>
					<DrawerMenu 
					onClose={this.handleDrawerClose}
					onToggle={this.handleDrawerToggle} 
					/>
					<div className="tabs">
						{ this.props.currentUser ?
							<div>
								<Pickers /> 
								<Tabs
							        value={this.state.selectedTab}
							        onChange={this.onTabChange}
							        tabItemContainerStyle={styles.tabs}
							        inkBarStyle={styles.inkBar}
							        contentContainerStyle={styles.tabItem}>

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
				</div>
			</MuiThemeProvider>

		);
	}
}

App.propTypes = {
	gathers: React.PropTypes.array.isRequired,
};

App.contextTypes = {
  router: React.PropTypes.object,
};