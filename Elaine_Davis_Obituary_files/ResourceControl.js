function ResourceControl(params) {
    var customintegratedtextlink1 = params.customIntegratedTextLink1;
    var responsiveEnabled = params.responsiveEnabled;
    var mobileBreakPoint = params.mobileBreakPoint;

    if (responsiveEnabled) {
        if (window.innerWidth > mobileBreakPoint) {
            eval(customintegratedtextlink1);
        }
    }
}