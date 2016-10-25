import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { renderRoutes } from '../imports/startup/client/routes.jsx';

import '../imports/startup/accounts-config.js';
// import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
	injectTapEventPlugin();
	render(renderRoutes(), document.getElementById('render-target'));
})