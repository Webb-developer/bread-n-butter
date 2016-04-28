/**
@description
Smooth anchor link scrolling.
*/

(function(){

    'use strict';


    // a href contains #something not just #
    $('a[href*="#"]:not([href="#"])').on("click", function(e) {

        e.preventDefault();

        var id     = $(this).attr("href"),
            scroll = $(id).offset().top;

        bbjs.animateScroll(scroll);

    });

})();




/**
@description
JS version for CSS vh unit.

@example
<div class='js-set-vh' data-vh='70' set-max-height='true'><div>
This will set the element's height to 70% of
the window height. If the data-vh attribute is missing
or 0, the height of 100% of the window will be set.
*/

(function(){

    'use strict';


    var $item = $(".js-set-vh");


    if($item.length){

        var setVh = debounce(function(){

            $item.each(function(index, el){

                var percent = $(el).data("vh") || 100,
                    calc    = $(window).outerHeight() * (percent / 100);


                // Double equals here for a less strict match.
                if($el.attr("set-max-height") == "true"){
                    $(el).css('max-height', calc);
                } else {
                    $(el).css('height', calc);
                }

            });

        }, 50);


        setVh();

        $(window).on("resize", function(){
            setVh();
        });
    }

}());




/**
@description
This function adds toggle functionality to tabs.
Only one tab can be open at a time.

@example
<div class='js-tab-toggle  tab__summary' data-tab='0'>Toggle</div>
<div class='js-tab-content  tab__content' data-tab='0'>Im some content</div>
*/

(function(){

    'use strict';


    var $tab     = $(".js-tab-toggle"),
        $content = $(".js-tab-content");

    var activeClass = "tabs__summary--active",
        hiddenClass = "hidden";


    $tab.on("click", function(){

        var $self = $(this);


        if($self.hasClass(activeClass)){

            // Remove any active states from clicked tab.
            $self.removeClass(activeClass);
            $(".js-tab-content[data-tab=" + $self.data("tab") + "]").addClass(hiddenClass);

        } else {

            // Remove any active states from all tabs.
            $tab.removeClass(activeClass);
            $content.addClass(hiddenClass);

            // Add active states to clicked tab.
            $self.addClass(activeClass);
            $(".js-tab-content[data-tab=" + $self.data("tab") + "]").removeClass(hiddenClass);

        }

    });

})();




/**
@name load-progress-bar

@description
This function updates a given element's width
every x milliseconds, like a progress bar.
Read further documentation below.

@example
<div class='load-bar'></div>
*/

(function(){

    'use strict';


    // The visual progress bar.
    // This element's width will be updated
    // as the page loads.
    var $progress = $(".load-bar");


    if($progress.length){

        var counter = {
            // Initial counter value.
            value: 0,

            // Increment by this amount.
            increment: 5,

            // The progress will pause at this amount until
            // the window has actually loaded.
            // This value should be less than 100 otherwise the progress bar may
            // finish before the window is loaded.
            max: 80,

            // Rate at which the counter increments.
            rate: 400
        };


        setInterval(function(){

            // Increase the counter by x every x ms.
            // When the counter reaches counter.max stop and
            // wait for the window to actually load
            // before setting the progress bar to done.
            if((counter.value += counter.increment) <= counter.max){
                // Set the progress bar's width to the counter value.
                $progress.css("width", counter.value + "%");
            }

        }, counter.rate); // Increase the counter every x ms/s here.


        // Once the page has loaded set the counter to its target
        // mark of counter.max. Then set the width of the progress bar to 100%.
        bbjs.cache.$window.on("load", function() {
            counter.value = counter.max;
            $progress.css("width", "100%").addClass('done');
        });

    }

}());




/**
@description
Clear input placeholders on focus.
*/

(function(){

    'use strict';


    var settings = {
        enable: true
    };


    if(settings.enable){

        var $input    = $("input[type!='submit']"),
            $textarea = $("textarea");


        // Clear placeholders on focus if there is one.
        $input.add($textarea).on("focus", function(){

            var $self = $(this);

            if($self[0].hasAttribute("placeholder")){

                $self.attr("backup-placeholder", $self.attr("placeholder")).attr("placeholder", "");

            }

        // Add the placeholders back on blur.
        }).on("blur", function(){

            var $self = $(this);

            if($self[0].hasAttribute("placeholder")){

                $self.attr("placeholder", $self.attr("backup-placeholder"));

            }

        });

    }

}());




/**
@description
This function adds basic toggleClass() functionality
on a click event to an element (settings.selector).

The element (settings.selector) should have an attribute (settings.classes)
which specifies which classes to add to the given element.

By default this function will toggleClass() on the html element.
If the element has the attribute toggle-parent, this function will apply
the class to the parent of the clicked element.

@example
<div class='js-toggle' data-toggle='search'></div>
Would output: "search--toggled" class on the html element.
*/

(function(){

    'use strict';


    var settings = {

        element: {
            selector: ".js-toggle",

            // element.selector attributes
            classes: "data-toggle",
            parentAttribute: "use-parent"
        },

        toggledClass: "--toggled"

    };


    $(document).on("click", settings.element.selector, function(){

        var $self = $(this);


        if($self.attr(settings.element.classes)){

            var classes = $self.attr(settings.element.classes).split(" ");

            $.each(classes, function(index, element){

                if($self.attr(settings.element.parentAttribute) !== "true"){
                    bbjs.cache.$html.toggleClass(element.concat(settings.toggledClass));
                } else {
                    $self.parent().toggleClass(element.concat(settings.toggledClass));
                }

            });

        } else {
            throw new Error("Missing " + settings.element.classes + " attribute on " + settings.element.selector);
        }

    });

}());




/**
@description
This function hides a .drawer via click of settings.overlay

@example
<div class='drawer__overlay'></div>
*/

(function(){

    'use strict';


    var settings = {

        // The element that we click to hide the drawer.
        overlay: ".drawer__overlay",

        // The class(es) that make the drawer visible. We remove these.
        classes: "drawer--right--toggled  drawer--left--toggled"

    };


    $(document).on("click", settings.overlay, function(){
        bbjs.cache.$html.removeClass(settings.classes);
    });

})();

