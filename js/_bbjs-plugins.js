(function(){

    'use strict';


    // @name Fast Click
    // https://github.com/ftlabs/fastclick

    if(globalSettings.fastclick){
        FastClick.attach(document.body);
    }

})();





// @name Lazy Load
// http://www.appelsiini.net/projects/lazyload

function callLazy(options){

    'use strict';


    // We want to wait for other images to load before
    // we start lazy loading. That way if were waiting for images loaded
    // to show the page, it will show faster.
    cache.$main.imagesLoaded(function(){

        $(".js-lazy").lazyload(typeof(options) === "undefined" ? globalSettings.lazyload.options : options);

    });

}





// @name Owl Carousel
// http://www.owlcarousel.owlgraphic.com/

function callCarousel(){

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
        navText: globalSettings.carousels.arrows,
        smartSpeed: 300
    });

    return carousel;

}




// @name Instafeed
// http://instafeedjs.com/

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
