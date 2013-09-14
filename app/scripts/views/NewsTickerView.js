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
        	var nextNewsItem;
			for (var i=0;i<this.items.length;i++) {
				nextNewsItem = this.items[i];
				this.items.splice(i, 1);
				break;
			}

        	var self = this;
            var v = this.$el.find('.news-update');

            var newsItem = newsItemTemplate({headline: nextNewsItem.Headline, summary: nextNewsItem.Summary, author: nextNewsItem.Author});

            window.setTimeout(function() {
            	self.removeNewsItem(newsItem);
            }, 20000);

            v.append(newsItem);
            newsItem.animate({opacity: 1}, 100);
        },

        removeNewsItem: function(newsItem) {
            newsItem.animate({opacity: 0}, 100);
            newsItem.remove();
            this.updateTicker();//this isn't how updates will work eventually
        }

    });
});
		
		