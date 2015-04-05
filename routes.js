Router.configure({
  layoutTemplate: 'application',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('constellations', {
    path: '/',
    waitOn: function() {
      return Meteor.subscribe('constellations');
    },
    data: function() {
      return [
        Constellations.find({}),
        Systems.find({})
      ];
    }
  });

  this.route('system', {
    path: '/systems/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('system', this.params._id),
        Meteor.subscribe('planets', this.params._id)
      ];
    },
    data: function() {
      Session.set('currentItem', this.params._id);
      return [
        Systems.findOne(),
        Planets.find({})
      ];
    }
  });
});
