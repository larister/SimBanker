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
            this.$el.html(cdoTemplate());
        }

    });
});