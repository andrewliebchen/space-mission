Meteor.publish('constellations', function(){
  return [
    Constellations.find({}),
    Systems.find({})
  ];
});

Meteor.publish('system', function(id) {
  return Systems.find(id) && Planets.find({parent: id});
});
