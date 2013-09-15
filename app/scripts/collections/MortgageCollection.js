define([
    'models/MortgageModel'
], function(
    MortgageModel
){
    'use strict';

    return Backbone.Collection.extend({

        defaultChance: 0.5,

        model: MortgageModel,

        mortgageDefault: function(){
            var randomIndex, randomMortgage;

            if(this.isEmpty()){
                return;
            }

            if(Math.random() < this.defaultChance){
                randomIndex = Math.floor(Math.random() * this.length);
                randomMortgage = this.at(randomIndex);
                this.trigger('defaulted', randomMortgage.toJSON());
                this.remove(randomMortgage);
            }
        }

    });

});