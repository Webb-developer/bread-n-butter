/**
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





/**
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




/**
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





/**
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




/**
@property bbjs.forms

@description
Check form for empty fields.
Submit form via AJAX or standard submit
Adds error or success classes to inputs.

@example [html]
<input type='text' class='js-handle'>

@example [js]
forms.process({
    form: "#customer_login",
    ajax: true,
    resetOnSuccess: true, (AJAX only)
    success: function(){
        console.log("oh yesss");
    },
    error: function(){
        console.log("oh no");
    }
});
*/

bbjs.forms = function(){

    'use strict';


    var settings = {

        element: {
            "selector": ".js-handle",
            "successClass": "input--success",
            "errorClass": "input--error"
        },

        options: {}
    };


    function _processAJAX(){

        var form = $(settings.options.form);


        form.on('submit', function(e){

            e.preventDefault();

            _validate();


            $.ajax({
                type    : form.attr("method"),
                url     : form.attr("action"),
                data    : form.serialize()

            }).done(function(data){

                if(data.success === true){
                    _onAJAXSuccess();
                } else {
                    _onError();
                }

            });

        });

    }


    /**
    @name _onAJAXSuccess

    @description
    This function is only called on AJAX success.
    There's no regular form success function because form submission
    depending on the form action would take us somewhere.
    */

    function _onAJAXSuccess(){

        // If the user set resetOnSuccess to true
        // reset the form.
        if(settings.options.resetOnSuccess){
            $(settings.options.form)[0].reset();
        }

        // If the user set a success function, call it.
        if(typeof(settings.options.success) === "function"){
            settings.options.success();
        }

    }


    /**
    @name _onError

    @description
    This function is called on both AJAX and regular form submit.
    */

    function _onError(){

        if(typeof(settings.options.error) === "function"){
            settings.options.error();
        }

    }


    /**
    @name _validate
    
    @description
    This function does not actually validate any data.
    It simply checks if the field is empty or not.

    @returns {object}
    @property fields.inputs - the amount of fields in the form
    @property fields.valid - the amount of valid fields in the form
    */

    function _validate(){

        var fields = {
            inputs: $(settings.options.form).find(settings.element.selector),
            valid: []
        };

        
        fields.inputs.each(function(index, el){

            if($(el).val().length === 0){
                $(this).addClass(settings.element.errorClass);
            } else {

                $(el).removeClass(settings.element.errorClass).addClass(settings.element.successClass);

                fields.valid.push($(el));

            }

        });

        return fields;

    }


    function _processForm(){

        $(settings.options.form).on('submit', function(e){

            // Store the check in a variable
            var check = _validate();


            // The length of the valid fields does not match
            // the length of the fields. Process error.
            if(check.valid.length !== check.inputs.length){

                e.preventDefault();

                _onError();

            }

        });
    }


    function init(options){

        // Set our settings options to the users options.
        settings.options = options;


        if(settings.options.ajax){
            _processAJAX();
        } else {
            _processForm();
        }

    }


    return {
        process: init
    };

}();




/**
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


    // @param {string|number} name - the cookie name
    // @param {string|number} value - the cookie value
    function create(name, value){

        document.cookie = name + "=" + value;

    }


    // @param {string|number} name - the cookie name to delete
    function remove(name){

        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        if(isSet(name)){
            throw new Error(name + " cookie could not be deleted.");
        }

    }


    // @param {string|number} name - the cookie name to check
    // @returns {boolean} - true if the cookie is set.
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




/**
@property bbjs.modals

@description
Shows and hides modals with cookie based detection.

@example
<div class="modal  js-modal">
    
    <div class="center-table">
        <div class="center-table-cell">
            <div class="modal__inner">
                <span class="modal__close  js-modal__close"></span>
                Modal content
            </div>
        </div>
    </div>

</div>
*/

bbjs.modals = function(){

    'use strict';
    

    var settings = {

        element: {
            // @property {string} settings.element.modal - the modal selector.
            modal: ".js-modal",

            // @property {string} settings.element.close - the modal close trigger selector.
            close: ".js-modal__close",

            // @property {string} settings.element.closeOverlay - additional modal close
            // trigger. This is the overlay that surrounds the modal. This is a class, not
            // a selector.
            closeOverlay: "center-table-cell",
        },

        // @property {boolean} settings.hideOnRevisit - Determines whether to hide
        // the modal or keep showing it if our cookie has been set.
        // Set to true to show the modal once per session.
        hideOnRevisit: false,

        // @property {object} settings.cookie - The cookie that we'll create
        // so we can allow the modal to be shown only once. It's values don't really matter.
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

            if (e.which === 27){ // ESC key
                hide();
            }

        });

    }


    // @returns {boolean} - true if the cookie is set,
    // or false if not set.
    function _wasVisited(){

        if(bbjs.cookies.isSet(settings.cookie.name)){
            return true;
        } else {
            return false;
        }

    }


    function show(){
        $(settings.element.modal).css('display', 'block');
    }


    function hide(){
        $(settings.element.modal).css('display', 'none');
    }


    function init(){

        if($(settings.element.modal).length){

            _bindUI();

            if(_wasVisited()){

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




/**
@property bbjs.animateIn

@description
Perform actions to elements when images in a container
or the window is loaded. May require imagesLoaded.js (Built in to BBJS):
http://imagesloaded.desandro.com/

@example
<div class="js-animate" animate-class="animated  fadeInUp" animate-offset="1.5">I'll fadeUp soon</div>
*/

bbjs.animateIn = function(){

    'use strict';


    var settings = {

        // @property {object} settings.imagesLoadedContainer
        // Set to "window" to use window.load() to wait for page load.
        imagesLoadedContainer: bbjs.cache.$main,

        item: {
            // @property {string} settings.item.selector - the element
            // that will be animated.
            selector: ".js-animate",

            // @property {string} settings.item.class - the class that will be applied
            // to item.selector once images have loaded.
            class: "animate-class",

            // @property {number} settings.item.offset - the amount of time to wait
            // after images have loaded to apply the class to item.selector.
            offset: "animate-offset"
        }

    };


    function _run(){

        $(settings.imagesLoadedContainer).find($(settings.item.selector).each(function(index, el){

            // Convert offset from MS to S.
            var offset = ($(el).attr(settings.item.offset) * 1000).toFixed(0) || 0;
                    
            setTimeout(function(){
                $(el).addClass($(el).attr(settings.item.class));
            }, offset);

        }));

    }


    function init(){

        if(settings.imagesLoadedContainer === window){
            
            bbjs.cache.$window.on("load", function(){
                _run();
            });

        } else {

            $(settings.imagesLoadedContainer).imagesLoaded(function(){
                _run();
            });

        }

    }


    return{
        init: init
    };

}();
