import { Meteor } from 'meteor/meteor';

import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Gathers } from '../../api/gathers/gathers.js';

import App from '../layouts/App.jsx';

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
  };
}, App);
