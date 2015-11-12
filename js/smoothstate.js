/*
/!*!
 * smoothState.js is jQuery plugin that progressively enhances
 * page loads to behave more like a single-page application.
 *
 * @author  Miguel Ángel Pérez   reachme@miguel-perez.com
 * @see     http://smoothstate.com
 *
 *!/

;(function ( $, window, document, undefined ) {
    'use strict';

    /!** Abort if browser does not support pushState *!/
    if(!window.history.pushState) {
        // setup a dummy fn, but don't intercept on link clicks
        $.fn.smoothState = function() { return this; };
        $.fn.smoothState.options = {};
        return;
    }

    /!** Abort if smoothState is already present **!/
    if($.fn.smoothState) { return; }

    var
        /!** Used later to scroll page to the top *!/
        $body = $('html, body'),

        /!** Used in debug mode to console out useful warnings *!/
        consl = window.console,

        /!** Plugin default options, will be exposed as $fn.smoothState.options *!/
        defaults = {

            /!** If set to true, smoothState will log useful debug information instead of aborting *!/
            debug: false,

            /!** jQuery selector to specify which anchors smoothState should bind to *!/
            anchors: 'a',

            /!** Regex to specify which href smoothState should load. If empty, every href will be permitted. *!/
            hrefRegex: '',

            /!** jQuery selector to specify which forms smoothState should bind to *!/
            forms: 'form',

            /!** If set to true, smoothState will store form responses in the cache. *!/
            allowFormCaching: false,

            /!** Minimum number of milliseconds between click/submit events. Events ignored beyond this rate are ignored. *!/
            repeatDelay: 500,

            /!** A selector that defines what should be ignored by smoothState *!/
            blacklist: '.no-smoothState',

            /!** If set to true, smoothState will prefetch a link's contents on hover *!/
            prefetch: false,

            /!** The name of the event we will listen to from anchors if we're prefetching *!/
            prefetchOn: 'mouseover touchstart',

            /!** The number of pages smoothState will try to store in memory *!/
            cacheLength: 0,

            /!** Class that will be applied to the body while the page is loading *!/
            loadingClass: 'is-loading',

            /!** Scroll to top after onStart and scroll to hash after onReady *!/
            scroll: true,

            /!**
             * A function that can be used to alter the ajax request settings before it is called
             * @param  {Object} request jQuery.ajax settings object that will be used to make the request
             * @return {Object}         Altered request object
             *!/
            alterRequest: function (request) {
                return request;
            },

            /!** Run before a page load has been activated *!/
            onBefore: function ($currentTarget, $container) {},

            /!** Run when a page load has been activated *!/
            onStart: {
                duration: 0,
                render: function ($container) {}
            },

            /!** Run if the page request is still pending and onStart has finished animating *!/
            onProgress: {
                duration: 0,
                render: function ($container) {}
            },

            /!** Run when requested content is ready to be injected into the page  *!/
            onReady: {
                duration: 0,
                render: function ($container, $newContent) {
                    $container.html($newContent);
                }
            },

            /!** Run when content has been injected and all animations are complete  *!/
            onAfter: function($container, $newContent) {}
        },

        /!** Utility functions that are decoupled from smoothState *!/
        utility = {

            /!**
             * Checks to see if the url is external
             * @param   {string}    url - url being evaluated
             * @see     http://stackoverflow.com/questions/6238351/fastest-way-to-detect-external-urls
             *
             *!/
            isExternal: function (url) {
                var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
                if (typeof match[1] === 'string' && match[1].length > 0 && match[1].toLowerCase() !== window.location.protocol) {
                    return true;
                }
                if (typeof match[2] === 'string' &&
                    match[2].length > 0 &&
                    match[2].replace(new RegExp(':(' + {'http:': 80, 'https:': 443}[window.location.protocol] +
                        ')?$'), '') !== window.location.host) {
                    return true;
                }
                return false;
            },

            /!**
             * Strips the hash from a url and returns the new href
             * @param   {string}    href - url being evaluated
             *
             *!/
            stripHash: function(href) {
                return href.replace(/#.*!/, '');
            },

            /!**
             * Checks to see if the url is an internal hash
             * @param   {string}    href - url being evaluated
             * @param   {string}    prev - previous url (optional)
             *
             *!/
            isHash: function (href, prev) {
                prev = prev || window.location.href;

                var hasHash = (href.indexOf('#') > -1) ? true : false,
                    samePath = (utility.stripHash(href) === utility.stripHash(prev)) ? true : false;

                return (hasHash && samePath);
            },

            /!**
             * Translates a url string into a $.ajax settings obj
             * @param  {Object|String} request url or settings obj
             * @return {Object}        settings object
             *!/
            translate: function(request) {
                var defaults = {
                    dataType: 'html',
                    type: 'GET'
                };
                if(typeof request === 'string') {
                    request = $.extend({}, defaults, { url: request });
                } else {
                    request = $.extend({}, defaults, request);
                }
                return request;
            },

            /!**
             * Checks to see if we should be loading this URL
             * @param   {string}    url - url being evaluated
             * @param   {string}    blacklist - jquery selector
             *
             *!/
            shouldLoadAnchor: function ($anchor, blacklist, hrefRegex) {
                var href = $anchor.prop('href');
                // URL will only be loaded if it's not an external link, hash, or
                // blacklisted
                return (
                    !utility.isExternal(href) &&
                    !utility.isHash(href) &&
                    !$anchor.is(blacklist) &&
                    !$anchor.prop('target')) &&
                    (
                        typeof hrefRegex === undefined ||
                        hrefRegex === '' ||
                        $anchor.prop('href').search(hrefRegex) !== -1
                    );
            },

            /!**
             * Resets an object if it has too many properties
             *
             * This is used to clear the 'cache' object that stores
             * all of the html. This would prevent the client from
             * running out of memory and allow the user to hit the
             * server for a fresh copy of the content.
             *
             * @param   {object}    obj
             * @param   {number}    cap
             *
             *!/
            clearIfOverCapacity: function (cache, cap) {
                // Polyfill Object.keys if it doesn't exist
                if (!Object.keys) {
                    Object.keys = function (obj) {
                        var keys = [],
                            k;
                        for (k in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                                keys.push(k);
                            }
                        }
                        return keys;
                    };
                }

                if (Object.keys(cache).length > cap) {
                    cache = {};
                }

                return cache;
            },

            /!**
             * Stores a document fragment into an object
             * @param   {object}    object - object where it will be stored
             * @param   {string}    url - name of the entry
             * @param   {string|document}    doc - entire html
             * @param   {string}    id - the id of the fragment
             *
             *!/
            storePageIn: function (object, url, doc, id) {
                var $html = $( '<html></html>' ).append( $(doc) );
                object[url] = { // Content is indexed by the url
                    status: 'loaded',
                    // Stores the title of the page, .first() prevents getting svg titles
                    title: $html.find('title').first().text(),
                    html: $html.find('#' + id), // Stores the contents of the page
                    doc: doc, // Stores the whole page document
                };
                return object;
            },

            /!**
             * Triggers an 'allanimationend' event when all animations are complete
             * @param   {object}    $element - jQuery object that should trigger event
             * @param   {string}    resetOn - which other events to trigger allanimationend on
             *
             *!/
            triggerAllAnimationEndEvent: function ($element, resetOn) {

                resetOn = ' ' + resetOn || '';

                var animationCount = 0,
                    animationstart = 'animationstart webkitAnimationStart oanimationstart MSAnimationStart',
                    animationend = 'animationend webkitAnimationEnd oanimationend MSAnimationEnd',
                    eventname = 'allanimationend',
                    onAnimationStart = function (e) {
                        if ($(e.delegateTarget).is($element)) {
                            e.stopPropagation();
                            animationCount++;
                        }
                    },
                    onAnimationEnd = function (e) {
                        if ($(e.delegateTarget).is($element)) {
                            e.stopPropagation();
                            animationCount--;
                            if(animationCount === 0) {
                                $element.trigger(eventname);
                            }
                        }
                    };

                $element.on(animationstart, onAnimationStart);
                $element.on(animationend, onAnimationEnd);

                $element.on('allanimationend' + resetOn, function(){
                    animationCount = 0;
                    utility.redraw($element);
                });
            },

            /!** Forces browser to redraw elements *!/
            redraw: function ($element) {
                $element.height();
            }
        },

        /!** Handles the popstate event, like when the user hits 'back' *!/
        onPopState = function ( e ) {
            if(e.state !== null) {
                var url = window.location.href,
                    $page = $('#' + e.state.id),
                    page = $page.data('smoothState');

                if(page.href !== url && !utility.isHash(url, page.href)) {
                    page.load(url, false);
                }
            }
        },

        /!** Constructor function *!/
        Smoothstate = function ( element, options ) {
            var
                /!** Container element smoothState is run on *!/
                $container = $(element),

                /!** ID of the main container *!/
                elementId = $container.prop('id'),

                /!** If a hash was clicked, we'll store it here so we
                 *  can scroll to it once the new page has been fully
                 *  loaded.
                 *!/
                targetHash = null,

                /!** Used to prevent fetching while we transition so
                 *  that we don't mistakenly override a cache entry
                 *  we need.
                 *!/
                isTransitioning = false,

                /!** Variable that stores pages after they are requested *!/
                cache = {},

                /!** Url of the content that is currently displayed *!/
                currentHref = window.location.href,

                /!**
                 * Clears a given page from the cache, if no url is provided
                 * it will clear the entire cache.
                 * @param  {String} url entry that is to be deleted.
                 *!/
                clear = function(url) {
                    url = url || false;
                    if(url && cache.hasOwnProperty(url)) {
                        delete cache[url];
                    } else {
                        cache = {};
                    }
                    $container.data('smoothState').cache = cache;
                },

                /!**
                 * Fetches the contents of a url and stores it in the 'cache' variable
                 * @param  {String|Object}   request  url or request settings object
                 * @param  {Function} callback function that will run as soon as it finishes
                 *!/
                fetch = function (request, callback) {

                    // Sets a default in case a callback is not defined
                    callback = callback || $.noop;

                    // Allows us to accept a url string or object as the ajax settings
                    var settings = utility.translate(request);

                    // Check the length of the cache and clear it if needed
                    cache = utility.clearIfOverCapacity(cache, options.cacheLength);

                    // Don't prefetch if we have the content already or if it's a form
                    if(cache.hasOwnProperty(settings.url) && typeof settings.data === 'undefined') {
                        return;
                    }

                    // Let other parts of the code know we're working on getting the content
                    cache[settings.url] = { status: 'fetching' };

                    // Make the ajax request
                    var ajaxRequest = $.ajax(settings);

                    // Store contents in cache variable if successful
                    ajaxRequest.success(function (html) {
                        utility.storePageIn(cache, settings.url, html, elementId);
                        $container.data('smoothState').cache = cache;
                    });

                    // Mark as error to be acted on later
                    ajaxRequest.error(function () {
                        cache[settings.url].status = 'error';
                    });

                    // Call fetch callback
                    if(callback) {
                        ajaxRequest.complete(callback);
                    }
                },

                repositionWindow = function(){
                    // Scroll to a hash anchor on destination page
                    if(targetHash) {
                        var $targetHashEl = $(targetHash, $container);
                        if($targetHashEl.length){
                            var newPosition = $targetHashEl.offset().top;
                            $body.scrollTop(newPosition);
                        }
                        targetHash = null;
                    }
                },

                /!** Updates the contents from cache[url] *!/
                updateContent = function (url) {
                    // If the content has been requested and is done:
                    var containerId = '#' + elementId,
                        $newContent = cache[url] ? $(cache[url].html.html()) : null;

                    if($newContent.length) {

                        // Update the title
                        document.title = cache[url].title;

                        // Update current url
                        $container.data('smoothState').href = url;

                        // Remove loading class
                        if(options.loadingClass) {
                            $body.removeClass(options.loadingClass);
                        }

                        // Call the onReady callback and set delay
                        options.onReady.render($container, $newContent);

                        $container.one('ss.onReadyEnd', function(){

                            // Allow prefetches to be made again
                            isTransitioning = false;

                            // Run callback
                            options.onAfter($container, $newContent);

                            if (options.scroll) {
                                repositionWindow();
                            }

                        });

                        window.setTimeout(function(){
                            $container.trigger('ss.onReadyEnd');
                        }, options.onReady.duration);

                    } else if (!$newContent && options.debug && consl) {
                        // Throw warning to help debug in debug mode
                        consl.warn('No element with an id of ' + containerId + ' in response from ' + url + ' in ' + cache);
                    } else {
                        // No content availble to update with, aborting...
                        window.location = url;
                    }
                },

                /!**
                 * Loads the contents of a url into our container
                 * @param   {string}    url
                 * @param   {bool}      push - used to determine if we should
                 *                      add a new item into the history object
                 * @param   {bool}      cacheResponse - used to determine if
                 *                      we should allow the cache to forget this
                 *                      page after thid load completes.
                 *!/
                load = function (request, push, cacheResponse) {

                    var settings = utility.translate(request);

                    /!** Makes these optional variables by setting defaults. *!/
                    if (typeof push === 'undefined') {
                        push = true;
                    }
                    if (typeof cacheResponse === 'undefined') {
                        cacheResponse = true;
                    }

                    var
                        /!** Used to check if the onProgress function has been run *!/
                        hasRunCallback = false,

                        callbBackEnded = false,

                        /!** List of responses for the states of the page request *!/
                        responses = {

                            /!** Page is ready, update the content *!/
                            loaded: function () {
                                var eventName = hasRunCallback ? 'ss.onProgressEnd' : 'ss.onStartEnd';

                                if (!callbBackEnded || !hasRunCallback) {
                                    $container.one(eventName, function(){
                                        updateContent(settings.url);
                                        if (!cacheResponse) {
                                            clear(settings.url);
                                        }
                                    });
                                }
                                else if (callbBackEnded) {
                                    updateContent(settings.url);
                                }

                                if (push) {
                                    window.history.pushState({ id: elementId }, cache[settings.url].title, settings.url);
                                }

                                if (callbBackEnded && !cacheResponse) {
                                    clear(settings.url);
                                }
                            },

                            /!** Loading, wait 10 ms and check again *!/
                            fetching: function () {

                                if (!hasRunCallback) {

                                    hasRunCallback = true;

                                    // Run the onProgress callback and set trigger
                                    $container.one('ss.onStartEnd', function(){

                                        // Add loading class
                                        if (options.loadingClass) {
                                            $body.addClass(options.loadingClass);
                                        }

                                        options.onProgress.render($container);

                                        window.setTimeout(function (){
                                            $container.trigger('ss.onProgressEnd');
                                            callbBackEnded = true;
                                        }, options.onProgress.duration);

                                    });
                                }

                                window.setTimeout(function () {
                                    // Might of been canceled, better check!
                                    if (cache.hasOwnProperty(settings.url)){
                                        responses[cache[settings.url].status]();
                                    }
                                }, 10);
                            },

                            /!** Error, abort and redirect *!/
                            error: function (){
                                if(options.debug && consl) {
                                    consl.log('There was an error loading: ' + settings.url);
                                } else {
                                    window.location = settings.url;
                                }
                            }
                        };

                    if (!cache.hasOwnProperty(settings.url)) {
                        fetch(settings);
                    }

                    // Run the onStart callback and set trigger
                    options.onStart.render($container);

                    window.setTimeout(function(){
                        if (options.scroll) {
                            $body.scrollTop(0);
                        }
                        $container.trigger('ss.onStartEnd');
                    }, options.onStart.duration);

                    // Start checking for the status of content
                    responses[cache[settings.url].status]();
                },

                /!**
                 * Binds to the hover event of a link, used for prefetching content
                 * @param   {object}    event
                 *!/
                hoverAnchor = function (event) {
                    var request,
                        $anchor = $(event.currentTarget);

                    if (utility.shouldLoadAnchor($anchor, options.blacklist, options.hrefRegex) && !isTransitioning) {
                        event.stopPropagation();
                        request = utility.translate($anchor.prop('href'));
                        request = options.alterRequest(request);
                        fetch(request);
                    }
                },

                /!**
                 * Binds to the click event of a link, used to show the content
                 * @param   {object}    event
                 *!/
                clickAnchor = function (event) {

                    // Ctrl (or Cmd) + click must open a new tab
                    var $anchor = $(event.currentTarget);
                    if (!event.metaKey && !event.ctrlKey && utility.shouldLoadAnchor($anchor, options.blacklist, options.hrefRegex)) {

                        // stopPropagation so that event doesn't fire on parent containers.
                        event.stopPropagation();
                        event.preventDefault();

                        // Apply rate limiting.
                        if (!isRateLimited()) {

                            // Set the delay timeout until the next event is allowed.
                            setRateLimitRepeatTime();

                            var request = utility.translate($anchor.prop('href'));
                            isTransitioning = true;
                            targetHash = $anchor.prop('hash');

                            // Allows modifications to the request
                            request = options.alterRequest(request);

                            options.onBefore($anchor, $container);

                            load(request);
                        }
                    }
                },

                /!**
                 * Binds to form submissions
                 * @param  {Event} event
                 *!/
                submitForm = function (event) {
                    var $form = $(event.currentTarget);

                    if (!$form.is(options.blacklist)) {

                        event.preventDefault();
                        event.stopPropagation();

                        // Apply rate limiting.
                        if (!isRateLimited()) {

                            // Set the delay timeout until the next event is allowed.
                            setRateLimitRepeatTime();

                            var request = {
                                url: $form.prop('action'),
                                data: $form.serialize(),
                                type: $form.prop('method')
                            };

                            isTransitioning = true;
                            request = options.alterRequest(request);

                            if (request.type.toLowerCase() === 'get') {
                                request.url = request.url + '?' + request.data;
                            }

                            // Call the onReady callback and set delay
                            options.onBefore($form, $container);

                            load(request, undefined, options.allowFormCaching);
                        }
                    }
                },

                /!**
                 * DigitalMachinist (Jeff Rose)
                 * I figured to keep these together with this above functions since they're all related.
                 * Feel free to move these somewhere more appropriate if you have such places.
                 *!/
                rateLimitRepeatTime = 0,
                isRateLimited = function () {
                    var isFirstClick = (options.repeatDelay === null);
                    var isDelayOver = (parseInt(Date.now()) > rateLimitRepeatTime);
                    return !(isFirstClick || isDelayOver);
                },
                setRateLimitRepeatTime = function () {
                    rateLimitRepeatTime = parseInt(Date.now()) + parseInt(options.repeatDelay);
                },

                /!**
                 * Binds all events and inits functionality
                 * @param   {object}    event
                 *!/
                bindEventHandlers = function ($element) {

                    if (options.anchors) {
                        $element.on('click', options.anchors, clickAnchor);
                        if (options.prefetch) {
                            $element.on(options.prefetchOn, options.anchors, hoverAnchor);
                        }
                    }

                    if (options.forms) {
                        $element.on('submit', options.forms, submitForm);
                    }
                },

                /!** Restart the container's css animations *!/
                restartCSSAnimations = function () {
                    var classes = $container.prop('class');
                    $container.removeClass(classes);
                    utility.redraw($container);
                    $container.addClass(classes);
                };

            /!** Merge defaults and global options into current configuration *!/
            options = $.extend( {}, $.fn.smoothState.options, options );

            /!** Sets a default state *!/
            if(window.history.state === null) {
                window.history.replaceState({ id: elementId }, document.title, currentHref);
            }

            /!** Stores the current page in cache variable *!/
            utility.storePageIn(cache, currentHref, document.documentElement.outerHTML, elementId);

            /!** Bind all of the event handlers on the container, not anchors *!/
            utility.triggerAllAnimationEndEvent($container, 'ss.onStartEnd ss.onProgressEnd ss.onEndEnd');

            /!** Bind all of the event handlers on the container, not anchors *!/
            bindEventHandlers($container);

            /!** Public methods *!/
            return {
                href: currentHref,
                cache: cache,
                clear: clear,
                load: load,
                fetch: fetch,
                restartCSSAnimations: restartCSSAnimations
            };
        },

        /!** Returns elements with smoothState attached to it *!/
        declaresmoothState = function ( options ) {
            return this.each(function () {
                var tagname = this.tagName.toLowerCase();
                // Checks to make sure the smoothState element has an id and isn't already bound
                if(this.id && tagname !== 'body' && tagname !== 'html' && !$.data(this, 'smoothState')) {
                    // Makes public methods available via $('element').data('smoothState');
                    $.data(this, 'smoothState', new Smoothstate(this, options));
                } else if (!this.id && consl) {
                    // Throw warning if in debug mode
                    consl.warn('Every smoothState container needs an id but the following one does not have one:', this);
                } else if ((tagname === 'body' || tagname === 'html') && consl) {
                    // We dont support making th html or the body element the smoothstate container
                    consl.warn('The smoothstate container cannot be the ' + this.tagName + ' tag');
                }
            });
        };

    /!** Sets the popstate function *!/
    window.onpopstate = onPopState;

    /!** Makes utility functions public for unit tests *!/
    $.smoothStateUtility = utility;

    /!** Defines the smoothState plugin *!/
    $.fn.smoothState = declaresmoothState;

    /!* expose the default options *!/
    $.fn.smoothState.options = defaults;

})(jQuery, window, document);*/
/**
 * smoothState.js is a jQuery plugin to stop page load jank.
 *
 * This jQuery plugin progressively enhances page loads to
 * behave more like a single-page application.
 *
 * @author  Miguel Ángel Pérez   reachme@miguel-perez.com
 * @see     https://github.com/miguel-perez/jquery.smoothState.js
 *
 */
