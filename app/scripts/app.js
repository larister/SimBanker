define(['views/BaseView'], function(BaseView) {
    'use strict';

    var baseView = new BaseView({
        el: $('.main-app')
    });

    baseView.render();

});