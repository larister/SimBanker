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
            this.lowRiskVisible = false;
            this.medRiskVisible = false;
            this.highRiskVisible = false;
            
            this.investorHelper = new InvestorDemandHelper();
            this.cdoInventory = options.cdoInventory;
            this.banker = options.banker;
            this.listenTo(this.investorHelper, 'triggerVisit', _(this.investorsAppear).bind(this));
        },

        render: function(){
            this.$el.append(investorsViewTemplate());
        },

        investorsAppear: function(investorType){
            self=this;
            if(!this.getFlag(investorType)) {
                var v = this.$('#'+investorType);
                var investor = investorTemplate({type: investorType});
                $(investor).on("click",function() {
                                self.sellCDO();
                            })
                v.append(investor);
                this.moveLeft(investor);
            }
        },

        moveLeft: function(investor){
            this.setFlag(investor.attr('data-type'), true);
            investor.animate({left: '0px'}, 4000);
            var self = this;
            setTimeout(function() {
                self.moveRight(investor);
            }, 3000);
        },

        moveRight: function(investor){
            var boundInvestorRemove = _(investor.remove).bind(investor);
            investor.animate({left: '300px'}, 4000, function(){
                boundInvestorRemove();
            });
            this.setFlag(investor.attr('data-type'), false);
        },

        setFlag: function(investorType, flag) {
            switch(investorType)
            {
                case 'low':
                  this.lowRiskVisible = flag;
                  break;
                case 'med':
                  this.medRiskVisible = flag;
                  break;
                case 'high':
                  this.highRiskVisible = flag;
            }
        },

        getFlag: function(investorType) {
            switch(investorType)
            {
                case 'low':
                  return this.lowRiskVisible;
                case 'med':
                  return this.medRiskVisible;
                case 'high':
                  return this.highRiskVisible;
            }
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

