/**
 * RequireJS mustache common functions (shared between client and server)
 *
 * Steve Mason Brandwatch 2011
 */
define([], function(){
    'use strict';
    /*globals $,window*/

    function makeParseHtml(){
        if(typeof window === 'undefined'){
            return;
        }
        // html5Shiv fixes setting .html() on HTML5 elements
        // And should only be included on the page if we're IE8 or below
        if(window.html5){ //This is included in Modernizr
            return function(html){
                if(!html){
                    return $();
                }
                var el = window.html5.createElement('div');
                el.innerHTML = html;
                return $(el).children();
            };
        }
        return function(html){
            return $(html);
        };
    }

    return {
        parseHtml: makeParseHtml(),
        getOptions: function(resourceId, config){
            var split = resourceId.split('!'),
                name = split[0],
                rootUrl = (config.rootUrl || (config.baseUrl + '/templates/')).replace(/\/\//g, '/'),
                ext = config.templateExtension || '.template',
                fullName = rootUrl + name + ext;

            return {
                name: name,
                fullName: fullName
            };
        },
        render: function render(template, data, partials, wrapInjQuery){
            var html;

            if(typeof partials === 'boolean' && wrapInjQuery === undefined){
                wrapInjQuery = partials;
                partials = undefined;
            }

            html = template(data, partials);

            if(wrapInjQuery === false){
                return html;
            }

            return this.parseHtml(html);
        }
    };
});
