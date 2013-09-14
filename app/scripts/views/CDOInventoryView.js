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

            

        },

        render: function(){
            var self = this;
            var tpl = cdoInventoryTemplate();
            this.$el.append(tpl);
            this.main = tpl.find('#cdoi-main');
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
            var viewToRemove = _(this.  cdoViews).select(
                function(mv) {
                    return mv.model === cdo;
                })[0];

            this.cdoViews = _(this.cdoViews).without(viewToRemove);

            $(viewToRemove.el).remove();
        }

    });
});