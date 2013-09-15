define([
    'helpers/InvestorDemandHelper',
    'mustache!investorsView',
    'mustache!investor'
], function(
    InvestorDemandHelper,
	investorsViewTemplate,
    investorTemplate
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(options){
            this.investorHelper = new InvestorDemandHelper();
            this.cdoInventory = options.cdoInventory;
            this.banker = options.banker;
            this.listenTo(this.investorHelper, 'triggerVisit', _(this.investorsAppear).bind(this));
        },

        render: function(){
            this.$el.append(investorsViewTemplate());
        },

        investorsAppear: function(investorType){
            var v = this.$('.inv-main');
            var investor = investorTemplate({type: investorType});
            var self = this;
            $(investor).on("click",function() {
                self.sellCDO();
            })

            v.append(investor);

            this.moveLeft(investor);
        },

        moveLeft: function(investor){
            var self = this;

            investor.animate({left: '0px'}, 4000);

            setTimeout(function() {
                self.moveRight(investor);
            }, 3000);
        },

        moveRight: function(investor){
            var boundInvestorRemove = _(investor.remove).bind(investor);

            investor.animate({left: '300px'}, 4000, function(){
                boundInvestorRemove();
            });
        },

        sellCDO: function() {
            var profit = 0;
            var self = this;
            this.cdoInventory.forEach(function(cdo) {
                _.forEach(cdo.get("mortgages"), function(mortgage) {
                    profit += mortgage.get("valuation") * 1000;
                });
                self.trigger('soldCDO', cdo);
                self.cdoInventory.remove(cdo);
            });

            //should use this. but want remove event to fire
            //this.cdoInventory.reset();

            this.banker.amount += profit;


        }

    });
});

