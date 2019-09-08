var $responsive = $responsive || {};

$responsive.config = (function () {

    var config = {},
        _info = {},
        _mt = {};


    _mt.getParent = function ($elm) {

        if ($elm.parent().attr("data-column")) {
            return $elm;
            //prevElm = prevElm.parent();
        } else {
            for (var i = 0; i <= 10; i++) {
                $elm = $elm.parent();
                if ($elm.parent().attr("data-column")) {
                    return $elm;
                }
            }
        }

    };

    _mt.getPage = {

        obituaries: function (viewport, getPageCallback) {

            console.log("getpage inside config triggered");
            var data = {},
                pageDOM = $responsive.dom.get("obituaries"),
                positioning = $responsive.position.get("obituaries", viewport);

            _mt.compileData(pageDOM, positioning, "obituaries", getPageCallback);

        },

        obits: function (viewport, getPageCallback) {

            var data = {},
                pageDOM = $responsive.dom.get("obits"),
                positioning = $responsive.position.get("obits", viewport);

            _mt.compileData(pageDOM, positioning, "obits", getPageCallback);

        }

    };

    _mt.compileData = function (pageDOM, positioning, pageName, callback) {

        var data = {};

        console.log("compile data inside config triggered");

        $.each(positioning, function (j, val) {

            var positionNumb = 1,
                column = positioning[j];

            data[j] = {}; // making an entry

            $.each(column, function (i, val) {

                //var componentObject = column[i].name,
                //  $elm = _mt.getElmFromObject(pageDOM[componentObject]);

                var $elm = getElm(column[i]);


                function getElm(columnData) {

                    var namesArr = columnData.name,
                        $element = [];

                    for (var namesIndex = 0; namesIndex < namesArr.length; namesIndex++) {
                        var componentObject = namesArr[namesIndex],
                            $element = _mt.getElmFromObject(pageDOM[componentObject]);
                        if ($element && $element.length > 0) {
                            return $element;
                        }
                    }

                    return $element;
                }


                var type = column[i].type;

                if ($elm != undefined && $elm && $elm.length > 0) {

                    if (type == "ad") {
                        var componentName = $elm.attr("data-component");
                        $elm.removeAttr("data-component");
                        $elm = pageName == "obituaries" ? _mt.getParent($elm) : $elm;
                        $elm.attr("data-component", componentName);
                    }

                    var position = "position" + positionNumb;

                    data[j][position] = {
                        $elm: $elm,
                        type: type
                    };

                    positionNumb = positionNumb + 1;
                }

            });

        });

        callback && callback(data);

    };

    _mt.getElmFromObject = function (obj) {

        if (Object.keys(obj.$elm).length > 0) {
            if (!obj.wrap) {

                obj.$elm.attr("data-component", obj.componentName);
                return obj.$elm;

            } else if (obj.wrap.length > 0) {

                var wraperArr = obj.wrap,
                    innerClass = obj.componentName + "-inner";

                $.each(wraperArr, function (i, val) {
                    wraperArr[i].addClass(innerClass);
                });

                $("." + innerClass).wrapAll("<div data-component='" + obj.componentName + "' class='" + obj.class + "'/></div>");

                return $("[data-component='" + obj.componentName + "']");

            }
        } else {
            return [];
        }
    };

    _mt.checkElementLoaded = function (selector, callback) {

        var timesChecked = 0,
            limit = 200,

            interval = setInterval(function () {

                var $elm = $(selector),
                    $elmAvailable = $elm.length > 0 ? true : false;

                if ($elmAvailable || limit == timesChecked) {

                    if ($elmAvailable) {
                        callback(true);
                    } else {
                        callback(false);
                    }

                    clearInterval(interval);
                }

                timesChecked = timesChecked + 1;

            }, 100);

    };

    return {
        getPage: _mt.getPage,
        getObituariesPage: _mt.getPage.obituaries,
        getObitsPage: _mt.getPage.obits,
        getParent: _mt.getParent,
        isElementLoaded: _mt.checkElementLoaded
    }

})();

