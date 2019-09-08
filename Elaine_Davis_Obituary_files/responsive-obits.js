var $responsive = $responsive || {};


$responsive.obits = (function () {

    var obp = {},

        _info = {
            mobileViewTriggered: false,
            tabletViewTriggered: false
        },

        _mt = {};

    _mt.init = function () {

        $(document).on("mobile-loaded", function () {
            /*
            // write methods to merge both the below functions later, removing
            // the need for a timeout
            $responsive.config.isElementLoaded("#ctl00_MainContentContainer", function (isAvailable) {
                if (isAvailable) {
                    $("<div class='responsiveLoadingDiv'></div>").insertBefore($("#ctl00_MainContentContainer"));
                    $("#ctl00_MainContentContainer").hide();
                }
            });

            window.setTimeout(function () {
                !_info.mobileViewTriggered && _mt.handleMobile();
                _info.mobileViewTriggered = true;
                $("#ctl00_MainContentContainer").show();
                $(".responsiveLoadingDiv").remove();
            }, 5000);
            */

            _mt.ShowContentWhenAvailable("#ctl00_MainContentContainer", "mobile", _mt.handleMobile);

        });

        $(document).on("tablet-loaded", function () {
            /*
            // write methods to merge both the below functions later, removing
            // the need for a timeout
            $responsive.config.isElementLoaded("#ctl00_MainContentContainer", function (isAvailable) {
                if (isAvailable) {
                    $("<div class='responsiveLoadingDiv'></div>").insertBefore($("#ctl00_MainContentContainer"));
                    $("#ctl00_MainContentContainer").hide();
                }
            });

            window.setTimeout(function () {
                !_info.tabletViewTriggered && _mt.handleTablet();
                _info.tabletViewTriggered = true;
                $("#ctl00_MainContentContainer").show();
                $(".responsiveLoadingDiv").remove();
            }, 5000);
            */

            _mt.ShowContentWhenAvailable("#ctl00_MainContentContainer", "tablet", _mt.handleTablet);

        });

        $(document).on("tablet-landscape-loaded", function () {

            /*
            // write methods to merge both the below functions later, removing
            // the need for a timeout
            $responsive.config.isElementLoaded("#ctl00_MainContentContainer", function (isAvailable) {
                if (isAvailable) {
                    $("<div class='responsiveLoadingDiv'></div>").insertBefore($("#ctl00_MainContentContainer"));
                    $("#ctl00_MainContentContainer").hide();
                }
            });

            window.setTimeout(function () {
                !_info.tabletViewTriggered && _mt.handleTabletLandScape();
                _info.tabletViewTriggered = true;
                $("#ctl00_MainContentContainer").show();
                $(".responsiveLoadingDiv").remove();
            }, 5000);
            */

            _mt.ShowContentWhenAvailable("#ctl00_MainContentContainer", "tablet", _mt.handleTablet);

        });

        $(document).on("window-loaded", function () {
            console.log("window loaded");
            /* iPad Pro specific */
            var viewport = _mt.getViewportSize();
            //alert("window: " + viewport.width + "x" + viewport.height);
            if ((viewport.width == 1024 && (viewport.height == 1296 || viewport.height == 1366)) || (viewport.width == 1366 && viewport.height == 954)) {
                setTimeout(function () {
                    var flowersContainer = $("#ctl00_MainContentPlaceholder_FlowerAd_FlowersAdPanel");
                    var rightRail = $(".RightRail");

                    if (flowersContainer.length > 0) {
                        $("#ctl00_MainContentPlaceholder_LeftColumn").insertAfter($("#ctl00_MainContentPlaceholder_FlowerAd_FlowersAdPanel"));
                    } else {
                        rightRail.prepend($("#ctl00_MainContentPlaceholder_LeftColumn"));
                    }

                    $("#ctl00_MainContentPlaceholder_LeftColumn").css("padding-left", "10px");
                    $("#ctl00_MainContentPlaceholder_ShareBar_ShareContent").insertAfter("#ctl00_MainContentPlaceholder_PremiumObitAudioDiv");
                }, 3000);
            }
            /* End */
        });

    };

    _mt.allScreens = function () {

    }

    _mt.checkElementLoaded = function (selector, callback) {

        var timesChecked = 0,
            limit = 100,

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

    _mt.ShowContentWhenAvailable = function (selector, view, callback) {

        $responsive.config.isElementLoaded(selector, function (isAvailable) {
            if (isAvailable) {
                $("<div class='responsiveLoadingBackground'><div class='responsiveLoadingContainer'><div class='responsiveLoadingDiv'></div><h2>Loading obituary information...</h2><h3>This may take a few seconds</h3></div></div>").insertBefore($(selector));
                $(selector).hide();

                window.setTimeout(function () {

                    if (view == "mobile") {
                        !_info.mobileViewTriggered && callback && callback();
                        _info.mobileViewTriggered = true;
                        $(selector).show();
                        $(".responsiveLoadingBackground").remove();
                    }

                    if (view == "tablet" || view == "tablet-loaded") {
                        !_info.mobileViewTriggered && callback && callback();
                        _info.tabletViewTriggered = true;
                        $(selector).show();
                        $(".responsiveLoadingBackground").remove();
                    }


                }, 7000);
            }
        });

    };

    _mt.handleMobile = function () {

        console.log("triggered handle Mobile");

        $responsive.config.getObitsPage("mobile", function (pageData) {

            $("#ctl00_MainContentPlaceholder_PremiumObit").prepend($("[data-component='obitsHeader']"));
            $("[data-component='obitsBody']").insertAfter($("[data-component='obitsHeader']"));


            var flowersContainer = $("[data-component='flowerAdContainer']");
            var rightRail = $(".RightRailWrapper");

            if (flowersContainer.length > 0) {
                $("[data-component='obitsLeftColumn']").insertAfter($("[data-component='flowerAdContainer']"));
            } else {
                rightRail.prepend($("[data-component='obitsLeftColumn']"));
            }

            $("[data-component='guestbookDiv']").insertAfter($("[data-component='obitsLeftColumn']"));

            $("[data-component='obitsHeader']").insertBefore($("#ctl00_MainContentPlaceholder_ObitLeftColumn.ObitLeftColumn"));
            $("#ctl00_MainContentPlaceholder_ObitPhoto").insertBefore($("#ctl00_MainContentPlaceholder_Text"));
            $("#ctl00_MainContentPlaceholder_GuestBookControl_HeaderViewAllLink").text("View Guest Book");

            $("#ctl00_MainContentPlaceholder_PremiumObit").prepend('<div data-component="obits-header-links"></div>');
            $("[data-component=obits-header-links]").append($("[data-component=viewAllMessagesLink]"), $("[data-component=sendFlowersHeaderLink]"), $("#flower-button-2"));

            $("[data-component=viewAllMessagesLink] a").text("Guest Book");

            // Clone send Flowers and apply new class for second button
            //var sendFlowersBig = $("[data-component=sendFlowersHeaderLink]").clone();
            //sendFlowersBig.addClass('FlowersBig');
            //sendFlowersBig.insertAfter($("#ctl00_MainContentPlaceholder_PremiumObitText.PremiumObitText"));
            //$("[data-component=sendFlowersHeaderLink] a")[1].innerText = 'Send Flowers';

            $("#ctl00_MainContentPlaceholder_ObitTextContainer")[0].appendChild($("#ctl00_MainContentPlaceholder_ShareBar_ShareContent.ShareContent.vertical")[0]);

            if (!$(".PremiumObitLayout .ObitText").hasClass("ForceExpand")) {
                $('#ctl00_MainContentPlaceholder_ObitTextPanel').addClass('FadeOut');
                $('#ctl00_MainContentPlaceholder_ObitTextPanel').css('max-height', '223px');
                $('.ReadMoreLessMessage').html('Read More').css('visibility', 'visible');
            }
            //$(".MainContentContainer").show();

            $("#ctl00_MainContentPlaceholder_HelpfulLinks_HelpfulLinks").insertAfter($(".ObitBody"));
            $("#ctl00_MainContentPlaceholder_HelpfulLinks_HelpfulLinks").remove();
            $(".ReturnToPortalLink").insertAfter($("#ctl00_MainContentPlaceholder_HelpfulLinks_HelpfulLinks"));

            $(".ReturnToPortalLink").append("<span class='HeyGotAnyGrapes'></span>");
            $("#flower-button-1").insertBefore("#ctl00_MainContentPlaceholder_ShareBar_ShareContent");

            $("html").attr("data-loaded", "true");
        });

    };

    _mt.handleTablet = function () {

        console.log("triggered handle tablet");

        $responsive.config.getObitsPage("tablet", function (pageData) {

            $("#ctl00_MainContentPlaceholder_PremiumObit").prepend($("[data-component='obitsHeader']"));
            $("[data-component='obitsBody']").insertAfter($("[data-component='obitsHeader']"));

            var flowersContainer = $("[data-component='flowerAdContainer']");
            var rightRail = $(".RightRailWrapper");

            if (flowersContainer.length > 0) {
                $("[data-component='obitsLeftColumn']").insertAfter($("[data-component='flowerAdContainer']"));
            } else {
                rightRail.prepend($("[data-component='obitsLeftColumn']"));
            }


            $("[data-component='obitsHeader']").insertAfter($("#ctl00_MainContentPlaceholder_ObitLeftColumn.ObitLeftColumn"));

            //$(".MainContentContainer").show();


            $("#ctl00_MainContentPlaceholder_PremiumObit").prepend('<div data-component="obits-header-links"></div>');
            //$("[data-component=obits-header-links]").append($("[data-component=viewAllMessagesLink]"), $("[data-component=sendFlowersHeaderLink]"));


            $("[data-component=obits-header-links]").insertBefore($("#ctl00_MainContentPlaceholder_PremiumObitLayout.PremiumObitLayout"));


            //$("[data-component=sendFlowersHeaderLink]").clone().insertAfter($("#ctl00_MainContentPlaceholder_PremiumObitText.PremiumObitText"));

            $("#ctl00_MainContentPlaceholder_ObitTextContainer")[0].appendChild($("#ctl00_MainContentPlaceholder_ShareBar_ShareContent.ShareContent.vertical")[0]);

            if (!$(".PremiumObitLayout .ObitText").hasClass("ForceExpand")) {
                $('#ctl00_MainContentPlaceholder_ObitTextPanel').addClass('FadeOut');
                $('#ctl00_MainContentPlaceholder_ObitTextPanel').css('max-height', '223px');
                $('.ReadMoreLessMessage').html('Read More').css('visibility', 'visible');
            }

            $('[data-component=obitsHeader]').insertBefore("#ctl00_MainContentPlaceholder_ObitLeftColumn");
            $('[data-component=obits-header-links]').hide();

            if (_mt.getViewportSize().height > _mt.getViewportSize().width) {
                $("#ctl00_MainContentPlaceholder_ObitLeftColumn").css("float", "none");
            }
            //$("#ctl00_MainContentPlaceholder_ObituaryName").insertBefore("#ctl00_MainContentPlaceholder_ObitLeftColumn");
            //$(".YearsAndNoticeTypeContainer").insertAfter($("#ctl00_MainContentPlaceholder_ObituaryName"));

            $("#ctl00_MainContentPlaceholder_ShareBar_ShareContent").insertAfter($("#ctl00_MainContentPlaceholder_PremiumObitText"));
            $(".HeaderViewAll").remove();

            $("html").attr("data-loaded", "true");
        });

    };

    _mt.handleTabletLandScape = function () {

        console.log("triggered handle tablet landscape");

        $responsive.config.getObitsPage("tablet", function (pageData) {

            $("#ctl00_MainContentPlaceholder_PremiumObit").prepend($("[data-component='obitsHeader']"));
            $("[data-component='obitsBody']").insertAfter($("[data-component='obitsHeader']"));
            $("[data-component='obitsLeftColumn']").insertAfter($("[data-component='flowerAdContainer']"));
            $("[data-component='helpFulLinks']").insertAfter($("[data-component='obitsLeftColumn']"));
            //$(".MainContentContainer").show();

            $("#ctl00_MainContentPlaceholder_ObitTextContainer")[0].appendChild($("#ctl00_MainContentPlaceholder_ShareBar_ShareContent.ShareContent.vertical")[0]);

            if (!$(".PremiumObitLayout .ObitText").hasClass("ForceExpand")) {
                $('#ctl00_MainContentPlaceholder_ObitTextPanel').addClass('FadeOut');
                $('#ctl00_MainContentPlaceholder_ObitTextPanel').css('max-height', '223px');
                $('.ReadMoreLessMessage').html('Read More').css('visibility', 'visible');
            }

            
            $("html").attr("data-loaded", "true");
        });

    };

    _mt.init();


})();



$responsive.dom = (function (page) {

    var _mt = {};

    _mt.obits = function () {

        //var Column1googleAdsElm = $("#Column1 [data-google-query-id]"),
        //    Column3googleAdsElm = $("#Column3 [data-google-query-id]");

        var obitsPage = {

            obitsHeader: {
                $elm: $("[data-component='obitsHeader']"),
                wrap: [
                    $("#ctl00_MainContentPlaceholder_PremiumObit .head"),
                    $("#ctl00_MainContentPlaceholder_PremiumObit .Divider")
                ],
                //uniqueId: "latestObituaries-responsive",
                //class: "LatestObitContainer",
                componentName: "obitsHeader"
            },

            obitsBody: {
                $elm: $("[data-component='obitsBody']"),
                wrap: false,
                // wrap: [
                // $("#ctl00_MainContentPlaceholder_ShareBar_ShareContent"),
                // $("#ctl00_MainContentPlaceholder_ObitLeftColumn"),
                //$("#ctl00_MainContentPlaceholder_PremiumObitText")
                //],
                //uniqueId: "latestObituaries-responsive",
                class: "ObitBody",
                componentName: "obitsBody"
            },

            obitsLeftColumn: {
                $elm: $("[data-component='obitsLeftColumn']"),
                wrap: [
                    $("#ctl00_MainContentPlaceholder_LeftColumn")
                ],
                //uniqueId: "latestObituaries-responsive",
                class: "ServiceAndObit",
                componentName: "obitsLeftColumn"
            },

            flowerAdContainer: {
                $elm: $("#ctl00_MainContentPlaceholder_FlowerAd_FlowersAdPanel.FlowersAdContainer"),
                wrap: false,
                //uniqueId: "latestObituaries-responsive",
                //class: "ObitBody",
                componentName: "flowerAdContainer"
            },

            guestbookDiv: {
                $elm: $("[data-component='guestbookDiv']"),
                wrap: [
                    $(".ObitBody .GuestBookDiv")
                ],
                //uniqueId: "latestObituaries-responsive",
                class: "ObitBody",
                componentName: "guestbookDiv"
            },

            helpFulLinks: {
                $elm: $("[data-component='helpFulLinks']"),
                wrap: [
                    $(".HelpfulLinks")
                ],
                //uniqueId: "latestObituaries-responsive",
                //class: "ObitBody",
                componentName: "helpFulLinks"
            },

            sendFlowersHeaderLink: {
                $elm: $("[data-component='sendFlowersHeaderLink']"),
                wrap: [
                    $("a.SendFlowersHeaderLink")
                ],
                //uniqueId: "latestObituaries-responsive",
                //class: "ObitBody",
                componentName: "sendFlowersHeaderLink"
            },

            viewAllMessagesLink: {
                $elm: $("[data-component='viewAllMessagesLink']"),
                wrap: [
                    $("#PremiumObitBody.PremiumV2 .GuestBookMessages .ViewAllMessagesLink")
                ],
                //uniqueId: "latestObituaries-responsive",
                //class: "ObitBody",
                componentName: "viewAllMessagesLink"
            },

            listenObituariesLink: {
                $elm: $("[data-component='listenObituariesLink']"),
                wrap: [
                    $("#PremiumObitBody.PremiumV2 .MainContentContainer .PremiumObitLayout .ServiceAndObit .PremiumObit .ObitBody .PremiumObitText .ReadMore"),
                    $("#PremiumObitBody .MainContentContainer .PremiumObitLayout .ServiceAndObit .PremiumObit .ObitBody .PremiumObitAudioDiv")
                ],
                //uniqueId: "latestObituaries-responsive",
                //class: "ObitBody",
                componentName: "listenObituariesLink"
            }


            /*
            localSpotLight: {
                $elm: $("[data-component='localSpotLight']"),
                wrap: [
                    $("#Column1 #ctl00_ContentPlaceHolder1_FHLSModule_FeaturedSpotlightsDiv")
                ],
                componentName: "localSpotLight"
            },

            localSpotLight15: {
                $elm: $("[data-component='localSpotLight']"),
                wrap: [
                    $("#Column1 #ctl00_ContentPlaceHolder1_TopLSModule_LocalSpotlightContainer")
                ],
                componentName: "localSpotLight"
            },

            // This is same as featured listings
            localTribute: {
                $elm: $("[data-component='localTribute']"),
                wrap: [
                    $("#Column1 #ctl00_ContentPlaceHolder1_BottomLSDiv")
                ],
                componentName: "localTribute"
            },

            thisWeekObituaries: {
                $elm: $("[data-component='thisWeekObituaries']"),
                wrap: [
                    $("#ctl00_ContentPlaceHolder1_LatestObituaries_ThisWeek_SectionDiv")
                ],
                //uniqueId: "thisWeekObituaries-responsive",
                class: "LatestObitContainer",
                componentName: "thisWeekObituaries"
            },

            promotile15: {
                $elm: $("[data-component='promotile15']"), //todayInHistory,
                wrap: [
                    $("#promotile15")
                ],
                componentName: "promotile15"
            },

            column1GoogleAd1: {
                $elm: $(Column1googleAdsElm[0]),
                wrap: false,
                componentName: "column1GoogleAd1"
            },

            column1GoogleAd2: {
                $elm: $(Column1googleAdsElm[1]),
                wrap: false,
                componentName: "column1GoogleAd2"
            },
            */
        };

        return obitsPage;

    };

    _mt.get = function (page) {

        return _mt[page]();

    };


    return { get: _mt.get };

})();


$responsive.position = (function (page, viewport) {

    var _mt = {};

    //-------------------------------------------------------------------------------------------
    //This is for the obituaries home page
    //-------------------------------------------------------------------------------------------

    _mt.obits = {};
    _mt.obits.mobile = {};
    _mt.obits.tablet = {};

    _mt.obits.mobile = {

        column1: {
            position1: { type: "content", name: ["obitsHeader"] },
            position2: { type: "content", name: ["obitsBody"] },
            position3: { type: "content", name: ["obitsLeftColumn"] },
            position4: { type: "content", name: ["guestbookDiv"] },
            position5: { type: "ad", name: ["flowerAdContainer"] },
            position6: { type: "content", name: ["sendFlowersHeaderLink"] },
            position7: { type: "content", name: ["viewAllMessagesLink"] }//,
            //position8: { type: "content", name: ["listenObituariesLink"] }
            /*
            position2: { type: "content", name: ["localTribute"] },
            position3: { type: "content", name: ["latestObituaries"] },
            //position3 : { type: "content", name: "recentFuneralHomeActivities"},
            position4: { type: "ad", name: ["column3GoogleAd1"] },
            position5: { type: "content", name: ["promotile14"] },
            position6: { type: "ad", name: ["column3GoogleAd2"] },
            position7: { type: "content", name: ["nationalSpotLight"] },
            position8: { type: "content", name: ["helpFullServices"] },
            position9: { type: "ad", name: ["column3GoogleAd3"] },
            position10: { type: "content", name: ["searchObituaries"] }*/
        }

    };

    _mt.obits.tablet = {

        column1: {
            position1: { type: "content", name: ["obitsHeader"] },
            position2: { type: "content", name: ["obitsBody"] },
            position3: { type: "content", name: ["obitsLeftColumn"] },
            position4: { type: "content", name: ["guestbookDiv"] },
            position5: { type: "ad", name: ["flowerAdContainer"] },
            /*position6: { type: "content", name: ["sendFlowersHeaderLink"] },*/
            /*position7: { type: "content", name: ["viewAllMessagesLink"] },*/
            position8: { type: "content", name: ["helpFulLinks"] }
        }/*,

        column2: {
            position1: { type: "content", name: ["latestObituaries"] },
            position2: { type: "ad", name: ["column3GoogleAd1"] },
            position3: { type: "content", name: ["searchObituaries"] },
            position4: { type: "ad", name: ["column3GoogleAd2"] },
            position5: { type: "content", name: ["recentFuneralHomeActivities"] },
            position6: { type: "ad", name: ["column3GoogleAd2"] },
            position7: { type: "content", name: ["thisWeekObituaries"] },
            position8: { type: "ad", name: ["column3GoogleAd3"] },
            position9: { type: "ad", name: ["column3GoogleAd3"] },
            position10: { type: "content", name: ["recentCondolences"] }
        }*/

    };

    //-----------------------------------------------------------------------------------------------
    // End of obituaries home page positioning
    //-----------------------------------------------------------------------------------------------




    _mt.get = function (page, viewport) {

        return _mt[page][viewport];

    };


    return { get: _mt.get };


})();