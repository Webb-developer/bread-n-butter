/*
@author Andrew Puig [andrew.lpuig@gmail.com]
@version 1.45
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



// Declare BBJS as global object.
window.bbjs = {};




/*
@property bbjs.cache

@description
Create an object for caching of common variables
I recommend using these cached variables for setting
rather then getting to ensure up to date results.
*/

bbjs.cache = {
    $html:   $("html"),
    $body:   $("body"),
    $window: $(window)
};





/*------------------------------------*\
    #VENDORS
\*------------------------------------*/




/*
Required includes.
*/

// @codekit-prepend "vendor/_device.js";




/*------------------------------------*\
    #PARTIALS
\*------------------------------------*/



// @codekit-append "_bbjs-partials.js";
