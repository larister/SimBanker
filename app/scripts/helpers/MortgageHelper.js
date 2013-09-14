define([
    'models/MortgageModel'
], function(
    MortgageModel
){
    'use strict';

    return {

        mortgageTypes: [
            {type: 'house', valuation: 1},
            {type: 'mansion', valuation: 2},
            {type: 'castle', valuation: 3}
        ],

        createModel: function(mortgageType){
            var options = _(this.mortgageTypes).findWhere({type: mortgageType});

            if(!options){
                throw new Error('Could not find mortgage type: ', mortgageType);
            }

            return new MortgageModel(options);
        }

    };

});