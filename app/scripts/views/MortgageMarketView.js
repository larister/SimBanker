define([
    'helpers/SpawnHelper',
    'mustache!house',
    'mustache!mortgageMarketView'
], function(
    SpawnHelper,
    houseTemplate,
    mmvTemplate
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
        	this.spawnHelper = new SpawnHelper();
            this.listenTo(this.spawnHelper, 'spawnMortgage', this.showHouse);
        },

        render: function(){
            this.$el.append(mmvTemplate());

        },

        showHouse: function(houseType){
        	console.log(houseType);
            var v = this.$el.find('.view-main');


            var left = (Math.random() * 100) + 1;
            var top = (Math.random() * 100) + 1;

            v.append(houseTemplate({type: houseType, left: left, top: top}));
        }

    });
});