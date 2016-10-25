import { Mongo } from 'meteor/mongo';

export default class BaseCollection extends Mongo.Collection {
	insert(doc, callback) {
		const ourDoc = doc;
		ourDoc.createdAt = ourDoc.createdAt || new Date();
		ourDoc.updatedAt =  new Date();
		const result = super.insert(ourDoc, callback);
		return result;
	}
	update(selector, modifier) {
		modifier.$set.updatedAt = new Date()
		const result = super.update(selector, modifier);
		return result;
	}
	remove(selector) {
		const result = super.remove(selector);
		return result;
	}

}