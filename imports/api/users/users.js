import { Meteor } from 'meteor/meteor';

export const Users = Meteor.users;

Users.helpers({
	friends() {
		let friendsList = this.friendsList || []
		return Users.find({_id: {$in: friendsList }}).fetch()
	},
	displayName() {
		return this.profile ? this.profile.name : this.username;
	},
	avatarUrl() {
		return this.profile ? "http://graph.facebook.com/" + this.services.facebook.id + "/picture/?type=large" : "/social_person.svg"; 
	}
})