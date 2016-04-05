

/*------------------------------------*\
    #PARTIALS
\*------------------------------------*/



// @codekit-prepend "_bbjs-plugins.js";

// @codekit-prepend "_bbjs-functions.js";

// @codekit-prepend "_bbjs-utilities.js";

// @codekit-prepend "_bbjs-shopify-utilities.js";




/*------------------------------------*\
    #FUNCTIONS (FROM ABOVE)
\*------------------------------------*/



(function(){

    'use strict';
    

    Modals.init();

    MatchMediaLoad.run();

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