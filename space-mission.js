Constellations = new Meteor.Collection('constellations');
Systems = new Meteor.Collection('systems');
Planets = new Meteor.Collection('planets');
Crews = new Meteor.Collection('crews');

if (Meteor.isClient) {
  Session.setDefault('activePanel', null);
  Session.setDefault('currentItem', null);

  Template.panel.helpers({
    activePanel: function(){
      return Session.get('activePanel');
    }
  });

  Template.body.events({
    'click [data-panel-template]' : function(event) {
      var template = $(event.target).data('panel-template');
      Session.set('activePanel', template);
      Session.set('currentItem', this._id);
    },

    'click [data-panel="close"]' : function(event) {
      Session.set('activePanel', null);
    }
  });

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
    'click .mtr_add-constellation': function(event, template) {
      var title = template.find('#mtr_constellation-title');
      var description = template.find('#mtr_constellation-description');

      Meteor.call('addConstellation', {
        title: title.value,
        description: description.title
      });

      title.value = '';
      description.value = '';
    }
  });

  Template.addSystem.events({
    'click .mtr_add-system': function(event, template) {
      var title = template.find('#mtr_system-title');
      var description = template.find('#mtr_system-description');
      var size = template.find('#mtr_system-size');

      Meteor.call('addSystem', {
        title: title.value,
        description: description.value,
        size: size.value,
        parent: Session.get('currentItem')
      });

      title.value = '';
      description.value = '';
      size.value = '';
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
