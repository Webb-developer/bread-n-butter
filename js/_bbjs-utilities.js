

// Add capitalize method to String prototype
// Capitalizes every word in a string

String.prototype.capitalize = function(){

    'use strict';
    

    var arrayString = this.split(" ");

    var string = [];


    for (var i = 0, l = arrayString.length; i < l; i++) {
        string.push(arrayString[i].charAt(0).toUpperCase() + arrayString[i].substring(1));
    }

    return string.join(" ");

};





// Smooth anchor scrolling

$(function() {

    'use strict';


    $('a[href*="#"]:not([href="#"])').on("click", function(e) {

        e.preventDefault();


        var id     = $(this).attr("href");

        var scroll = $(id).offset().top;


        animateScroll(scroll);

    });
});





// fallback for no CSS VH unit support

(function(){

    'use strict';


    if(cache.$html.hasClass('no-cssvhunit')){

        var $fullHeightSelector = $(".full-vh");


        var fallBackVH = debounce(function(){

            $fullHeightSelector.height(cache.$window.outerHeight());

        }, 150);


        if($fullHeightSelector.length){

            fallBackVH();

            $(window).on("resize", function(){
                fallBackVH();
            });
        }

    }

})();





// js version for CSS VH unit

(function(){

    'use strict';


    var $fullHeightSelector = $(".js-full-vh");


    var fallBackVH = debounce(function(){

        $fullHeightSelector.height(cache.$window.outerHeight());

    }, 50);


    if($fullHeightSelector.length){

        fallBackVH();

        $(window).on("resize", function(){
            fallBackVH();
        });
    }

}());




/*------------------------------------*\
    #SUGGEST #SEARCH
\*------------------------------------*/

(function(){

    'use strict';


    var $input = $(".suggest-search__input");

    var $searchTerm = $(".js-search-term");

    var $psuedoPlaceholder = $(".suggest-search__placeholder");

    var keywords = [];

    var tab = {
        allowFinish: false,
        keyword: ""
    };


    $searchTerm.each(function(index, el) {
        keywords.push($.trim($(el).text().toLowerCase())); // Note were forcing lowercase
    });


    var uniqueKeys = uniqueArray(keywords).sort();


    $input.on("blur", function(){

        $psuedoPlaceholder.html("");

    });


    $input.on("keyup", function(){

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

            $input.on("click", function(){

                $input.val(tab.keyword);

            });

        }

    }).keydown(function(e){

        if(tab.allowFinish === true && (e.which === 9 || e.which === 39)){ // Tab, right arrow key

            e.preventDefault();

            $input.val(tab.keyword);

        }

    });


}());





/*------------------------------------*\
    #LOAD #PROGRESS #BAR
\*------------------------------------*/

(function(){

    'use strict';


    var counter = 0;

    var $progress = $(".load-progress-bar");

    var $imgsLoadedContainer = cache.$main;


    setInterval(function(){

        if((counter += 5) <= 80){
            $progress.css("width", counter + "%");
        }

    }, 400);


    $imgsLoadedContainer.imagesLoaded(function() {
        counter = 80;
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





// Add toggle functionality to elements

// Markup: <div class='js-toggle' data-toggle='search'>

// Output: search--toggled class on html

(function(){

    'use strict';


    var settings = {
        selector: ".js-toggle",
        class: "data-toggle"
    };


    $(document).on("click", settings.selector, function(){

        var $self   = $(this),
            classes = $self.attr(settings.class).split(" ");


        classes.forEach( function(element, index) {

            if($self.attr("toggle-parent") !== "true"){
                cache.$html.toggleClass(element.concat("--toggled"));
            } else {
                $self.toggleClass(element.concat("--toggled"));
            }

        });

    });

}());




// Hide drawer by drawer overlay click

(function(){

    'use strict';


    var overlay = ".drawer__overlay";


    $(document).on("click", overlay, function(){

        cache.$html.removeClass('drawer--right--toggled').removeClass('drawer--left--toggled');

    });

})();

