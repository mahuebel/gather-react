import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Push } from 'meteor/raix:push';

import moment from 'moment';

import {Users} from './users.js';

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const addFriends = new ValidatedMethod({
	name: 'users.addFriends',
	validate: new SimpleSchema({
		userId: {type: String},
		inviteeIds: {type: [String]},
		allFriends: {type: [String]}
	}).validator(),
	run({userId, inviteeIds, allFriends}) {
		const user = Users.findOne(userId)

	    var p = Push.send({
			from: 'push',
			title: `You got added as a friend`,
			query: {
				userId: {$in: inviteeIds}
			}, 
			gcm: {
				image: user.avatarUrl(),
			},
			payload: {
				url: `/friends`
			},
			notId: randInt(10000,50000),
			text: `${user.displayName()} added you as a friend, add them back!`
		});


		Users.update(userId, { 
			$set: {
				friendsList: allFriends,
			} 
		});
		console.log(allFriends)
	}			
})


const USERS_METHODS = _.pluck([
  // insert,
  addFriends,
  // remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 gathers operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(USERS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}