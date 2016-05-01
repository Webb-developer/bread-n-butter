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



/**
@property bbjs.init

@description
Function to init all of our BBJS namespaced functions.
*/

bbjs.init = function(){

    'use strict';
    

    bbjs.modals.init();

    bbjs.animateIn.init();


    // [http://www.appelsiini.net/projects/lazyload]
    if(bbjs.settings.lazyload.enable){
        bbjs.callLazy();
    }

    // [http://instafeedjs.com]
    if(bbjs.settings.instafeed.enable){
        bbjs.callInstafeed();
    }

    // [http://www.owlcarousel.owlgraphic.com]
    if(bbjs.settings.carousels.enable){
        bbjs.callCarousel();
    }

};

bbjs.init();
