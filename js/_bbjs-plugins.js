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
