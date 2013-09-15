define([
    'models/MortgageModel'
], function(
    MortgageModel
){
    'use strict';

    return Backbone.Collection.extend({

        defaultChance: 0.05,

        model: MortgageModel,

        mortgageDefault: function(){
            var randomIndex;

            if(Math.random() < this.defaultChance){
                randomIndex = Math.floor(Math.random() * this.length);
                this.remove(this.at(randomIndex));
            }
        }

    });

});