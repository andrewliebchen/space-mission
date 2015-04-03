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

function constellationSeed(num) {
  return Constellations.insert({
    title: 'Constellation ' + num,
    description: 'Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor.'
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Constellations.remove({});
    Systems.remove({});
    Planets.remove({});
    Crews.remove({});

    if(Constellations.find().count() === 0) {
      _(3).times(function(i){
        var constellationParent = constellationSeed(i);

        _(5).times(function(h){
          var size = randomSize();
          Systems.insert({
            title: 'System ' + h,
            description: 'Sed molestie augue sit amet leo consequat posuere. Vestibulum ante ipsum.',
            size: size,
            parent: constellationParent,
            position: {
              x: randNum(0, 100),
              y: randNum(0, 100)
            }
          });
        });
      });
    }
  });
}
