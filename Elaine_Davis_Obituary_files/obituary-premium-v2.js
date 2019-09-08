///<reference path="../Scripts/ObituaryNavigator.js" />


function ObituaryPremiumV2(params) {
    var isNextGen = params.isNextGen;
    var showImagesInObitHtml = params.showImagesInObitHtml;
    var noticeType = params.NoticeType;
    var gPanelInitialHeight;
    var showObituaryNavigation = params.ShowObituaryNavigation;
    var obituaryNavigationType = params.ObituaryNavigationType;
    var obituaryId = params.ObituaryId;
    var noticeTypeSingular = params.NoticeTypeSingular;
    var obituaryNavigator = new ASR.ObituaryNavigator();
    var ancestryAd = params.AncestryAdShowAdFunction;
    var ancestryAdRefreshFunction = params.AncestryAdRefreshFunction;
    var currentAncestryAdSize = '';
    var ancestryAdDebounce = true;
    var shouldShowClio = params.ShouldShowClio;
    var flowersButton1 = params.flowersButton1;
    var flowersButton2 = params.flowersButton2;
    var customOverlay1 = params.customOverlay1;
    var displayRight1 = params.displayRight1;
    var responsiveEnabled = params.responsiveEnabled;
    var mobileBreakPoint = params.mobileBreakPoint;
    var showFlowersAndGifts = params.ShowFlowersAndGifts;
    var showSocialReminderPopUp = params.ShowSocialReminderPopUp;
    var userClosedSocialReminderPopUp = false;
    var shortObitUrl = params.ShortObitUrl;
    var obituaryShareApiUrl = params.ObituaryShareApiUrl;
    var facebookSharerUrl = params.FacebookSharerUrl;

    $(document).ready(function () {
        SetObitTextExpandOrCollapse();
        RotateIcons();
        SetReadMoreReadLessClickEvent();
        MakeNoPhotoVideoBoxesClickable();
        ChangeBottomAdSize();
        if (showSocialReminderPopUp) {
            SetUpSocialShareReminder();
            SetClosePopUpClickEvent();
        }
        if (shouldShowClio) {
            ReadMoreClicked(false);
        }
    });

    function ShowSocialShareReminder() {
        $("#SocialReminderDiv").css('display', 'block');
        document.getElementById('divFB').onclick = function () {
            if (shortObitUrl == '') {
                //call obituaryshare controller
                $.get(obituaryShareApiUrl, { obituaryId: obituaryId, isClassicObit: false }, function (data) {
                    shortObitUrl = JSON.parse(data)["sharelink"];
                    var fbUrl = facebookSharerUrl + "?u=" + shortObitUrl;
                    window.open(fbUrl, '', 'status = 1,height = 500,width = 500,resizable = 0');
                }, 'text');
            } else {
                var fbUrl = facebookSharerUrl + "?u=" + shortObitUrl;
                window.open(fbUrl, '', 'status = 1,height = 500,width = 500,resizable = 0');
            }
        }
    }

    function SetUpSocialShareReminder() {
        var t;
        clearTimeout(t);
        t = setTimeout(ShowSocialShareReminder, 30000)
        // DOM Events
        document.onmousemove = resetTimer;
        document.onkeypress = resetTimer;
        function resetTimer() {
            clearTimeout(t);
            if (userClosedSocialReminderPopUp ==false) {
                t = setTimeout(ShowSocialShareReminder, 30000)
            }
        }
    }

    function SetClosePopUpClickEvent() {
        $("#ClosePopup").click(CloseSocialReminderPopUp)
        $(".NotRightNow").click(CloseSocialReminderPopUp)
    }

    function CloseSocialReminderPopUp() {
        $("#SocialReminderDiv").css('display', 'none');
        userClosedSocialReminderPopUp = true;
    }

    function showAncestryToaster() {
        const ancestryToaster = document.querySelector('.CustomOverlay1Container');
        if (ancestryToaster) {
            ancestryToaster.style.display = "block";
            eval(customOverlay1);
            window.removeEventListener('scroll', showAncestryToasterOnScroll, false);
        }
    }

    function showAncestryToasterOnScroll() {
        window.scrollPercent = ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100;

        if (window.scrollPercent > 20) {
            showAncestryToaster();
        }
    }

    function CloseAncestryToaster() {
        $(".CustomOverlay1Container").remove();
    }

        window.addEventListener('scroll', showAncestryToasterOnScroll, false);
        setTimeout(showAncestryToaster, 10 * 1000);

    $("#AncestryCloseButton").click(CloseAncestryToaster);

    function responsiveAdLoading(params) {
        if ($("html").attr("data-loaded") !== "true" && $("html").attr("data-viewport") == "mobile") {
            setTimeout(function () { responsiveAdLoading(params); }, 500);
        } else {
            eval(ancestryAd);

            if (clientStorage && showObituaryNavigation) {
                obituaryNavigator.ActivateNavigator(obituaryNavigationType, obituaryId, noticeTypeSingular);
            }

            if (window.innerWidth <= mobileBreakPoint) {
                setTimeout(function () {
                    if (showFlowersAndGifts === true) {
                        eval(flowersButton1);
                        eval(flowersButton2);
                    } else {
                        $("#flower-button-1").hide();
                        $("#flower-button-2").hide();
                    }
                    $("div[data-component=sendFlowersHeaderLink]").hide();
                }, 100);
            } else {
                eval(displayRight1);
                $("#flower-button-1").hide();
                $("#flower-button-2").hide();
            }
        }
    }

    if (responsiveEnabled) {
        responsiveAdLoading(params);
    }
    else
    {
        $("#flower-button-1").hide();
        $("#flower-button-2").hide();
        if (clientStorage && showObituaryNavigation) {
            obituaryNavigator.ActivateNavigator(obituaryNavigationType, obituaryId, noticeTypeSingular);
        }
    }


    // expands clickability to entire box, not just "add a photo" or "add a video" link
    function MakeNoPhotoVideoBoxesClickable() {
        $('.NoVideoEntries').click(function () {
            var addAVideoHref = $(".NoVideoEntries .NoEntryAddLink").attr('href');
            window.location.href = addAVideoHref;
        });
        $('.NoPhotoEntries').click(function () {
            var addAPhotoHref = $(".NoPhotoEntries .NoEntryAddLink").attr('href');
            window.location.href = addAPhotoHref;
        });
        $('.NoVideoEntries, .NoPhotoEntries').css('cursor', 'pointer');
    }

    function IsNGOFHLogoCutOff() {
        var textOnlyHeight = $(".PremiumObitLayout .ObitText .ObitTextContent").height();
        var fhLogoHeight = $("#ObituaryTextFHLogoContainer").height();
        var textHeight = textOnlyHeight + fhLogoHeight + $("span.PublishedLine").outerHeight(true);
        var gPanelInitialHeight = $(".PremiumObitLayout .ObitText").height();
        var isCollapsed = (textHeight >= gPanelInitialHeight && isNextGen && !showImagesInObitHtml);
        if (isCollapsed && gPanelInitialHeight < textOnlyHeight + fhLogoHeight && gPanelInitialHeight > textOnlyHeight) {
            return true;
        }
        return false;
    }

    function SetObitTextExpandOrCollapse() {
        var textHeight = $(".PremiumObitLayout .ObitText .ObitTextContent").height() + $("#ObituaryTextFHLogoContainer").height() + $(".ObitText span.PublishedLine").outerHeight(true);
        gPanelInitialHeight = $(".PremiumObitLayout .ObitText").height();
        if (textHeight >= gPanelInitialHeight && isNextGen && !showImagesInObitHtml) {
            $(".PremiumObitLayout .ReadMore").show();
            $(".PremiumObitLayout .ObitText").addClass("FadeOut");
            $(".PremiumObitLayout .ReadMore").attr({ title: "Read More of " + noticeType });
            $(".ObitTextContainer .ReadMore .ExpandCollapse").html('+');
            if (IsNGOFHLogoCutOff) {
                $("#ObituaryTextFHLogoContainer").hide();
                $("span.PublishedLine").hide();
            }
        } else {
            $(".PremiumObitLayout .ReadMore").hide();
            $(".ObitTextContainer .ReadMore .ExpandCollapse").html('-');
            $(".ObitTextContainer .PremiumObitLayout .ObitText").css("max-height", "");
            $(".PremiumObitLayout .ObitText").addClass("ForceExpand");
            $(".PremiumObitAudioDiv").addClass("PremiumObitAudioDivOnly");
            $(".PremiumObitAudioDiv").removeClass("PremiumObitAudioDiv");
            if ($("#ReadMoreLinksPanel")[0]) {
                $("#ReadMoreLinksPanel").addClass("ReadMoreHidden");
            }
        }

    }

    function RotateIcons() {
        var currentIndex = 0;
        var autoplayTimer;
        var iconIds = [];

        $('.ObitIcons > img').each(function () {
            iconIds.push(this.id);
        });

        SetActiveIndex(currentIndex);

        if (iconIds.length > 1) {
            startAuto();
        }

        function SetActiveIndex(index) {
            if (index > (iconIds.length - 1)) {
                index = 0;
            }

            $('#' + iconIds[currentIndex]).fadeOut(500, function () {
                $('#' + iconIds[index]).fadeIn(500);
            });

            currentIndex = index;
        }

        function startAuto() {
            if (iconIds.length > 1) {
                stopAuto();
                autoplayTimer = setInterval(function () {
                    AutoClick();
                }, 4000);
            }
        }

        function stopAuto() {
            clearInterval(autoplayTimer);
        }

        function AutoClick() {
            SetActiveIndex(currentIndex + 1);
            startAuto();
        }
    }

    function SetReadMoreReadLessClickEvent() {
        $(".PremiumObitLayout .ReadMore").click(function () {
            if ($(".ReadMoreLessMessage").text() === "Read More") {
                ReadMoreClicked(true);
            } else {
                ReadLessClicked();
            }
        });
    }

    function ReadMoreClicked(refreshAd) {
        $(".PremiumObitLayout .ObitText").css("max-height", "");
        $(".PremiumObitLayout .ObitText").removeClass("FadeOut");
        $(".ReadMoreLessMessage").text("Read Less");
        $(".ObitTextContainer .ReadMore .ExpandCollapse").html('-');
        $(".ReadMore").attr("data-ga-evt-action", "readmore");
        $(".PremiumObitLayout .ReadMore").attr({ title: "Read Less of " + noticeType });
        $("#ObituaryTextFHLogoContainer").show();
        $("span.PublishedLine").show();
        if (refreshAd) {
            RefreshAd();
        }
    }

    function RefreshAd() {
        var container = $('#RightRailBannerAd.AutoRefresh .dfpContainer');
        var percentVisibleDisabled = $('#RightRailBannerAd').hasClass('PercentVisibleDisabled');
        var refreshCount = $(container).attr('data-rc');
        var percentVisible = $(container).attr('data-percvis');
        var adSlot = $(container).attr('id');

        if (refreshCount == null) {
            container.attr('data-rc', '0');
            refreshCount = $(container).attr('data-rc');
        }

        if (refreshCount < 10 && (percentVisible >= 55 || percentVisibleDisabled)) {
            lago.reload(adSlot);
            $(container).attr('data-secondsinview', 0);
            $(container).attr('data-rc', function(i, origValue) {
                return Number(origValue) + 1;
            });
        }
    }

    function ReadLessClicked() {
        if (shouldShowClio) {
            $(".PremiumObitLayout .ObitText").css("max-height", "220px");
        } else {
            $(".PremiumObitLayout .ObitText").css("max-height", gPanelInitialHeight + "px");
        }
        $(".PremiumObitLayout .ObitText").addClass("FadeOut");
        $(".ReadMoreLessMessage").text("Read More");
        $(".PremiumObitLayout .ReadMore").attr({ title: "Read More of " + noticeType });
        $(".ObitTextContainer .ReadMore .ExpandCollapse").html('+');
        $(".ReadMore").attr("data-ga-evt-action", "readless");
        if (IsNGOFHLogoCutOff) {
            $("#ObituaryTextFHLogoContainer").hide();
            $("span.PublishedLine").hide();
        }
        window.scrollTo(0, 0);
    }

    $(window).resize(function () {
        ChangeBottomAdSize();
    });

    function ChangeBottomAdSize() {
        var containerWidth = $('.PremiumObit').width();
        try
        {
            eval(params.Ad340x590HideAdFunction);
            eval(params.Ad340x522HideAdFunction);
        }
        catch(e)
        {

        }

        $('.PremiumObit .BottomWideAdPanel').css('float', 'none');
        $('.PremiumObit .BottomWideAdPanel').css('text-align', 'center');
        $('.HelpfulLinks').removeClass('RightColumn');

        if (containerWidth >= 650 && (currentAncestryAdSize == '' || currentAncestryAdSize == "small")) {
            currentAncestryAdSize = "large";
            if (!ancestryAdDebounce) {
                eval(ancestryAdRefreshFunction);
            }

            if (params.Display340x590Ad) try{eval(params.Ad340x590ShowAdFunction);
            }catch(e){}
        }
        else if (containerWidth < 580 && (currentAncestryAdSize == '' || currentAncestryAdSize == "large")) {
            currentAncestryAdSize = 'small';
            if (!ancestryAdDebounce) {
                eval(ancestryAdRefreshFunction);
            }
            if (params.Display340x522Ad) try { eval(params.Ad340x522ShowAdFunction); } catch (e) { }
        }

        ancestryAdDebounce = false;
    }
}