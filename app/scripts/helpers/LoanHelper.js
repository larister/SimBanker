define([
    
], function(
    
) {
    'use strict';

    return Backbone.Model.extend({

        initialize: function(){
            this.interest = 0.3;
            this.outstandingLoan = 0;
        },


        getLoan: function() {
            this.outstandingLoan += 1000;
            this.interest += 0.2;
            return 1000;
        },

        getPayment: function() {
            if (this.outstandingLoan > 0 ) {
                return (this.outstandingLoan * this.interest) / 100;
            }

            return 0;
        },

        addBroker: function() {
            this.brokers++;
        }

    });

});