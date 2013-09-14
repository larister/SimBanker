define(function() {
    'use strict';

    return _(Backbone.Events, {

        initialize: function(){
            // start spawn timer
        },

        spawnMortgage: function(){
            this.trigger('spawnMortgage', {type: 'castle'});
        }

    });

});