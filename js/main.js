(function($) {
    all();
    init_toc();
    doc_toc();
})(jQuery); // Fully reference jQuery after this point.
function all () {
    /**
     * Navigation bar highlighting
     */

     // Hightlight current url in menu.
    $(".j-nav li a").each(function() {
        var $href = $(this).attr("href");
        //console.log(window.location.pathname, window.location.hostname, $href );
        if ( window.location.pathname === $href )  {
            $(this).parent().addClass("active");
        }
    });


    // find the base of the current page and highlight it.
    $parts = window.location.pathname.split("/");
    if( $parts.length ){
        $parent = '/' + $parts[1] + '/';
        $( '.nav-main .j-nav li a[href="' + $parent + '"]').parent().addClass('active');
    }

    /*
        Activate sideNav for mobile
        */
    $('.button-collapse').sideNav({
        closeOnClick: true
    });

}
function init_toc(){
    $('.toc').toc({
        'selectors': 'h2', //elements to use as headings
        'container': '.main', //element to find all selectors in
        'smoothScrolling': true, //enable or disable smooth scrolling on click
        'itemClass': function(i, heading, $heading, prefix) { // custom function for item class
            return 'menu-item';
        }
    });
}

function doc_toc(){
    $collection = $('ul.collection.docs');
    $active = $collection.find('.active');
    // if no active, then just fallback to first item
    if ( $active && $active.length <= 0 ) {
        $active = $collection.find('li:first-child');
    }
    li = '';
    h2 = [];
    $('.main h2').each( function(){
        li = li + '<li><a class="collection-item" href="#' + this.id + '">' + $(this).html() + '</a></li>';
        //h2[ this.id ] = $(this).text();
    });

    if( li ){
        $active.after('<ul class="unstyled children">' + li + '</ul>');
    }

}