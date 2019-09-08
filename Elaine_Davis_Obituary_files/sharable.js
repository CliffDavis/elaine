function GetShareURL(override) {
    var url = window.location.href.toLowerCase();
    // Check for non-facebook browser 
    if (!override && !isFacebookApp()) return url;
    // Check for ampersand
    var idx = url.indexOf('&');
    // Return if none
    if (idx == -1) return url;
    // We need to remove ampersand
    var tmp = url.substring(0, url.indexOf('?'));
    // Find PID
    idx = url.indexOf('pid=');
    // Return if none 
    if (idx == -1) return url;
    // Append to tmp 
    tmp += "?" + url.substring(idx);
    // Check for ampersand 
    idx = tmp.indexOf('&');
    // Return if none 
    if (idx == -1) return tmp;
    // Remove 
    tmp = tmp.substring(0, idx);
    // Return 
    return tmp;
}
function isFacebookApp() { var ua = navigator.userAgent || navigator.vendor || window.opera; return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1); }