import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Gathers } from '../gathers.js';
import { Users } from '../../users/users.js'
// import { Lists } from '../../lists/lists.js';

Meteor.publishComposite('gather.byId', function gatherById(params) {
  new SimpleSchema({
    gatherId: { type: String },
  }).validate(params);

  const { gatherId } = params;

  return {
    findOne() {
      const query = {
        _id: gatherId,
      };

      // We only need the _id field in this query, since it's only
      // used to drive the child queries to get the todos
      const options = {
        fields: Gathers.publicFields,
      };

      return Gathers.findOne(query, options);
    },

    children: [{
      find(gather) {
        return Users.find({$or: [ { _id: {$in: gather.attendees} }, { _id: {$in: gather.invited} } ] }).fetch();
      },
    }],
  };
});

Meteor.publish('gathers.public', function gathersPublic() {
  return Gathers.find({
          type: "PUBLIC",
        }, {
          fields: Gathers.publicFields,
        });
});

Meteor.publish('gathers.private', function gathersPrivate() {
  return Gathers.find({
          type: "PRIVATE",
        }, {
          fields: Gathers.publicFields,
        });
});