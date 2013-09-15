define([
    'mustache!mortgageInventory',
    'collections/MortgageCollection',
    'views/MortgageView'
], function(
    mortgageInventoryTemplate,
    MortgageCollection,
    MortgageView
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){

            this.mortgageViews = [];

            this.collection = new MortgageCollection();

            this.listenTo(this.collection, 'add', this.add);
            this.listenTo(this.collection, 'remove', this.remove);

        },

        render: function(){
            var self = this;
            this.$el.empty();
            this.main = mortgageInventoryTemplate();
            this.$el.append(this.main);
            this.main.empty();
            _(this.mortgageViews).each(function(mv) {
                self.main.append(mv.render().$el);
            });

            return this;
        },

        add: function(mortgage) {
            var m = new MortgageView({ model: mortgage });
            this.mortgageViews.push(m);
            this.main.append(m.render().$el);
        },

        remove: function(mortgage) {
            var viewToRemove = _(this.mortgageViews).find(
                function(mv) {
                    return mv.model === mortgage;
                });

            this.mortgageViews = _(this.mortgageViews).without(viewToRemove);

            viewToRemove.remove();
        }

    });
});
