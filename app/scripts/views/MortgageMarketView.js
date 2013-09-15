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
            this.listenTo(this.spawnHelper, 'spawnMortgage', _(this.showHouse).bind(this));
        },

        render: function(){
            this.$el.append(mmvTemplate());
            this.$el.on('click', '.house', _(this.houseClicked).bind(this));
        },

        showHouse: function(houseType){
            var self = this;
            var v = this.$('.view-main');
            var left = (Math.random() * 80);
            var top = (Math.random() * 100);

            var house = houseTemplate({type: houseType, left: left, top: top});

            window.setTimeout(function() {
                self.removeHouse(house);
            }, 3000);

            v.append(house);
            house.animate({opacity: 1}, 500);
        },

        houseClicked: function(event){
            var house = $(event.target).closest('.house');

            this.trigger('boughtMortgage', house);
            //house.remove();
        },

        removeHouse: function(house) {
            var boundHouseRemove = _(house.remove).bind(house);

            house.animate({opacity: 0}, 500, function(){
                boundHouseRemove();
            });
        }

    });
});