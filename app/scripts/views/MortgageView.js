define([
    'mustache!mortgage'
], function(
    mortgageTemplate
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.render();
        },

        render: function(){
            this.$el = mortgageTemplate();
            return this;
        }

    });
});