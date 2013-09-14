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
            // this.listenTo(this.investorHelper, 'triggerVisit', _(this.investorsAppear).bind(this));
        },

        render: function(){
            this.$el.append(investorsViewTemplate());
            this.investorsAppear();
        },

        investorsAppear: function(investorType){
            var self = this;
            var v = this.$('.inv-main');

            var investor = investorTemplate({type: 'SafeInvestor', right: -100});

            // // window.setTimeout(function() {
            // //     self.moveRight(investor);
            // // }, 3000);

            v.append(investor);
            this.moveLeft(investor);
        },

        investorsDisappear: function() {

        },

        moveLeft: function(investor){
            var self = this;

            investor.slideDown();

            // investor.animate({left: "+=100px"}, 2000);

            window.setTimeout(function() {
                self.moveRight(investor);
            }, 3000);
        },

        moveRight: function(investor){
            // investor.animate({left: "10px"}, 2000);
            investor.remove();
        }

    });
});

