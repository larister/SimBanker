define([
    'views/MortgageMarketView',
    'views/MortgageInventoryView',
    'views/CDOInventoryView',
    'mustache!base'
], function(
    MortgageMarketView,
    MortgageInventoryView,
    CDOInventoryView,
    baseTemplate
) {
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.mortgageMarketView = new MortgageMarketView();
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
        }

    });

});