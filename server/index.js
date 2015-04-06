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
  },

  addPlanet: function(args){
    Planets.insert({
      title: args.title,
      description: args.description,
      size: args.size,
      background: args.background,
      parent: args.parent
    });
  },

  startPlanet: function(planetId){
    Planets.update(planetId, {$set: {
      status: 'started'
    }});
  },

  pausePlanet: function(planetId){
    Planets.update(planetId, {$set: {
      status: 'paused'
    }});
  },

  finishPlanet: function(planetId){
    Planets.update(planetId, {$set: {
      status: 'finished'
    }});
  }
});
