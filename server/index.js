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
