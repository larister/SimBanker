define([
    'mustache!mortgageInventory'
], function(
    mortgageInventoryTemplate
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            
        },

        render: function(){
            this.$el.append(mortgageInventoryTemplate());
        }

    });
});