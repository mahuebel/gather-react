import { Push } from 'meteor/raix:push';

Push.Configure({
  // apn: {
  //   certData: Assets.getText('apnDevCert.pem'),
  //   keyData: Assets.getText('apnDevKey.pem'),
  //   passphrase: 'xxxxxxxxx',
  //   production: true,
  //   //gateway: 'gateway.push.apple.com',
  // },
  gcm: {
    apiKey: 'AIzaSyCh0yXGnYuEh8s_a6qkoGw5R3cm44Fl6nY',
    projectNumber: 962800377191
  }
  // production: true,
  // 'sound' true,
  // 'badge' true,
  // 'alert' true,
  // 'vibrate' true,
  // 'sendInterval': 15000, Configurable interval between sending
  // 'sendBatchSize': 1, Configurable number of notifications to send per batch
  // 'keepNotifications': false,
//
});