import { Meteor } from 'meteor/meteor';
import { Bins } from '../imports/collections/bins';

Meteor.startup(async () => {
  Meteor.publish("bins", function () {
    return Bins.find({ ownerId: this.userId });
  });

  Meteor.publish('sharedBins', async function(){
    const user = await Meteor.users.findOneAsync(this.userId);
    if(!user) {return this.ready();}
    const email = user.emails[0].address;

    return Bins.find({
      sharedWith: { $elemMatch: { $eq: email } }
    });
  })
});
