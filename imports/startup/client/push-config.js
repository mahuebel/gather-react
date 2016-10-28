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