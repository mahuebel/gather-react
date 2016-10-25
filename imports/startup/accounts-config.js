import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
	Accounts.onCreateUser(function(options, user) {
	    if (options.profile) {
	        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
	        user.profile = options.profile;
	    }
	    return user;
	});
}
 
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});