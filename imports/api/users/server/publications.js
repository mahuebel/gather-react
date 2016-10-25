import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


Meteor.publish('users.inAll', function usersInAll() {
  return Meteor.users.find({});
});

Meteor.publish('gathers.private', function gathersPrivate() {
  return Gathers.find({
          type: "PRIVATE",
        }, {
          fields: Gathers.publicFields,
        });
});