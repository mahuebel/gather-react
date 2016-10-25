import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Gathers } from '../../api/gathers/gathers.js';

import GatherPage from '../pages/GatherPage.jsx';

const GatherPageContainer = createContainer(({ params: { id } }) => {
  // const gHandle = Meteor.subscribe('gather.byId', { gatherId: id });
  // const loading = !gHandle.ready();
  const publicHandle = Meteor.subscribe('gathers.public');
  const privateHandle = Meteor.subscribe('gathers.private');
  const usersHandle = Meteor.subscribe('users.inAll');
  const gather = Gathers.findOne(id);
  console.log(id)
  console.log(gather)

  // const listExists = !loading && !!list;
  return {
    loading: !(publicHandle.ready() && privateHandle.ready() && usersHandle.ready()),
    gather: Gathers.findOne(id),
    // listExists,
    // attendees: listExists ? list.todos().fetch() : [],
  };
}, GatherPage);

export default GatherPageContainer;