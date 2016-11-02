import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Push } from 'meteor/raix:push';

import moment from 'moment';

import {Users} from '../users/users.js';

import { Gathers, LocationSchema } from './gathers.js';
import { InviteLists } from '../invite-lists/invite-lists.js';

export const insert = new ValidatedMethod({
  name: 'gathers.insert',
  validate: new SimpleSchema({
    name:     {type: String, max: 40, optional: true},
  	start:    {type: Date},
  	duration: {type: Number, decimal: true},
  	type: 	  {type: String},
  	place: 	  {type: String},
    invited:  {type: [String], optional: true},
  	attendees:  {type: [String], optional: true},
  	loc:  	  {type: LocationSchema},
  }).validator(),
  run({ name, start, duration, type, place, invited, attendees, loc }) {

    // if (list.isPrivate() && list.userId !== this.userId) {
    //   throw new Meteor.Error('api.gathers.insert.accessDenied',
    //     'Cannot add gathers to a private list that is not yours');
    // }
    invited = invited?invited:[]
    attendees = attendees?attendees:[]
    // name    = name?name:place


    const gather = {
      name,
      start,
      duration,
      type,
      place,
      invited,
      attendees,
      loc,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    Gathers.insert(gather);
  },
});

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const toggleAttendee = new ValidatedMethod({
  name: 'gathers.toggleAttendee',
  validate: new SimpleSchema({
    gatherId: { type: String },
    attendeeId: { type: String },
  }).validator(),
  run({ gatherId, attendeeId }) {
    const gather = Gathers.findOne(gatherId);
    let invited = gather.invited || [] 

    if (gather.type === "PRIVATE" && !(invited.indexOf(attendeeId) > -1)) {
      throw new Meteor.Error('api.gathers.toggleAttendee.accessDenied',
      'Cannot attend a private gathering you have not been invited to');
    }

    let attendees = gather.attendees || []

    let beforeCount = attendees.length

    let ind = attendees.indexOf(attendeeId) 

    if (ind > -1) {
      /*We need to remove this user from the attendees list*/
      while(ind > -1) {
        attendees.splice(ind)
        ind = attendees.indexOf(attendeeId)

      }
    } else {

      let newGuy = Users.findOne(attendeeId)

      let name = newGuy.profile ? newGuy.profile.name : newGuy.username
      
      
      attendees.push(attendeeId)
      
      Push.send({
        from: 'push',
        title: `${name} is in!`,
        badge: gather.attendees.length,
        query: {
            userId: {$in: attendees}
        }, 
        gcm: {
          image: 'https://gather-meteor.herokuapp.com/gather_logo.svg',
          style: 'inbox',
          summaryText: 'There are %n% notifications'
        },
        payload: {
          url: `/gather/${gatherId}`
        },
        notId: randInt(10000,50000),
        text: `${name} is down for ${gather.displayName()}
        ${moment(gather.start).format("ddd MMM Do, h:mm a")}`
      });
    }

    Gathers.update(gatherId, { $set: {
      attendees
    } });
  },
});

export const inviteOne = new ValidatedMethod({
  name: 'gathers.inviteOne',
  validate: new SimpleSchema({
    gatherId: { type: String },
    inviteeId:{ type: String },
    userId:   { type: String }
  }).validator(),
  run({ gatherId, inviteeId, userId }) {
    const gather = Gathers.findOne(gatherId);

    let invited = gather.invited || [] 

    if (gather.type === "PRIVATE" && !(invited.indexOf(userId) > -1) && gather.creatorId !== userId) {
      throw new Meteor.Error('api.gathers.inviteOne.accessDenied',
      'Cannot invite people to a private gathering you have not been invited to');
    }

    if (invited.indexOf(inviteeId) > -1) {
      throw new Meteor.Error('api.gathers.inviteOne.accessDenied',
      'They are already invited');
    } 

    invited.push(inviteeId)


    Gathers.update(gatherId, { $set: {
      invited: invited,
    } });
  } 
})

export const inviteMany = new ValidatedMethod({
  name: 'gathers.inviteMany',
  validate: new SimpleSchema({
    gatherId:  { type: String },
    inviteeIds:{ type: [String] },
    userId:    { type: String }
  }).validator(),
  run({ gatherId, inviteeIds, userId }) {
    const gather = Gathers.findOne(gatherId);

    let invited = gather.invited || [] 
    let newInvites = []

    if (gather.type === "PRIVATE" && !(invited.indexOf(userId) > -1) && gather.creatorId !== userId) {
      throw new Meteor.Error('api.gathers.inviteMany.accessDenied',
      'Cannot invite people to a private gathering you have not been invited to');
    }

    for(var i=0; i<inviteeIds.length; i++) {
      let invitee = inviteeIds[i]
      if (invited.indexOf(invitee) === -1){
        invited.push(invitee)
        newInvites.push(invitee)
      }
    }

    let inviter = Users.findOne(userId)

    let name = inviter.profile ? inviter.profile.name : inviter.username

    let date    = moment(gather.start).format("ddd MMM Do, h:mm a")

    


    var p = Push.send({
      from: 'push',
      title: `${name} wants to gather at ${gather.displayName()}`,
      badge: gather.attendees.length,
      query: {
          userId: {$in: newInvites}
      }, 
      gcm: {
        style: 'picture',
        picture: gather.mapUrl(),
        summaryText: `Come join ${name} at 
        ${gather.displayName()} 
        ${date} summary`,
        image: 'https://gather-meteor.herokuapp.com/gather_logo.svg'
      },
      payload: {
        url: `/gather/${gatherId}`
      },
      notId: randInt(10000,50000),
      text: `Come join ${name} at 
      ${gather.displayName()}
      ${date}`
    });


    Gathers.update(gatherId, { $set: {
      invited: invited,
    } });
  } 
})

export const inviteList = new ValidatedMethod({
  name: 'gathers.inviteList',
  validate: new SimpleSchema({
    gatherId:    { type: String },
    inviteListId:{ type: String },
    userId:      { type: String }
  }).validator(),
  run({ gatherId, inviteListId, userId }) {
    const gather = Gathers.findOne(gatherId);
    
    let inviteList = InviteLists.findOne(inviteListId)

    let invited = gather.invited || [] 

    if (gather.type === "PRIVATE" && !(invited.indexOf(userId) > -1) && gather.creatorId !== userId) {
      throw new Meteor.Error('api.gathers.inviteOne.accessDenied',
      'Cannot invite people to a private gathering you have not been invited to');
    }
    

    for(var i=0; i<inviteList.userIds.length; i++) {
      let inviteeId = inviteList.userIds[i]
      if (!(invited.indexOf(inviteeId) > -1)) {
        invited.push(inviteeId)
        console.log(inviteeId)
      } 
    }


    let inviter = Users.findOne(userId)

    let name = inviter.profile ? inviter.profile.name : inviter.username

    let date    = moment(gather.start).format("ddd MMM Do, h:mm a")

    var p = Push.send({
      from: 'push',
      title: `${name} wants to gather at ${gather.displayName()}`,
      badge: gather.attendees.length,
      query: {
          userId: {$in: invited}
      }, 
      gcm: {
        style: 'picture',
        picture: gather.mapUrl(),
        summaryText: `Come join ${name} at 
        ${gather.displayName()} 
        ${date} summary`,
        image: 'https://gather-meteor.herokuapp.com/gather_logo.svg'
      },
      payload: {
        url: `/gather/${gatherId}`
      },
      notId: randInt(10000,50000),
      text: `Come join ${name} at 
      ${gather.displayName()}
      ${date}`
    });


    Gathers.update(gatherId, { $set: {
      invited: invited,
    } });
  } 
})

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
  toggleAttendee,
  inviteOne,
  inviteMany,
  inviteList,
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