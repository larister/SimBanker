define([
    'mustache!mortgage'
], function(
    mortgageTemplate
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            
        },

        render: function(){
            this.$el.html(mortgageTemplate());
        }

    });
});