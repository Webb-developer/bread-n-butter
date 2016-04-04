

/*------------------------------------*\
    #PLUGINS
\*------------------------------------*/



(function(){

    'use strict';


    // Fast Click

    if(globalSettings.fastclick === true){

        FastClick.attach(document.body);
        
    }


    // Masonry

    if(globalSettings.masonry === true){

        var $masonryContainer = $(".js-masonry");


        $masonryContainer.imagesLoaded(function(){

            $masonryContainer.masonry({
                itemSelector: '.js-masonry__item'
            });

        });

    }


    // Easy Zoom, not on touch screens

    if(touchTest() === true && globalSettings.easyzoom === true){
        $('.js-easyzoom').easyZoom();
    }

})();





// Lazy Load

function callLazy(options){

    'use strict';


    // We want to wait for other images to load before
    // we start lazy loading.

    cache.$main.imagesLoaded(function(){

        $(".js-lazy").lazyload(typeof(options) === "undefined" ? globalSettings.lazyload.options : options);

    });

}





// General Carousel

function callCarousel(){

    'use strict';


    var carousel = $(".js-carousel").owlCarousel({
        items: 1,
        slideBy: 1,
        loop: true,
        mouseDrag: true,
        dots: false,
        nav: true,
        lazyLoad: true,
        responsiveRefreshRate: 0,
        navText: globalSettings.carousels.arrows,
        smartSpeed: 250
    });

    return carousel;

}




// Instafeed

function callInstafeed(callback){

    'use strict';
    

    if($("#instafeed").length > 0){

        var userFeed = new Instafeed({
            get: 'user',
            userId: globalSettings.instafeed.userID,
            limit: globalSettings.instafeed.limit,
            accessToken: globalSettings.instafeed.token,
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

    }

}

