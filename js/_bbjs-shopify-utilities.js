(function(){

    'use strict';


    var $loadWrap   = $(".pagination-load-more");

    var loadBtn     = ".js-paginate-load-more";

    var $ajaxTarget = $('#paginate-ajax-target');


    $(document).on('click', loadBtn, function(e) {

        e.preventDefault();


        var ajaxURL = $(this).attr('href');

        $.ajax({
            url: ajaxURL,
            dataType: "html"
        })
        .done(function(data){

            var item       = $(data).find('.js-paginate-child');

            var pagination = $(data).find(loadBtn);


            var updateDom = function(){
                $ajaxTarget.append(item).append($loadWrap);
                $loadWrap.html(pagination);
            };

            updateDom();


            var ajaxURLNext = $(loadBtn).attr('href');

            if(!ajaxURLNext){
                $('.pagination-load-more').remove();
            }
        });
    });


}());





// Sort DOM elements by a specified sort function

function sortDOM(items, itemsWrap, sortFunction){

    'use strict';


    var $items     = $(items);

    var $itemsWrap = $(itemsWrap);


    $items.sort(sortFunction).each(function(){

        $itemsWrap.append(this);

    });
}


function sortDescending(a, b){

    'use strict';

    return $(a).attr("data-order") - $(b).attr("data-order");
}


function sortAscending(a, b){

    'use strict';

    return $(a).attr("data-order") + $(b).attr("data-order");
}


sortDOM(".js-collection", ".js-collection-wrap", sortDescending);





// COLLECTION PAGE

(function(){

    'use strict';


    var query = window.location.search.substring(1);


    // Sort by query if present

    if(query.search("sort_by") !== -1){

        cache.$html.addClass('filter--toggled');

        $("[href='?" + query + "']").addClass('active');

    }

}());





// ACCOUNT PAGE

(function(){

    'use strict';


    Forms.init({
        form: "#customer_login",
        ajax: false,
        animate: true
    });

    Forms.init({
        form: "#create_customer",
        ajax: false,
        animate: true
    });

    Forms.init({
        form: "#forgot-pw-form",
        ajax: false,
        animate: true
    });

    Forms.init({
        form: "#activate-pw-form",
        ajax: false,
        animate: true
    });

    Forms.init({
        form: "#reset-pw-form",
        ajax: false,
        animate: true
    });


    var $pwModal = $(".js-forgot-pw-modal");
    var $pwModalTrigger = $(".js-toggle-modal");
    var $modalClose = $(".js-forgot-pw-modal-close");


    function toggleModal(){

        window.location.hash = "#recover";

        $pwModal.toggleClass('invisible  transparent');

        $(".js-drawer-overlay").toggleClass('visible  opaque');

    }

    $("#forgot-pw-form").on("submit", function(){
        window.location.hash = "";
    });


    if(window.location.hash === "#recover"){
        toggleModal();
    }


    $pwModalTrigger.on("click", function(){
        toggleModal();
    });


    $modalClose.on("click", function(){
        toggleModal();
    });


    $pwModal.on("click", function(e){

        if($(e.target).hasClass('center-table-cell')){
            toggleModal();
        }

    });

}());