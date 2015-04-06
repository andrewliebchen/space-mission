Session.setDefault('activePanel', null);
Session.setDefault('currentItem', null);

Template.panel.helpers({
  activePanel: function(){
    return Session.get('activePanel');
  }
});

Template.application.events({
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

Template.system.helpers({
  system: function(){
    return Systems.find({});
  },

  planet: function(){
    var planetsTotal = Counts.get('planetsTotal');
    var orbitSpeed = 6;
    return Planets.find({}).map(function(planet, index) {
      planet.width = (index + 1) / planetsTotal * 100;
      planet.margin = planet.width / 2;
      planet.duration = (index * orbitSpeed) + orbitSpeed;
      planet.zIndex = planetsTotal - index;

      return planet;
    });
  }
});

Template.system.events({
  'click .mtr_planet-details': function(event) {
    var template = $(event.target).data('panel-template');
    Session.set('activePanel', template);
    Session.set('currentItem', this._id);
  }
});

Template.planet.helpers({
  planetDetail: function(){
    return Planets.find({_id: Session.get('currentItem')});
  },

  systemParent: function(){
    return Systems.findOne().title;
  },

  constellationParent: function(){
    var constellationParent = Systems.findOne().parent;
    Meteor.subscribe('constellation', constellationParent);
    return Constellations.findOne().title;
  },

  isPaused: function(){
    return this.status === 'paused' ? true : null;
  },

  isStarted: function(){
    return this.status === 'started' ? true : null;
  },

  isFinished: function(){
    return this.status === 'finished' ? true : null;
  }
});

Template.planet.events({
  'click .mtr_start-planet': function(){
    Meteor.call('startPlanet', this._id);
  },

  'click .mtr_pause-planet': function(){
    Meteor.call('pausePlanet', this._id);
  },

  'click .mtr_finish-planet': function(){
    Meteor.call('finishPlanet', this._id);
  }
});

Template.addConstellation.events({
  'click .mtr_add-constellation': function(event, template) {
    var title = template.find('#mtr_constellation-title');
    var description = template.find('#mtr_constellation-description');

    if(title.value) {
      Meteor.call('addConstellation', {
        title: title.value,
        description: description.title
      });

      title.value = '';
      description.value = '';
    }
  }
});

Template.addSystem.events({
  'click .mtr_add-system': function(event, template) {
    var title = template.find('#mtr_system-title');
    var description = template.find('#mtr_system-description');
    var size = template.find('#mtr_system-size');

    if(title.value && size.value) {
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
  }
});

Template.addPlanet.events({
  'click .mtr_add-planet': function(event, template) {
    var title = template.find('#mtr_planet-title');
    var description = template.find('#mtr_planet-description');
    var size = template.find('#mtr_planet-size');

    if(title.value && size.value) {
      Meteor.call('addPlanet', {
        title: title.value,
        description: description.value,
        size: size.value,
        parent: Session.get('currentItem')
      });

      title.value = '';
      description.value = '';
      size.value = '';
    }
  }
});
