define([
    'mustache!mortgageInventory',
    'collections/MortgageCollection'
], function(
    mortgageInventoryTemplate,
    MortgageCollection
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.mortgages = new MortgageCollection();
        },

        render: function(){
            this.$el.append(mortgageInventoryTemplate());
        }

    });
});