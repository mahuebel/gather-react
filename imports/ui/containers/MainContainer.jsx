import { Meteor } from 'meteor/meteor';

import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Gathers } from '../../api/gathers/gathers.js';

import Main from '../pages/Main.jsx';

export default createContainer(() => {
  const publicHandle = Meteor.subscribe('gathers.public');
  const privateHandle = Meteor.subscribe('gathers.private');

  return {
    gathers: Gathers.find({start: {$gte: new Date()}}, {sort: {start: 1}}).fetch(),
    currentUser: Meteor.user(),
    loading: !(publicHandle.ready() && privateHandle.ready() && !Meteor.user()),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
  };
}, Main);
