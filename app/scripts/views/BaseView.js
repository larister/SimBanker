define([
    'views/MortgageMarketView',
    'views/NewsTickerView',
    'views/MortgageInventoryView',
    'views/CDOInventoryView',
    'mustache!base'
], function(
    MortgageMarketView,
    NewsTickerView,
    MortgageInventoryView,
    CDOInventoryView,
    baseTemplate
) {
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.mortgageMarketView = new MortgageMarketView();
            this.newsTickerView = new NewsTickerView();
            this.mortgageInventoryView = new MortgageInventoryView();
            this.cdoInventoryView = new CDOInventoryView();
        },

        render: function(){
            this.$el.html(baseTemplate());

            this.mortgageMarketView.$el = this.$('.mortgage-market');
            this.mortgageMarketView.render();

            this.mortgageInventoryView.$el = this.$('.mortgage-inventory');
            this.mortgageInventoryView.render();


            this.cdoInventoryView.$el = this.$('.cdo-inventory');
            this.cdoInventoryView.render();

            this.newsTickerView.$el = this.$('.news-ticker');
            this.newsTickerView.render();
        }

    });

});