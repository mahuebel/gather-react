import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Gathers, LocationSchema } from './gathers.js';

export const insert = new ValidatedMethod({
  name: 'gathers.insert',
  validate: new SimpleSchema({
    name:     {type: String, max: 40, optional: true},
	start:    {type: Date},
	duration: {type: Number, decimal: true},
	type: 	  {type: String},
	place: 	  {type: String},
	invited:  {type: [String], optional: true},
	loc:  	  {type: LocationSchema},
  }).validator(),
  run({ name, start, duration, type, place, invited, loc }) {

    // if (list.isPrivate() && list.userId !== this.userId) {
    //   throw new Meteor.Error('api.gathers.insert.accessDenied',
    //     'Cannot add gathers to a private list that is not yours');
    // }
    invited = invited?invited:[]
    // name    = name?name:place


    const gather = {
      name,
      start,
      duration,
      type,
      place,
      invited,
      loc,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    Gathers.insert(gather);
  },
});

/*
export const setCheckedStatus = new ValidatedMethod({
  name: 'gathers.makeChecked',
  validate: new SimpleSchema({
    todoId: { type: String },
    newCheckedStatus: { type: Boolean },
  }).validator(),
  run({ todoId, newCheckedStatus }) {
    const todo = Gathers.findOne(todoId);

    if (todo.checked === newCheckedStatus) {
      // The status is already what we want, let's not do any extra work
      return;
    }

    if (!todo.editableBy(this.userId)) {
      throw new Meteor.Error('api.gathers.setCheckedStatus.accessDenied',
        'Cannot edit checked status in a private list that is not yours');
    }

    Gathers.update(todoId, { $set: {
      checked: newCheckedStatus,
    } });
  },
});

export const updateText = new ValidatedMethod({
  name: 'gathers.updateText',
  validate: new SimpleSchema({
    todoId: { type: String },
    newText: { type: String },
  }).validator(),
  run({ todoId, newText }) {
    // This is complex auth stuff - perhaps denormalizing a userId onto gathers
    // would be correct here?
    const todo = Gathers.findOne(todoId);

    if (!todo.editableBy(this.userId)) {
      throw new Meteor.Error('api.gathers.updateText.accessDenied',
        'Cannot edit gathers in a private list that is not yours');
    }

    Gathers.update(todoId, {
      $set: { text: newText },
    });
  },
});
*/

export const remove = new ValidatedMethod({
  name: 'gathers.remove',
  validate: new SimpleSchema({
    gatherId: { type: String },
  }).validator(),
  run({ gatherId }) {
    // const gather = Gathers.findOne(gatherId);

    // if (!gather.editableBy(this.userId)) {
    //   throw new Meteor.Error('api.gathers.remove.accessDenied',
    //     'Cannot remove gathers in a private list that is not yours');
    // }

    Gathers.remove(gatherId);
  },
});

// Get list of all method names on Gathers
const GATHERS_METHODS = _.pluck([
  insert,
  // setCheckedStatus,
  // updateText,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 gathers operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(GATHERS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}