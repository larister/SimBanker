define([
    'mustache!cdo'
], function(
    cdoTemplate
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.render();
        },

        render: function(){
            this.$el = cdoTemplate();
            return this;
        }

    });
});