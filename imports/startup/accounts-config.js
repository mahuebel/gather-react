// import { Accounts } from 'meteor/accounts-base';
import { Accounts, STATES } from 'meteor/zetoff:accounts-material-ui';
// import { Accounts } from 'meteor/std:accounts-material';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

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
  loginPath: 'signin',
  signUpPath: 'signup',
  onSignedInHook: () => { browserHistory.push('/'); },
  onSignedOutHook: () => { browserHistory.push('signin'); }
});