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
  return Planets.find({parent: id});
});
