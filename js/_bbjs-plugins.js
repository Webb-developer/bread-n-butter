

/*------------------------------------*\
    #PLUGINS
\*------------------------------------*/



(function(){

    'use strict';


    // Fast Click

    if(globalSettings.fastclick){

        FastClick.attach(document.body);
        
    }

})();





// Lazy Load

function callLazy(options){

    'use strict';


    // We want to wait for other images to load before
    // we start lazy loading. That way if were waiting for images loaded
    // to show the page, it will show faster.

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
        dots: true,
        nav: true,
        lazyLoad: true,
        responsiveRefreshRate: 0,
        navText: globalSettings.carousels.arrows,
        smartSpeed: 300
    });

    return carousel;

}




// Instafeed

function callInstafeed(callback){

    'use strict';
    

    if($("#instafeed").length){

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

