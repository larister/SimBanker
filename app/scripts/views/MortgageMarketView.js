define(['mustache!house', 'mustache!mortgageMarketView'], function(houseTemplate, mmvTemplate) {
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.render();
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
        }

    });
});