;(function ( $, window, document, undefined ) {
    "use strict";

    var
        /** Used later to scroll page to the top */
        $body       = $('html, body'),

        /** Used in development mode to console out useful warnings */
        consl       = (window.console || false),

        /** Plugin default options */
        defaults    = {

            /** jquery element string to specify which anchors smoothstate should bind to */
            anchors : "a",

            /** If set to true, smoothState will prefetch a link's contents on hover */
            prefetch : false,

            /** A selecor that deinfes with links should be ignored by smoothState */
            blacklist : ".no-smoothstate, [target]",

            /** If set to true, smoothState will log useful debug information instead of aborting */
            development : false,

            /** The number of pages smoothState will try to store in memory and not request again */
            pageCacheSize : 0,

            /** A function that can be used when link is clicked */
            onClick : function (event) {
                // Nothing
            },

            /** A function that can be used to alter urls before they are used to request content */
            alterRequestUrl : function (url) {
                return url;
            },

            /** Run when a link has been activated */
            onStart : {
                duration: 0,
                render: function (url, $container) {
                    $body.scrollTop(0);
                }
            },

            /** Run if the page request is still pending and onStart has finished animating */
            onProgress : {
                duration: 0,
                render: function (url, $container) {
                    $body.css('cursor', 'wait');
                    $body.find('a').css('cursor', 'wait');
                }
            },

            /** Run when requested content is ready to be injected into the page  */
            onEnd : {
                duration: 0,
                render: function (url, $container, $content) {
                    $body.css('cursor', 'auto');
                    $body.find('a').css('cursor', 'auto');
                    $container.html($content);
                }
            },

            /** Run when content has been injected and all animations are complete  */
            callback : function(url, $container, $content) {

            }
        },

        /** Utility functions that are decoupled from SmoothState */
        utility     = {

            /**
             * Checks to see if the url is external
             * @param   {string}    url - url being evaluated
             * @see     http://stackoverflow.com/questions/6238351/fastest-way-to-detect-external-urls
             *
             */
            isExternal: function (url) {
                var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
                if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) {
                    return true;
                }
                if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + {"http:": 80, "https:": 443}[location.protocol] + ")?$"), "") !== location.host) {
                    return true;
                }
                return false;
            },

            /**
             * Checks to see if the url is an internal hash
             * @param   {string}    url - url being evaluated
             *
             */
            isHash: function (url) {
                var hasPathname = (url.indexOf(window.location.pathname) > 0) ? true : false,
                    hasHash = (url.indexOf("#") > 0) ? true : false;
                return (hasPathname && hasHash) ? true : false;
            },

            /**
             * Checks to see if we should be loading this URL
             * @param   {string}    url - url being evaluated
             * @param   {string}    blacklist - jquery selector
             *
             */
            shouldLoad: function ($anchor, blacklist) {
                var url = $anchor.prop("href");
                // URL will only be loaded if it's not an external link, hash, or blacklisted
                return (!utility.isExternal(url) && !utility.isHash(url) && !$anchor.is(blacklist));
            },

            /**
             * Prevents jQuery from stripping elements from $(html)
             * @param   {string}    url - url being evaluated
             * @author  Ben Alman   http://benalman.com/
             * @see     https://gist.github.com/cowboy/742952
             *
             */
            htmlDoc: function (html) {
                var parent,
                    elems       = $(),
                    matchTag    = /<(\/?)(html|head|body|title|base|meta)(\s+[^>]*)?>/ig,
                    prefix      = 'ss' + Math.round(Math.random() * 100000),
                    htmlParsed  = html.replace(matchTag, function(tag, slash, name, attrs) {
                        var obj = {};
                        if (!slash) {
                            elems = elems.add('<' + name + '/>');
                            if (attrs) {
                                $.each($('<div' + attrs + '/>')[0].attributes, function(i, attr) {
                                    obj[attr.name] = attr.value;
                                });
                            }
                            elems.eq(-1).attr(obj);
                        }
                        return '<' + slash + 'div' + (slash ? '' : ' id="' + prefix + (elems.length - 1) + '"') + '>';
                    });

                // If no placeholder elements were necessary, just return normal
                // jQuery-parsed HTML.
                if (!elems.length) {
                    return $(html);
                }
                // Create parent node if it hasn't been created yet.
                if (!parent) {
                    parent = $('<div/>');
                }
                // Create the parent node and append the parsed, place-held HTML.
                parent.html(htmlParsed);

                // Replace each placeholder element with its intended element.
                $.each(elems, function(i) {
                    var elem = parent.find('#' + prefix + i).before(elems[i]);
                    elems.eq(i).html(elem.contents());
                    elem.remove();
                });

                return parent.children().unwrap();
            },

            /**
             * Resets an object if it has too many properties
             *
             * This is used to clear the 'cache' object that stores
             * all of the html. This would prevent the client from
             * running out of memory and allow the user to hit the
             * server for a fresh copy of the content.
             *
             * @param   {object}    obj
             * @param   {number}    cap
             *
             */
            clearIfOverCapacity: function (obj, cap) {
                // Polyfill Object.keys if it doesn't exist
                if (!Object.keys) {
                    Object.keys = function (obj) {
                        var keys = [],
                            k;
                        for (k in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                                keys.push(k);
                            }
                        }
                        return keys;
                    };
                }

                if (Object.keys(obj).length > cap) {
                    obj = {};
                }

                return obj;
            },

            /**
             * Finds the inner content of an element, by an ID, from a jQuery object
             * @param   {string}    id
             * @param   {object}    $html
             *
             */
            getContentById: function (id, $html) {
                $html = ($html instanceof jQuery) ? $html : utility.htmlDoc($html);
                var $insideElem         = $html.find(id),
                    updatedContainer    = ($insideElem.length) ? $.trim($insideElem.html()) : $html.filter(id).html(),
                    newContent          = (updatedContainer.length) ? $(updatedContainer) : null;
                return newContent;
            },

            /**
             * Stores html content as jquery object in given object
             * @param   {object}    object - object contents will be stored into
             * @param   {string}    url - url to be used as the prop
             * @param   {jquery}    html - contents to store
             *
             */
            storePageIn: function (object, url, $html) {
                $html = ($html instanceof jQuery) ? $html : utility.htmlDoc($html);
                // Add meta information
                // Added by @pudgereyem
                var meta = {};
                meta.bodyId = $html.find( 'body' ).attr( 'id' );
                meta.bodyClasses = $html.find( 'body' ).attr( 'class' );
                meta.bodyCSS = $html.find( 'body' ).attr( 'style' );

                object[url] = { // Content is indexed by the url
                    status: "loaded",
                    title: $html.find("title").text(), // Stores the title of the page
                    html: $html, // Stores the contents of the page
                    meta: meta
                };
                return object;
            },

            /**
             * Triggers an "allanimationend" event when all animations are complete
             * @param   {object}    $element - jQuery object that should trigger event
             * @param   {string}    resetOn - which other events to trigger allanimationend on
             *
             */
            triggerAllAnimationEndEvent: function ($element, resetOn) {

                resetOn = " " + resetOn || "";

                var animationCount      = 0,
                    animationstart      = "animationstart webkitAnimationStart oanimationstart MSAnimationStart",
                    animationend        = "animationend webkitAnimationEnd oanimationend MSAnimationEnd",
                    eventname           = "allanimationend",
                    onAnimationStart    = function (e) {
                        if ($(e.delegateTarget).is($element)) {
                            e.stopPropagation();
                            animationCount ++;
                        }
                    },
                    onAnimationEnd      = function (e) {
                        if ($(e.delegateTarget).is($element)) {
                            e.stopPropagation();
                            animationCount --;
                            if(animationCount === 0) {
                                $element.trigger(eventname);
                            }
                        }
                    };

                $element.on(animationstart, onAnimationStart);
                $element.on(animationend, onAnimationEnd);

                $element.on("allanimationend" + resetOn, function(e){
                    animationCount = 0;
                    utility.redraw($element);
                });
            },

            /** Forces browser to redraw elements */
            redraw: function ($element) {
                $element.height(0);
                setTimeout(function(){$element.height('auto');}, 0);
            }
        },

        /** Handles the popstate event, like when the user hits 'back' */
        onPopState = function ( e ) {
            if(e.state !== null) {
                var url     = window.location.href,
                    $page   = $('#' + e.state.id),
                    page    = $page.data('smoothState');

                if(page.href !== url && !utility.isHash(url)) {
                    page.load(url, true);
                }
            }
        },

        /** Constructor function */
        SmoothState = function ( element, options ) {
            var
                /** Container element smoothState is run on */
                $container  = $(element),

                /** Variable that stores pages after they are requested */
                cache       = {},

                /** Url of the content that is currently displayed */
                currentHref = window.location.href,

                /**
                 * Loads the contents of a url into our container
                 *
                 * @param   {string}    url
                 * @param   {bool}      isPopped - used to determine if whe should
                 *                      add a new item into the history object
                 *
                 */
                load = function (url, isPopped) {

                    /** Makes this an optional variable by setting a default */
                    isPopped = isPopped || false;

                    var
                        /** Used to check if the onProgress function has been run */
                        hasRunCallback  = false,

                        callbBackEnded  = false,

                        /** List of responses for the states of the page request */
                        responses       = {

                            /** Page is ready, update the content */
                            loaded: function() {
                                var eventName = hasRunCallback ? "ss.onProgressEnd" : "ss.onStartEnd";

                                if(!callbBackEnded || !hasRunCallback) {
                                    $container.one(eventName, function(){
                                        updateContent(url);
                                    });
                                } else if(callbBackEnded) {
                                    updateContent(url);
                                }

                                if(!isPopped) {
                                    history.pushState({ id: $container.prop('id') }, cache[url].title, url);
                                }
                            },

                            /** Loading, wait 10 ms and check again */
                            fetching: function() {

                                if(!hasRunCallback) {

                                    hasRunCallback = true;

                                    // Run the onProgress callback and set trigger
                                    $container.one("ss.onStartEnd", function(){
                                        options.onProgress.render(url, $container, null);

                                        setTimeout(function(){
                                            $container.trigger("ss.onProgressEnd");
                                            callbBackEnded = true;
                                        }, options.onStart.duration);

                                    });
                                }

                                setTimeout(function () {
                                    // Might of been canceled, better check!
                                    if(cache.hasOwnProperty(url)){
                                        responses[cache[url].status]();
                                    }
                                }, 10);
                            },

                            /** Error, abort and redirect */
                            error: function(){
                                window.location = url;
                            }
                        };

                    if (!cache.hasOwnProperty(url)) {
                        fetch(url);
                    }

                    // Run the onStart callback and set trigger
                    options.onStart.render(url, $container, null);
                    setTimeout(function(){
                        $container.trigger("ss.onStartEnd");
                    }, options.onStart.duration);

                    // Start checking for the status of content
                    responses[cache[url].status]();

                },

                /** Updates the contents from cache[url] */
                updateContent = function (url) {
                    // If the content has been requested and is done:
                    var containerId = '#' + $container.prop('id'),
                        $content    = utility.getContentById(containerId, cache[url].html);

                    if($content) {
                        document.title = cache[url].title;

                        // Update body ID, classes and style
                        // Added by @pudgereyem
                        $('body').removeClass().addClass(cache[url].meta.bodyClasses);
                        $('body').attr('id', cache[url].meta.bodyId);
                        $('body').attr('style', cache[url].meta.bodyCSS);

                        $container.data('smoothState').href = url;

                        // Call the onEnd callback and set trigger
                        options.onEnd.render(url, $container, $content);

                        $container.one("ss.onEndEnd", function(){
                            options.callback(url, $container, $content);
                        });

                        setTimeout(function(){
                            $container.trigger("ss.onEndEnd");
                        }, options.onEnd.duration);

                    } else if (!$content && options.development && consl) {
                        // Throw warning to help debug in development mode
                        consl.warn("No element with an id of " + containerId + "' in response from " + url + " in " + object);
                    } else {
                        // No content availble to update with, aborting...
                        window.location = url;
                    }
                },

                /**
                 * Fetches the contents of a url and stores it in the 'cache' varible
                 * @param   {string}    url
                 *
                 */
                fetch = function (url) {

                    // Don't fetch we have the content already
                    if(cache.hasOwnProperty(url)) return;

                    // Removed the line below since it caused problems
                    // Issue reported here [Cache fails if other urls are prefetched during the onStart transition](https://github.com/weblinc/jquery.smoothState.js/issues/95)
                    // cache = utility.clearIfOverCapacity(cache, options.pageCacheSize);

                    cache[url] = { status: "fetching" };

                    var requestUrl  = options.alterRequestUrl(url) || url,
                        request     = $.ajax(requestUrl);

                    // Store contents in cache variable if successful
                    request.success(function (html) {
                        // Clear cache varible if it's getting too big
                        utility.storePageIn(cache, url, html);
                        $container.data('smoothState').cache = cache;
                    });

                    // Mark as error
                    request.error(function () {
                        cache[url].status = "error";
                    });
                },
                /**
                 * Binds to the hover event of a link, used for prefetching content
                 *
                 * @param   {object}    event
                 *
                 */
                hoverAnchor = function (event) {
                    var $anchor = $(event.currentTarget),
                        url     = $anchor.prop("href");
                    if (utility.shouldLoad($anchor, options.blacklist)) {
                        event.stopPropagation();
                        fetch(url);
                    }
                },

                /**
                 * Binds to the click event of a link, used to show the content
                 *
                 * @param   {object}    event
                 *
                 */
                clickAnchor = function (event) {

                    // Call the onClick function availble from options
                    // added by @pudgereyem
                    options.onClick(event);

                    var $anchor     = $(event.currentTarget),
                        url         = $anchor.prop("href"),
                        $container  = $(event.delegateTarget);

                    if (utility.shouldLoad($anchor, options.blacklist)) {
                        // stopPropagation so that event doesn't fire on parent containers.
                        event.stopPropagation();
                        event.preventDefault();
                        load(url);
                    }
                },

                /**
                 * Binds all events and inits functionality
                 *
                 * @param   {object}    event
                 *
                 */
                bindEventHandlers = function ($element) {
                    //@todo: Handle form submissions
                    $element.on("click", options.anchors, clickAnchor);

                    if (options.prefetch) {
                        $element.on("mouseover touchstart", options.anchors, hoverAnchor);
                    }

                },

                /** Used to restart css animations with a class */
                toggleAnimationClass = function (classname) {
                    var classes = $container.addClass(classname).prop('class');

                    $container.removeClass(classes);

                    setTimeout(function(){
                        $container.addClass(classes);
                    },0);

                    $container.one("ss.onStartEnd ss.onProgressEnd ss.onEndEnd", function(){
                        $container.removeClass(classname);
                    });

                };

            /** Override defaults with options passed in */
            options = $.extend(defaults, options);

            /** Sets a default state */
            if(history.state === null) {
                history.replaceState({ id: $container.prop('id') }, document.title, currentHref);
            }

            /** Stores the current page in cache variable */
            utility.storePageIn(cache, currentHref, document.documentElement.outerHTML);

            /** Bind all of the event handlers on the container, not anchors */
            utility.triggerAllAnimationEndEvent($container, "ss.onStartEnd ss.onProgressEnd ss.onEndEnd");

            /** Bind all of the event handlers on the container, not anchors */
            bindEventHandlers($container);

            /** Public methods */
            return {
                href: currentHref,
                cache: cache,
                load: load,
                fetch: fetch,
                toggleAnimationClass: toggleAnimationClass
            };
        },

        /** Returns elements with SmoothState attached to it */
        declareSmoothState = function ( options ) {
            return this.each(function () {
                // Checks to make sure the smoothState element has an id and isn't already bound
                if(this.id && !$.data(this, 'smoothState')) {
                    // Makes public methods available via $('element').data('smoothState');
                    $.data(this, 'smoothState', new SmoothState(this, options));
                } else if (!this.id && consl) {
                    // Throw warning if in development mode
                    consl.warn("Every smoothState container needs an id but the following one does not have one:", this);
                }
            });
        };

    /** Sets the popstate function */
    window.onpopstate = onPopState;

    /** Makes utility functions public for unit tests */
    $.smoothStateUtility = utility;

    /** Defines the smoothState plugin */
    $.fn.smoothState = declareSmoothState;

})(jQuery, window, document);