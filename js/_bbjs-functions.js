/*------------------------------------*\
    #DEBOUNCE
\*------------------------------------*/

// https://davidwalsh.name/javascript-debounce-function

/* Call:

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





// Animate scrollTo position.
// @param {number} pos
// @param {number} speed - is optional and defaults to 250

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





/*------------------------------------*\
    #UNIQUE ARRAY
\*------------------------------------*/



// var myArray = ["fuck", "fuck", "shit"];
// uniqueArray(myArray); Returns ["fuck", "shit"]

// @param {array} array

function uniqueArray(array){

    'use strict';


    return array.filter(function(el, index, arr) {
        return index === arr.indexOf(el);
    });

}




/*------------------------------------*\
    #FORMS
\*------------------------------------*/



// Check form for empty fields.
// Submit form via AJAX or standard submit
// Adds error and success classes to inputs


// Markup field:
// <input type='text' data-handle-field='true'>


// Call:

// Forms.init({
//     form: "#customer_login",
//     ajax: false,
//     resetOnSuccess: true, (AJAX only)
//     success: function(){
//          console.log("ayeee");
//     },
//     error: function(){
//          console.log("oh no");
//     },
// });


var Forms = function(){

    'use strict';


    var settings = {
        enabled: true,
        inputSelector: "handle-field"
    };


    var forms = {

        _submit: function(options){


            var form = $(options.form);

            form.on('submit', function(e){

                e.preventDefault();

                forms._checkFields(options);

                $.ajax({
                    type    : form.attr("method"),
                    url     : form.attr("action"),
                    data    : form.serialize(),
                    dataType: 'json'

                }).done(function(data){

                    if(data.success === true){
                        forms._onSuccess(options);
                    } else {
                        forms._onError(options);
                    }

                });

            });
            
        },


        _onSuccess: function(options){ // Only called on AJAX forms

            var form = $(options.form);

            if(options.resetOnSuccess === true){
                form[0].reset();
            }

            if(typeof(options.success) === "function"){
                options.success();
            }

        },


        _onError: function(options){

            if(typeof(options.error) === "function"){
                options.error();
            }

        },


        _checkFields: function(options){

            var fields = {};

            fields.inputs = $(options.form).find("[" + settings.inputSelector + "]");

            fields.validArray = [];

            
            fields.inputs.each(function(index, el){

                // if field is blank

                if($(el).val().length === 0){
                    $(this).addClass('input--error');
                } else {
                    $(this).removeClass('input--error').addClass('input--success');
                    fields.validArray.push($(this));
                }

            });

            return fields;

        },


        _handle: function(options){

            $(options.form).on('submit', function(e){

                forms._checkFields(options);

                if(forms._checkFields(options).validArray.length !== forms._checkFields(options).inputs.length){ // form error
                    e.preventDefault();
                    forms._onError(options);
                }

            });
        },


        init: function(options){

            this.options = options;

            if(typeof this.options.form === "undefined" || settings.enabled === false){
                console.log("Notice: Forms.init() requires a form selector or Forms() is disabled.");
            } else {

                if(options.ajax === true){
                    forms._submit(this.options);
                } else {
                    forms._handle(this.options);
                }

            }
        }

    };

    return forms;

}();





/*------------------------------------*\
    #MATCH-MEDIA-LOAD
\*------------------------------------*/



// https://github.com/puigandrew1/MatchMediaLoad

var MatchMediaLoad = (function(window, document){

    'use strict';


    var settings = {

        selector: document.getElementsByClassName("js-match-media"),
        src: "data-src",
        mediaQuery: "data-match",
        class: "match-media--replaced",

        debounceRate: 150,

        cache: [],

        hasSupport: typeof(window.matchMedia) === "function" ? true : false

    };


    var _bindUI = function(){

        if(settings.hasSupport){

            // proceed normally

            _checkIfMatch();


            var debounceResize = debounce(function(){

                _checkIfMatch();

            }, settings.debounceRate);


            window.onresize = function(){
                debounceResize();
            };

        } else {
            _replace(settings.selector);
        }

    };


    var _checkIfMatch = function(){

        var accepted = [];


        for (var i = 0, l = settings.selector.length; i < l; i++) {

            if(settings.cache.indexOf(settings.selector[i]) === -1){
            
                if(window.matchMedia(settings.selector[i].getAttribute(settings.mediaQuery)).matches === true){

                    accepted.push(settings.selector[i]);

                    settings.cache.push(settings.selector[i]);

                }

            }

        }


        for (var i2 = 0, l2 = settings.selector.length; i2 < l2; i2++) {

            if(settings.cache.indexOf(accepted[i2]) !== -1){

                _replace(accepted);

            }

        }

    };


    var _replace = function(items){

        for (var i = 0, l = items.length; i < l; i++) {

            items[i].setAttribute("src", items[i].getAttribute(settings.src));

            items[i].classList.add(settings.class);

        }

        if(typeof(settings.done) === "function"){
            settings.done(items);
        }

    };


    var run = function(options){

        if(typeof(options) === "object"){

            // Our settings object gets augmented
            // if the user sets custom options

            settings.selector = options.selector || settings.selector;

            settings.src = options.src || settings.src;

            settings.mediaQuery = options.mediaQuery || settings.mediaQuery;

            settings.class = options.class || settings.class;

            if(options.debounceRate === 0){
                settings.debounceRate = 0;
            } else if(options.debounceRate !== undefined){
                settings.debounceRate = options.debounceRate;
            }

            settings.done = options.done || undefined;

            
            // Use the augmented settings

            _bindUI(settings);

        } else {

            // Use the default settings

            _bindUI(settings);
        }

    };


    return{
        run: run
    };


})(window, document);





/*------------------------------------*\
    #COOKIES
\*------------------------------------*/



// Create, remove and check the status of cookies with this function.
// Cookies.create("name", "value");
// Cookies.remove("name");
// Cookies.isSet("name");

var Cookies = (function(document){

    'use strict';


    // @param {string, number} name - the cookie name
    // @param {string, number} value - the cookie value
    function create(name, value){

        document.cookie = name + "=" + value;

    }


    // @param {string, number} name - the cookie name to delete
    function remove(name){

        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        if(isSet(name)){
            console.log(name + " cookie could not be deleted.");
        } else {
            console.log(name + " cookie was deleted");
        }

    }


    // @param {string, number} name - the cookie name to check
    // returns true if the cookie is set.
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





/*------------------------------------*\
    #MODALS
\*------------------------------------*/



/*

Shows and hides modals with cookie based detection.


Markup:

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




// Perform actions to elements when images are loaded in a specified container.

// Requires imagesLoaded (Built in to BBJS): http://imagesloaded.desandro.com/

// Markup:
// <div class="js-animate" animate-class="animated  fadeInUp" animate-offset="1.5">Fuck Me</div>

var animateIn = (function(){

    'use strict';


    var settings = {

        imagesLoadedContainer: ".js-images-loaded",

        item: {
            selector: ".js-animate",

            // Attributes
            class: "animate-class",
            offset: "animate-offset"
        },

        // Hide items on load
        hideItems: {
            selector: ".js-hide-on-load",
            class: "hidden"
        }

    };


    $(settings.imagesLoadedContainer).imagesLoaded(function(){


        $(settings.imagesLoadedContainer).find($(settings.item.selector).each(function(index, el){

            var offset = ($(el).attr(settings.item.offset) * 1000).toFixed(0);

                    
            setTimeout(function(){

                $(el).addClass($(el).attr(settings.item.class));

            }, offset);


            $(document).find(settings.hideItems.selector).addClass(settings.hideItems.class);

        }));

    });

});