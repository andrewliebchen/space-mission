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

  Template.addConstellation.events({
    'click .mtr_add-constellation': function() {
      Meteor.call('addConstellation', {
        title: 'New constellation',
        description: 'Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque.'
      });
    }
  });

  Template.addSystem.events({
    'click .mtr_add-system': function() {
      Meteor.call('addSystem', {
        title: 'New system',
        description: 'Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque.',
        size: 'small',
        parent: this._id
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      addConstellation: function(args){
        Constellations.insert({
          title: args.title,
          description: args.description
        });
      },

      addSystem: function(args){
        Systems.insert({
          title: args.title,
          description: args.description,
          size: args.size,
          parent: args.parent
        });
      }
    });
  });
}
