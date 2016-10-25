import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import GatherPageContainer from '../../ui/containers/GatherPageContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';



export const renderRoutes = () => (
  <Router history={browserHistory}>
	<Route path="/gather/:id" component={GatherPageContainer} />
	<Route path="/" component={AppContainer}>
		<Route path="signin" component={AuthPageSignIn} />
		<Route path="join" component={AuthPageJoin} />
		<Route path="*" component={NotFoundPage} />
	</Route>
  </Router>
);
