/*
@name debounce
https://davidwalsh.name/javascript-debounce-function

@example
var myFunction = debounce(function(){
    // Do something classy here
}, 150);

myFunction();
*/

function debounce(func, wait, immediate) {

    'use strict';


    var timeout;

    return function() {

        var context = this, args = arguments;

        var later = function() {
            timeout = null;
            if (!immediate){
                func.apply(context, args);
            }
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow){
            func.apply(context, args);
        }
    };
}





/*
@property bbjs.itHasTouch

@description
Returns true if the user device has touch events.
Requires touch support in Modernizr (Built In) and device sniffing.
For device sniffing we're using device.js (Built In)

@param {boolean} ignoreDesktopTouch - determines whether we want
to ignore touch events on desktop computers.

@returns {boolean}
*/

bbjs.itHasTouch = function(ignoreDesktopTouch){

    'use strict';


    if(ignoreDesktopTouch){
        return bbjs.cache.$html.hasClass("touchevents") && !bbjs.cache.$html.hasClass("desktop");
    } else {
        return bbjs.cache.$html.hasClass("touchevents");
    }
    
};




/*
@property bbjs.animateScroll

@description
Animate scrollTo position.

@param {number} pos
@param {number} speed - is optional and defaults to 250
*/

bbjs.animateScroll = function(pos, speed){

    'use strict';
    

    if(!isNaN(pos)){

        bbjs.cache.$body.add(bbjs.cache.$html).animate({
            scrollTop: pos
        }, typeof(speed) === "undefined" ? 250 : speed);

    } else {
        throw new Error("animateScroll pos is NaN");
    }
};





/*
@property bbjs.uniqueArray

@example
var myArray = ["fuck", "fuck", "shit"];
uniqueArray(myArray);

@param {array} array - the array we will be making unique.

@returns {array} - a unique array, meaning, no key is the same.
*/

bbjs.uniqueArray = function(array){

    'use strict';


    return array.filter(function(el, index, arr) {
        return index === arr.indexOf(el);
    });

};




/*
@property bbjs.cookies

@description
Create, remove and check if a cookie is set.

@example
cookies.create("name", "value");
cookies.remove("name");
cookies.isSet("name");
*/

bbjs.cookies = (function(document){

    'use strict';

    /*
    @param {string|number} name - the cookie name
    @param {string|number} value - the cookie value
    */
    function create(name, value){
        document.cookie = name + "=" + value;
    }


    /*
    @param {string|number} name - the cookie name to delete
    */
    function remove(name){

        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        if(isSet(name)){
            throw new Error(name + " cookie could not be deleted.");
        }

    }


    /*
    @param {string|number} name - the cookie name to check
    @returns {boolean} - true if the cookie is set.
    */
    function isSet(name){

        if(document.cookie.indexOf(name) !== -1) {
            return true;
        } else {
            return false;
        }

    }


    return {
        create: create,
        isSet:  isSet,
        remove: remove
    };

})(document);




/*
@property bbjs.modals

@description
Shows and hides modals with cookie based detection.

@example
<div class="modal  js-modal">
    <div class="modal__inner">
        <span class="modal__close  js-modal__close"></span>
    </div>
</div>
*/

bbjs.modals = function(){

    'use strict';
    

    var settings = {

        element: {
            /*
            @property {string} settings.element.modal
            The modal selector.
            */
            modal: ".js-modal",

            /*
            @property {string} settings.element.close
            The modal close trigger selector.
            */
            close: ".js-modal__close",

            /*
            @property {string} settings.element.closeOverlay
            Additional modal close trigger. This is the overlay
            that surrounds the modal. This is a class name, not a selector.
            */
            closeOverlay: "center-table-cell",
        },

        /*
        @property {boolean} settings.hideOnRevisit
        Determines whether to hide the modal or keep showing
        it if our cookie has been set.
        Set to true to show the modal once per session.
        */
        hideOnRevisit: true,

        /*
        @property {object} settings.cookie
        The cookie that we'll create so we can allow the modal
        to be shown only once. It's values don't really matter.
        */
        cookie: {
            "name": "modal",
            "value": "set"
        }

    };


    function _bindUI(){

        $(document).on('click', settings.element.close, function(){
            hide();
        })
        .on('click', settings.element.modal, function(e){

            // If we click the overlay hide the modal.
            if($(e.target).hasClass(settings.element.closeOverlay)){
                hide();
            }

        })
        .on("keyup", function(e){

            if(e.which === 27){ // ESC key
                hide();
            }

        });

    }


    /*
    @returns {boolean}
    True if the cookie is set, or false if not set.
    */
    function _pageWasVisited(){

        if(bbjs.cookies.isSet(settings.cookie.name)){
            return true;
        } else {
            return false;
        }

    }


    function show(){
        bbjs.cache.$html.addClass('lock-scroll');
        $(settings.element.modal).css('display', 'block');
    }


    function hide(){
        bbjs.cache.$html.removeClass('lock-scroll');
        $(settings.element.modal).css('display', 'none');
    }


    function init(){

        if($(settings.element.modal).length){

            _bindUI();

            if(_pageWasVisited()){

                if(settings.hideOnRevisit){
                    hide();
                } else {
                    show();
                }

            } else {
                bbjs.cookies.create(settings.cookie.name, settings.cookie.value);
                show();
            }

        }

    }


    return {
        show: show,
        hide: hide,
        init: init
    };

}();
