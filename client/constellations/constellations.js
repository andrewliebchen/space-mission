Template.constellations.helpers({
  constellation: function(){
    return Constellations.find({});
  }
});

Template.addConstellation.events({
  'click .mtr_add-constellation': function(event, template) {
    var title = template.find('#mtr_constellation-title');
    var description = template.find('#mtr_constellation-description');

    if(title.value) {
      Meteor.call('addConstellation', {
        title: title.value,
        description: description.title
      });

      title.value = '';
      description.value = '';
    }
  }
});
