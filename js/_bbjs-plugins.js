(function(){

    'use strict';


    if(bbjs.settings.fastclick){
        FastClick.attach(document.body);
    }

})();





/**
@name callLazy

@description
Call lazy load, see further comments below.
*/

bbjs.callLazy = function(options){

    'use strict';

    $(".js-lazy").lazyload(typeof(options) === "undefined" ? bbjs.settings.lazyload.options : options);

};





/**
@name callCarousel

@description
Call a generic owl carousel.
*/

bbjs.callCarousel = function(){

    'use strict';


    var carousel = $(".js-carousel").owlCarousel({
        items: 1,
        slideBy: 1,
        loop: true,
        mouseDrag: false,
        dots: true,
        nav: true,
        lazyLoad: true,
        autoplay: true,
        autoplayTimeout: 4000,
        responsiveRefreshRate: 0,
        navText: bbjs.settings.carousels.arrows,
        smartSpeed: 300
    });

    return carousel;

};




/**
@name callInstafeed [http://instafeedjs.com]

@description
Setup our user instafeed.
*/

bbjs.callInstafeed = function(callback){

    'use strict';
    

    if($("#instafeed").length){

        var $loadMore = $(".js-instafeed-load");

        var userFeed = new Instafeed({
            get: 'user',
            userId: bbjs.settings.instafeed.userID,
            limit: bbjs.settings.instafeed.limit,
            accessToken: bbjs.settings.instafeed.token,
            sortBy: "most-recent",
            resolution: "standard_resolution",
            template: '<div class="instafeed__item"><img class="instafeed__img" src="{{image}}"><div class="instafeed__text">{{caption}}</div></div>',
            after: function(){

                if(typeof(callback) === "function"){
                    callback();
                }

            }
        });

        userFeed.run();


        $loadMore.on("click", function(){
            userFeed.next();
        });

    }

};
