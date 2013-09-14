define([
    'mustache!cdoInventory'
], function(
    cdoInventoryTemplate
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            
        },

        render: function(){
            this.$el.append(cdoInventoryTemplate());
        }

    });
});