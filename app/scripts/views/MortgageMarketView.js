define([
    'SpawnHelper',
    'mustache!house'
], function(
    SpawnHelper,
    houseTemplate
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.listenTo(SpawnHelper, 'spawnMortgage', this.showHouse);
        },

        render: function(){
            this.$el.append('Well hello sweetie pie!');
            this.$el.append(houseTemplate());
        },

        showHouse: function(houseType){
            // Show data house!
        }

    });
});