define([
    'models/MortgageModel'
], function(
    MortgageModel
){
    'use strict';

    return {

        mortgageTypes: [
            {type: 'MortgageIcon1', valuation: 1},
            {type: 'MortgageIcon2', valuation: 2},
            {type: 'MortgageIcon3', valuation: 3}
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