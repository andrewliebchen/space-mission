Session.setDefault('activePanel', null);
Session.setDefault('currentItem', null);

Template.header.events({
  'click .mtr_add-planet': function(){
    var currentSystem = Systems.findOne()._id;
    Session.set('currentItem', currentSystem);
  }
});

Template.panel.helpers({
  activePanel: function(){
    return Session.get('activePanel');
  }
});

Template.application.events({
  'click [data-panel-template]' : function(event) {
    var template = $(event.target).data('panel-template');
    Session.set('activePanel', template);
    // Session.set('currentItem', this._id);
  },

  'click [data-panel="close"]' : function(event) {
    Session.set('activePanel', null);
  }
});
