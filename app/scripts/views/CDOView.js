define([
    'mustache!cdo'
], function(
    cdoTemplate
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
        },

        render: function(){
            this.$el = cdoTemplate();
            console.log("RENDER");
            return this;
        }

    });
});