import { Meteor } from 'meteor/meteor';
import { Gathers } from '../../api/gathers/gathers.js';
import { ServiceConfiguration } from 'meteor/service-configuration';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {

  configureFacebook = function(config) {
    // first, remove configuration entry in case service is already configured
    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });

   ServiceConfiguration.configurations.insert({
        service: "facebook",
        appId: config.clientId,
        secret: config.secret
    });
  };

  // set the settings object with meteor --settings private/settings-local.json
  var facebookConfig = Meteor.settings.facebook;
  if(facebookConfig) {
      console.log('Got settings for facebook', facebookConfig)
      configureFacebook(facebookConfig);
  }

  // ServiceConfiguration.configurations.remove({
  //     service: 'facebook'
  // });
   
  // ServiceConfiguration.configurations.insert({
  //     service: 'facebook',
  //     appId: '1020522408060337',
  //     secret: '8f91ef0249ac107c3d60d9175c0a2b67'
  // });
  /*
  if (Gathers.find().count() === 0) {
    let timestamp = (new Date()).getTime();

    const data = [
      {
        creatorId
        name:     "Rally Day",
        start:    new Date(timestamp+100),
        duration: 1,
        type:     "PUBLIC",
        place:    "Messiah Lutheran Church",
        invited:  [],
        loc:      {type: "Point", coordinates: [32.911478, -97.253601]},
        createdAt:new Date(timestamp+5),
        updatedAt:new Date(timestamp+5),
      },
      {
        name:     "Cowboys Game",
        start:    new Date(timestamp+300),
        duration: 1,
        type:     "PRIVATE",
        place:    "ur Butt",
        invited:  [],
        loc:      {type: "Point", coordinates: [32.896164, -97.275795]},
        createdAt:new Date(timestamp+6),
        updatedAt:new Date(timestamp+6),
      },
      {
        name:     "Drinks at Racetrac",
        start:    new Date(timestamp+200),
        duration: 1,
        type:     "PRIVATE",
        place:    "Racetrac",
        invited:  [],
        loc:      {type: "Point", coordinates: [32.896164, -97.275795]},
        createdAt:new Date(timestamp+7),
        updatedAt:new Date(timestamp+7),
      },
    ];


    data.forEach((gather) => {
      const gatherId = Gathers.insert(gather);
    });
  }
  */
});