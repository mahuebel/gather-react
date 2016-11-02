import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Gathers } from '../../api/gathers/gathers.js';
import { InviteLists } from '../../api/invite-lists/invite-lists.js';

import GatherPage from '../pages/GatherPage.jsx';

const GatherPageContainer = createContainer(({ params: { id } }) => {
  const publicHandle = Meteor.subscribe('gathers.public');
  const privateHandle = Meteor.subscribe('gathers.private');
  const usersHandle = Meteor.subscribe('users.inAll');
  const inviteListsHandle = Meteor.subscribe('invite-list.personal', { userId: Meteor.userId() });
  const gather = Gathers.findOne(id);
  const user = Meteor.user()
  let isFav = (gather && gather.attendees.indexOf(user._id) > -1)

  // const listExists = !loading && !!list;
  return {
    loading: !(publicHandle.ready() && privateHandle.ready() && usersHandle.ready() && inviteListsHandle.ready()),
    gather: Gathers.findOne(id),
    currentUser: user,
    inviteLists: InviteLists.find({creatorId: Meteor.userId()}).fetch(),
    friends: user ? user.friends() : [],
    isFav,
    // attendees: listExists ? list.todos().fetch() : [],
  };
}, GatherPage);

export default GatherPageContainer;