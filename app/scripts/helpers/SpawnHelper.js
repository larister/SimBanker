define(function() {
    'use strict';

    return _(Backbone.Events).extend({

        initialize: function(){
            // start spawn timer
        },

        spawnMortgage: function(){
            this.trigger('spawnMortgage', {type: 'castle'});
        }

    });

});