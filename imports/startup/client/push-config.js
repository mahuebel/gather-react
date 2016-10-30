import { Push } from 'meteor/raix:push';
import { browserHistory } from 'react-router';

Push.Configure({
  android: {
    senderID: 928660251513,
    alert: true,
    badge: true,
    sound: true,
    vibrate: true,
    clearNotifications: true
    // icon: '',
    // iconColor: ''
  }
  // ,
  // ios: {
  //   alert: true,
  //   badge: true,
  //   sound: true
  // }
});

Push.addListener('error', function(err) {
if (err.type == 'apn.cordova') {
console.log(err.error);
}

console.log(err)
});

Push.addListener('message', function(notification) {
  // Called on every message
  let url = `/gather/${notification.payload.gatherId}`
  console.log(url)
  browserHistory.push(url)
});

Push.addListener('alert', function(notification) {
    // Called when message got a message in forground
});

Push.addListener('sound', function(notification) {
    // Called when message got a sound
});

Push.addListener('badge', function(notification) {
    // Called when message got a badge
});

Push.addListener('startup', function(notification) {
    // Called when message recieved on startup (cold+warm)
    let url = `/gather/${notification.payload.gatherId}`
    console.log(url)
    browserHistory.push(url)

});
