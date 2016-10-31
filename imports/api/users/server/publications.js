import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import {Users} from "../users.js";


Meteor.publish('users.inAll', function usersInAll() {
  return Users.find({});
});
