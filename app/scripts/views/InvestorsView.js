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
            this.investorHelper = new InvestorDemandHelper();
            this.listenTo(this.investorHelper, 'triggerVisit', _(this.investorsAppear).bind(this));
        },

        render: function(){
            this.$el.append(investorsViewTemplate());
        },

        investorsAppear: function(investorType){
            var v = this.$('.inv-main');
            var investor = investorTemplate({type: investorType});

            v.append(investor);

            this.moveLeft(investor);
        },

        investorsDisappear: function() {

        },

        moveLeft: function(investor){
            var self = this;

            investor.animate({left: '0px'}, 2000);

            window.setTimeout(function() {
                self.moveRight(investor);
            }, 3000);
        },

        moveRight: function(investor){
            var boundInvestorRemove = _(investor.remove).bind(investor);

            investor.animate({left: '110px'}, 2000, function(){
                boundInvestorRemove();
            });
        }

    });
});

