define([
    'mustache!cdoInventory',
    'collections/CDOCollection'
], function(
    cdoInventoryTemplate,
    CDOCollection
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.cdos = new CDOCollection();
        },

        render: function(){
            this.$el.append(cdoInventoryTemplate());
        }

    });
});