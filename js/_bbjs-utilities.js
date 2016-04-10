
// @description This function adds a capitalize method to the String prototype
//              It capitalizes every word in a string.

// @example "string".capitalize()

String.prototype.capitalize = function(){

    'use strict';
    

    var array  = this.split(" ");

    var string = [];


    for (var i = 0, l = array.length; i < l; i++) {
        string.push(array[i].charAt(0).toUpperCase() + array[i].substring(1));
    }

    return string.join(" ");

};




// @description Smooth anchor link scrolling.

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




// @description Fallback for no CSS vh unit support
//              Requires cssvhunit test in Modernizr

(function(window){

    'use strict';


    if(cache.$html.hasClass('no-cssvhunit')){

        var $item = $(".full-vh");


        if($item.length){

            var setVh = debounce(function(){

                $item.height($(window).outerHeight());

            }, 50);


            setVh();

            $(window).on("resize", function(){
                setVh();
            });
        }

    }

})(window);




// @description JS version for CSS vh unit.

// @example <div class='js-set-vh' data-vh='70'><div>
//          This will set the element's height to 70% of
//          the window height. If the data-vh attribute is missing
//          or 0, the height of 100% of the window will be set.

(function(){

    'use strict';


    var $item = $(".js-set-vh");


    if($item.length){

        var setVh = debounce(function(){

            $item.each(function(index, el){

                var percent = $(el).data("vh") || 100;

                var calc    = $(window).outerHeight() * (percent / 100);


                $(el).css('height', calc);

            });

        }, 50);


        setVh();

        $(window).on("resize", function(){
            setVh();
        });
    }

}());







// @name suggest-search

// @description This function suggests keywords when a user types into a textbox.
//              It requires a list of the search terms. Also requires some CSS styling.

(function(){

    'use strict';


    var settings = {

        // The input.
        $input:       $('.suggest-search__input'),

        // The search term
        $searchTerm:  $('.js-search-term'),

        // The placeholder where our suggested matches will appear.
        $placeholder: $(".suggest-search__placeholder"),

        // Filter our terms with this regex.
        REGEX: new RegExp(/\s/),

        // An array which will contain the search terms.
        searchTerms: [],

        // @property allowFinish - determines whether we can allow tab key completion
        // @property keyword - the matched keyword
        tab: {
            allowFinish: false,
            keyword: ""
        }

    };


    // Perform string formatting here.
    function handleize(str){
        return str.replace(settings.REGEX, "").toLowerCase();
    }

    // Perform array = formatting here.
    function handleizeArray(arr){
        return uniqueArray(arr).sort();
    }


    // Push all of the search terms into our searchTerms array.
    settings.$searchTerm.each(function(index, el) {
        settings.searchTerms.push(handleize($(el).text()));
    });


    // Process the array of search terms.
    var uniqueTerms = handleizeArray(settings.searchTerms);


    settings.$input.on("blur", function(){

        settings.$placeholder.html("");

    }).on("keyup", function(){

        var $self = $(this),
            count = $self.val().length,
            val   = handleize($self.val());


        var filterMatches = function(value){
            return value.substring(0, count) === val;
        }


        // Set a variable to our filtered array.
        var filtered = uniqueTerms.filter(filterMatches);


        if(filtered.length){

            for (var i = filtered.length - 1; i >= 0; i--) {

                if(filtered[i].substring(0, count) === val){

                    // Set the placeholder's test to the returned match.
                    settings.$placeholder.html(filtered[i]);

                    // Allow tab completion.
                    settings.tab.allowFinish = true;

                    // Set returned match to the tab keyword.
                    settings.tab.keyword = filtered[i];

                    break;
                    
                }

            }

        } else {
            settings.$placeholder.html("");
            settings.tab.allowFinish = false;
        }


        if(cache.$html.hasClass("touchevents") && settings.tab.allowFinish === true){

            settings.$input.on("click", function(){

                settings.$input.val(settings.tab.keyword);

            });

        }

    }).on("keydown", function(e){

        if(settings.tab.allowFinish === true && (e.which === 9 || e.which === 39)){ // Tab, right arrow key

            e.preventDefault();

            settings.$input.val(settings.tab.keyword);

        }

    });


}());







// @name load-progress-bar

// @description This function updates a given element's width
//              every x milliseconds, like a progress bar. Ideally,
//              the element should be styles to appear like a progess bar.
//              Read further documentation below. 

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





// @description This function adds basic toggleClass() functionality 
//              on a click event to an element (settings.selector).

//              The element (settings.selector) should have an attribute (settings.classes)
//              which specifies which classes to add to the given element.

//              By default this function will toggleClass() on the html element.
//              If the element has the attribute toggle-parent, this function will apply
//              the class to the parent of the clicked element.

// @example <div class='js-toggle' data-toggle='search'></div>
//          Would output: "search--toggled" class on the html element.

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
            classes = $self.attr(settings.element.classes).split(" ");

            $.each(classes, function(index, element){

                if($self.attr(settings.element.useParentAttribute) !== "true"){
                    cache.$html.toggleClass(element.concat(settings.toggledClass));
                } else {
                    $self.parent().toggleClass(element.concat(settings.toggledClass));
                }

            });

    });

}());




// @description This function hides a .drawer by click of the .drawer__overlay

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

