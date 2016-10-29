import { Push } from 'meteor/raix:push';

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
// alert(JSON.stringify(notification));
console.log('message', notification)
});

Push.addListener('alert', function(notification) {
    // Called when message got a message in forground
  console.log('alert', notification)
});

Push.addListener('sound', function(notification) {
    // Called when message got a sound
  console.log('sound', notification)
});

Push.addListener('badge', function(notification) {
    // Called when message got a badge
  console.log('badge', notification)
});

Push.addListener('startup', function(notification) {
    // Called when message recieved on startup (cold+warm)
  console.log('startup', notification)
});
