import { Mongo } from 'meteor/mongo';

import BaseCollection from '../base-collection.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class InviteListsCollection extends BaseCollection {
	insert(doc, callback) {
		const ourDoc = doc;
		ourDoc.creatorId = Meteor.userId();
		const result = super.insert(ourDoc, callback);
		return result;
	}
	// update(selector, modifier) {
	// 	modifer.$set.updatedAt = new Date()
	// 	const result = super.update(selector, modifier);
	// 	return result;
	// }
	// remove(selector) {
	// 	const result = super.remove(selector);
	// 	return result;
	// }

}

export const InviteLists = new InviteListsCollection('invite_lists');

InviteLists.schema = new SimpleSchema({
	creatorId: {type: String},
	name:      {type: String},
	userIds:   {type: [String]},
	createdAt: {type: Date},
	updatedAt: {type: Date},
})

InviteLists.attachSchema(InviteLists.schema)

InviteLists.publicFields = {
  creatorId: 1,
  name: 1,
  userIds: 1,
  updatedAt: 1,
};

InviteLists.helpers({
	suggestedUsers() {
		let users = []
		let gathers = Gathers.find({invited: {$all: this.userIds}}).fetch()
		for (var i=0; i < gathers.length; i++) {
			let invited = gathers[i].invited || []
			for (var j=0; j<invited.length; j++) {
				if (this.userIds.indexOf(invited[j]) < 0) {
					users.push(invited[j])
				}
			}
		}
		return users;
		// return Meteor.users.find({_id: {$in: users}}).fetch()
	},

})