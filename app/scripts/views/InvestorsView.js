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

        initialize: function(){
            this.lowRiskVisible = false;
            this.medRiskVisible = false;
            this.highRiskVisible = false;
            
            this.investorHelper = new InvestorDemandHelper();
            this.listenTo(this.investorHelper, 'triggerVisit', _(this.investorsAppear).bind(this));
        },

        render: function(){
            this.$el.append(investorsViewTemplate());
        },

        investorsAppear: function(investorType){
            if(!this.getFlag(investorType)) {
                var v = this.$('#'+investorType);
                var investor = investorTemplate({type: investorType});
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
        }

    });
});

