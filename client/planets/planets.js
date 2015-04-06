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
        background: createBackground(),
        parent: Session.get('currentItem')
      });

      title.value = '';
      description.value = '';
      size.value = '';
    }
  }
});
