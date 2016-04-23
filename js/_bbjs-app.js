/**
@author Andrew Puig [andrew.lpuig@gmail.com]

@version 1.4
*/



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
* FUNCTIONS........................A list of our custom useful functions that we will call
*
* UTILITIES........................Plug and play code.
*
*/



// Declare BBJS as global object
window.bbjs = {};





/**
@property bbjs.settings

@description
Some basic bbjs configuration
*/

bbjs.settings = {

    lazyload: {
        enable: true,
        options: {
            effect: "fadeIn"
        }
    },

    fastclick: true,

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




/**
@property bbjs.cache

@description
Create an object for caching of common variables
I recommend using these cached variables for setting
rather then getting to ensure up to date results.
*/

bbjs.cache = {

    $html:   $("html"),

    $body:   $("body"),

    $main:   $(".js-main"),

    $window: $(window)

};




/*------------------------------------*\
    #VENDORS
\*------------------------------------*/



// Optional includes.


    // @codekit-prepend "vendor/fastclick.js";

    // @codekit-prepend "vendor/instafeed.js";

    // @codekit-prepend "vendor/lazyload.js";

    // @codekit-prepend "vendor/owl-carousel.js";


// End optional includes.



// Required includes.


    // @codekit-prepend "vendor/images-loaded.js";

    // @codekit-prepend "vendor/device.js";


// End required includes.






/*------------------------------------*\
    #PARTIALS
\*------------------------------------*/



// @codekit-append "_bbjs-partials.js";
