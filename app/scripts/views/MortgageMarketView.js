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
            var self = this;
            setTimeout(function() {
            	console.log("timeout");
            	self.generateMortgage("house");
            }, 300);
        },

        render: function(){
            this.$el.append(mmvTemplate());

        },

        generateMortgage: function(type) {
        	this.$el.find('.view-main').append(houseTemplate({type: type}));
        },

        showHouse: function(houseType){
            // Show data house!
        }

    });
});