/**
@name callLazy

@description
Call lazy load.
*/

bbjs.callLazy = function(){

    'use strict';

    $(".js-lazy").lazyload({
        effect: "fadeIn"
    });

};





/**
@name callCarousel

@description
Call a generic owl carousel.
*/

bbjs.callCarousel = function(){

    'use strict';

    $(".js-carousel").owlCarousel({
        items: 1,
        slideBy: 1,
        loop: true,
        mouseDrag: false,
        dots: true,
        nav: true,
        lazyLoad: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsiveRefreshRate: 0,
        navText: ["", ""],
        smartSpeed: 300
    });

};





$(function() {
    FastClick.attach(document.body);
});
