define([
    'mustache!income'
], function(
    incomeTemplate
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(options){
            this.income = options.income;
        },

        render: function(){
            this.$el.append(incomeTemplate());
            this.updateIncomeIncrement();
        },

        updateIncomeIncrement: function(){
            this.$('.income-increment').html(this.income.increment);
        }

    });
});