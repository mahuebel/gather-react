import { Mongo } from 'meteor/mongo';

import { Meteor } from 'meteor/meteor';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '../base-collection.js';

import {Users} from '../users/users.js';


class GathersCollection extends BaseCollection {
	insert(doc, callback) {
		const ourDoc = doc;
		ourDoc.createdAt = ourDoc.createdAt || new Date();
		ourDoc.updatedAt =  new Date();
		ourDoc.creatorId = Meteor.userId()
		ourDoc.attendees = doc.attendees || []
		ourDoc.invited.push(Meteor.userId())
		ourDoc.attendees.push(Meteor.userId())
		const result = super.insert(ourDoc, callback);

		/*
		this is where we send invites/push notifications!
		*/


		return result;
	}
	update(selector, modifier) {
		const result = super.update(selector, modifier);

		/*
		this is where we send invites/push notifications
		with the updated info
		*/


		return result;
	}
	remove(selector) {
		// let gather = Gathers.findOne(selector)

		const result = super.remove(selector);

		/*
		this is where we send invites/push notifications
		to let everyone know the gathering is off
		*/


		return result;
	}

}

export const Gathers = new GathersCollection('gathers');

export const LocationSchema = new SimpleSchema({
	type:        {type: String},
	coordinates: {type: [Number], decimal: true}
})

Gathers.schema = new SimpleSchema({
	creatorId:{type: String, optional: true},
	name:     {type: String, max: 40, optional: true},
	start:    {type: Date},
	duration: {type: Number, decimal: true},
	type: 	  {type: String},
	place: 	  {type: String},
	invited:  {type: [String], optional: true},
	attendees:{type: [String], optional: true},
	loc:  	  {type: LocationSchema},
	createdAt:{type: Date},
	updatedAt:{type: Date},
})

Gathers.attachSchema(Gathers.schema)

Gathers.publicFields = {
  creatorId: 1,
  name: 1,
  start: 1,
  duration: 1,
  type: 1,
  place: 1,
  invited: 1,
  attendees: 1,
  loc: 1,
  updatedAt: 1,
};

Gathers.helpers({
	displayName() {
		return this.name ? this.name : this.place.split(",")[0] 
	},
	attendingUsers() {
		if (this.attendees)
			return Users.find({_id: {$in: this.attendees}})
	},
	invitedUsers() {
		if (this.invited && this.attendees){
			let filteredInvited = this.invited
			let atnds = this.attendees

			filteredInvited = filteredInvited.filter(user => { 
				return !(atnds.indexOf(user) > -1)
			});

			return Users.find({_id: {$in: filteredInvited}})
		}
	},
	creator() {
		return Users.findOne(this.creatorId)
	},
	mapUrl() {
		let loc     = this.loc

	    let latTrans = .0007312 + loc.coordinates[0]
	    let lngTransZ14 = .0192011 + loc.coordinates[1]
	    let lngTransZ13 = .035000 + loc.coordinates[1]

	    let mapType = "&maptype=roadmap";
	    let url   = "https://maps.google.com/maps/api/staticmap?center=" 
					+ loc.coordinates[0] + "," + loc.coordinates[1] +
					"&zoom=14&size=600x250&key=AIzaSyCbhTFXENjzhlS2P4nQyHlyRwqhzkeToSs"
					+mapType+"&scale=2&sensor=false&markers=color:0x03A9F4%7C"
					+ loc.coordinates[0] + "," + loc.coordinates[1] 
					+ "&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0xE1F5FE%7Cvisibility:on";
    	return url
	},
})