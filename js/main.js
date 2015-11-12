(function($) {
    'use strict';

    var $body = $('html, body'),
        content = $('#main').smoothState({
            prefetch: true,
            pageCacheSize: 0,
            development: true,
            // Runs when a link has been clicked
            onClick: function(event){
                var $anchor = event.currentTarget;
                var pt = $($anchor).data('pt');
                var $ct = $(".clarkson-theme-cover");
                var $cc = $(".clarkson-core-cover");
                var $at = $(".icon-arrow-theme");
                var $ac = $(".icon-arrow-core");

                if (pt) {
                    switch (pt) {
                        case "theme-cover-home":
                            $ct.addClass("half-to-full-cover");
                            $cc.addClass("half-to-min-cover");
                            break;

                        case "core-cover-home":
                            $cc.addClass("half-to-full-cover");
                            $ct.addClass("half-to-min-cover");
                            break;

                        case "core-cover-min":
                            $cc.addClass("min-to-half-cover");
                            $ct.addClass("full-to-half-cover");
                            $ac.addClass("exit-fadeout");
                            break;

                        case "theme-cover-min":
                            $ct.addClass("min-to-half-cover");
                            $cc.addClass("full-to-half-cover");
                            $at.addClass("exit-fadeout");
                            break;

                        case "mobile-cover-toggle":
                            if ($ct.hasClass("minified")) {
                                $cc.addClass("full-to-half-cover");
                                $ct.addClass("min-to-half-cover");
                            } else {
                                $ct.addClass("full-to-half-cover");
                                $cc.addClass("min-to-half-cover");
                            }
                            break;
                    }
                }
            },
            // Runs when a link has been activated
            onStart: {
                duration: 250,
                render: function (url, $container) {
                    // toggleAnimationClass() is a public method
                    // for restarting css animations with a class
                    content.toggleAnimationClass('is-exiting');
                    // Scroll user to the top
                    $body.animate({
                        scrollTop: 0
                    });
                }
            },
            /** Run when requested content is ready to be injected into the page  */
            onEnd : {
                duration: 0,
                render: function (url, $container, $content) {
                    $body.css('cursor', 'auto');
                    $body.find('a').css('cursor', 'auto');
                    $container.html($content);
                    if (options()) {}
                }
            }

        }).data('smoothState');
})(jQuery);