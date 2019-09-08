function PremiumObituaryFlowerAd(params) {
    var flowersViewMore1 = params.flowersViewMore1;
    var customRight1 = params.customRight1;
    var responsiveEnabled = params.responsiveEnabled;
    var mobileBreakPoint = params.mobileBreakPoint;

    if (responsiveEnabled) {
        if (window.innerWidth > mobileBreakPoint) {
            eval(flowersViewMore1);
            eval(customRight1);
        }
    }
}