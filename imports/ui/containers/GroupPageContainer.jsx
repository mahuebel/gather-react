import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Gathers } from '../../api/gathers/gathers.js';
import { InviteLists } from '../../api/invite-lists/invite-lists.js';
import { Users } from '../../api/users/users.js';

import GroupPage from '../pages/GroupPage.jsx';

const GroupPageContainer = createContainer(({ }) => {
  const usersHandle = Meteor.subscribe('users.inAll');
  const inviteListsHandle = Meteor.subscribe('invite-list.personal', { userId: Meteor.userId() });
  const user = Meteor.user()

  return {
    loading: !(usersHandle.ready() && inviteListsHandle.ready()),
    currentUser: user,
    inviteLists: InviteLists.find({creatorId: Meteor.userId()}).fetch(),
    friends: user ? user.friends() : [],
    users: Users.find({}).fetch()
  };
}, GroupPage);

export default GroupPageContainer;