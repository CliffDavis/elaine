function PremiumObituary(params) {
    var learnMoreHover = params.LearnMoreHover;
    var learnMoreContainer = params.LearnMoreContainer;
    var shouldLoadDisplayTop1 = params.shouldLoadDisplayTop1;
    var responsiveEnabled = params.responsiveEnabled;
    var mobileBreakPoint = params.mobileBreakPoint;

    learnMoreContainer.hover(function() {
            learnMoreHover.show();
        },
        function() {
            learnMoreHover.hide();
        });

    if (responsiveEnabled) {
        var displayTop1 = $('.PremiumObitAdBar .dfpContainer').attr('id');
        var displayBottom1 = $('#BottomAdDfpContainer .dfpContainer').attr('id');
        var displayTop1Script = "lago.loadAd('" + displayTop1 + "');";
        var displayBottom1Script = "lago.loadAd('" + displayBottom1 + "');";

        if (window.innerWidth <= mobileBreakPoint) {
            eval(displayTop1Script);
            eval(displayBottom1Script);
        } else {
            if (shouldLoadDisplayTop1) {
                eval(displayTop1Script);
            }
        }
    }
}