$responsive.main = (function () {

    var _mt = {},

        info = {
            mobileResized: false,
            tabletResized: false
        },
        obPageInfo = null;

    _mt.init = function () {

        _mt.registerListeners();
        _mt.isResponsiveSite() && _mt.handleResize();

    };

    _mt.registerListeners = function () {
        //console.log("register listeners");
        //$(window).bind('orientationchange', function (event) {
        //    _mt.handleResize();
        //});
        //$(window).on("resize", mt.handleResize);
        //$(document).on("mobile-loaded", mt.handleMobile);
    };

    _mt.handleResize = function () {

        var $this = $(this),
            $html = $("html");

        console.log("handle resize");
        var meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0');
        document.getElementsByTagName('head')[0].appendChild(meta);


        //$("head").append($metaViewport);
        var viewSize = _mt.getViewportSize();
        //alert("viewSize: " + viewSize.width + "x" + viewSize.height);
        if (viewSize.height >= viewSize.width) {
            var windowSize = viewSize.width;

            // Portrait or exact square
            if (windowSize <= 480) {
                $html.attr("data-viewport", "mobile");
                $(document).trigger("mobile-loaded");
                info.mobileResized = true;
            } else if (windowSize <= 940) {
                $html.attr("data-viewport", "tablet");
                $(document).trigger("tablet-loaded");
                info.tabletResized = true;
            } else {
                $html.attr("data-viewport", "window");
                info.mobileResized = false;
                info.tabletResized = false;
                $(document).trigger("window-loaded");
                if (windowSize > 1260) {
                    //$("meta[name=viewport]").remove();
                    $("html").attr("data-loaded", "true");
                }
            }
        }
        else {
            var windowSize = viewSize.height;

            // Landscape
            if (windowSize <= 480) {
                $html.attr("data-viewport", "mobile");
                $(document).trigger("mobile-loaded");
                info.mobileResized = true;
            } else if (windowSize <= 768 && viewSize.width < 1200) {
                $html.attr("data-orientation", "landscape");
                $(document).trigger("tablet-landscape-loaded");
                info.tabletResized = true;
            } else {
                $html.attr("data-viewport", "window");
                info.mobileResized = false;
                info.tabletResized = false;
                $(document).trigger("window-loaded");
                if (windowSize > 1260) {
                    //$("meta[name=viewport]").remove();
                    $("html").attr("data-loaded", "true");
                }
            }

        }

        /*
        var windowSize = _mt.getViewportSize().width;
        console.log("Got viewport: " + windowSize);
        if (windowSize < 480) {

            $html.attr("data-viewport", "mobile");
            $(document).trigger("mobile-loaded");
            info.mobileResized = true;
        }

        if (windowSize > 480 && windowSize < 940) {
            $html.attr("data-viewport", "tablet");
            $(document).trigger("tablet-loaded");
            info.tabletResized = true;
        }

        if (windowSize > 768 && windowSize <= 1024) {
            $html.attr("data-orientation", "landscape");
            $(document).trigger("tablet-landscape-loaded");
            info.tabletResized = true;
        }

        if (windowSize > 1024) {
            $html.attr("data-viewport", "window");
            info.mobileResized = false;
            info.tabletResized = false;
        }

        if (windowSize > 1260) {
            $("meta[name=viewport]").remove();
        }
        */

    };

    _mt.getViewportSize = function () {
        var e = window, a = 'outer';
        if (!('outerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }

        if (e[a + 'Width'] == 0) {
            if ($(window).width() > 0) {
                return { width: $(window).width(), height: $(window).height() };
            }
            else {
                return { width: screen.width, height: screen.height };
            }
        }

        return { width: e[a + 'Width'], height: e[a + 'Height'] };
    };

    _mt.isResponsiveSite = function () {
        var attr = $("html").attr('data-responsive');

        // For some browsers, `attr` is undefined; for others, `attr` is false. Checking for both.
        if (typeof attr !== typeof undefined && attr !== false) {
            return true
        } else {
            return false;
        }

    };

    _mt.init();

    return {};

})();

/*
// Cases covered

//
1. Missing components -
In any case if there is a component missing, this engine wont break, it will only
pick up the components that are available and continue

2. Hiding Component
The components that are floating around needs to be hidden, so adding another entry in the position
to identify is the element is hidden or visible

3. Parent wrapping
This engine will add the data-component=ComponentName to the parent element (which is the "#Column1 or #Column2 or #Column3")
and not the component itself, so that all of the components are neatly wrapped and are direct decendents of these above
mentioned columns

4. Ads -
Ads should not be touched. Any dom changes to the ad will make the ad disappear so carefully trying to wrap our elements a
around them

*/