/**
@name debounce
https://davidwalsh.name/javascript-debounce-function

@example
var myFunction = debounce(function(){
    // Do something
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
@name animateScroll

@description
Animate scrollTo position.

@param {number} pos
@param {number} speed - is optional and defaults to 250
*/

function animateScroll(pos, speed){

    'use strict';
    

    if(!isNaN(pos)){

        cache.$body.add(cache.$html).animate({
            scrollTop: pos
        }, typeof(speed) === "undefined" ? 250 : speed);

    } else {
        throw new Error("animateScroll pos is NaN");
    }
}





/**
@name uniqueArray

@example
var myArray = ["fuck", "fuck", "shit"];
uniqueArray(myArray);

@returns {array} - a unique array, meaning, no key is the same.

@param {array} array
*/

function uniqueArray(array){

    'use strict';


    return array.filter(function(el, index, arr) {
        return index === arr.indexOf(el);
    });

}




/**
@name forms

@description
Check form for empty fields.
Submit form via AJAX or standard submit
Adds error and success classes to inputs

@example
<input type='text' data-handle-field='true'>

@example
forms.process({
    form: "#customer_login",
    ajax: true,
    resetOnSuccess: true, (AJAX only)
    success: function(){
        console.log("oh yesss");
    },
    error: function(){
        console.log("oh no");
    },
});
*/

var forms = function(){

    'use strict';


    var settings = {

        enabled: true,

        element: {
            "selector": ".js-handle",
            "successClass": "input--success",
            "errorClass": "input--error"
        },

        options: {}
    };


    function _submitAJAX(){

        var form = $(settings.options.form);


        form.on('submit', function(e){

            e.preventDefault();

            _checkFields();


            $.ajax({
                type    : form.attr("method"),
                url     : form.attr("action"),
                data    : form.serialize()

            }).done(function(data){

                if(data.success === true){
                    _onSuccess();
                } else {
                    _onError();
                }

            });

        });

    }


    // Only called on AJAX forms
    function _onSuccess(){

        if(settings.options.resetOnSuccess){
            $(settings.options.form)[0].reset();
        }

        if(typeof(settings.options.success) === "function"){
            settings.options.success();
        }

    }


    function _onError(){

        if(typeof(settings.options.error) === "function"){
            settings.options.error();
        }

    }

    /**
    @name _checkFields

    @description
    This function does not validate any data.
    It simply checks if the field is empty or not.

    @returns {object}
    @property fields.inputs - the amount of fields in the form
    @property fields.valid - the amount of valid fields in the form
    */

    function _checkFields(){

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

            // The length of the valid fields does not match
            // the length of the fields. Process error.
            if(_checkFields().valid.length !== _checkFields().inputs.length){

                e.preventDefault();

                _onError();

            }

        });
    }


    function init(options){

        if(settings.enabled){

            // Set our settings options to the users options.
            settings.options = options;


            if(settings.options.ajax){
                _submitAJAX();
            } else {
                _processForm();
            }

        }
    }

    return {
        process: init
    };

}();




/**
@name cookies

@description
Create, remove and check the status of cookies.

@example
Cookies.create("name", "value");
Cookies.remove("name");
Cookies.isSet("name");
*/

var Cookies = (function(document){

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
    }

})(document);




/**
@name modals

@description
Shows and hides modals with cookie based detection.

@example
<div class='modal  js-modal  transparent  invisible'>
    <span class='modal__close  js-modal-close'>X</span>
    <div class='modal__inner'></div>
</div>
*/

var Modals = function(){

    'use strict';
    

    var settings = {
        enabled: true,

        modal: ".js-modal",
        close: ".js-modal-close",

        showClass: "visible opaque", // class/classes to make the modal and overlay visible
        hideClass: "transparent invisible", // class/classes to make the modal and overlay hidden

        hideOnRevisit: true, // Set to true to show the modal once per session (Cookie based)

        hideOnPage: false, // Set true to hide the modal on certain page(s)
        pageToHideOn: ".js-hide-modal", // Class within the page(s) to signify its the page we're looking for.

        cookieName: "modal",
        cookieVal: "true"
    };


    var modals = {

        _bindUI: function(){

            $(document).on('click', settings.close, function(){
                modals.hide();
            });


            $(document).on('click', settings.modal, function(e){

                // If we click the overlay hide the modal.
                if($(e.target).hasClass(settings.modal.replace(".", ""))){
                    modals.hide();
                }

            });


            $(document).keyup(function(e){

                if (e.which === 27){ // ESC key
                    modals.hide();
                }

            });

        },


        _wasVisited: function(){

            if(Cookies.isSet(settings.cookieName)){
                return true;
            } else {
                return false;
            }

        },


        show: function(){

            $(settings.modal).removeClass(settings.hideClass).addClass(settings.showClass);

        },


        hide: function(){

            $(settings.modal).addClass(settings.hideClass).removeClass(settings.showClass);

        },


        init: function(){

            if($(settings.modal).length && settings.enabled){

                if(settings.hideOnPage && $(settings.pageToHideOn).length){

                    modals.hide();

                } else {

                    modals._bindUI();

                    if(modals._wasVisited()){

                        if(settings.hideOnRevisit){
                            modals.hide();
                        } else {
                            modals.show();
                        }

                    } else {

                        Cookies.create(settings.cookieName, settings.cookieVal);

                        modals.show();

                    }

                }

            }

        }

    };

    return modals;

}();




/**
@name animateIn

@description
Perform actions to elements when images in a container
or the window is loaded. Requires imagesLoaded.js (Built in to BBJS):
http://imagesloaded.desandro.com/

@example:
<div class="js-animate" animate-class="animated  fadeInUp" animate-offset="1.5">I'll fadeUp soon</div>
*/

var animateIn = (function(){

    'use strict';


    var settings = {

        // @property {object} settings.imagesLoadedContainer
        // Set to window to use window.load() to wait for page load.
        imagesLoadedContainer: cache.$main,

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


    function run(){

        $(settings.imagesLoadedContainer).find($(settings.item.selector).each(function(index, el){

            // Convert offset from MS to S.
            var offset = ($(el).attr(settings.item.offset) * 1000).toFixed(0) || 0;
                    
            setTimeout(function(){
                $(el).addClass($(el).attr(settings.item.class));
            }, offset);

        }));

    }


    if(settings.imagesLoadedContainer === window){
        
        cache.$window.on("load", function(){
            run();
        });

    } else {

        $(settings.imagesLoadedContainer).imagesLoaded(function(){
            run();
        });

    }

});
