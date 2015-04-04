function randNum(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomSize() {
  var size;
  switch(randNum(1, 3)){
    case 1:
      size = 'small';
      break;
    case 2:
      size = 'medium';
      break;
    case 3:
      size = 'large';
      break;
  };
  return size;
}

function constellationSeed(count) {
  return Constellations.insert({
    title: 'Constellation ' + count,
    description: 'Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor.'
  });
}

function systemSeed(count, constellationParent) {
  var size = randomSize();
  return Systems.insert({
    title: 'System ' + count,
    description: 'Sed molestie augue sit amet leo consequat posuere. Vestibulum ante ipsum.',
    size: size,
    parent: constellationParent,
    position: {
      x: randNum(0, 100),
      y: randNum(0, 100)
    }
  });
}

Meteor.startup(function () {
  // Constellations.remove({});
  // Systems.remove({});
  // Planets.remove({});
  // Crews.remove({});

  if(Constellations.find().count() === 0) {
    _(10).times(function(h){
      var constellationParent = constellationSeed(h);

      _(7).times(function(i){
        var systemParent = systemSeed(i, constellationParent);

        _(5).times(function(j){
          var size = randomSize();
          Planets.insert({
            title: 'Planet' + j,
            description: 'Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur.',
            size: size,
            parent: systemParent
          });
        });
      });
    });
  }
});
