import { Meteor } from 'meteor/meteor';

import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Gathers } from '../../api/gathers/gathers.js';

import App from '../layouts/App.jsx';

// export default createContainer(() => {
  
//   return {
//     user: Meteor.user(),
//     loading: !(publicHandle.ready() && privateHandle.ready()),
//     connected: Meteor.status().connected,
//     menuOpen: Session.get('menuOpen'),
//     lists: Lists.find({ $or: [
//       { userId: { $exists: false } },
//       { userId: Meteor.userId() },
//     ] }).fetch(),
//   };
// }, App);

export default createContainer(() => {
  const publicHandle = Meteor.subscribe('gathers.public');
  const privateHandle = Meteor.subscribe('gathers.private');

  return {
    gathers: Gathers.find({start: {$gte: new Date()}}, {sort: {start: 1}}).fetch(),
    currentUser: Meteor.user(),
    loading: !(publicHandle.ready() && privateHandle.ready()),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
  };
}, App);
