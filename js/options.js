/*
    This function will get called every page by smoothState.js
 */
function options () {
    var parts = window.location.pathname.split( '/' );
    var type = parts[1];
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
    $(".drag-target").remove();
    $('.button-collapse').sideNav({
        closeOnClick: true
    });
}

/*
    This will only get called when someone enters
    the page for the first time.
 */
$(document).ready(function () {
    options();
});