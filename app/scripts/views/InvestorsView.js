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
            var self = this;
            var v = this.$('.inv-main');

            var investor = investorTemplate({type: investorType, right: -100});

            window.setTimeout(function() {
                self.moveRight(investor);
            }, 3000);

            v.append(investor);
            investor.moveLeft();
        },

        investorsDisappear: function() {
            
        },

        moveLeft: function(investor){
            investor.animate({opacity: 1}, 100);
            investor.style.right = parseInt(investor.style.right) + 10 + 'px';
            animate = setTimeout(moveLeft,20); // call moveLeft in 20msec

            window.setTimeout(function() {
                self.moveRight(investor);
            }, 3000);
        },

        moveRight: function(investor){
            investor.style.left = parseInt(investor.style.left) + 10 + 'px';
            animate = setTimeout(moveRight,20); // call moveRight in 20msec
            investor.animate({opacity: 0}, 100);
            investor.remove();
        }

    });
});
		
		