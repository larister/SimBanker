define([
    'views/MortgageMarketView',
    'views/NewsTickerView',
    'views/MortgageInventoryView',
    'views/CDOInventoryView',
    'views/BankerView',
    'views/InvestorsView',
    'helpers/MortgageHelper',
    'mustache!base'
], function(
    MortgageMarketView,
    NewsTickerView,
    MortgageInventoryView,
    CDOInventoryView,
    BankerView,
    InvestorsView,
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
            this.newsTickerView = new NewsTickerView();
            this.mortgageInventoryView = new MortgageInventoryView();
            this.cdoInventoryView = new CDOInventoryView();
            this.investorView = new InvestorsView();

            this.listenTo(this.mortgageMarketView, 'boughtMortgage', this.onBoughtMortgage);
        },

        render: function(){
            this.$el.html(baseTemplate());

            this.mortgageMarketView.$el = this.$('.mortgage-market');
            this.mortgageMarketView.render();

            this.newsTickerView.$el = this.$('.news-ticker');
            this.newsTickerView.render();

            this.bankerView.$el = this.$('.banker');
            this.bankerView.render();

            this.mortgageInventoryView.$el = this.$('.mortgage-inventory');
            this.mortgageInventoryView.render();

            this.cdoInventoryView.$el = this.$('.cdo-inventory');
            this.cdoInventoryView.render();         

            this.investorView.$el = this.$('.investors');
            this.investorView.render();

            this.setIncomeTimer();
        },

        setIncomeTimer: function(){

        },

        onBoughtMortgage: function(type){
            var mortgageModel = MortgageHelper.createModel(type);

            this.banker.amount += mortgageModel.get('valuation');

            this.bankerView.updateCalculatorDisplay();

            this.mortgageInventoryView.collection.add(mortgageModel);
        }

    });

});