define([
    'views/MortgageMarketView',
    'views/NewsTickerView',
    'views/IncomeView',
    'views/MortgageInventoryView',
    'views/CDOInventoryView',
    'views/BankerView',
    'views/InvestorsView',
    'helpers/MortgageHelper',
    'mustache!base',
    'helpers/LoanHelper'
], function(
    MortgageMarketView,
    NewsTickerView,
    IncomeView,
    MortgageInventoryView,
    CDOInventoryView,
    BankerView,
    InvestorsView,
    MortgageHelper,
    baseTemplate,
    LoanHelper
) {
    'use strict';

    return Backbone.View.extend({

        initialize: function(){

            this.banker = {
                amount: 0
            };

            this.income = {
                increment: 0,
                loan: 0
            };

            this.loanHelper = new LoanHelper();


            this.mortgageMarketView = new MortgageMarketView();
            this.newsTickerView = new NewsTickerView();

            this.mortgageInventoryView = new MortgageInventoryView();
            this.cdoInventoryView = new CDOInventoryView({
                banker: this.banker,
                mortgagesInventory: this.mortgageInventoryView.collection
            });

            this.bankerView = new BankerView({
                banker: this.banker,
                spawnHelper: this.mortgageMarketView.spawnHelper,
                loanHelper: this.loanHelper
            });
            this.incomeView = new IncomeView({
                income: this.income
            });

            this.investorView = new InvestorsView({
                cdoInventory: this.cdoInventoryView.collection,
                banker: this.banker
            });

            this.listenTo(this.mortgageMarketView, 'boughtMortgage', this.onBoughtMortgage);
            this.listenTo(this.bankerView, 'broughtUpgrade', this.onBroughtUpgrade);
            this.listenTo(this.investorView, 'soldCDO', this.onSoldCDO);
            this.listenTo(this.bankerView, 'gotLoan', this.onGotLoan);
            this.listenTo(this.mortgageInventoryView.collection, 'defaulted', this.onDefault);
        },

        render: function(){
            this.$el.html(baseTemplate());

            this.mortgageMarketView.$el = this.$('.mortgage-market');
            this.mortgageMarketView.render();

            this.newsTickerView.$el = this.$('.news-ticker');
            this.newsTickerView.render();

            this.bankerView.$el = this.$('.banker');
            this.bankerView.render();

            this.incomeView.$el = this.$('.income-counter');
            this.incomeView.render();

            this.mortgageInventoryView.$el = this.$('.mortgage-inventory');
            this.mortgageInventoryView.render();

            this.cdoInventoryView.$el = this.$('.cdo-inventory');
            this.cdoInventoryView.render();

            this.investorView.$el = this.$('.investors');
            this.investorView.render();

            this.setTicker();
        },

        setTicker: function(){
            if(this.ticker){
                clearTimeout(this.ticker);
            }

            this.ticker = setTimeout(_(this.onTick).bind(this), 1000);
        },

        onTick: function(){

            this.income.loan = this.loanHelper.getPayment();

            this.incomeView.updateIncomeIncrement();

            this.banker.amount += (this.income.increment - this.income.loan);

            this.mortgageInventoryView.collection.mortgageDefault();

            this.bankerView.updateBankerImage();
            this.bankerView.updateCalculatorDisplay();
            this.bankerView.updateResearchPanel();

            this.setTicker();
        },

        onBoughtMortgage: function(mortgage){

            var type = mortgage.data('type');
            var mortgageModel = MortgageHelper.createModel(type);
            var worth =  mortgageModel.get('valuation') * 500
            if (this.banker.amount > worth) {

                this.banker.amount -= worth;
                this.income.increment += mortgageModel.get('valuation');
                this.incomeView.updateIncomeIncrement();

                this.mortgageInventoryView.collection.add(mortgageModel);
                mortgage.remove();
            }else {
                console.log("NO");
            }

        },


        onBroughtUpgrade: function(upgrade) {
            if (upgrade == "sub-prime") {

            };
        },

        onSoldCDO: function(cdo) {

            var total = 0;

            _.each(cdo.get('mortgages'), function(m) {
                total += m.get('valuation');

            });
            this.income.increment -= total;
            this.incomeView.updateIncomeIncrement();
        },

        onDefault: function(mortgage){
            this.income.increment -= mortgage.valuation;
            this.incomeView.updateIncomeIncrement();

            this.banker.amount += mortgage.valuation;
            this.bankerView.updateCalculatorDisplay();
        }

    });

});