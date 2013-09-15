define([
    'models/CDOModel'
], function(
    CDOModel
) {
    'use strict';

    return Backbone.Collection.extend({

        model: CDOModel,

    });

});