define([

], function(

){
    'use strict';

    return Backbone.Model.extend({

        initialize: function(options){
           this.mortgages = options.mortgages;
        },



    });
});