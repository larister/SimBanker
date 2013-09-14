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
            var self = this;
            var v = this.$el.find('.view-main');
            var left = (Math.random() * 100) + 1;
            var top = (Math.random() * 100) + 1;

            var house = houseTemplate({type: houseType, left: left - 5, top: top - 5});

            house.click(function() {self.trigger('clickedHouse', houseType)});

            window.setTimeout(function() {
                self.removeHouse(house);
            }, 3000);

            v.append(house);
            house.animate({opacity: 1}, 100);
        },

        removeHouse: function(house) {
                house.animate({opacity: 0}, 100);
                house.remove();
        }

    });
});