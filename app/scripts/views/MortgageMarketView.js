define([], function () {
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.render();
        },

        render: function(){
            this.$el.append('Well hello sweetie pie!');
        }

    });
});