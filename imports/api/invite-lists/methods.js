import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { InviteLists } from './invite-lists.js';

export const insert = new ValidatedMethod({
  name: 'invite_lists.insert',
  validate: new SimpleSchema({
    name:      {type: String},
    userIds:   {type: [String]},
  }).validator(),
  run({ name, userIds }) {

    const list = {
      name,
      userIds,
    };

    InviteLists.insert(list);
  },
});

export const remove = new ValidatedMethod({
  name: 'invite_lists.remove',
  validate: new SimpleSchema({
    inviteListId: { type: String },
  }).validator(),
  run({ inviteListId }) {
    Gathers.remove(inviteListId);
  },
});

// Get list of all method names on Gathers
const INVITE_LISTS_METHODS = _.pluck([
  insert,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 gathers operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(INVITE_LISTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}