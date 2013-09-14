/**
 * RequireJS mustache plugin
 *
 * Steve Mason Brandwatch 2011
 *
 * usage:
 *  require(['ModuleA', 'mustache!myTemplate'], function (ModuleA, myTemplate) {
 *      var a = new ModuleA();
 *    var html = myTemplate({foo: 'bar'});
 *
 *      $(a.el).html(html);
 *  });
 *
 * The module will also automatically use innerShiv to "fix" HTML5 elements in IE
 *
 *
 * Configuration:
 *  var require = {
 *    ... curl configuration ...
 *    mustache: {
 *      rootUrl: '/js/templates'
 *      templateExtension: 'bar'  // Default = 'template'
 *    }
 *  };
 */
define(['text', 'lib/mustache', 'mustache-common'], function(text, mustache, mustacheCommon){
    'use strict';
    var templateCache = {};

    return {
        'load': function (resourceId, require, callback, config) {
            var options = mustacheCommon.getOptions(resourceId, config),
                name = options.name,
                fullName = options.fullName;

            function doIt(data, partials, wrapInjQuery){
                return mustacheCommon.render(templateCache[name], data, partials, wrapInjQuery);
            }

            if(templateCache[name]){
                return callback(doIt);
            }

            // The text plugin knows how to load files in node, rhino(!), and the browser, so let it do the hard work
            text.get(fullName, function(template){
                if(!templateCache[name]){
                    templateCache[name] = mustache.compile(template);
                }
                callback(doIt);
            });
        },
        pluginBuilder: 'mustacheBuilder'
    };
});
