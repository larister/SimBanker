define([
    'mustache!cdoInventory',
    'collections/CDOCollection',
    'views/CDOView'
], function(
    cdoInventoryTemplate,
    CDOCollection,
    CDOView
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){

            this.cdoViews = [];

            this.collection = new CDOCollection();

            this.listenTo(this.collection, 'add', this.add);
            this.listenTo(this.collection, 'remove', this.remove);
            this.tpl = cdoInventoryTemplate();
            this.main = this.tpl.find('#cdoi-main');
            this.buyButton = this.tpl.find('#buy-cdo');
            this.listenTo(this.buyButton, 'click', this.buyCDO);
        },

        render: function(){
            var self = this;
            this.$el.empty();
            this.$el.append(this.tpl);
            
            this.main.empty();
            _(this.cdoViews).each(function(mv) {
              self.main.append(mv.render().el);
            });
            return this;
        },

        add: function(cdo) {
            var m = new CDOView({ model: cdo });
            this.cdoViews.push(m);
            this.main.append(m.render().$el);
        },

        remove: function(cdo) {
            var viewToRemove = _(this.cdoViews).select(
                function(mv) {
                    return mv.model === cdo;
                })[0];

            this.cdoViews = _(this.cdoViews).without(viewToRemove);

            $(viewToRemove.el).remove();
        },

        buyCDO: function() {
            if (this.banker.amount > 1000 && this.mortgagesInventory.count() > 10) {
                this.banker.amount -= 1000;
                var ms = [];
                for (var i = 0; i < 10; i++) {
                    ms.push(this.mortgagesInventory.pop());
                };

                this.collection.add({mortgages: ms});
            } else {
                console.log("NO");
            }
        }

    });
});