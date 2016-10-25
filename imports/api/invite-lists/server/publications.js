import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { InviteLists } from '../invite-lists.js';
// import { Lists } from '../../lists/lists.js';

Meteor.publishComposite('invite-list.personal', function inviteListPersonal(params) {
  new SimpleSchema({
    userId: { type: String },
  }).validate(params);

  const { userId } = params;

  return {
    find() {
      const query = {
        creatorId: userId,
      };

      // We only need the _id field in this query, since it's only
      // used to drive the child queries to get the todos
      const options = {
        fields: InviteLists.publicFields,
      };

      return InviteLists.find(query, options);
    }
    // ,

    // children: [{
    //   find(gather) {
    //     return Meteor.users.find({$or: [ { _id: {$in: gather.attendees} }, { _id: {$in: gather.invited} } ] }).fetch();
    //   },
    // }],
  };
});
