define(function() {
    'use strict';

/* Investor demand/visits should be determined by increase in housing prices.
Becoming more frequent as increase in house prices steepens.
Disappearing altogether when house prices drop. */
    return Backbone.Model.extend({

        initialize: function(){
            this.investorVisits = 100;
            this.investorTypes = [
                'low',
                'med',
                'high',
            ];
            window.setTimeout(_.bind(this.triggerVisit, this), this.nextVisitTime());

        },

        nextVisitTime: function() {
            return Math.random() * 5000;
        },

        triggerVisit: function(){
            this.investorVisits--;
            var typeIndex = (Math.random() * 3);
            typeIndex = Math.floor(typeIndex);
            this.trigger('triggerVisit', this.investorTypes[typeIndex]);
            if (this.investorVisits > 0) {
                window.setTimeout(_.bind(this.triggerVisit, this), this.nextVisitTime());
            }
        }

    });

});