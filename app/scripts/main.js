require.config({
    paths: {
        'jquery': '../bower_components/jquery/jquery',
        'text': '../bower_components/requirejs-text/text',
        'mustache': '/scripts/lib/requirejs-helpers/mustache',
        'mustache-common': '/scripts/lib/requirejs-helpers/mustache-common',
        'lib/mustache': '../bower_components/mustache/mustache'
    }
});

require(['app', 'jquery'], function (app, $) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
