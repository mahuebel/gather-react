import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
// import { Accounts, STATES } from 'meteor/std:accounts-material';
import { Accounts, STATES } from 'meteor/zetoff:accounts-material-ui';
// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import GatherPageContainer from '../../ui/containers/GatherPageContainer.jsx';
import SignInPage from '../../ui/pages/AuthPageSignIn.jsx';
import JoinPage from '../../ui/pages/AuthPageJoin.jsx';
import AuthPage from '../../ui/pages/AuthPage.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import MainContainer from '../../ui/containers/MainContainer.jsx';


function requireAuth(nextState, replace) {
    if (!Meteor.user()) {
        replace({
            pathname: '/auth/signin',
            state: { nextPathname: nextState.location.pathname }
        })
        console.log(nextState)
    }
    
}


export const renderRoutes = () => (
  	<Router history={ browserHistory }>
  		<Route path="/auth" component={ AuthPage } >
	  		<Route path="/signup" component={ JoinPage } formState={ STATES.SIGN_UP } />
			<Route path="/signin" component={ SignInPage } formState={ STATES.SIGN_IN } />
		</Route>

		<Route path="/" component={ AppContainer } >
	        <IndexRoute component={ MainContainer } />
			<Route path="/gather/:id" component={ GatherPageContainer } />
			
		</Route>
	    

		<Route path="*" component={NotFoundPage} />
  	</Router>

);
