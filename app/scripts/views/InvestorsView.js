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
            this.investorStatus = {};
            this.investorStatus.low = false;
            this.investorStatus.med = false;
            this.investorStatus.high = false;
            
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
            if(!this.investorStatus[investorType]) {
                var v = this.$('#'+investorType);
                var investor = investorTemplate({type: investorType});
                $(investor).on("click",function() {
                    self.sellCDO();
                    self.investorsDisappear();
                })
                v.append(investor);
                this.moveLeft(investor);
            }
        },

        investorsDisappear: function(investorType){
            for (var type in this.investorStatus) {
                if(this.investorStatus[type]) {
                    var inv = this.$('#'+type);
                    this.moveRight(inv);
                }
            }
        },        

        moveLeft: function(investor){
            this.investorStatus[investor.attr('data-type')] = true;
            investor.animate({left: '0px'}, 4000);
        },

        moveRight: function(investorHolder){
            var investor = jQuery(investorHolder).find('.investor');
            var self = this;
            var boundInvestorRemove = _(investor.remove).bind(investor);
            investor.animate({left: '300px'}, 4000, function(){
                self.investorStatus[investor.attr('data-type')] = false;
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

