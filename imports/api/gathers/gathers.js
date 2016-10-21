import { Mongo } from 'meteor/mongo';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class GathersCollection extends Mongo.Collection {
	insert(doc, callback) {
		const ourDoc = doc;
		ourDoc.createdAt = ourDoc.createdAt || new Date();
		ourDoc.updatedAt =  new Date();
		const result = super.insert(ourDoc, callback);
		return result;
	}
	update(selector, modifier) {
		modifer.$set.updatedAt = new Date()
		const result = super.update(selector, modifier);
		return result;
	}
	remove(selector) {
		const result = super.remove(selector);
		return result;
	}

}

export const Gathers = new GathersCollection('gathers');

export const LocationSchema = new SimpleSchema({
	type:        {type: String},
	coordinates: {type: [Number], decimal: true}
})

Gathers.schema = new SimpleSchema({
	name:     {type: String, max: 40, optional: true},
	start:    {type: Date},
	duration: {type: Number, decimal: true},
	type: 	  {type: String},
	place: 	  {type: String},
	invited:  {type: [String], optional: true},
	loc:  	  {type: LocationSchema},
	createdAt:{type: Date},
	updatedAt:{type: Date},
})

Gathers.attachSchema(Gathers.schema)

Gathers.helpers({
	displayName() {
		return this.name ? this.name : this.place 
	},

})