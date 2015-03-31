function systemSeed() {
  var randSize = Math.random() * (3 - 1) + 1;
  var size;
  switch(randSize){
    case 1: size = 'small';
    case 2: size = 'medium';
    case 3: size = 'large';
  };

  return Systems.insert({
    title: 'System name',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit.',
    size: size
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Constellations.remove({});
    Systems.remove({});
    Planets.remove({});
    Crews.remove({});

    if(Constellations.find().count() === 0) {
      Constellations.insert({
        title: 'Constellation name',
        description: 'Sed molestie augue sit amet leo consequat posuere. Vestibulum ante ipsum.',
        systems: [systemSeed(), systemSeed(), systemSeed()]
      });
    }
  });
}
