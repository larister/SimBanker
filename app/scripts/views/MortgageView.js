define([
    'mustache!mortgage',
    'mustache!tooltip'
], function(
    mortgageTemplate,
    tooltipTemplate
){
    'use strict';

    return Backbone.View.extend({

        render: function(){
            this.$el = mortgageTemplate();
            return this;
        },

        remove: function(){
            var boundRemove = _(Backbone.View.prototype.remove).bind(this);

            this.displayTooltip();

            this.$el.animate({opacity: 0}, 1000, function(){
                boundRemove();
            });
        },

        displayTooltip: function(){
            var mortgagePosition = this.$el.position();
            var tooltipData = {
                message: 'Mortgage defaulted!',
                top: mortgagePosition.top - 40,
                left: mortgagePosition.left - 40
            };
            var tooltip = tooltipTemplate(tooltipData).insertAfter(this.$el);

            tooltip.animate({opacity: 0}, 1000);
        }

    });
});