/* JSP Version: $Header: /usr1/cvsroot/com/icanon/web/modules/e-pass/common/js/e-pass.js,v 1.52 2017/05/16 13:08:42 jay Exp $ */ 

var todayDate 			= new Date();
var newzwareFilesAdded 	= ""; 
var nwNetwork			= "";
var nwSSOTried			= false;
var nwMeterDone			= false;

function newzware_loadTheme(){
	//CSS for UI
	var uiCSS = nwProtocol + "://" + nwServer + "/newzlib/js/jquery/" + uiVersion + "/themes/" + nwTheme + "/jquery.ui.all.css";
	var fileref = document.createElement("link");
	fileref.rel = "stylesheet";
	fileref.type = "text/css";
	fileref.href = uiCSS;
	document.getElementsByTagName("head")[0].appendChild(fileref);
}
function newzware_epassInit(){
	var compName = newzware_getCookie(nwCompName);
	if(compName == null || compName == ""){
		compName = randomString();
        newzware_setCookie(nwCompName, compName, 9999);
	}
	if(!newzware_cookiesEnabled()){
		window.location = nwCookiesDisabledURL;
	}
	if(nwLoadThemeSeparate == "N")
		newzware_loadTheme();
	nwJQuery(document).ready(function() {
		nwCurrURL = window.location.href;
		newzware_createMainPanel();
		newzware_createLoginPanel();
		newzware_createPurchasePanel();
		newzware_createRegistrationPanel();
		newzware_createRegistrationOptionsPanel();
		newzware_createAuthorizePanel();
		newzware_createConfirmPanel();
		newzware_createECopyPanel();
		if(nwFacebook == "Y"){
			newzware_facebookInit();
		}
		if(nwJQueryDialogClass != ""){
			nwJQuery("#nwmaindiv").dialog({
				width: nwDialogWidth,
				autoOpen: false,
				hide: nwJQueryEffect,
				dialogClass: nwJQueryDialogClass,
				modal: true
			});
			
		}
		else{
			nwJQuery("#nwmaindiv").dialog({
				width: nwDialogWidth,
				autoOpen: false,
				hide: nwJQueryEffect,
				position: nwDialogPosition,
				modal: true
			});
		}
		if(nwUseJQueryInputStyle == "Y")
			nwJQuery('input:text, input:password, input[type=email]').button().css(nwInputJQueryStyle).off('mouseenter').off('mousedown').off('keydown');
		if(nwUseInputStyle == "Y")
			nwJQuery('.nwinputtext').css(nwInputStyle);
		if(nwUseMainDivStyle == "Y")
			nwJQuery('.nwmaindivclass').css(nwMainDivStyle);
			
		nwJQuery("#nwmaindiv").dialog('option','resizable',nwResizable);
   		nwJQuery("button","#nwmaindiv").button();
		nwJQuery("#nwpurchaseoptionsinfo").tabs();
		var icons = {
			header: "ui-icon-circle-arrow-e",
			headerSelected: "ui-icon-circle-arrow-s"
		};
		nwJQuery("#nwpurchaseaccordion").accordion({
			icons: icons,
			collapsible: true,
			fillSpace: false,
			autoHeight: false,
			active: false
		});
		nwJQuery("#registration-div").tabs();
		nwJQuery("#confirmation-div").tabs();
		nwJQuery("#ecopy-div").tabs();
        nwJQuery(function() {
            nwJQuery("#issub").buttonset();
        });
        
    	var JTable = function() {};
    	JTable.Setup = function() {
    	    var table = nwJQuery('.nw-conf-table');
    	    nwJQuery('caption', table).addClass('ui-state-default');
    	    nwJQuery('th', table).addClass('ui-state-default');
    	    nwJQuery('td', table).addClass('ui-widget-content');
    	};

    	JTable.SetupNewRows = function(rows) {
    	    nwJQuery(rows).find('td').addClass('ui-widget-content');
    	};
    	nwJQuery(function() { 
    	    JTable.Setup();
    	});
    	
    	if(nwForceEmailAsUserName == "Y"){
    		document.getElementById("divnwsubloginidlabel").style.display = "none";
    		document.getElementById("divnwsubloginidfield").style.display = "none";
    		document.getElementById("divnwnonsubloginidlabel").style.display = "none";
    		document.getElementById("divnwnonsubloginidfield").style.display = "none";
    	}
    	
    	newzware_attachLoginEvent();
    	
    	if(nwNoActionOnInit){
    		return;
    	}
    	else{
    		var userVar     = newzware_getCookie(nwUserCk);
    		var userLgVar   = newzware_getCookie(nwUserLgCk);
			if(nwMustRegister == "Y" ||   (userVar != null && userVar != "" && userLgVar != null && userLgVar != "")  ){
				if(nwDebug == "Y")
					console.log("Calling newzware_start.  User vars are populated.");
				if(nwSSO == "Y"){
					var ssologgedout = newzware_getCookie("newzware-sso-loggedout");
					if(ssologgedout != null && ssologgedout == "Y"){
                		newzware_deleteCookie(nwAuthCk);

                		if(nwDeleteAllOnLogout == "Y"){
                    		if(nwDebug == "Y")
                        		console.log("Deleting cookies");
                    		newzware_deleteCookie(nwUserCk);
                    		newzware_deleteCookie(nwUserLgCk);
                    		newzware_deleteCookie(nwUserSecCk);
                		}
					}
				}
				newzware_start(nwInitLogin);
			}
			else{
				if(newzware_v("MT")){
					var mt     = newzware_getCookie(nwMeterCk);
					if(mt != null)
						mt = "" + (parseInt(mt) + 1);
					else
						mt = "1";
					if(nwDebug == "Y")
						console.log("Meter: " + mt + ", Thresh: " + nwMeterThreshold);
					if(!nwMeterDone){
						nwMeterDone = true;
						if(nwMeterExpireEndOfMonth)
							newzware_setCookie(nwMeterCk,mt,newzware_getDaysForMonthMeter());
						else
							newzware_setCookie(nwMeterCk,mt,nwMeterDefaultDays);
					}
					if(parseInt(mt) <= nwMeterThreshold){
						if(nwDebug == "Y")
							console.log("Showing content.  Meter is less than threshold.");
						newzware_showContent(false);
						if("Y" == nwShowMeterMessage)
							newzware_meterBoxOpen(mt,nwMeterThreshold);
					}
					else{
						if(nwDebug == "Y")
							console.log("Initiating login.  nwInitLogin=" + nwInitLogin);
						newzware_start(nwInitLogin);
						newzware_showMessage(nwMeterUpMessage,"H");
						if(nwMeterLimitReachedCallback != "")
							window.setTimeout(nwMeterLimitReachedCallback ,200);
						
					}
				}
				else{
					alert("Configuration error.  Metering is not enabled.");
				}
			}
    	}
	});
}
function newzware_isAuthorized(){
	var isAuthorized= false;
	var authVar     = newzware_getCookie(nwAuthCk);
    var userVar     = newzware_getCookie(nwUserCk);
    var userLgVar   = newzware_getCookie(nwUserLgCk);
    if(authVar != null){
    	var authVarArr  = authVar.split("|");
    	var authStr     = authVarArr[0];
    	var authDate    = authVarArr[1];
       	if(authDate == newzware_parseDate(todayDate) && authStr == "Y"){
       		isAuthorized = true;
       	}
	}
    return isAuthorized;
}
function newzware_checkPulse(){
    nwJQuery.getJSON(nwPulseURL + "?callback=?",
            function(data) {
    			newzware_login();
            }).fail(function() { 
                console.log( "error communicating to host." ); 
                nwShowLogout = "N";
                newzware_showContent(true);
            });
	
}
function newzware_start(initLogin){
	var authVar     = newzware_getCookie(nwAuthCk);
    var userVar     = newzware_getCookie(nwUserCk);
    var userLgVar   = newzware_getCookie(nwUserLgCk);
	if(nwDebug == "Y")
		console.log("AuthVar: " + authVar);
    if(authVar != null){
    	var authVarArr  = authVar.split("|");
    	var authStr     = authVarArr[0];
    	var authDate    = authVarArr[1];
       	if(authDate == newzware_parseDate(todayDate) && authStr == "Y"){
       		try{
       			if(nwLoggedInAndAuthorizedCallback != "")
       				window.setTimeout(nwLoggedInAndAuthorizedCallback,200);
       		}catch(error){}
       		newzware_showContent(true);
       	}
		else {
       		if(userVar != null && userVar != "" && userLgVar != null && userLgVar != "")
				newzware_authorization(userLgVar,null,userVar,null);
			else{
				if(initLogin) {
					newzware_checkPulse();
				}
			}
		}
	}
	else{
		if(nwDebug == "Y")
			console.log("userVar: " + userVar + ", userLgVar: " + userLgVar);
   		if(userVar != null && userVar != "" && userLgVar != null && userLgVar != ""){
       		newzware_authorization(userLgVar,null,userVar,null);
		}
		else{
			if(initLogin)
				newzware_checkPulse();
		}
	}
}
function newzware_login(){
	//Show Login
	if(nwSSO == "Y" && !nwSSOTried){
		nwSSOTried = true;
		newzware_authorization("","",null,"Y");
	}
	else{
		newzware_showMain();
		newzware_showLogin();
	}
}
function newzware_purchaseCancelled(){
	newzware_showLogin();
}
function newzware_loginCancelled(){
	nwJQuery("#nwmaindiv").dialog("close");
}
function newzware_isMainVisible(){
	if(document.getElementById("nwmaindiv").style.display == "block")
		return true;
	else
		return false;
}
function newzware_showProcessing(m){
	document.getElementById("nwmainmessage").innerHTML = "<img src='" + nwProtocol + "://" + nwServer + "/newzlib/images/processing2.gif' border='0' /> " + nwHighlight1 + m + nwHighlight2;
	document.getElementById("nwmainmessagediv").style.display = "block";
}
function newzware_doLogin(){
	newzware_showProcessing("Validating...");
    var nwloginid 	= document.getElementById("nwloginid").value;
    var nwpassword 	= document.getElementById("nwpassword").value;
    newzware_authorization(nwloginid.toLowerCase(),nwpassword,null,null);
}
function newzware_registrationAuthorize(l,p){
	newzware_hideAuthorizePanel();
	newzware_showProcessing("Logging in.  Please wait...");
    var l 	= document.getElementById("nwloginid").value;
    var p 	= document.getElementById("nwpassword").value;
	newzware_authorization(l.toLowerCase(),p,null,null);
}
function newzware_nwtrim(s) {
	var l=0; var r=s.length -1;
	while(l < s.length && s[l] == ' ')
	{	l++; }
	while(r > l && s[r] == ' ')
	{	r-=1;	}
	return s.substring(l, r+1);
}
function newzware_authorization(l,p,h,sso){
	var theURL = nwAuthURL;
	var compName = newzware_getCookie(nwCompName);
	
	l = newzware_nwtrim(l);
	
	if(h == null){
		h = newzware_getUH(l,p);
	}
    if(nwPubDate == ""){
    	nwPubDate = newzware_parseDate(todayDate);
    }
    var params = "&hashNoDate=Y&compName=" + encodeURIComponent(compName) + "&site=" + nwSite + "&login_id=" + encodeURIComponent(l) + "&edition=" + nwEdition + "&pubDate=" + nwPubDate;
    if(nwAppId != "")
    	params += "&appId=" + encodeURIComponent(nwAppId);
	if(l.indexOf("fb_") == 0)
		params += "&network=FB&network_id=" + l.substring(3);
	else
		params += "&hash=" + h;
	if(nwSSO == "Y"){
		params += "&sso=Y";
		theURL = ssoAuthURL;
	}

    nwJQuery.getJSON(theURL + "?callback=?" + params,
            function(data) {
    				var isPublic = false;
                   	if(document.getElementById("nwpublic").checked)
                   		isPublic = true;
                    var authenticated 	= data.authenticated;
                    var exitCode	= data.exitcode;
					if(nwDebug == "Y")
                    	console.log("Authenticated: " + authenticated + ", Exit Code: " + exitCode);

console.log("E-Pass: exitCode: " + exitCode);
                    if(authenticated == "No"){
						var message = "";
						if(exitCode == "1" || exitCode == "10"){
							nwIsLoggedIn = false;
                			newzware_login();
                			if(sso != "Y"){
                				if(l.indexOf("fb_") == 0)
                					message = nwFacebookInvalidMessage;
                				else
                					message = nwInvalidLogin;
                				newzware_showMessage(message,"A");
                			}
						}
						else if(exitCode == "11" || exitCode == "15"){
							nwIsLoggedIn = false;
                   			var sec 		= data.password;
                   			l				= data.login;
                   			if(nwSSO == "Y"){
console.log("E-Pass: using tracker");
                   				newzware_tracker(l);
                   			}
                   			
                   			if(nwSSO == "Y")
                   				p				= data.unec;
                   			
							if(h != null)
								newzware_setCookie(nwUserCk,h,1);
							else
								newzware_setCookie(nwUserCk,newzware_getUH(l,p),1);
               				newzware_setCookie(nwUserLgCk,l,1);
               				newzware_setCookie(nwUserSecCk,sec,1);
                			newzware_login();
                			if(exitCode == "11")
                				message = nwLogoutMessage;
                			else
                				message = nwValidateEmailMessage;
							newzware_showMessage(message,"A");
						}
						else if(exitCode == "200"){
							if(nwResetPasswordMessage){
								newzware_showMessage(nwResetPasswordMessage);
								window.setTimeout(newzware_resetPassword,nwResetPasswordTimeToRedirect);
							}
							else{
								newzware_showMessage("Your password must be reset.  You will be redirected to reset your password in 5 seconds.");
								window.setTimeout(newzware_resetPassword,5000);
							}
						}
						else{
							if(nwDebug == "Y")
								console.log("Authenticated Is No, doing else block. ");
                   			var sec 		= data.password;
                   			l				= data.login;
                   			
                   			if(nwSSO == "Y"){
                   				p				= data.unec;
                   				if(nwDebug == "Y"){
                   					console.log("Login: " + l + ", Password: " + sec);
                   				}
                   				newzware_tracker(l);
                   			}
                   			
							if(!isPublic){
								if(h != null)
									newzware_setCookie(nwUserCk,h,1);
								else
									newzware_setCookie(nwUserCk,newzware_getUH(l,p),1);
               					newzware_setCookie(nwUserLgCk,l,1);
               					newzware_setCookie(nwUserSecCk,sec,1);
               				}
							else{
								if(h != null)
									newzware_setSessionCookie(nwUserCk,h);
								else
									newzware_setSessionCookie(nwUserCk,newzware_getUH(l,p));
               					newzware_setSessionCookie(nwUserLgCk,l);
               					newzware_setSessionCookie(nwUserSecCk,sec);
							}
							if(newzware_v("MT")){
								if(nwDebug == "Y")
									console.log("Is Metered in newzware_authorization()");
								if(nwMustRegister == "Y"){
									var params = "&login_id=" + encodeURIComponent(l) + "&threshold=" + nwMeterThreshold + "&days=" + encodeURIComponent(nwMeterDefaultDays);
   									nwJQuery.getJSON(nwMeterURL + "?callback=?&site=" + nwSite + params,
   										function(meter) {
											var views = meter.views;
											if(parseInt(views) <= nwMeterThreshold){
												newzware_showContent(false);
												if("Y" == nwShowMeterMessage)
													newzware_meterBoxOpen(views,nwMeterThreshold);
   											}
											else{
                    							var nwname	= data.fname + " " + data.lname;
                    							var sec 	= data.password;
                    							nwWelcome = nwWelcome.replace("_NAME_",nwname);
												message = nwWelcome + "<br/><br/>" + nwMeterUsed;
												if(nwNoShowOptionsAfterLogin != "Y"){
                									newzware_showMain();
													newzware_showMessage(message,"A");
													newzware_hideLoginShowPurchase();
												}
												if(nwMeterLimitReachedCallback != "")
													window.setTimeout(nwMeterLimitReachedCallback ,200);
											}
										}
									);
								}
								else{
									if(nwDebug == "Y")
										console.log("Registration not forced in newzware_authorization()");
									var mt     = newzware_getCookie(nwMeterCk);
									if(mt == null)
										mt = "0";
									if(nwDebug == "Y")
										console.log("Metered view count in newzware_authorization(): " + mt + ", meter threshold: " + nwMeterThreshold);
									if(!nwMeterDone){

										if(mt != null)
											mt = "" + (parseInt(mt) + 1);
										else
											mt = "1";
										if(nwDebug == "Y")
											console.log("Authorized function meter: " + mt + ", Thresh: " + nwMeterThreshold);
										nwMeterDone = true;
										if(nwMeterExpireEndOfMonth)
											newzware_setCookie(nwMeterCk,mt,newzware_getDaysForMonthMeter());
										else
											newzware_setCookie(nwMeterCk,mt,nwMeterDefaultDays);
									}
									if(parseInt(mt) <= nwMeterThreshold){
										newzware_showContent(false);
										newzware_meterBoxOpen(mt,nwMeterThreshold);
									}
									else{
                    					var nwname	= data.fname + " " + data.lname;
                    					var sec 	= data.password;
                    					nwWelcome = nwWelcome.replace("_NAME_",nwname);
										message = nwWelcome + "<br/><br/>" + nwMeterUsed;
										if(nwNoShowOptionsAfterLogin != "Y"){
                							newzware_showMain();
											newzware_showMessage(message,"A");
											newzware_hideLoginShowPurchase();
										}
										if(exitCode != "2" && nwMeterLimitReachedCallback != "")
											window.setTimeout(nwMeterLimitReachedCallback ,200);
									}
								}
							}
							else {
								if(exitCode == "2"){
                    				var nwname	= data.fname + " " + data.lname;
                    				var sec 	= data.password;
                    				nwWelcome = nwWelcome.replace("_NAME_",nwname);
									message = nwWelcome + "<br/><br/>" + nwNoValidSubscrip;
									if(nwNoShowOptionsAfterLogin != "Y"){
                						newzware_showMain();
										newzware_showMessage(message,"A");
										newzware_hideLoginShowPurchase();
									}
									document.getElementById(nwContentId).style.display = "none";
								}
                       			else if(exitCode == "5"){
                           	 		var nwname  = data.fname + " " + data.lname;
                           	 		var sec     = data.password;
                           	 		nwWelcome = nwWelcome.replace("_NAME_",nwname);
                           	 		message = nwWelcome + "<br/><br/>" + nwInsufficientFunds;
									if(nwNoShowOptionsAfterLogin != "Y"){
                            			newzware_showMain();
                            			newzware_showMessage(message,"A");
										newzware_hideLoginShowPurchase();
									}
									document.getElementById(nwContentId).style.display = "none";
                        		}
							}
							newzware_afterLogin();
						}
                   	}
                    else if(authenticated == "Yes"){
                      	var today   	= new Date();
                        var days        = nwuserCkDefaultDays;
                   		var sec 		= data.password;
                 		l				= data.login;
                 		if(nwSSO == "Y"){
                 			p 			= data.unec;
                 			newzware_tracker(l);
                 		}
                 		
                   		var zone		= "";
                   		try{
                        	var subscription = data.subscrip;
                        	for(var i = 0; i < subscription.length; i++){
                        	    if(subscription[i].edition == nwEdition){
                        	        zone = subscription[i].ratezone;
                        	        break;  
                        	    }   
                        	}
                   			
                   		}catch(error){
                   		}
                        if(nwUserCkSubscripDays == "Y"){
                        	var endDate     = "";
                        	var subscrip    = data.subscrip;
                        	for(var i = 0; i < subscrip.length; i++){
                        	    if(subscrip[i].deltype != "EC"){
                        	        endDate = subscrip[i].end;
                        	        break;  
                        	    }   
                        	}
                        	if(endDate != null && endDate != "null" && endDate != ""){
                        	    var ed      = new Date(endDate);
                        	    var one_day =1000*60*60*24;
                        	    try{
                        	    	days    = Math.ceil((ed.getTime()-today.getTime())/(one_day));
                        	    	if(days < 1)
                        	    		days = nwuserCkDefaultDays;
                        	    }catch(error){ 
                        	    	days = nwuserCkDefaultDays; 
                        	    }
                        	}
                        }
                        document.getElementById("nwmainmessage").innerHTML = "";
                        //The length should be the length of the subscription unless public terminal.
               			if(!isPublic){
							if(h != null)
               					newzware_setCookie(nwUserCk,h,days);
							else
               					newzware_setCookie(nwUserCk,newzware_getUH(l,p),days);
               				newzware_setCookie(nwUserLgCk,l,days);
               				newzware_setCookie(nwUserSecCk,sec,days);
               				newzware_setCookieMin(nwAuthCk,"Y|" + newzware_parseDate(today) + "|" + zone,nwReauthTimeMin);
               			}
               			else{
							if(h != null)
               					newzware_setSessionCookie(nwUserCk,h);
							else
               					newzware_setSessionCookie(nwUserCk,newzware_getUH(l,p));
               				newzware_setSessionCookie(nwUserLgCk,l);
               				newzware_setSessionCookie(nwUserSecCk,sec);
               				newzware_setSessionCookie(nwAuthCk,"Y|" + newzware_parseDate(today) + "|" + zone);
               			}
                        newzware_showContent(true);
						newzware_afterLogin();
                    }
            }).fail(function() { 
                console.log( "error communicating to host." ); 
                nwShowLogout = "N";
                newzware_showContent(true);
            });
}
function newzware_parseDate(dte){
    var curr_date 	= dte.getDate();
    var curr_month 	= dte.getMonth();
    curr_month++;
    var curr_year 	= dte.getFullYear();
    if(curr_date < 10)
    	day = "0" + curr_date;
    else 
    	day = "" + curr_date;
    if(curr_month < 10)
    	month = "0" + curr_month;
    else
    	month = "" + curr_month;
    return "" + curr_year + "-" + month + "-" + day;
	
}
function newzware_getUH(l,p){
    var userHash 	= l + p + nwVariable;
    return newzware_calcMD5(userHash);
}
function newzware_createMainPanel(){
        var mainDiv = document.createElement("div");
        mainDiv.id = "nwmaindiv";
        mainDiv.className = "nwmaindivclass";
        mainDiv.title = nwDialogHeading;
        mainDiv.innerHTML = nwMainHTML;
        mainDiv.style.display = "none";
        document.body.appendChild(mainDiv);
}
function newzware_createLoginPanel(){
        var loginDiv = document.createElement("div");
        loginDiv.id = "nwlogindiv";
        loginDiv.style.display = "none";
        if(nwCustomLoginTable == "")
        	loginDiv.innerHTML = nwLoginTable;
        else
        	loginDiv.innerHTML = nwCustomLoginTable;
        document.getElementById("nwmaindiv").appendChild(loginDiv);
}
function newzware_createPurchasePanel(){
        var purchaseDiv = document.createElement("div");
        purchaseDiv.id = "nwpurchasediv";
        purchaseDiv.style.display = "none";
        if(nwCustomPurchasePanel == "")
        	purchaseDiv.innerHTML = nwPurchasePanel;
        else
        	purchaseDiv.innerHTML = nwCustomPurchasePanel;
        document.getElementById("nwmaindiv").appendChild(purchaseDiv);
}
function newzware_createRegistrationPanel(){
        var registrationDiv = document.createElement("div");
        registrationDiv.id = "nwregistrationdiv";
        registrationDiv.style.display = "none";
        if(nwCustomRegistrationPanel == "")
        	registrationDiv.innerHTML = nwRegistrationPanel;
        else
        	registrationDiv.innerHTML = nwCustomRegistrationPanel;
        document.getElementById("nwmaindiv").appendChild(registrationDiv);
}
/* FACEBOOK */
function newzware_facebookLogin(){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
			//document.getElementById("nwloginid").value = "fb_" + uid;
           	//document.getElementById("nwpassword").value = "FB_" + uid;
    		newzware_authorization("fb_" + uid, "FB_" + uid,null,null);
        } else {
            FB.login(function(response) {
                if (response.authResponse) {
                    var userId = response.authResponse.userID;
					//document.getElementById("nwloginid").value = "fb_" + userId;
                   	//document.getElementById("nwpassword").value = "FB_" + userId;
    				newzware_authorization("fb_" + userId, "FB_" + userId,null,null);
                } else {
					document.getElementById("nwloginid").value = "";
                   	document.getElementById("nwpassword").value = "";
                }
            });
        }
    });
}
function newzware_doFacebookSubRegistration(){
	FB.getLoginStatus(function(response) {
  		if (response.status === 'connected') {
  			var uid = response.authResponse.userID;
			newzware_registerUsingFacebook(uid);
		} else {
			FB.login(function(response) {
        		if (response.authResponse) {
  					var userId = response.authResponse.userID;
					newzware_registerUsingFacebook(userId);
        		} else {
        		}
    		});
		}
	});
}
function newzware_facebookInit(){
	if(nwFacebookInitialize == "Y"){
		var fbrootDiv = document.createElement("div");
    	fbrootDiv.id = "fb-root";
   		document.body.appendChild(fbrootDiv);
		window.fbAsyncInit = function() {
   	 		FB.init({ appId      : nwFacebookAPIKey, status     : true, cookie     : true, xfbml      : true  });
  		};
  		(function(d){
     		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     		if (d.getElementById(id)) {return;}
     		js = d.createElement('script'); js.id = id; js.async = true;
     		js.src = nwFacebookJS;
     		ref.parentNode.insertBefore(js, ref);
   		}(document));
	}
}
/* END FACEBOOK */
function newzware_createRegistrationOptionsPanel(){
        var optDiv = document.createElement("div");
        optDiv.id = "nwregoptionsdiv";
        optDiv.style.display = "none";
        optDiv.innerHTML = nwRegistrationOptionsPanel;
        document.getElementById("nwmaindiv").appendChild(optDiv);
}
function newzware_createAuthorizePanel(){
        var authorizeDiv = document.createElement("div");
        authorizeDiv.id = "nwauthorizediv";
        authorizeDiv.style.display = "none";
        authorizeDiv.innerHTML = nwAuthorizePanel;
        document.getElementById("nwmaindiv").appendChild(authorizeDiv);
}
function newzware_createConfirmPanel(){
        var confirmDiv = document.createElement("div");
        confirmDiv.id = "nwconfirmdiv";
        confirmDiv.style.display = "none";
        confirmDiv.innerHTML = nwConfirmPanel;
        document.getElementById("nwmaindiv").appendChild(confirmDiv);
}
function newzware_createECopyPanel(){
        var ecopyDiv = document.createElement("div");
        ecopyDiv.id = "nwecopydiv";
        ecopyDiv.style.display = "none";
        ecopyDiv.innerHTML = nwECopyPanel;
        document.getElementById("nwmaindiv").appendChild(ecopyDiv);
}
function newzware_showPurchasePanel(){
	nwJQuery('#nwpurchasediv').show(nwJQueryEffect, function() {
		//Complete
		if(nwDefaultPurchasePanel != -1){
			nwJQuery("#nwpurchaseaccordion").accordion("activate",nwDefaultPurchasePanel);
		}
		if(nwShowPurchaseCallback != ""){
			window.setTimeout(nwShowPurchaseCallback,200);
		}
	});	
}
function newzware_showConfirmationPanel(){
	nwJQuery('#nwconfirmdiv').show(nwJQueryEffect, function() {
		//Complete
	});	
}
function newzware_showECopyConfirmationPanel(){
	nwJQuery('#nwecopydiv').show(nwJQueryEffect, function() {
		//Complete
	});	
}
function newzware_cancelConfirmation(){
	nwJQuery('#nwconfirmdiv').hide(nwJQueryEffect, function() {
		newzware_showPurchasePanel();
	});	
}
function newzware_cancelECopyConfirmation(){
	nwJQuery('#nwecopydiv').hide(nwJQueryEffect, function() {
		newzware_showPurchasePanel();
	});	
}
function newzware_cancelRegistration(){
	  nwJQuery('#nwregistrationdiv').hide(nwJQueryEffect, function() {
		    newzware_showLogin();
	  });	
}
function newzware_showRegistrationPanel(){
	newzware_clearMessage();
	newzware_hideRegistrationBlocks();
	if(nwFacebook == "Y" || nwTwitter == "Y"){
		nwJQuery('#nwregoptionsdiv').show(nwJQueryEffect, function() {
			if(nwShowRegistrationCallback != ""){
				window.setTimeout(nwShowRegistrationCallback,200);
			}
		});	
	}
	else{
		nwJQuery('#nwregistrationdiv').show(nwJQueryEffect, function() {
			newzware_showRegistrationChoice();
			if(nwShowRegistrationCallback != ""){
				window.setTimeout(nwShowRegistrationCallback,200);
			}
		});	
	}
}
function newzware_hideAuthorizePanel(){
	nwJQuery('#nwauthorizediv').hide(nwJQueryEffect, function() {
	});
}
function newzware_hideLoginShowRegistration(){
	  nwJQuery('#nwlogindiv').hide(nwJQueryEffect, function() {
		    newzware_showRegistrationPanel();
	  });	
}
function newzware_hideLoginShowPurchase(){
	console.log("Hiding login showing purchase.");
	if (typeof nwInverse == "undefined" || !nwInverse) { 
		nwJQuery('#nwlogindiv').hide(nwJQueryEffect, function() {
			newzware_showPurchasePanel();
		});	
	}
	else{
		console.log("Alternate showing.");
		newzware_hideAll(false);
		nwJQuery('#nwlogindiv').show();
	}
}
function newzware_hideRegistrationShowPurchase(){
	newzware_clearMessage();
	nwJQuery('#nwregistrationdiv').hide(nwJQueryEffect, function() {
		newzware_showPurchasePanel();
	});	
}
function newzware_hideRegistrationShowAuthorize(){
	nwJQuery('#nwregistrationdiv').hide(nwJQueryEffect, function() {
		nwJQuery('#nwauthorizediv').show(nwJQueryEffect, function() {
		});
	});	
}
function newzware_hideLogout(){
	if(nwFloatLogout == "N"){
		document.getElementById(nwLogoutID).innerHTML = "";
	}
	else{
		if(document.getElementById("nwlogoutdiv"))
			document.getElementById("nwlogoutdiv").style.display = "none";
	}
	
}
function newzware_afterLogout(){
	try{
		if(nwAfterLogout != "")
			window.setTimeout(nwAfterLogout,200);
	}catch(error){
	}
}
function newzware_afterLogin(){
	nwIsLoggedIn	= true;
	try{
		if(nwAfterLogin != "")
			window.setTimeout(nwAfterLogin,200);
		else
			newzware_showLogout();
	}catch(error){
	}
}
function newzware_showLogout(){
	if(nwShowLogout == "Y"){
		if(nwFloatLogout == "N"){
			document.getElementById(nwLogoutID).innerHTML = "<a href='javascript:newzware_doLogout()' style='" + nwLogoutStyle + "'>" + nwLogoutText + "</a>";
		}
		else{
			if(document.getElementById("nwlogoutdiv"))
				document.getElementById("nwlogoutdiv").style.display = "block";
			else{
				var logoutDiv = document.createElement("div");
				logoutDiv.id = "nwlogoutdiv";
				logoutDiv.innerHTML = nwLogoutDivHTML;
				logoutDiv.setAttribute("style", nwLogoutDivStyle);
				logoutDiv.style.cssText = nwLogoutDivStyle;
				document.body.appendChild(logoutDiv);	
			}
		}
	}
}
function newzware_doLogout(){
	var params = "";
	var userLgVar 	= newzware_getCookie(nwUserLgCk);
	if(userLgVar == null)
		userLgVar = "";
	if(userLgVar.indexOf("fb_") == 0)
		params += "&network=FB&network_id=" + encodeURIComponent(userLgVar.substring(3));
	else	
		params += "&login_id=" + encodeURIComponent(userLgVar);
	nwJQuery.getJSON(nwLogoutURL + "?callback=?&site=" + nwSite + params,
		function(data) {
   			if(data.exitcode != "0"){
				newzware_showMessage(nwNoLogoutMessage,"A");
   			}
   			else{
   				if(nwSSO == "Y"){
   					newzware_removeTracker();
   				}
   				newzware_deleteCookie(nwAuthCk);
	
				if(nwDeleteAllOnLogout == "Y"){
					if(nwDebug == "Y")
						console.log("Deleting cookies");
   					newzware_deleteCookie(nwUserCk);
   					newzware_deleteCookie(nwUserLgCk);
   					newzware_deleteCookie(nwUserSecCk);
				}
   				newzware_hideLogout();
   				newzware_afterLogout();
   			}
		}).fail(function() { 
			console.log( "error communicating to host." ); 
			newzware_hideLogout();
   			newzware_afterLogout();
        });
}
function newzware_showContent(displayLogout){
	/* Show log out link/button */
	if(displayLogout)
		newzware_showLogout();
	if(nwJQuery("#nwmaindiv").dialog('isOpen'))
		newzware_hideMain();
	if(nwContentCallback != "")
		window.setTimeout(nwContentCallback,200);
	else{
		document.getElementById(nwContentId).style.display = "block";
		try{
			if(nwIsTeaserBlock == "Y"){
				if(document.getElementById(nwTeaserId))
					document.getElementById(nwTeaserId).style.display = "none";
			}
			else{
				if(document.getElementById(nwTeaserId))
					document.getElementById(nwTeaserId).style.innerHTML = "";
			}
		}catch(error){}
	}
		
} 
function newzware_hideAll(hideMessage){
	if(document.getElementById("nwpurchasediv"))
		document.getElementById("nwpurchasediv").style.display = "none";

	if(hideMessage){
		if(document.getElementById("nwmainmessagediv"))
			document.getElementById("nwmainmessagediv").style.display = "none";
	}
	if(document.getElementById("nwlogindiv"))
		document.getElementById("nwlogindiv").style.display = "none";
	if(document.getElementById("nwregistrationdiv"))
		document.getElementById("nwregistrationdiv").style.display = "none";
	if(document.getElementById("nwauthorizediv"))
		document.getElementById("nwauthorizediv").style.display = "none";
	if(document.getElementById("nwconfirmdiv"))
		document.getElementById("nwconfirmdiv").style.display = "none";
	if(document.getElementById("nwecopydiv"))
		document.getElementById("nwecopydiv").style.display = "none";
}
function newzware_hidePurchase(){
	document.getElementById("nwpurchasediv").style.display = "none";
}
function newzware_clearMessage(){
	if(document.getElementById("nwmainmessagediv"))
		document.getElementById("nwmainmessagediv").style.display = "none";
	if(document.getElementById("nwmainmessage"))
		document.getElementById("nwmainmessage").innerHTML = "";
}
function newzware_showLogin(){
	newzware_hideAll(true);
	newzware_clearMessage();

	if(nwSSO == "Y" && !nwSSOTried){
		nwSSOTried = true;
		newzware_authorization("","",null,"Y");
	}
	else{

		if(!newzware_isMainVisible())
			newzware_showMain();
		//newzware_hidePurchase();

		nwJQuery('#nwlogindiv').show(nwJQueryEffect, function() {
			//Complete
			document.getElementById("nwloginid").focus();
		
			if(nwShowLoginCallback != ""){
				window.setTimeout(nwShowLoginCallback,200);
			}
		});
	}
}
function newzware_hideMain(){
	nwJQuery("#nwmaindiv").dialog('close');
}
function newzware_showMain(){
	if(!nwJQuery("#nwmaindiv").dialog('isOpen'))
		nwJQuery("#nwmaindiv").dialog('open');
}
function newzware_cookiesEnabled(){
	var cookieEnabled = (navigator.cookieEnabled) ? true : false;
	if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
		document.cookie="testcookie";
		cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
	}
	return cookieEnabled;
}
function newzware_setSessionCookie(c_name,value) {
	//var c_value=escape(value) + "; path=/;";
	//document.cookie=c_name + "=" + c_value;
	document.cookie = c_name + "=" + escape(value) + ";" + nwCookieDomain + "expires=0; path=/;";
}
function newzware_setCookieMin(c_name,value,min) {
	var exdate=new Date();
	exdate.setTime( exdate.getTime() + 1000 * 60 * min);
	//exdate.setDate(exdate.getDate() + exdays);
	//var c_value=escape(value) + ((exdays==null) ? "" : "; path=/; expires="+exdate.toUTCString());
	//document.cookie=c_name + "=" + c_value;
	document.cookie = c_name + "=" + escape(value) + ";" + nwCookieDomain + "path=/; expires="+exdate.toUTCString();
}
function newzware_setCookie(c_name,value,exdays) {
	
    var exdate = new Date();
    if(exdays == 0){
        exdate = new Date(exdate.getFullYear(), exdate.getMonth(), exdate.getDate(), 23, 59, 59);
    }
    else{
        exdate.setDate(exdate.getDate() + exdays);
    }
    var c_value=escape(value) + ((exdays==null) ? "" : ";path=/;" + nwCookieDomain + "expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}
function newzware_getCookie(c_name) {
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; 

	for ( i = 0; i < a_all_cookies.length; i++ ) {
		a_temp_cookie = a_all_cookies[i].split( '=' );
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		if ( cookie_name == c_name ) {
			b_cookie_found = true;
			if ( a_temp_cookie.length > 1 ) {
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found ) {
		return null;
	}
}
function newzware_deleteCookie(c_name) {
	var exdays = -1;
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + -1);
	var c_value=escape("N") + ((exdays==null) ? "" : ";" + nwCookieDomain + "path=/; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
function newzware_dayPass(){
	newzware_hideAll(true);
	newzware_showProcessing("Confirming purchase. Please wait...");	
	var userLgVar 	= newzware_getCookie(nwUserLgCk);
	var userLgSec 	= newzware_getCookie(nwUserSecCk);
	var userCk 		= newzware_getCookie(nwUserCk);
   	var params = "&login_id=" + encodeURIComponent(userLgVar) + "&password=" + encodeURIComponent(userLgSec) + "&encrypted=Y&edition=" + nwEdition + "&singleDayPurchase=Y";
   	nwJQuery.getJSON(nwDayPassURL + "?callback=?&site=" + nwSite + params,
   		function(data) {
   			if(data.exitcode == "0"){
   				newzware_authorization(userLgVar, null, userCk,null);
   			}
   			else{
   				newzware_showMessage(data.errordesc,"A");
   				newzware_showConfirmationPanel();
   			}
   	});
	
}
function newzware_ecopy(){
    newzware_hideAll(true);
    newzware_showProcessing("Confirming purchase. Please wait...");
    var userLgVar   = newzware_getCookie(nwUserLgCk);
    var userLgSec   = newzware_getCookie(nwUserSecCk);
    var userCk      = newzware_getCookie(nwUserCk);
    var params = "&login_id=" + encodeURIComponent(userLgVar) + "&password=" + encodeURIComponent(userLgSec) + "&encrypted=Y&edition=" + nwEdition + "&singleDayPurchase=N&amount=" + encodeURIComponent(document.getElementById("nw-ecopy-option").value);
    nwJQuery.getJSON(nwDayPassURL + "?callback=?&site=" + nwSite + params,
        function(data) {
            if(data.exitcode == "0"){
                newzware_authorization(userLgVar, null, userCk,null);
            }
            else{
				newzware_showECopyConfirmationPanel();
                newzware_showMessage(data.errordesc,"A");
            }
    });

}
function newzware_confirmSingleDaySale(){
	newzware_dayPass();
}
function newzware_confirmECopySale(){
	newzware_ecopy();
}
function newzware_purchaseDayPass(){
	newzware_showProcessing("Processing.  Please wait");
	var userLgVar 	= newzware_getCookie(nwUserLgCk);
	var userLgSec 	= newzware_getCookie(nwUserSecCk);
   	var params = "&edition=" + nwEdition + "&login_id=" + encodeURIComponent(userLgVar) + "&password=" + encodeURIComponent(userLgSec) + "&encrypted=Y";
   	nwJQuery.getJSON(nwCCCheckURL + "?callback=?&site=" + nwSite + params,
   		function(data) {
   			if(data.ccValid == "Y"){
				if(nwSkipConfirmation == "Y"){
					newzware_dayPass();
				}
				else{
   					var rate 	= data.todayrate;
	   				var ccmask 	= data.ccmask;
   					document.getElementById("nw-cc-mask").innerHTML = ccmask;
   					document.getElementById("nw-conf-amount").innerHTML = rate;
   					document.getElementById("nw-ratesun").innerHTML = data.sunrate;
   					document.getElementById("nw-ratemon").innerHTML = data.monrate;
   					document.getElementById("nw-ratetue").innerHTML = data.tuerate;
   					document.getElementById("nw-ratewed").innerHTML = data.wedrate;
   					document.getElementById("nw-ratethu").innerHTML = data.thurate;
   					document.getElementById("nw-ratefri").innerHTML = data.frirate;
   					document.getElementById("nw-ratesat").innerHTML = data.satrate;
   					document.getElementById("nw-view-date").innerHTML = data.date;
   					newzware_hideAll(true);
   					newzware_showMain();
   					newzware_showConfirmationPanel();
				}
   			}
   			else{
   				var params		= "?nwmodule=epass&nwpage=epass&edition=" + nwEdition + 
		  			"&site=" + nwSite + "&login_id=" + encodeURIComponent(userLgVar) + "&password=" + encodeURIComponent(userLgSec) + "&encrypted=Y&rpage=" + nwCurrURL;
	  			window.location = nwSSMURL + params;
   			}
   	});
}
function newzware_doSSMRedirect(){
	var userLgVar 	= newzware_getCookie(nwUserLgCk);
	var userLgSec 	= newzware_getCookie(nwUserSecCk);
	var params		= "?nwmodule=account&nwpage=dashboard&site=" + nwSite + "&login_id=" + encodeURIComponent(userLgVar) + "&password=" + encodeURIComponent(userLgSec) + "&encrypted=Y&rpage=" + nwCurrURL;
	window.location = nwSSMLoginURL + "?rpage=" + nwCurrURL;// + params;
}
function newzware_resetPassword(){
    var nwloginid 	= document.getElementById("nwloginid").value;
    var nwpassword 	= document.getElementById("nwpassword").value;
	var params		= "?rpage=" + encodeURIComponent(nwCurrURL) + "&nwmodule=main&nwpage=main&site=" + encodeURIComponent(nwSite) + "&login_id=" + encodeURIComponent(nwloginid) + "&password=" + encodeURIComponent(nwpassword) + "&encrypted=N";
	window.location = nwResetPasswordURL + params;
}
function newzware_autoLogin(){
	var userLgVar 	= newzware_getCookie(nwUserLgCk);
	var userLgSec 	= newzware_getCookie(nwUserSecCk);
	var params		= "?nwmodule=account&nwpage=dashboard" +
		"&site=" + encodeURIComponent(nwSite) + "&login_id=" + encodeURIComponent(userLgVar) + "&password=" + encodeURIComponent(userLgSec) + "&encrypted=Y&rpage=" + encodeURIComponent(nwCurrURL);
	if(nwDebug == "Y")
		console.log(nwSSMURL + params);
	window.location = nwSSMURL + params;
}
function newzware_purchaseTermSubscription(){
	var userLgVar 	= newzware_getCookie(nwUserLgCk);
	var userLgSec 	= newzware_getCookie(nwUserSecCk);
	var params		= "?nwmodule=subscribers&nwpage=newstart&edition=" + nwEdition + 
		"&site=" + encodeURIComponent(nwSite) + "&login_id=" + encodeURIComponent(userLgVar) + "&password=" + encodeURIComponent(userLgSec) + "&encrypted=Y&rpage=" + encodeURIComponent(nwCurrURL);
	if(nwDebug == "Y")
		console.log(nwSSMURL + params);
	window.location = nwSSMURL + params;
}
function newzware_purchaseECopy(){
    newzware_showProcessing("Processing.  Please wait");
    var userLgVar   = newzware_getCookie(nwUserLgCk);
    var userLgSec   = newzware_getCookie(nwUserSecCk);
    var params = "&edition=" + nwEdition + "&login_id=" + encodeURIComponent(userLgVar) 
		+ "&password=" + encodeURIComponent(userLgSec) + "&encrypted=Y";
    nwJQuery.getJSON(nwCCCheckURL + "?callback=?&site=" + nwSite + params,
        function(data) {
            if(data.ccValid == "Y"){
                if(nwSkipConfirmation == "Y"){
                    newzware_ecopy(); 
                }               
                else{           
                    var rate    = data.todayrate;       
                    var ccmask  = data.ccmask;
                    document.getElementById("nw-ecc-mask").innerHTML = ccmask;
                    document.getElementById("nw-eratesun").innerHTML = data.sunrate;
                    document.getElementById("nw-eratemon").innerHTML = data.monrate;
                    document.getElementById("nw-eratetue").innerHTML = data.tuerate;
                    document.getElementById("nw-eratewed").innerHTML = data.wedrate;
                    document.getElementById("nw-eratethu").innerHTML = data.thurate;
                    document.getElementById("nw-eratefri").innerHTML = data.frirate;
                    document.getElementById("nw-eratesat").innerHTML = data.satrate;
                    newzware_hideAll(true);
                    newzware_showMain();
                    newzware_showECopyConfirmationPanel();
                }
            }   
			else{
                var params      = "?nwmodule=epass&nwpage=epass&edition=" + nwEdition + 
					"&site=" + nwSite + "&login_id=" + encodeURIComponent(userLgVar) + "&password=" + encodeURIComponent(userLgSec) 
					+ "&encrypted=Y&rpage=" + nwCurrURL;
                window.location = nwSSMURL + params;
            }
   	});
}
var newzware_hex_chr = "0123456789abcdef";
function newzware_rhex(num) {
  str = "";
  for(j = 0; j <= 3; j++)
    str += newzware_hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           newzware_hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}
function newzware_str2blks_MD5(str) {
  nblk = ((str.length + 8) >> 6) + 1;
  blks = new Array(nblk * 16);
  for(i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}
function newzware_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}
function newzware_rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}
function newzware_cmn(q, a, b, x, s, t) {
  return newzware_add(newzware_rol(newzware_add(newzware_add(a, q), newzware_add(x, t)), s), b);
}
function newzware_ff(a, b, c, d, x, s, t) {
  return newzware_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function newzware_gg(a, b, c, d, x, s, t) {
  return newzware_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function newzware_hh(a, b, c, d, x, s, t) {
  return newzware_cmn(b ^ c ^ d, a, b, x, s, t);
}
function newzware_ii(a, b, c, d, x, s, t) {
  return newzware_cmn(c ^ (b | (~d)), a, b, x, s, t);
}
function newzware_calcMD5(str) {
  x = newzware_str2blks_MD5(str);
  a =  1732584193;
  b = -271733879;
  c = -1732584194;
  d =  271733878;

  for(i = 0; i < x.length; i += 16)
  {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = newzware_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = newzware_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = newzware_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = newzware_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = newzware_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = newzware_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = newzware_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = newzware_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = newzware_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = newzware_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = newzware_ff(c, d, a, b, x[i+10], 17, -42063);
    b = newzware_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = newzware_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = newzware_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = newzware_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = newzware_ff(b, c, d, a, x[i+15], 22,  1236535329);    

    a = newzware_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = newzware_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = newzware_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = newzware_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = newzware_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = newzware_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = newzware_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = newzware_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = newzware_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = newzware_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = newzware_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = newzware_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = newzware_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = newzware_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = newzware_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = newzware_gg(b, c, d, a, x[i+12], 20, -1926607734);
    
    a = newzware_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = newzware_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = newzware_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = newzware_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = newzware_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = newzware_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = newzware_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = newzware_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = newzware_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = newzware_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = newzware_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = newzware_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = newzware_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = newzware_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = newzware_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = newzware_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = newzware_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = newzware_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = newzware_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = newzware_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = newzware_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = newzware_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = newzware_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = newzware_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = newzware_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = newzware_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = newzware_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = newzware_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = newzware_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = newzware_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = newzware_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = newzware_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = newzware_add(a, olda);
    b = newzware_add(b, oldb);
    c = newzware_add(c, oldc);
    d = newzware_add(d, oldd);
  }
  return newzware_rhex(a) + newzware_rhex(b) + newzware_rhex(c) + newzware_rhex(d);
}
function newzware_setRegistrationType(v){
	nwNetworkType = v;
	newzware_clearMessage();
	newzware_hideRegistrationBlocks();
	//alert(nwNetworkType);
	if(nwNetworkType != 0){
		//document.getElementById("divnwsubemaillabel").style.display = "none";
		//document.getElementById("divnwsubemailfield").style.display = "none";
		//document.getElementById("divnwsubcemaillabel").style.display = "none";
		//document.getElementById("divnwsubcemailfield").style.display = "none";
		document.getElementById("divnwsubloginidlabel").style.display = "none";
		document.getElementById("divnwsubloginidfield").style.display = "none";
		document.getElementById("divnwsubpasswordlabel").style.display = "none";
		document.getElementById("divnwsubpasswordfield").style.display = "none";
		document.getElementById("divnwsubcpasswordlabel").style.display = "none";
		document.getElementById("divnwsubcpasswordfield").style.display = "none";
		//document.getElementById("divnwnonsubemaillabel").style.display = "none";
		//document.getElementById("divnwnonsubemailfield").style.display = "none";
		//document.getElementById("divnwnonsubcemaillabel").style.display = "none";
		//document.getElementById("divnwnonsubcemailfield").style.display = "none";
		document.getElementById("divnwnonsubloginidlabel").style.display = "none";
		document.getElementById("divnwnonsubloginidfield").style.display = "none";
		document.getElementById("divnwnonsubpasswordlabel").style.display = "none";
		document.getElementById("divnwnonsubpasswordfield").style.display = "none";
		document.getElementById("divnwnonsubcpasswordlabel").style.display = "none";
		document.getElementById("divnwnonsubcpasswordfield").style.display = "none";
		if(nwNetworkType == 1){
			nwJQuery("#nwbutgen").button('option', 'label', 'Register with Facebook');
			nwJQuery("#nwbutsub").button('option', 'label', 'Register with Facebook');
		}
		else if(nwNetworkType == 2){
			nwJQuery("#nwbutgen").button('option', 'label', 'Register with Twitter');
			nwJQuery("#nwbutsub").button('option', 'label', 'Register with Twitter');
		}
	}
	else{
		document.getElementById("divnwsubemaillabel").style.display = "block";
		document.getElementById("divnwsubemailfield").style.display = "block";
		document.getElementById("divnwsubcemaillabel").style.display = "block";
		document.getElementById("divnwsubcemailfield").style.display = "block";
		document.getElementById("divnwsubloginidlabel").style.display = "block";
		document.getElementById("divnwsubloginidfield").style.display = "block";
		document.getElementById("divnwsubpasswordlabel").style.display = "block";
		document.getElementById("divnwsubpasswordfield").style.display = "block";
		document.getElementById("divnwsubcpasswordlabel").style.display = "block";
		document.getElementById("divnwsubcpasswordfield").style.display = "block";
		document.getElementById("divnwnonsubemaillabel").style.display = "block";
		document.getElementById("divnwnonsubemailfield").style.display = "block";
		document.getElementById("divnwnonsubcemaillabel").style.display = "block";
		document.getElementById("divnwnonsubcemailfield").style.display = "block";
		document.getElementById("divnwnonsubloginidlabel").style.display = "block";
		document.getElementById("divnwnonsubloginidfield").style.display = "block";
		document.getElementById("divnwnonsubpasswordlabel").style.display = "block";
		document.getElementById("divnwnonsubpasswordfield").style.display = "block";
		document.getElementById("divnwnonsubcpasswordlabel").style.display = "block";
		document.getElementById("divnwnonsubcpasswordfield").style.display = "block";
		nwJQuery("#nwbutgen").button('option', 'label', nwRegisterButtonText);
		nwJQuery("#nwbutsub").button('option', 'label', nwRegisterButtonText);
	}
	nwJQuery('#nwregistrationdiv').show(nwJQueryEffect, function() {
		newzware_showRegistrationChoice();
	});	
}
function newzware_hideRegistrationBlocks(){
    var blockArr = new Array();
    blockArr[0] = "trad-sub-block";
    blockArr[1] = "trad-nonsub-block";
	blockArr[2] = "nwregoptionsdiv";
    for (var i = 0; i < blockArr.length; i++){
        document.getElementById(blockArr[i]).style.display = "none";
    }
}
function newzware_showRegistrationChoice(){
    newzware_hideRegistrationBlocks();
    if(document.getElementById("issub1").checked){
        nwJQuery("#trad-sub-block").show(nwJQueryEffect, { direction: "up" }, 500);
		document.getElementById("nwaccount").focus();
	}
    else{
        nwJQuery("#trad-nonsub-block").show(nwJQueryEffect, { direction: "up" }, 500);
		document.getElementById("nwnonsub_fname").focus();
	}
}
function newzware_doFacebookNonSubRegistration(){
	if(nwDebug == "Y")
		console.log("Launching Facebook Login for non sub registration.");
	FB.getLoginStatus(function(response) {
  		if (response.status === 'connected') {
  			var uid = response.authResponse.userID;
			newzware_registerNonSubUsingFacebook(uid);
		} else {
			FB.login(function(response) {
        		if (response.authResponse) {
  					var userId = response.authResponse.userID;
					newzware_registerNonSubUsingFacebook(userId);
        		} else {
        		}
    		});
		}
	});
}
function newzware_registerNonSubUsingFacebook(uid){
	if(nwDebug == "Y")
		console.log("Facebook UID: " + uid);
	newzware_showProcessing("Registering.  Please wait...");
	var lname 	= document.getElementById("nwnonsub_lname").value;
	var fname 	= document.getElementById("nwnonsub_fname").value;
	var email 	= document.getElementById("nwnonsub_email").value;
        		
	var params = "&network=FB&uid=" + encodeURIComponent(uid) + 
		"&lname=" + encodeURIComponent(lname) + "&fname=" + encodeURIComponent(fname) + "&email=" + encodeURIComponent(email);
    nwJQuery.getJSON(nwCreateGenURL + "?callback=?&site=" + nwSite + params,
    		function(acctdata) {
        		var ec = acctdata.exitcode;
        		var desc = acctdata.errordesc;
        		if(ec == "0"){
        			var lg 	= "";
					var pwd = "";
					if(nwNetworkType == 1){
						lg 	= "fb_" + uid;
						pwd = "FB_" + uid;
					}
					else if(nwNetworkType == 2){
						lg 	= "tw|" + uid;
						pwd = "TW|" + uid;
					}
                   	document.getElementById("nwloginid").value = lg;
                   	document.getElementById("nwpassword").value = pwd;
                   	newzware_hideRegistrationShowAuthorize();
                   	newzware_showMessage(nwRegisteredAuthorized,"H");
                }
                else{
                 	newzware_showMessage(desc,"A");
                 	return;
                }
            }).fail(function() { 
            	console.log( "error communicating to host." ); 
            	alert(communication_error_registration);
            	newzware_showContent(true);
            });
}
function newzware_createGeneralAccount(){
 	
	if(nwDebug == "Y")
		console.log("Creating general account.");
	
 	var fname = document.getElementById("nwnonsub_fname").value;
 	if(fname == ""){
 		alert("First name must be entered.");
 		document.getElementById("nwnonsub_fname").focus();
 		return;
 	}
 	var lname = document.getElementById("nwnonsub_lname").value;
 	if(lname == ""){
 		alert("Last name must be entered.");
 		document.getElementById("nwnonsub_lname").focus();
 		return;
 	}
 	
	if(nwDebug == "Y")
		console.log("Network type: " + nwNetworkType);
 	
	if(nwNetworkType != 0){
		var em = document.getElementById("nwnonsub_email").value;
		if(em.length < 1){
			alert("Please provide an email address.");
			document.getElementById("nwnonsub_email").focus();
			return;
		}
		if(document.getElementById("nwnonsub_cemail")){
			var cemail = document.getElementById("nwnonsub_cemail").value;
			if(cemail != em){
				alert("Email addresses do not match.");
				document.getElementById("nwnonsub_email").focus();
				return;
			}
		}
		if(nwNetworkType == 1){
			if(nwDebug == "Y")
				console.log("Doing facebook non sub registration");
			newzware_doFacebookNonSubRegistration();
		}
		else if(nwNetworkType == 2){
			//Twitter
		}
	}
	else{
 	
		var login_id = "";
		if(nwForceEmailAsUserName == "N"){
			login_id = document.getElementById("nwnonsub_login_id").value;
			if(login_id.length < 1){
				if(nwForceEmailAsUserName == "Y")
					alert("Please enter a valid email address.");
				else
					alert("User name must be at least 1 character.");
				document.getElementById("nwnonsub_login_id").focus();
				return;
			}
			else if(newzware_hasIllegalChars(login_id)){
				alert("Login/User name contains illegal characters.  Please re-enter login/user name.");
				document.getElementById("nonsub_login_id").value = "";
				document.getElementById("nonsub_login_id").focus();
				return;
			}
			login_id = login_id.toLowerCase();
			document.getElementById("nwnonsub_login_id").value = login_id;
		}

		var password = document.getElementById("nwnonsub_password").value;
		if(password.length < nwPasswordLength){
			alert("Password must be at least " + nwPasswordLength + " characters.");
			document.getElementById("nwnonsub_password").focus();
			return;
		}
		else if(newzware_hasIllegalChars(password)){
			alert("Password contains illegal characters.  Please re-enter password.");
			document.getElementById("nwnonsub_password").value = "";
			document.getElementById("nwnonsub_password").focus();
			return;
		}
		if(password.indexOf("&") != -1){
			alert("Illegal character (&) in password.");
			document.getElementById("nwnonsub_password").focus();
			return;
		}
		var c_password = document.getElementById("nwnonsub_c_password").value;
		if(password != c_password){
			alert("Passwords do not match.");
			document.getElementById("nwnonsub_password").focus();
			return;
		}
		var em = document.getElementById("nwnonsub_email").value;
		if(em.length < 1){
			alert("Please provide an email address.");
			document.getElementById("nwnonsub_email").focus();
			return;
		}
		if(document.getElementById("nwnonsub_cemail")){
			var cemail = document.getElementById("nwnonsub_cemail").value;
			if(cemail != em){
				alert("Email addresses do not match.");
				document.getElementById("nwnonsub_email").focus();
				return;
			}
			else{
				if(nwForceEmailAsUserName == "Y"){
					login_id = cemail.toLowerCase();
					document.getElementById("nwnonsub_login_id").value = login_id;
				}
			}
		}
		
		newzware_showMessage(nwRegisteringMessage,"H");
		if(nwDoNonSubCheck == "Y"){
    		var params = "&email=" + encodeURIComponent(em) + "&lname=" + encodeURIComponent(lname) + "&fname=" + encodeURIComponent(fname);
		   	nwJQuery.getJSON(nwNonSubCheckURL + "?callback=?&site=" + nwSite + params,
		   		function(data) {
		   			var exitcode = data.exitcode;
		   			if(exitcode == "1091"){
						newzware_showMessage(nwNonSubAccountFound,"A");
		   				return;
		   			}
		   			else if(exitcode == "1096"){
						newzware_showMessage("Invalid policy request.","A");
		   				return;
		   			}
		   			else if(exitcode != "0"){
						newzware_showMessage(data.errordesc,"A");
		   				return;
		   			}
		   			else{
		   				var params = "&login_id=" + encodeURIComponent(login_id) + "&password=" + encodeURIComponent(password) + 
		   					"&lname=" + encodeURIComponent(lname) + "&fname=" + encodeURIComponent(fname) + "&email=" + encodeURIComponent(em);
		   				
		   				if(nwMustRegister == "Y" && nwVerifyEmail == "Y"){
		   					params += "&validateGeneralUsers=Y";
		   				}
		   				
		   				nwJQuery.getJSON(nwCreateGenURL + "?callback=?&site=" + nwSite + params,
		   					function(acctdata) {
		   						var ec = acctdata.exitcode;
		   						var desc = acctdata.errordesc;
		   						if(ec == "0"){
		   							var pw = acctdata.password;
    								document.getElementById("nwloginid").value = login_id;
    								document.getElementById("nwpassword").value = password;
    								if(nwAfterRegistrationCallback == ""){
    									newzware_hideRegistrationShowAuthorize();
										newzware_showMessage(nwRegisteredMessage,"H");
		   							}
    								else{
    									window.setTimeout(nwAfterRegistrationCallback,200);
    								}
		   						}
		   						else{
									newzware_showMessage(desc,"A");
		   							return;
		   						}
		   					}
		   				);
		   			}
    	        }).fail(function() { 
    	            console.log( "error communicating to host." ); 
    	            newzware_showContent(true);
    	        });
		}
		else{
			var params = "&login_id=" + encodeURIComponent(login_id) + "&password=" + encodeURIComponent(password) + 
				"&lname=" + encodeURIComponent(lname) + "&fname=" + encodeURIComponent(fname) + "&email=" + encodeURIComponent(em);
			
 			if(nwMustRegister == "Y" && nwVerifyEmail == "Y"){
		   		params += "&validateGeneralUsers=Y";
 			}
 			
			nwJQuery.getJSON(nwCreateGenURL + "?callback=?&site=" + nwSite + params,
				function(acctdata) {
					var ec 	= acctdata.exitcode;
					var desc= acctdata.errordesc;
					if(ec == "0"){
						var pw = acctdata.password;
    					document.getElementById("nwloginid").value = login_id;
    					document.getElementById("nwpassword").value = password;
    					if(nwAfterRegistrationCallback == ""){
    						newzware_hideRegistrationShowAuthorize();
    						newzware_showMessage(nwRegisteredMessage,"H");
    					}
    					else{
    						window.setTimeout(nwAfterRegistrationCallback,200);
    					}
					}
					else{
						newzware_showMessage(desc,"A");
						return;
					}
			}).fail(function() { 
				console.log( "error communicating to host." ); 
				alert(communication_error_registration);
				newzware_showContent(true);
    	    });
		}
	}
}
function newzware_registerUsingFacebook(uid){
        		newzware_showProcessing("Registering.  Please wait...");
 				var account	= document.getElementById("nwaccount").value;
 				var lname 	= document.getElementById("nwsub_lname").value;
 				var email 	= document.getElementById("nwsub_email").value;
        		var params 	= "&login_id=" + encodeURIComponent(uid) + "&password=" + encodeURIComponent(uid) +
            		"&account=" + encodeURIComponent(account) + "&lname=" + encodeURIComponent(lname) 
					+ "&email=" + encodeURIComponent(email) + "&network=FB&uid=" + encodeURIComponent(uid);
        		nwJQuery.getJSON(nwCreateSubURL + "?callback=?&site=" + nwSite + params,
            		function(acctdata) {
                		var ec = acctdata.exitcode;
                		var desc = acctdata.errordesc;
                		if(ec == "0"){
							var lg 	= "";
							var pwd = "";
							if(nwNetworkType == 1){
								lg 	= "fb_" + uid;
								pwd = "FB_" + uid;
							}
							else if(nwNetworkType == 2){
								lg 	= "tw|" + uid;
								pwd = "TW|" + uid;
							}
                   		 	document.getElementById("nwloginid").value = lg;
                   		 	document.getElementById("nwpassword").value = pwd;
                   		 	newzware_hideRegistrationShowAuthorize();
                   		 	newzware_showMessage(nwRegisteredAuthorized,"H");
                		}
                		else{
                   		 	newzware_showMessage(desc,"A");
                   		 	return;
                		}
            		}).fail(function() { 
            			console.log( "error communicating to host." ); 
            			alert(communication_error_registration);
            			newzware_showContent(true);
            		});
}
function newzware_createOnlineAccount(){
 	var account 			= document.getElementById("nwaccount").value;
 	if(account	== ""){
 		alert("Account number must be entered.");
 		document.getElementById("nwaccount").focus();
 		return;
 	}
 	var lname = document.getElementById("nwsub_lname").value;
 	if(lname	== ""){
 		alert("Last name must be entered.");
 		document.getElementById("nwsub_lname").focus();
 		return;
 	}
	if(nwNetworkType != 0){
		var em = document.getElementById("nwsub_email").value;
 		if(em.length < 1){
 			alert("Please provide an email address.");
 			document.getElementById("nwsub_email").focus();
 			return;
 		}
 		if(document.getElementById("nwsub_cemail")){
 			var cemail = document.getElementById("nwsub_cemail").value;
   	 		if(cemail != em){
 		   		alert("Email addresses do not match.");
	 	 		document.getElementById("nwsub_email").focus();
	 			return;
	 		}
		}
 		newzware_showProcessing("Validating account.  Please wait...");
	 	var params = "&checkForLogin=Y&account=" + encodeURIComponent(account) + "&lname=" + encodeURIComponent(lname);
		nwJQuery.getJSON(nwValidateSubURL + "?callback=?&site=" + nwSite + params,
			function(data) {
				var ec 	= data.exitcode;
				var desc= data.errordesc;
				var valid= data.valid;
				if(ec == "0" && valid == "Y"){
					if(nwNetworkType == 1){
						newzware_doFacebookSubRegistration();
					}
					else if(nwNetworkType == 2){
					}
				}
				else{
					newzware_showMessage(desc,"A");
					return;
				}
            }).fail(function() { 
            	console.log( "error communicating to host." ); 
            	alert(communication_error_registration);
            	newzware_showContent(true);
            });
	}
	else{
   		var login_id = "";
    	if(nwForceEmailAsUserName == "N"){
    		login_id = document.getElementById("nwsub_login_id").value;
 	 		if(login_id.length < 1){
			 	alert("Login/User ID must be at least 1 character.");
			 	document.getElementById("nwsub_login_id").focus();
 			 	return;
 		 	}
 		 	else if(newzware_hasIllegalChars(login_id)){
 				alert("Login/User name contains illegal characters.  Please re-enter login/user name.");
 				document.getElementById("nwsub_login_id").value = "";
 			 	document.getElementById("nwsub_login_id").focus();
 			 	return;
 		 	}
 		 	login_id = login_id.toLowerCase();
 		 	document.getElementById("nwsub_login_id").value = login_id;
    	}
	
 		var password = document.getElementById("nwsub_password").value;
 		if(password.length < nwPasswordLength){
 			alert("Password must be at least " + nwPasswordLength + " characters.");
 			document.getElementById("nwsub_password").focus();
 			return;
 		}
 		else if(newzware_hasIllegalChars(password)){
 			alert("Password contains illegal characters.  Please re-enter password.");
 			document.getElementById("nwsub_password").value = "";
 			document.getElementById("nwsub_password").focus();
 			return;
 		}
 		if(password.indexOf("&") != -1){
 			alert("Illegal character (&) in password.");
 			document.getElementById("nwsub_password").focus();
 			return;
 		}
 		var c_password = document.getElementById("nwsub_c_password").value;
 		if(password != c_password){
 			alert("Passwords do not match.");
 			document.getElementById("nwsub_password").focus();
 			return;
 		}
 		var em = document.getElementById("nwsub_email").value;
 		if(em.length < 1){
 			alert("Please provide an email address.");
 			document.getElementById("nwsub_email").focus();
 			return;
 		}
 		if(document.getElementById("nwsub_cemail")){
 			var cemail = document.getElementById("nwsub_cemail").value;
   	 		if(cemail != em){
 		   		alert("Email addresses do not match.");
	 	 		document.getElementById("nwsub_email").focus();
	 			return;
	 		}
   	 		else{
   	 			if(nwForceEmailAsUserName == "Y"){
   	 				login_id = cemail.toLowerCase();
   	 				document.getElementById("nwsub_login_id").value = cemail;
   	 			}
   	 		}
		}
 		newzware_showProcessing("Registering.  Please wait...");
	 	var params = "&login_id=" + encodeURIComponent(login_id) + "&password=" + encodeURIComponent(password) + 
 			"&account=" + encodeURIComponent(account) + "&lname=" + encodeURIComponent(lname) + "&email=" + encodeURIComponent(em);
	 	
	 	if(nwMustRegister == "Y" && nwVerifyEmail == "Y"){
	 		params += "&verifyEmail=Y";
	 	}
	 	
		nwJQuery.getJSON(nwCreateSubURL + "?callback=?&site=" + nwSite + params,
			function(acctdata) {
				var ec = acctdata.exitcode;
				var desc = acctdata.errordesc;
				if(ec == "0"){
    				document.getElementById("nwloginid").value = login_id;
    				document.getElementById("nwpassword").value = password;
    				if(nwAfterRegistrationCallback == ""){
    					newzware_hideRegistrationShowAuthorize();
    					newzware_showMessage(nwRegisteredMessage,"H");
    				}
    				else
    					window.setTimeout(nwAfterRegistrationCallback,200);
				}
				else{
					newzware_showMessage(desc,"A");
					return;
				}
            }).fail(function() { 
            	console.log( "error communicating to host." ); 
            	alert(communication_error_registration);
            	newzware_showContent(true);
            });
	}
}
function newzware_showMessage(m,type){
	if(type == "A")
 		document.getElementById("nwmainmessage").innerHTML = nwAlert1 + m + nwAlert2;
	else
 		document.getElementById("nwmainmessage").innerHTML = nwHighlight1 + m + nwHighlight2;
	document.getElementById("nwmainmessagediv").style.display = "block";
}
function newzware_hasIllegalChars(val){

	var illegal 	= false;

	for (i = 0; i < nwIllegalChars.length; i++) {
		if (val.indexOf(nwIllegalChars.charAt(i),0) > -1){
			illegal = true;
			break;
		}
	}
	return illegal;
} 
function newzware_forgotPassword(){
	window.location = nwForgotURL + "&autoReturn=" + nwCurrURL;
}
function newzware_forgotAccount(){
	window.location = nwForgotAcctURL + "&autoReturn=" + nwCurrURL;
}
function newzware_updateBillingInformation(){
	newzware_showProcessing("Redirecting...  Please wait");
	var userLgVar 	= newzware_getCookie(nwUserLgCk);
	var userLgSec 	= newzware_getCookie(nwUserSecCk);
	var params		= "?nwmodule=epass&nwpage=epass&edition=" + nwEdition + 
		"&site=" + nwSite + "&login_id=" + encodeURIComponent(userLgVar) + "&password=" + encodeURIComponent(userLgSec) + "&encrypted=Y&rpage=" + nwCurrURL;
  	window.location = nwSSMURL + params;
}
function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var rs = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		rs += chars.substring(rnum,rnum+1);
	}
	return rs;
}
function newzware_loadJSCSSFile(filename, filetype, func){
 	if (filetype == "js"){ 
  		var fileref = document.createElement("script");
  		fileref.setAttribute("type","text/javascript");
  		fileref.setAttribute("src", filename);
		if(func != null){
			fileref.onload = func;
		}
 	}
 	else if (filetype == "css"){ 
  		var fileref=document.createElement("link");
  		fileref.setAttribute("rel", "stylesheet");
  		fileref.setAttribute("type", "text/css");
  		fileref.setAttribute("href", filename);
 	}
 	if (typeof fileref != "undefined")
  		document.getElementsByTagName("head")[0].appendChild(fileref)
}
function newzware_checkLoadJSCSSFile(filename, filetype, func){
	if (newzwareFilesAdded.indexOf("["+filename+"]") == -1){
  		newzware_loadJSCSSFile(filename, filetype, func);
  		newzwareFilesAdded += "["+filename+"]"; 
 	}
	else if(func != null)
		func();
}
function newzware_autoLoginAndStart(){
	newzware_showProcessing("Processing.  Please wait...");
	var promoCode	= newzware_getCookie(nwPromoCk);
	var prRateId	= newzware_getCookie(nwPrRateIdCk);
	if(prRateId == null && promoCode == null){
		alert(nwNoSubscriptionSelectedMessage);
		return;
	}
	else{
		newzware_deleteCookie(nwPromoCk);
		newzware_deleteCookie(nwPrRateIdCk);
		var userLgVar 	= "";
		var userLgSec 	= "";
		var encrypted 	= "N";
		if(nwIsLoggedIn){
			userLgVar 	= newzware_getCookie(nwUserLgCk);
			userLgSec 	= newzware_getCookie(nwUserSecCk);
			encrypted = "Y";
		}
		else{
			userLgVar 	= document.getElementById("nwloginid").value;
			userLgSec 	= document.getElementById("nwpassword").value;
		}
		var params = "";
		if(prRateId != null){
			params		= "?nwmodule=subscribers&nwpage=newstart&prRateId=" + prRateId + 
   			"&site=" + nwSite + "&login_id=" + encodeURIComponent(userLgVar) + 
			"&password=" + encodeURIComponent(userLgSec) + "&encrypted=" + encrypted + "&rpage=" + nwCurrURL;
		}
		else{
			params		= "?nwmodule=subscribers&nwpage=newstart&promoCode=" + promoCode + 
   			"&site=" + nwSite + "&login_id=" + encodeURIComponent(userLgVar) + 
			"&password=" + encodeURIComponent(userLgSec) + "&encrypted=" + encrypted + "&rpage=" + nwCurrURL;
		}
		//alert(nwSSMURL + params);
   		window.location = nwSSMURL + params;
	}
}
function newzware_meterBoxOpen(views,thresh){
    var v = parseInt(views);
    var left = thresh - v;
    
    if(!newzware_isAuthorized()){
    	if(left <= nwMeterBoxOpenThreshold){
    		if(!document.getElementById("slidebox")){
    			if(nwDebug == "Y")
    			   console.log("Showing meter box");
    			nwMeterBoxHTML = nwMeterBoxHTML.replace("_X_",left);
    			nwJQuery("body").append(nwMeterBoxHTML);
    			nwJQuery('#slidebox').animate({'right':'0px'},300);
    		}
    	}
    }
}
function newzware_meterBoxClose(){
	document.getElementById("slidebox").style.display = "none";
	/* Problem on mobile browser */
    //nwJQuery('#slidebox').animate({'right':'-430px'},100);
}
function newzware_getDaysForMonthMeter(){
	var cdate = new Date();
	var ctoday = cdate.getDate();
	var nwlastDay = new Date(cdate.getFullYear(), cdate.getMonth() + 1, 0).getDate();
	var cdays = (parseInt(nwlastDay) - parseInt(ctoday));
	return cdays;
}
function newzware_attachLoginEvent(){
	nwJQuery(function() {
		if(nwJQuery('#nwcustomloginform').length == 1) {
			nwJQuery('#nwcustomloginform').submit(function() {
				var data = nwJQuery("#nwcustomloginform :input").serializeArray();
                	newzware_doLogin();
                	return false;  // <- cancel event
            	});
		}
	});
}
