define([
    'text!json/headlines.json',
    'mustache!newsItem',
    'mustache!ticker'
], function(
    headlines,
    newsItemTemplate,
    tickerTemplate
){
    'use strict';

    return Backbone.View.extend({

        initialize: function(){
            this.age=0;
            //load in headlines.json into array
            this.items=JSON.parse(headlines);
        },

        render: function(){
            this.$el.append(tickerTemplate());
            this.updateTicker();
        },

        updateTicker: function(){
            this.age++;
            //if avgHousePrice >= item.housePrice pop item from array and display in newsItem template
            var nextNewsItem = this.items[this.age % this.items.length];

            var self = this;
            var v = this.$el.find('.news-update');

            var newsItem = newsItemTemplate(nextNewsItem);

            window.setTimeout(function() {
                self.removeNewsItem(newsItem);
            }, 1000);

            v.append(newsItem);
            newsItem.animate({opacity: 1}, 200);
        },

        removeNewsItem: function(newsItem) {
            var boundUpdateTicker = _(this.updateTicker).bind(this);

            newsItem.animate({opacity: 0}, 200, function(){
                newsItem.remove();
                boundUpdateTicker(); //this isn't how updates will work eventually
            });
        }

    });
});

