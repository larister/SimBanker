define([
    'mustache!banker'
], function(
    bankerTemplate
){
    'use strict';

    var MEDIUM_BANKER_THRESHOLD = 10,
        FAT_BANKER_THRESHOLD = 20,
        EVIL_BANKER_THRESHOLD = 30;

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
        },

        updateBankerImage: function(){
            var amount = this.banker.amount;

            if(amount >= MEDIUM_BANKER_THRESHOLD && amount < FAT_BANKER_THRESHOLD){
                this.showMediumBanker();
            } else if(amount >= FAT_BANKER_THRESHOLD && amount < EVIL_BANKER_THRESHOLD){
                this.showFatBanker();
            } else if(amount >= EVIL_BANKER_THRESHOLD){
                this.showEvilBanker();
            }
        },

        showMediumBanker: _(function(){
            this.$('.banker-image-container img').attr('src', 'img/banker/MainBanker2.png');
        }).once(),

        showFatBanker: _(function(){
            this.$('.banker-image-container img').attr('src', 'img/banker/MainBanker3.png');
        }).once(),

        showEvilBanker: _(function(){
            this.$('.banker-image-container img').attr('src', 'img/banker/MainBanker4.png');
        }).once()

    });
});