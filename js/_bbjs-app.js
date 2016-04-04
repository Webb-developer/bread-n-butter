

// Andrew Puig
// puigandrew.com
// andrew.lpuig@gmail.com


// VERSION: 1.2


/*
*
* CONTENTS
*
* /VENDOR..........................All vendor files that we use.
*
* PARTIALS.........................A rollup of our _partials & call to our partial's functions
*
* PLUGINS..........................Our vendor related functions and setup.
*
* FUNCTIONS........................A list of our custom functions that we will call
*
* UTILITIES........................Plug and play code.
*
* SHOPIFY UTILITIES................Plug and play code, intended for Shopify.
*
*/





/*------------------------------------*\
    #SETTINGS
\*------------------------------------*/



// Configure your BBJS a bit

var globalSettings = {

    lazyload: {
        enable: true,
        options: {
            effect: "fadeIn"
        }
    },

    fastclick: true,

    easyzoom: false,

    masonry: false,

    // Owl Carousel
    carousels: {
        enable: true,
        arrows: ["<div class='icon' style='background-image: url(https://cdn.shopify.com/s/files/1/1165/8092/t/2/assets/brand-arrow--white.svg);'>", "<div class='icon' style='background-image: url(https://cdn.shopify.com/s/files/1/1165/8092/t/2/assets/brand-arrow--white.svg);'>"]
    },

    instafeed: {
        enable: false,
        userID: 2086538353,
        token: "399162166.1677ed0.3d0c9e3cb43447618deded7ebf2eab62",
        limit: 30
    }

};



// Create an object for caching of common variables

var cache = {

    $html:   $("html"),

    $body:   $("body"),

    $main:   $(".js-main"),

    $header: $(".js-header"),

    $footer: $(".js-footer"),

    $doc:    $(document),

    $window: $(window)

};




/*------------------------------------*\
    #TOUCH-TEST
\*------------------------------------*/



// Returns true only on mobile touch not desktop touch
// Requires touch support in modernizr

function touchTest(){

    'use strict';

    return cache.$html.hasClass("touchevents") && (cache.$html.hasClass('desktop') || cache.$html.hasClass('no-touchevents'));
}




/*------------------------------------*\
    #VENDORS
\*------------------------------------*/



// @codekit-prepend "vendor/fastclick.js";

// @codekit-prepend "vendor/images-loaded.js";

// @codekit-prepend "vendor/easyzoom-modified.js";

// @codekit-prepend "vendor/instafeed.js";

// @codekit-prepend "vendor/masonry.js";

// @codekit-prepend "vendor/lazyload.js";

// @codekit-prepend "vendor/owl-carousel.js";





/*------------------------------------*\
    #PARTIALS
\*------------------------------------*/



// @codekit-append "_bbjs-partials.js";


