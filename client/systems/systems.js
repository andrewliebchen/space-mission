// Constellations index
Template.systems.helpers({
  system: function(){
    return Systems.find({parent: this._id});
  }
});

// Systems index
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
