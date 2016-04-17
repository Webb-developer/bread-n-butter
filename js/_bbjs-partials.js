/*------------------------------------*\
    #PARTIALS
\*------------------------------------*/



// @codekit-prepend "_bbjs-plugins.js";

// @codekit-prepend "_bbjs-functions.js";

// @codekit-prepend "_bbjs-utilities.js";

// @codekit-prepend "_bbjs-shopify-utilities.js";




/*------------------------------------*\
    BBJS FUNCTIONS
\*------------------------------------*/



(function(){

    'use strict';
    

    modals.init();

    animateIn();

    if(globalSettings.lazyload.enable){
        callLazy(); // Accepts lazyloads options parameter
    }

    if(globalSettings.instafeed.enable){
        callInstafeed(); // Has optional parameters
    }

    if(globalSettings.carousels.enable){
        callCarousel();
    }

}());
