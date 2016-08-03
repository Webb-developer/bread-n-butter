/**
@description
Smooth anchor link scrolling.
*/

(function(){

    'use strict';

    // a href contains #something not just #
    $('a[href*="#"]:not([href="#"])').on("click", function(e){

        var href = $(this).attr("href").replace("/", "");
        var $id  = $(href);


        if($id.length){
            e.preventDefault();
            bbjs.animateScroll($id.offset().top);
        }

    });

})();




/**
@description
JS version for CSS vh unit.
This function will set an element's height or max height
to x% of the window's height.

@example
<div class='js-set-vh' data-vh='70'><div>
This will set the element's height to 70% of
the window height. If the data-vh attribute is missing
or 0, the height of 100% of the window will be set.

@example
<div class='js-set-vh' data-vh='100' set-max-height><div>
This will set the element's max height to 100% of
the window height.
*/

(function(window){

    'use strict';


    var settings = {

        element: {
            /**
            @property {object} settings.element.$element
            Selector for the element we are modifying.
            */
            $element: $(".js-set-vh"),

            /**
            @property {string} settings.element.dataVh
            Data attribute whose value specifies the height percentage.
            */
            dataVh: "vh",

            /**
            @property {string} settings.element.setMaxHeightAttribute
            Attribute, if present on settings.element.$element
            will set the element's max height rather than height.
            */
            setMaxHeightAttribute: "set-max-height"
        },

        /**
        @property {number} settings.debounceRate
        The debounce rate for the window resize event.
        */
        debounceRate: 50

    };


    if(settings.element.$element.length){

        var setVh = debounce(function(){

            settings.element.$element.each(function(index, el){

                var percent = $(el).data(settings.element.dataVh) || 100,
                    calc    = $(window).outerHeight() * (percent / 100);


                if($(el)[0].hasAttribute(settings.element.setMaxHeightAttribute)){

                    $(el).css({
                        'max-height': calc,
                        'overflow-y': "hidden"
                    });

                } else {

                    $(el).css({
                        'height': calc,
                        'overflow-y': "hidden"
                    });

                }

            });

        }, settings.debounceRate);


        setVh();

        $(window).on("resize", function(){
            setVh();
        });
    }

}(window));




/**
@name load-progress-bar

@description
This function updates a given element's width
every x ms/s, to simulate a progress bar.

@example
<div class='load-bar' role='progressbar'></div>
*/

(function(){

    'use strict';

    /*
    The element whose width we will
    be updating.
    */
    var $progress = $(".load-bar");


    if($progress.length && !bbjs.itHasTouch(true)){

        var counter = {

            /**
            @property {number} counter.value
            The intitial counter value. Leave at 0.
            */  
            value: 0,

            /**
            @const
            @property {number} counter.INCREMENT_BY
            The amount we increment counter.value by each interval.
            */
            INCREMENT_BY: 5,

            /**
            @const
            @property {number} counter.MAX
            The max amount for the counter.value
            This value should be less than 100 otherwise
            $progress may appear finished before the window is loaded.
            */
            MAX: 80,

            /**
            @const
            @property {number} counter.rate
            The interval rate at which the counter.value increments.
            */
            RATE: 400

        };


        var interval = setInterval(function(){

            /*
            Increase the counter.value here every counter.RATE.
            When the counter reaches counter.MAX stop and
            wait for the window to actually load.
            */
            if((counter.value += counter.INCREMENT_BY) <= counter.MAX){
                // Set $progress's width to the counter.value.
                $progress.css("width", counter.value + "%");
            }

        }, counter.RATE); // Increase the counter.value every x ms/s here.


        /*
        Once the page has loaded, set the width of $progress to 100%
        and clear the interval.
        */
        bbjs.cache.$window.on("load", function() {
            $progress.css("width", "100%").addClass('load-bar--loaded');
            clearInterval(interval);
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
on a click event to an element (settings.element.selector).

The element should have an attribute (settings.element.dataToggle)
which specifies the classes to add to either the root element
or the clicked element's parent.

By default this function will toggle classes on the root element.
If the element has the attribute settings.element.toggleParent, this function will apply
the class to the parent of the clicked element. To help prevent page
reflow, always try to apply the settings.element.toggleParent attribute.

@example
<div class='js-toggle' data-toggle='search'></div>
Would output: "search--toggled" class on the html element.

@example
<div>
    <div class='js-toggle' data-toggle='dropdown' toggle-parent></div>
</div>
Would output: "dropdown--toggled" class on the parent.
*/

(function(){

    'use strict';


    var settings = {

        element: {
            /**
            @property {string} settings.element.selector
            The selector that will be bound to the click event.
            */
            selector: ".js-toggle",

            /**
            @property {string} settings.element.dataToggle
            The data attribute on the element.selector
            that contains the classes we will toggle.
            */
            dataToggle: "toggle",

            /**
            @property {string} settings.element.toggleParent
            */
            toggleParent: "toggle-parent"
        },

        /**
        @property {string} settings.toggledClass
        String that that will be appended to the
        class. Consider this a BEM modifier.
        */
        toggledClass: "--toggled"

    };


    $(document).on("click", settings.element.selector, function(){

        // Save our this reference.
        var $self = $(this);


        // Check if the clicked element has the requried
        // settings.element.dataToggle attribute.
        if($self.data(settings.element.dataToggle)){

            // Split the classes in the settings.element.dataToggle
            // attribute by a single space. We do this because the user
            // may want to toggle multiple classes.
            var classes = $self.data(settings.element.dataToggle).split(" ");


            // Loop through each of the classes in the 
            classes.forEach(function(attrClass){

                // Toggle the immediate parent.
                if($self[0].hasAttribute(settings.element.toggleParent)){
                    $self.parent().toggleClass(attrClass.concat(settings.toggledClass));
                } else {
                    bbjs.cache.$html.toggleClass(attrClass.concat(settings.toggledClass));
                }

            });

        } else {
            // Throw an error if the required settings.element.dataToggle
            // attribute is missing.
            throw new Error("Missing " + settings.element.dataToggle + " attribute on " + settings.element.selector);
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
