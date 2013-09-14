define([
    'views/MortgageMarketView',
    'views/NewsTickerView',
    'mustache!base'
], function(
    MortgageMarketView,
    NewsTickerView,
    baseTemplate
) {
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.mortgageMarketView = new MortgageMarketView();
            this.newsTickerView = new NewsTickerView();
        },

        render: function(){
            this.$el.html(baseTemplate());

            this.mortgageMarketView.$el = this.$('.mortgage-market');

            this.mortgageMarketView.render();

            this.newsTickerView.$el = this.$('.news-ticker');
            this.newsTickerView.render();
        }

    });

});