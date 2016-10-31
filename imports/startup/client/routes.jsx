import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import { Accounts } from 'meteor/accounts-ui';

// route components

//Data Containers
import AppContainer from '../../ui/containers/AppContainer.jsx';
import GatherPageContainer from '../../ui/containers/GatherPageContainer.jsx';
import FriendsPageContainer from '../../ui/containers/FriendsPageContainer.jsx';
import MainContainer from '../../ui/containers/MainContainer.jsx';

//Pages
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';


function requireAuth(nextState, replace) {
	let user = Meteor.user()

	setTimeout(() => {
		// console.log("Meteor user here is", user)
		if (!user) {
	        replace({
	            pathname: 'signin',
	            state: { nextPathname: nextState.location.pathname }
	        })

	    }
	}, 500 )
    
}

function requireNonAuth(nextState, replace) {
	let user = Meteor.user()

	setTimeout(() => {
		// console.log("Meteor user here is", user)
		if (user) {
	        replace({
	            pathname: '/',
	            state: { nextPathname: nextState.location.pathname }
	        })

	    }
	}, 500 )
    
}

export const renderRoutes = () => (
  	<Router history={ browserHistory }>


		<Route path="/" component={ AppContainer } >
	        <IndexRoute component={ MainContainer } onEnter={ requireAuth } />
			<Route path="/gather/:id" component={ GatherPageContainer } />
			<Route path="/friends" component={ FriendsPageContainer } onEnter={ requireAuth } />
			<Route path="signin" component={ AuthPageSignIn } onEnter={ requireNonAuth } />
      		<Route path="signup" component={ AuthPageJoin } onEnter={ requireNonAuth } />
		</Route>
	    

		<Route path="*" component={ NotFoundPage } />
  	</Router>

);
