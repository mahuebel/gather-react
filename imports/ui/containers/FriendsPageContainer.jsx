import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { InviteLists } from '../../api/invite-lists/invite-lists.js';
import { Users } from '../../api/users/users.js';

import FriendsPage from '../pages/FriendsPage.jsx';

const FriendsPageContainer = createContainer(({ params: { id } }) => {
  const usersHandle = Meteor.subscribe('users.inAll');
  const inviteListsHandle = Meteor.subscribe('invite-list.personal', { userId: Meteor.userId() });
  const user = Users.findOne(Meteor.userId())

  // const listExists = !loading && !!list;
  return {
    loading: !(usersHandle.ready() && inviteListsHandle.ready()),
    currentUser: user,
    inviteLists: InviteLists.find({userId: Meteor.userId()}).fetch(),
    friends: user ? user.friends() : [],
    users: Users.find({}).fetch()
    // attendees: listExists ? list.todos().fetch() : [],
  };
}, FriendsPage);

export default FriendsPageContainer;