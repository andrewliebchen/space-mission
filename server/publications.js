Meteor.publish('constellations', function(){
  return [
    Constellations.find({}),
    Systems.find({})
  ];
});

Meteor.publish('system', function(id){
  return Systems.find(id);
});

Meteor.publish('planets', function(id){
  Counts.publish(this, 'planetsTotal', Planets.find({parent: id}));
  return Planets.find({parent: id});
});
