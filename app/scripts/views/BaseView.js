define([
    'views/MortgageMarketView',
    'views/MortgageInventoryView',
    'views/CDOInventoryView',
    'views/BankerView',
    'helpers/MortgageHelper',
    'mustache!base'
], function(
    MortgageMarketView,
    MortgageInventoryView,
    CDOInventoryView,
    BankerView,
    MortgageHelper,
    baseTemplate
) {
    'use strict';

    return Backbone.View.extend({

        initialize: function(){

            this.banker = {
                amount: 0
            };

            this.bankerView = new BankerView({
                banker: this.banker
            });

            this.mortgageMarketView = new MortgageMarketView();
            this.mortgageInventoryView = new MortgageInventoryView();
            this.cdoInventoryView = new CDOInventoryView();

            this.listenTo(this.mortgageMarketView, 'boughtMortgage', this.onBoughtMortgage);
        },

        render: function(){
            this.$el.html(baseTemplate());

            this.mortgageMarketView.$el = this.$('.mortgage-market');
            this.mortgageMarketView.render();

            this.mortgageInventoryView.$el = this.$('.mortgage-inventory');
            this.mortgageInventoryView.render();

            this.cdoInventoryView.$el = this.$('.cdo-inventory');
            this.cdoInventoryView.render();

            this.bankerView.$el = this.$('.banker');
            this.bankerView.render();
        },

        onBoughtMortgage: function(type){
            var mortgageModel = MortgageHelper.createModel(type);

            this.banker.amount += mortgageModel.get('valuation');

            this.bankerView.updateCalculatorDisplay();
        }

    });

});