import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
// // import { Accounts, STATES } from 'meteor/std:accounts-material';
// import { Accounts } from 'meteor/accounts-ui';
// // import { Accounts, STATES } from 'meteor/zetoff:accounts-material-ui';
import Tracker from 'tracker-component';

import { Gathers } from '../../api/gathers/gathers.js';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import {List} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import Gather from '../components/Gather.jsx';
import Pickers from '../components/Pickers.jsx';
import Loading from '../components/Loading.jsx';

import MapsNearMe from 'material-ui/svg-icons/maps/near-me';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

import { lightBlue700 } from 'material-ui/styles/colors.js';


export default class Main extends Tracker.Component {
	constructor(props) {
		super(props)

		this.autorun(() => {
			this.setState({
				isAuthenticated: Meteor.user(),
				selectedTab: "PRIVATE",
				menuOpen: false,
			});
		})
		this.state = {
			selectedTab: "PRIVATE",
			menuOpen: false,
			slideIndex: 0,
		};
	}


	onTabChange = (value) => {

		let selectedTab
		switch(value){
			case 0:
				selectedTab = "PRIVATE"
				break;
			case 1: 
				selectedTab = "PUBLIC"
				break;
			case 2: 
				selectedTab = "SCHEDULE"
				break;
		}

	    this.setState({
	      selectedTab,
	      slideIndex: value,
	    });
  	};


  	renderGathers() {

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

	componentWillMount() {
		// Check that the user is logged in before the component mounts
		if (!this.props.currentUser) {
			browserHistory.push('/signin');
		}
	}

	componentDidUpdate() {
		// Navigate to a sign in page if the user isn't authenticated when data changes
		if (!this.props.currentUser) {
			browserHistory.push('/signin');
		}
	}


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

		const { loading } = this.props

		if(loading) {
			<Loading />
		}
		return (
		<div className="tabs">
			<div>
				<Pickers /> 
				<Tabs
			        value={this.state.slideIndex}
			        onChange={this.onTabChange}
			        tabItemContainerStyle={styles.tabs}
			        inkBarStyle={styles.inkBar}
			        contentContainerStyle={styles.tabItem}>

					<Tab icon={<ContentInbox />} value={0} />
					<Tab icon={<MapsNearMe />} value={1} />	
					<Tab icon={<ActionFavorite />} value={2} />	
				</Tabs>
				<SwipeableViews
					index={this.state.slideIndex}
					onChangeIndex={this.onTabChange}
				>
					<div className="tab container">
						<div className="gathers-list">
							<List>	
								{this.renderGathers()}
							</List>
						</div>
					</div>

					<div className="tab container">
						<div className="gathers-list">
							<List>	
								{this.renderGathers()}
							</List>
						</div>
					</div>

					<div className="tab container">   
						<div className="gathers-list">
							<List>	
								{this.renderGathers()}
							</List>
						</div>
					</div>

				</SwipeableViews>
			</div> 
		</div>
		);
	}
}

Main.propTypes = {
	gathers: React.PropTypes.array,
	currentUser: React.PropTypes.object
};