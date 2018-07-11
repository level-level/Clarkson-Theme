(function($) {
    all();
    init_toc();
})(jQuery); // Fully reference jQuery after this point.
function all () {
//    $(".drag-target").remove();
    var parts = window.location.pathname.split( '/' );
    var type = parts[1];
    if (type !== undefined && type != "") {
        /*
         Navigation bar highlighting
         */
        var currentPage = parts[2];

        $(".j-nav li a").each(function() {
            var $a = $(this).attr("href").split('/')[2];
            if ($a == currentPage) {
                $(this).parent().addClass("active");
            }
        });

        /*
         Documentation page highlighting
         */
        // First, check if we're on the right page
        if ($("#docs").length) {
            var currentDocPage = parts[3];
            $(".docs li a").each(function(key) {
                var $docPage = $(this).attr("href").split('/')[3];
                if ($docPage == currentDocPage
                    || currentDocPage == "" && key == 0
                    || currentDocPage === undefined && key == 0) {
                    $(this).addClass("active " + type +"-text");
                }
            });
        }

        /*
         Activate sideNav for mobile
         */
        $('.button-collapse').sideNav({
            closeOnClick: true
        });
    }
}
function init_toc(){
    $('.toc').toc({
        'selectors': 'h2', //elements to use as headings
        'container': '.content-text', //element to find all selectors in
        'smoothScrolling': true, //enable or disable smooth scrolling on click
        'itemClass': function(i, heading, $heading, prefix) { // custom function for item class
            return 'menu-item';
        }
    });
}