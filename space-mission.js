Constellations = new Meteor.Collection('constellations');
Systems = new Meteor.Collection('systems');
Planets = new Meteor.Collection('planets');
Crews = new Meteor.Collection('crews');

if (Meteor.isClient) {
  Template.constellations.helpers({
    constellation: function(){
      return Constellations.find({});
    }
  });

  Template.systems.helpers({
    system: function(){
      return Systems.find({parent: this._id});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
