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