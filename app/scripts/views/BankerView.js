define([
    'mustache!banker'
], function(
    bankerTemplate
){
    'use strict';

    function formatNaturalNumber(number){

        if (number < 0) {
            return number.toString();
        }

        if(!_.isNumber(number) || isNaN(number)){
            return number || '';
        }

        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + ',');
    }


    return Backbone.View.extend({

        initialize: function(options){
            this.banker = options.banker;
        },

        render: function(){
            this.$el.append(bankerTemplate());
            this.updateCalculatorDisplay();
        },

        updateCalculatorDisplay: function(){
            var formattedAmount = formatNaturalNumber(this.banker.amount);

            this.$('.calculator-display').html(formattedAmount);
        }

    });
});