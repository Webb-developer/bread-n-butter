/*------------------------------------*\
    #PARTIALS
\*------------------------------------*/



// @codekit-prepend "_bbjs-plugins.js";
// @codekit-prepend "_bbjs-functions.js";
// @codekit-prepend "_bbjs-utilities.js";




/*------------------------------------*\
    BBJS FUNCTIONS
\*------------------------------------*/



/**
@description
Self invoking function to init
all of our BBJS namespaced functions.
*/

(function(){

    'use strict';
    
    bbjs.modals.init();

    // [http://www.appelsiini.net/projects/lazyload]
    if(bbjs.settings.lazyload.enable){
        bbjs.callLazy();
    }

    // [http://www.owlcarousel.owlgraphic.com]
    if(bbjs.settings.owlCarousel.enable){
        bbjs.callCarousel();
    }

})();
