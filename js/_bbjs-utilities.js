

// This function adds a capitalize method to the String prototype
// It capitalizes every word in a string.

// "string".capitalize()

String.prototype.capitalize = function(){

    'use strict';
    

    var array  = this.split(" ");

    var string = [];


    for (var i = 0, l = array.length; i < l; i++) {
        string.push(array[i].charAt(0).toUpperCase() + array[i].substring(1));
    }

    return string.join(" ");

};





// Smooth anchor link scrolling.

(function(){

    'use strict';


    // a href contains #something not just #
    $('a[href*="#"]:not([href="#"])').on("click", function(e) {

        e.preventDefault();


        var id     = $(this).attr("href");

        var scroll = $(id).offset().top;


        animateScroll(scroll);

    });

})();





// Fallback for no CSS vh unit support
// Requires cssvhunit test in Modernizr

(function(window){

    'use strict';


    if(cache.$html.hasClass('no-cssvhunit')){

        var $fullHeight = $(".full-vh");


        if($fullHeight.length){

            var setVh = debounce(function(){

                $fullHeight.height($(window).outerHeight());

            }, 50);


            setVh();

            $(window).on("resize", function(){
                setVh();
            });
        }

    }

})(window);





// JS version for CSS vh unit

(function(){

    'use strict';


    var $fullHeight = $(".js-full-vh");


    if($fullHeight.length){

        var setVh = debounce(function(){

            $fullHeight.height($(window).outerHeight());

        }, 50);


        setVh();

        $(window).on("resize", function(){
            setVh();
        });
    }

}());




/*------------------------------------*\
    #SUGGEST #SEARCH
\*------------------------------------*/



(function(){

    'use strict';


    var settings = {

        $input: $('.suggest-search__input'),
        $searchTerm: $('.js-search-term'),
        $placeholder: $(".suggest-search__placeholder")

    };


    var searchTerms = [];


    var tab = {
        allowFinish: false,
        keyword: ""
    };


    settings.$searchTerm.each(function(index, el) {
        searchTerms.push($(el).text());
    });

    // perform all string formatting here.
    function handleize(array){
        return array.split(", ");
    }


    var uniqueKeys = uniqueArray(searchTerms).sort();


    settings.$input.on("blur", function(){

        $psuedoPlaceholder.html("");

    });


    settings.$input.on("keyup", function(){

        var $self = $(this);

        var count = $self.val().length;

        var transformedVal = $self.val().toLowerCase(); // Note were forcing lowercase


        function filterMatches(value){
            return value.substring(0, count) === transformedVal;
        }

        var filtered = uniqueKeys.filter(filterMatches);


        if(filtered.length > 0 && count > 1){

            for (var i = filtered.length - 1; i >= 0; i--) {

                if(filtered[i].substring(0, count) === transformedVal){

                    // Returned match
                    $psuedoPlaceholder.html(filtered[i]);

                    tab.allowFinish = true;
                    tab.keyword = filtered[i];
                    
                }

            }

        } else {
            $psuedoPlaceholder.html("");
            tab.allowFinish = false;
        }


        if(cache.$html.hasClass("touchevents") && tab.allowFinish === true){

            settings.$input.on("click", function(){

                settings.$input.val(tab.keyword);

            });

        }

    }).keydown(function(e){

        if(tab.allowFinish === true && (e.which === 9 || e.which === 39)){ // Tab, right arrow key

            e.preventDefault();

            settings.$input.val(tab.keyword);

        }

    });


}());





/*------------------------------------*\
    #LOAD #PROGRESS #BAR
\*------------------------------------*/



(function(){

    'use strict';


    var counter = {
        value: 0,
        increment: 5,
        max: 80
    };


    // The visual progress bar
    var $progress = $(".load-progress-bar");


    // The main page container where we wait for
    // images to load. Once the images are loaded we determine
    // that the page has loaded. Alternatively,
    // you can use $(window).load() to wait for
    // everything to load.
    var $imgsLoadedContainer = cache.$main;


    setInterval(function(){

        // Increase the counter by x every x ms.
        // When the counter reaches counter.max stop and
        // wait for the images or window to actually load
        // before setting the progress bar to done.
        if((counter.value += counter.increment) <= counter.max){
            $progress.css("width", counter.value + "%");
        }

    }, 400); // Increase the counter every x ms here.


    // Once the images have loaded set the counter to its target
    // mark of counter.max. Then set the width of the progress bar to 100%.
    $imgsLoadedContainer.imagesLoaded(function() {
        counter.value = counter.max;
        $progress.css("width", "100%").addClass('done');
    });

}());





// Clear placeholders
// and textarea vals on focus

(function(){

    'use strict';


    var $input = $("input[type!='submit']");


    // Clear placeholders on focus if there is one

    $input.on("focus", function(){

        var $self = $(this);


        if($self[0].hasAttribute("placeholder")){

            $self.attr("backup-placeholder", $self.attr("placeholder")).attr("placeholder", "");

        }

    });


    $input.on("blur", function(){

        var $self = $(this);


        if($self[0].hasAttribute("placeholder")){

            $self.attr("placeholder", $self.attr("backup-placeholder"));

        }

    });


    // Clear textarea values on focus
    // Expects only one per page
    
    var textarea = $("textarea"),
        textareaVal = textarea.val();


    textarea.on("focus", function(){

        if($(this).val() === textareaVal){
            textarea.val("");
        }

    });


    textarea.on("blur", function(){

        var $self = $(this);

        if($self.val() === textareaVal || $self.val() === ""){
            textarea.val(textareaVal);
        }

    });

}());





// This function adds basic toggleClass() functionality 
// on a click event to an element (settings.selector).

// The element (settings.selector) should have an attribute (settings.classes)
// which specifies which classes to add to the given element.

// By default this function will toggleClass() on the html element.
// If the element has the attribute

// Example markup: <div class='js-toggle' data-toggle='search'>Search</div>
// Example output: "search--toggled" class on the html element.

(function(){

    'use strict';


    var settings = {

        element: {
            selector: ".js-toggle",

            // element.selector attributes
            classes: "data-toggle",
            useParentAttribute: "toggle-parent"
        },

        toggledClass: "--toggled"

    };


    $(document).on("click", settings.element.selector, function(){

        var $self   = $(this),
            classes = $self.attr(settings.element.classes).split(" ")

            .forEach(function(class, index){

                if($self.attr(settings.element.useParentAttribute) !== "true"){
                    cache.$html.toggleClass(class.concat(settings.toggledClass));
                } else {
                    $self.parent().toggleClass(class.concat(settings.toggledClass));
                }

            });

    });

}());




// This function hides drawers by click of the overlay.

(function(){

    'use strict';


    var settings = {
        // The element that we click to hide the drawer.
        overlay: ".drawer__overlay",

        // The class(es) that make the drawer visible
        classes: "drawer--right--toggled  drawer--left--toggled"
    };


    $(document).on("click", settings.overlay, function(){

        cache.$html.removeClass(settings.classes);

    });

})();

