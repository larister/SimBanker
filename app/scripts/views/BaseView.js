define([
    'views/MortgageMarketView',
    'mustache!base'
], function(
    MortgageMarketView,
    baseTemplate
) {
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.mortgageMarketView = new MortgageMarketView();
        },

        render: function(){
            this.$el.html(baseTemplate());

            this.mortgageMarketView.$el = this.$('.mortgage-market');

            this.mortgageMarketView.render();
        }

    });

});