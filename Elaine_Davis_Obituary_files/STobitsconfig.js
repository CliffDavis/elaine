var nwviewportwidth;
var nwviewportheight;
if (typeof window.innerWidth != 'undefined') {
      nwviewportwidth = window.innerWidth,
      nwviewportheight = window.innerHeight
 } else if (typeof document.documentElement != 'undefined'
     && typeof document.documentElement.clientWidth !=
     'undefined' && document.documentElement.clientWidth != 0) {
       nwviewportwidth = document.documentElement.clientWidth,
       nwviewportheight = document.documentElement.clientHeight
 } else {
       nwviewportwidth = document.getElementsByTagName('body')[0].clientWidth,
       nwviewportheight = document.getElementsByTagName('body')[0].clientHeight
 }
//The Newzware site name for this installation
var nwSite 			= "times";

//The pub date.  Leave blank for today date.  Set per page for specific date access.
var nwPubDate		= "";

//The protocol for connecting to external references
var nwProtocol      = "https";

//The newzware server that serves the SSM and EPass
var nwServer		= "thetimes-tribune.nepanews.com";

//The edition to validate against
var nwEdition		= "ST";

//Flag to indicate to use the subscription end date for the cookie expiration
var nwUserCkSubscripDays 	= "Y";

//Default days when no term subscription is found or nwUserCkSubscripDays is N or if the subscription end date is less than today.
var nwuserCkDefaultDays 	= 14;

//The ID of the content to be displayed upon authentication.
var nwContentId			= "ctl00_MainContentContainer";

//For each of the following, an access code is required.  
var nwECopyAccess		= "a53ee8b5ce";
var nwDayPassAccess		= "";
//var nwMeterAccess		= "abc6e44b9d";
var nwMeterAccess		= "";

//Users must register to view content, whether metered or not.
var nwMustRegister		= "Y";

//If metering enabled, the amount of page views before requiring authentication
var nwMeterThreshold	= 0;

//If metering enabled, the amount of days to keep meter.
var nwMeterDefaultDays	= 30;

/*
 * 	If a callback is wanted after authentication, define the function here.
 * 	eg.  "mycallback()"
 * The callback function must be defined in the page.  This overrides the default behavior
 * of showing the content block.  The user defined function must have the logic to display
 * the content.
*/
//var nwContentCallback= "nwdemo_showContent()";
var nwContentCallback= "";

var nwIllegalChars 		= "\/'\\ \";$:?!()[]\{\}^| ";
var nwPasswordLength 	= 6;
var nwDoNonSubCheck 	= "Y";
//If you want the user to click and buy without confirming the charge set to Y.
var nwSkipConfirmation 	= "N";

//JQuery UI Theme to be used
var nwTheme 		= "base";

//JQuery UI Version
var uiVersion 		= "jquery-ui-themes-1.8.18";

//Text labels and input fonts
var nwLabelColor	= "black";
var nwInputFontSize = "12pt";
var nwInputFontColor= "black";

//Alternate logins
var nwFacebook 		= "N";
var nwGoogle 		= "N";

//Dialog(s) width
var nwDialogWidth       = "auto";

/* Main Dialog Heading */
var nwDialogHeading	= "TIMES-TRIBUNE";

//Description of purchase options
var nwECopy		= "E-Wallet permits you to purchase a credit block to view content on a per visit basis using Day Pass. Each time you log in to view content, the daily amount for that day is deducted from your account balance. When your balance reaches zero, you can purchase additional credit for additional viewing.";
var nwDayPass 		= "The Day Pass allows you to view one day at a time and lasts for 24 hours.  If you choose this option, your credit card will be charged for one day and your session will end after 24 hours.";
var nwTerm		= "Subscriptions are purchased for a length of time, such as one month or one year, and permit you to access unlimited access to online content including the e-edition and mobile apps during that time period.";

//Welcome message after user logs in.  The _NAME_ is replaced with the user's name
var nwWelcome		= "Welcome _NAME_";

var nwMeterUsed		= "Your free views have run out.  Please choose from a purchase option below to view today's content.";

/* Login Page */
var nwLoginIcon		= "https://thetimes-tribune.nepanews.com/newzlib/images/milky-icons/48/49.png";
var nwLoginInstruct	= "Enter user name and password then click the <em>Submit</em> button.";
var nwLoginIdLabel	= "User Name";
var nwPasswordLabel	= "Password";
var nwButtonLogin 	= "Submit";
var nwButtonCancel 	= "Cancel";
var nwButtonRegister= "Subscribe/Buy Access";
var nwInvalidLogin	= "The user name and password entered was incorrect.";
var nwNoValidSubscrip= "Sorry, no valid subscriptions were found for today's date.  Please select from an option below to start a subscription."; 
var nwInsufficientFunds = "Sorry, there are no funds available on your account to view today's content.  Please select from one of the purchase options below."; 
var nwForgotPasswordLinkText="<span style='font-size: 10pt'>Forgot Password</span>";

/* Purchase Dialog */
var nwPurchaseOptionsHeading="Purchase Options";
var nwDayPassHeading		= "Day Pass-One day access";
var nwECopyHeading			= "E-Wallet Purchase (Add Funds)";
var nwTermSubscripHeading	= "Purchase A Subscription";
var nwDayPassBuyButtonText	= "Buy Day";
var nwECopyBuyButtonText	= "Buy Credit for Day Pass";
var nwTermSubscripBuyButtonText= "Buy Subscription";
var nwCancelButtonText= "Cancel";
var nwDayPassIconURL	= "https://thetimes-tribune.nepanews.com/newzlib/images/milky-icons/48/87.png";
var nwTermIconURL	= "https://thetimes-tribune.nepanews.com/newzlib/images/milky-icons/48/84.png";
var nwECopyIconURL	= "https://thetimes-tribune.nepanews.com/newzlib/images/milky-icons/48/80.png";
var nwTermBuyIconURL	= "https://thetimes-tribune.nepanews.com/newzlib/images/milky-icons/48/23.png";
var nwDayPassBuyIconURL	= "https://thetimes-tribune.nepanews.com/newzlib/images/milky-icons/48/23.png";
var nwECopyBuyIconURL	= "https://thetimes-tribune.nepanews.com/newzlib/images/milky-icons/48/23.png";
var nwPublicTerminalText="If you are at a public computer, check this to prevent unauthorized access.";
	
/* Registration Panel */
var nwRegistrationHeading	= "Registration";
var nwNonSubRegistrationHeading	= "Non Subscriber Registration";
var nwAccountFieldText		= "Account";
var nwLastNameFieldText		= "Last Name";
var nwFirstNameFieldText	= "First Name";
var nwEmailFieldText		= "Email Address";
var nwEmailConfirmFieldText	= "Confirm Email";
var nwUserNameFieldText		= "User Name";
var nwPasswordFieldText		= "Password";
var nwConfirmPasswordFieldText	= "Confirm Password";
var nwRegisterButtonText	= "Register";
var nwCancelButtonText 		= "Cancel";
var nwUserRegistrationText 	= "User Registration";
var nwUserChoiceSub 		= "I am a subscriber";
var nwUserChoiceNonSub 		= "I'm NOT a subscriber";
var nwRegistrationIconURL	= "https://thetimes-tribune.nepanews.com/newzlib/images/milky-icons/48/54.png";

/* Authorization Button Text after registration */
var nwRegAuthButton = "Continue";

/*  Confirmation Panel */
var nwConfirmButton = "Confirm Purchase";
var nwECopyConfirmButton = "Confirm Credit Purchase";
var nwConfirmCancelButton = "Cancel";
var nwConfirmUpdateButton = "Change Billing Info";
var nwPurchaseConfirmHeading = "Purchase Confirmation";
var nwECopyPurchaseConfirmHeading = "ECopy Purchase Option";
var nwEPassRatesHeading = "E-Pass Daily Rates";
var nwLabelSunday 	= "Sun";
var nwLabelMonday 	= "Mon";
var nwLabelTuesday 	= "Tue";
var nwLabelWednesday = "Wed";
var nwLabelThursday = "Thu";
var nwLabelFriday 	= "Fri";
var nwLabelSaturday = "Sat";
var nwECopyCreditAmts = "5.00,10.00,15.00,20.00,50.00,100.00";

//nw-cc-mask will contain the masked cc number.  nw-conf-amount will contain the amount to be charged. 
var nwConfirmSaleText = "Your credit card <span id='nw-cc-mask'></span> will be charged $<span id='nw-conf-amount'></span>.";
var nwECopyConfirmSaleText = "Your credit card <span id='nw-ecc-mask'></span> will be charged the selected amount.";

/* Registration Messages */
//Registration message, user not authorized(Non Sub Registration or Sub Registration without proper subscription).
var nwRegisteredMessage = "Thank you for registering.  An email has been sent confirming your registration.  Click the Continue below to proceed.";
//Registration message, user is authorized(Sub Registration).
var nwRegisteredAuthorized = "Thank you for registering.  An email has been sent confirming your registration.  Please click the Continue button below to proceed.";
//Non sub check, email address already on file.
var nwNonSubAccountFound= " An account has already been created with this email address.";
//Generic failed registration
var nwNonSubAccountFail = "An account could not be created.  Please try again.";


var nwAlertText	= "";
var nwMessageText = "";

var nwMeterUpMessage = "The amount of free page views has been reached.  Please register and select a purchase option to continuing viewing content.";

var nwIsTeaserBlock 	= "N";
var nwTeaserId		= ""; 
var nwRegisteringMessage="Registering.  Please wait.";

var nwContentWidth = "600px";

//Style settings for labels, etc
var nwLabelStyle = "font-size: 10pt; font-weight: bold";
var nwPublicTerminalTextStyle="font-size: 10pt";
var nwHeadingStyle ="font-size: 14pt; font-weight: bold";

var nwLogoutMessage = "A previous session is already in progress.  Multiple logins simultaneously are not allowed.  You must logout of the current session before logging back in.  You may log into your online account and log off your sessions by clicking the link below.<br/><br/><a href='javascript:newzware_doSSMRedirect()' style='color: black'>Account Login</a>";
var nwLogoutID = "nwlogoutdiv";
var nwFloatLogout = "Y";
var nwLogoutText = "Log Out";

//var nwLogoutStyle = "width: 100px; height: 100px; background:#000; background:-moz-linear-gradient(top,#25A6E1 0%,#188BC0 100%); background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#25A6E1),color-stop(100%,#188BC0)); background:-webkit-linear-gradient(top,#25A6E1 0%,#188BC0 100%); background:-o-linear-gradient(top,#25A6E1 0%,#188BC0 100%); background:-ms-linear-gradient(top,#25A6E1 0%,#188BC0 100%); background:linear-gradient(top,#25A6E1 0%,#188BC0 100%); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#25A6E1',endColorstr='#188BC0',GradientType=0); padding:8px 13px; color:#fff; font-family:'Helvetica Neue',sans-serif; font-size:17px; border-radius:4px; -moz-border-radius:4px; -webkit-border-radius:4px; border:1px solid #1A87B9";
var nwLogoutStyle = "width: 100px; height: 50px; border: 1px solid red; background: #000; color: white; font-size: 14pt";
var nwLogoutDivStyle= "position: absolute; top: 20px; left: 20px";
var nwLogoutDivHTML = "<input type='button' onclick='javascript:newzware_doLogout()' style='" + nwLogoutStyle + "' value='Log Out'>";
var nwNoLogoutMessage="An error occurred.  The session could not be ended.  Please contact the Burlington Hawkeye to have this problem resolved.";

//Two days to re-authenticate
var nwReauthTimeMin = 1440;
var nwLogAdvDivContent = "";
var nwLogAdvStyle = "";
var nwInitLogin=true;
var nwLowerCaseMessage="(All lower case)";

var nwDefaultPurchasePanel = 0;
var nwTwitter 		= "N";
var nwInvalidAccount="Account could not be validated.  Check the account number and last name."
var nwFacebookJS	= "https://connect.facebook.net/en_US/all.js";
var nwFacebookAPIKey="135466293190225";  //Jay's Mac Internal IP as on the Facebook Developer App
var nwFacebookInitialize="N";
var nwFacebookLoginInstruction = "<span style='font-size: 9pt'>To use Facebook login, your subscriber account must be registered or linked with your Facebook account.  If you have already registered and would like to use your Facebook account to login, please log into the Customer Service center <a href='javascript:newzware_doSSMRedirect()'>here</a> to link your Facebook account with your subscriber account.</span>";
var nwRegisterWithFacebookButton="Register with Facebook";
var nwLoginWithFacebookButton="Login with Facebook";
var nwDeleteAllOnLogout="Y";
var nwShowAccountManageButton="N";
var nwAccountManageButton="Account Management";
//Must include a semicolon. Eg.  domain=.mydomain.com;  A dot represents subdomains
var nwCookieDomain="";
//Default registration panel.  Use "checked" to show the default panel.  Only one can be defined as "checked".
var nwNonSubRegistrationPanelChecked="checked";
var nwSubRegistrationPanelChecked="";
var nwDebug="Y";
var nwMobileButtonWidth="50%";
//Function to be called after login.  Leave blank for default behavior.
//var nwAfterLogin="nwdemo_doAfterLogin()";
var nwAfterLogin="newzware_customAfterLogin()";
var nwNoShowOptionsAfterLogin="";
//Function to be called after logout.  Leave blank for default behavior.
//var nwAfterLogout="nwdemo_doAfterLogout()";
var nwAfterLogout="newzware_customAfterLogout()";
var nwIsLoggedIn=false;
//If a user is already logged in and authorized, this is performed before showing content
//var nwLoggedInAndAuthorizedCallback="nwdemo_doAfterLogin()";
var nwLoggedInAndAuthorizedCallback="";

//Setting the nwAfterRegistrationCallback will not show the registration confirmation.  This function must then handle the necessary workflow of the user experience after
//registration is complete.  At this time, the login id and password entered for the registration are now in the login id and password fields, so they can be accessed with:
//var lg 	= document.getElementById("nwloginid").value;
//var pwd 	= document.getElementById("nwpassword").value;

var nwAfterRegistrationCallback="";

/* Custom Dialog Variables 
 * This is now the default.  Uses a responsive design. 
 * These purchase and log in panels are inverted because of how they want them presented, so we swapped variables and
 * use customized calls that are present on the page.
 */
var nwCustomRegistrationPanel="<div style='width: 330px' id='registration-div'><div id='nwregoptionsdiv' style='display: none'><div id='issub' style='display: none'><input type='radio' checked name='issub id='issub1' value=''></div></div><div id='trad-nonsub-block' style='display: none'> </div><div id='trad-sub-block'></div><div class='exiticonimage'> <a href='javascript:newzware_hideMain()'><img src='https://thetimes-tribune.nepanews.com/ss70v2/times/custom/exiticon.png'> </a></div> <div style='clear: both'></div> <div class='notactivetab'> <a href='javascript:newzware_scShowLogin()'> <div class='tabtext'> Login </div> </a> </div> <div class='activetab'> <a href='javascript:void(0)'><div class='tabtext'>Activate</div></a> </div> <div style='clear: both'></div> <div class='tabborder'></div> <div class='fielddiv2'><a class='nwepassforgot' href='javascript:newzware_forgotAccount()'>Forgot Account Number?</a><br/><input type='text' placeholder='Account Number' name='nwaccount' id='nwaccount' value=''> </div> <div style='clear: both'></div> <div class='fielddiv2'> <input type='text' placeholder='Last Name' name='nwsub_lname' id='nwsub_lname' value=''> </div> <div style='clear: both'></div> <div class='fielddiv2'> <input type='text' placeholder='Email Address' name='nwsub_email' id='nwsub_email' value=''> </div> <div style='clear: both'></div> <div class='fielddiv2'> <input type='text' placeholder='Confirm Email Address' name='nwsub_cemail' id='nwsub_cemail' value=''> </div> <div style='clear: both'></div> <div class='fielddiv2' style='display: none'> <input type='text' placeholder='User Name' name='nwsub_login_id' id='nwsub_login_id' value=''> </div> <div style='clear: both'></div> <div class='fielddiv2'> <input type='password' placeholder='Password' name='nwsub_password' id='nwsub_password' value=''> </div> <div style='clear: both'></div> <div class='fielddiv2'> <input type='password' placeholder='Confirm Password' name='nwsub_c_password' id='nwsub_c_password' value=''> </div> <div style='clear: both'></div> <div class='activatebuttondiv'> <a href='javascript:newzware_createOnlineAccount()'><div class='activatebuttontext'>Activate ></div></a> </div> <div style='clear: both'></div> </div>";

var nwCustomLoginTable ="<div class='nwepasswrap'> <div class='exiticonimage'> <a href='javascript:newzware_hideMain()'> <img src='https://thetimes-tribune.nepanews.com/ss70v2/times/custom/exiticon-trans.png'> </a> </div> <div style='clear: both'></div> <div class='nwepasstextwrap1'> <div class='nwepasstext1'>Already a subscriber? <a>Login Here</a> <div style='clear: both'></div> <div class='inpimage'> <img src='https://thetimes-tribune.nepanews.com/ss70v2/times/custom/emailicon.png' width='40' height='45'> </div> <div class='fielddiv'> <input type='text' placeholder='name@example.com' name='nwloginid' id='nwloginid' value=''> </div> <div style='clear: both'></div> <div class='inpimage1'> <img src='https://thetimes-tribune.nepanews.com/ss70v2/times/custom/lockicon.png' width='40' height='45'> </div> <div class='fielddiv1'> <input type='password' placeholder='your password' name='nwpassword' id='nwpassword' value=''> </div> <div style='clear: both'></div> <div class='loginbuttondiv'> <a href='javascript:newzware_doLogin()'> <div class='loginbuttontext'>Log In ></div> </a> </div> <div style='clear: both'></div><div class='forgotdiv'> </div> <div style='clear: both'></div> <div style='margin-top: 10px; margin-bottom: 10px; text-align: center'> <a style='font-size: 10pt; text-decoration: none; color: black' href='javascript:newzware_forgotPassword()'>Forgot Password</a>&nbsp;|&nbsp; <a style='font-size: 10pt; text-decoration: none; color: black' href='javascript:newzware_tempForgotUser()'>Forgot User Name</a> </div> <span class='nwepasstext1span'>Need to activate your digital account? <a class='nzlink1' href='javascript:newzware_scActivate()'>Activate Here</a> </span> </div> <div style='clear: both'></div> </div> <div class='epassbtnfield' style=''> <button type='button' onclick='newzware_showLandingPage()' class='epassbtn1' name='butsubscribe' id='butsubscribe'>SUBSCRIBE</button> </div> <div class='nwepasstextwrap4'> <div class='nwepasstext4'>Digital subscriptions as low</div> <div class='nwepasstext4'>as $4.95 per month!</div> </div> <div class='nwepasstextwrap1mob'> <div class='nwepasstext4'>Digital subscriptions as low <br/> as $4.95 per month! </div> </div> <div class='epassbtnfield1' style=''> <button type='button' onclick='newzware_showDayPass()' class='epassbtn2' name='butday' id='butday'>24 HOUR ACCESS</button> </div> <div class='nwepasstextwrap2'> <div class='nwepasstext2'>Get Unlimited Website</div> <div class='nwepasstext2'>Access for only $1</div> </div> <div class='nwepasstextwrap1mob'> <div class='nwepasstext2'>(Get Unlimited Website Access for only 1$)</div> </div> <div class='nwepassfoot'> COMMUNITY. WE'RE ALL ABOUT IT. </div> <div class='nwepassfoot2'> <div>COMMUNITY.</div> <div>WE'RE ALL ABOUT IT.</div> </div></div>";

var nwCustomPurchasePanel ="<form id='nwcustomloginform'> <div style='width: 330px; background: #fff'><div class='exiticonimage'> <a href='javascript:newzware_hideMain()'><img src='https://thetimes-tribune.nepanews.com/ss70v2/times/custom/exiticon.png'></a></div> <div style='clear: both'></div> <div class='activetab'> <a href='javascript:void()'> <div class='tabtext'>Login </div> </a> </div> <div class='notactivetab'> <a href='javascript:newzware_scActivate()'> <div class='tabtext'>Activate </div> </a> </div> <div style='clear: both'></div> <div class='tabborder'></div> <div class='inpimage'> <img src='https://thetimes-tribune.nepanews.com/ss70v2/times/custom/emailicon.png' width='40' height='45'> </div> <div class='fielddiv'> <input type='text' placeholder='name@example.com' name='nwloginid' id='nwloginid' value=''> </div> <div style='clear: both'></div> <div class='inpimage'> <img src='https://thetimes-tribune.nepanews.com/ss70v2/times/custom/lockicon.png' width='40' height='45'> </div> <div class='fielddiv'> <input type='password' placeholder='your password' name='nwpassword' id='nwpassword' value=''> </div> <div style='clear: both'></div><div style='clear: both'></div> <div class='forgotdiv'><input type='checkbox' id='nwpublic' value=''>" + nwPublicTerminalText + "</div><div style='clear: both'></div><div style='margin-top: 10px; margin-bottom: 10px; text-align: center'><a style='font-size: 10pt; text-decoration: none; color: black' href='javascript:newzware_forgotPassword()'>Forgot Password</a>&nbsp;|&nbsp;<a style='font-size: 10pt; text-decoration: none; color: black' href='javascript:newzware_tempForgotUser()'>Forgot User Name</a></div><div class='loginbuttondiv'> <a href='javascript:newzware_doLogin()'> <div class='loginbuttontext'>Log In > </div> </a> </div> <div style='clear: both'></div> </div> </form>";

var nwNoSubscriptionSelectedMessage="No subscription offer has been selected.";
var tempForgotUserURL   = nwProtocol + "://" + nwServer + "/ss70v2/" + nwSite + "/common/template.jsp?nwmodule=forgot&nwpage=forgotuser";

/*
 * Code for alternate workflow using static rates for selection
 */
function newzware_forgotUser(){
	var nwForgotURL	= nwProtocol + "://" + nwServer + "/ss70v2/" + nwSite + "/common/template.jsp?nwmodule=forgot&nwpage=forgotuser";
	window.location = nwForgotURL + "&autoReturn=" + nwCurrURL;

}

/*
* STANDARD OFFER CLICKED *
* 
function newzware_offerClicked(val){
    var ckVal = "" + val;
    if(ckVal == "PROMO"){
        ckVal = document.getElementById("nwpromocode").value;
        if(ckVal == ""){
            alert("Please enter a promo code.");
            return;
        }
        else{
         	newzware_deleteCookie(nwPrRateIdCk);
            newzware_setCookie(nwPromoCk, ckVal, 1);
		}
    }
    else{
		newzware_deleteCookie(nwPromoCk);
        newzware_setCookie(nwPrRateIdCk, ckVal, 1);
    }
    if(nwIsLoggedIn){
        newzware_autoLoginAndStart();
    }
    else{
        newzware_hideAll();
        newzware_showRegistrationPanel();
    }
}
function newzware_afterRegistration(){
    var lg      = document.getElementById("nwloginid").value;
    var pwd     = document.getElementById("nwpassword").value;
    newzware_getWebLogin(lg,pwd);
}
function newzware_getWebLogin(l,p){
    var params = "&login_id=" + encodeURIComponent(l) + "&password=" + encodeURIComponent(p) + "&encryptPassword=Y";
    nwJQuery.getJSON(nwWebLoginURL + "?callback=?&site=" + nwSite + params,
            function(acctdata) {
                    var ec = acctdata.exitcode;
                    var desc = acctdata.errordesc;
                    if(ec == "0"){
                        var sec = acctdata.password;
                        newzware_setCookie(nwUserCk,newzware_getUH(l,p),1);
                        newzware_setCookie(nwUserLgCk,l,1);
                        newzware_setCookie(nwUserSecCk,sec,1);
                        var prRateId    = newzware_getCookie(nwPrRateIdCk);
                        if(prRateId == null){
                            newzware_hideRegistrationShowAuthorize();
                            newzware_showMessage(nwRegisteredMessage,"H");
                        }
                        else if (prRateId == "EC"){
                        	newzware_purchaseECopy();
                        }
                        else
                            newzware_autoLoginAndStart();
                    }
                    else{
                        newzware_showMessage(desc,"A");
                        return;                    
					}
			}            
	);
}
*/
var nwResizable = true;
var nwShowLogout = "N";
//Include Single Sign On
var nwSSO		= "Y";
var nwShowMeterMessage = "Y";
//var nwMeterBoxHTML		= "<div id='slidebox' style='width:400px; height:100px; padding:10px; background-color:#fff; border-top:3px solid #E28409; position:fixed;" + "bottom:0px; right:-430px; -moz-box-shadow:-2px 0px 5px #aaa; -webkit-box-shadow:-2px 0px 5px #aaa; box-shadow:-2px 0px 5px #aaa;'>" + "<a style='background:transparent url(https://thetimes-tribune.nepanews.com/newzlib/images/check16.png) no-repeat top left; width:16px; height:16px; position:absolute;cursor:pointer;" + "top:10px; right:10px;' href='javascript:newzware_meterBoxClose()'></a>" + "<p>You have _X_ free views left</p><h2 style='color:#E28409; font-size:18px; margin:10px 20px 10px 0px;></h2></div>";

var nwMeterBoxHTML = "<div id='slidebox' style='margin-right:5px;text-align:center;width:290px;height:auto;background-color:#fff;border-top:3px solid # 2c4a91;position:fixed; bottom:8.5%;right:-403px;-moz-box-shadow:0px 0px 5px rgba(0, 0, 0, 0.6);-webkit-box-shadow:0px 0px 5px rgba(0, 0, 0, 0.6);box-shadow:0px 0px 5px rgba(0, 0, 0 0.6);'><a style='background:transparent url(https://thetimes-tribune.nepanews.com/newzlib/images/check16.png) no-repeat top right;width:20px;height:20px;position:absolute;cursor:pointer;top:-7px;left:-7px;box-shadow:1px 1px 1px rgba(0, 0, 0, 0.6);' href='javascript:newzware_meterBoxClose()'></a><div id='slide-wrapper' style='overflow:hidden;padding-top:10px;padding-bottom:10px;background-color:#a1a1a1;'><p style='background:none repeat scroll 0 0 #9e0a0a;color:#ffffff;font-weight:bold;padding-left:10px;padding-right:10px;padding-top:5px;padding-bottom:5px;width:100%;margin-top:-10px;text-align:center;font-size:0.75em;'>You have _X_ of 5 free article views left</p><div style='background:none repeat scroll 0 0 #222222;padding:10px;text-align:left;color:#ffffff;'><p style='color:#a1a1a1;font-size:1.7em;'><a style='color:#a1a1a1;text-decoration:underline;text-size:1.1em;' href='javascript:newzware_showLogin()'>Click here to Log In</a></p></div><div style='padding:10px;font-size:0.8em;color:#191919;'>If you're a subscriber and forgot your password or haven't registered for online access <a href='https://thetimes-tribune.nepanews.com/ss70v2/times/common/template.jsp'>CLICK HERE</a> to sign up.</div><div style='text-align:center;'>Call <a href='tel:5703489190'>570.348.9190</a> for assistance.</div></div></div>";
var nwMeterBoxHTML2 = "<div id='slide-wrapper' style='overflow:hidden;padding-top:10px;padding-bottom:10px;background-color:#a1a1a1;'><p style='background:none repeat scroll 0 0 #9e0a0a;color:#ffffff;font-weight:bold;padding-left:10px;padding-right:10px;padding-top:5px;padding-bottom:5px;width:100%;margin-top:-10px;text-align:center;font-size:0.75em;'></p><div style='background:none repeat scroll 0 0 #222222;padding:10px;text-align:left;color:#ffffff;'><p style='font-size:1.0em;'>You're signed in but do not have an active subscription!</p><p style='color:#a1a1a1;font-size:1.7em;'><a style='color:#a1a1a1;text-decoration:underline;text-size:1.1em;' href='javascript:newzware_showMain(); newzware_showPurchasePanel()'>Subscribe Now!</a></p></div><div style='padding:10px;font-size:0.8em;color:#191919;'>In print, online, on your tablet or smartphone. On demand local news, sports, business, opinion, and lifestyles any way you want... we deliver!</div></div>";

var nwUseJQueryInputStyle = "N";
var nwUseInputStyle = "N";
var nwInputJQueryStyle = { "font": "inherit", "color": "inherit", "background": "none", "text-align": "inherit", "outline": "none", "cursor": "text" }
var nwInputStyle = { "font": "inherit", "color": "inherit", "background": "none", "text-align": "left", "outline": "1px solid black", "cursor": "text" }
var nwUseMainDivStyle = "N";
var nwMainDivStyle = { "text-align": "center" }
var nwAppId="";
var nwMeterBoxOpenThreshold=5;
var nwJQueryEffect="fade";
//IF nwLoadThemeSeparate is set to Y, the Administrator must load it manually
var nwLoadThemeSeparate="N";
//IF nwJQueryDialogClass is set to anything other than blank, the Administrator must load the theme manually using the nwLoadThemeSeparate = Y.  Classes must be inserted after the E-Pass script content. 
var nwJQueryDialogClass="";
var nwVerifyEmail="N";
var nwValidateEmailMessage = "The email address has not been validated.  Please check your email for an activation link and activate your account.";
var nwForceEmailAsUserName="N";
var nwMeterBoxSlideBoxWidth=300;
var nwNoActionOnInit=false;
//Callback that will be triggered when the login screen is shown.
var nwShowLoginCallback="custom_hideContent()";
//Callback that will be triggered when the registration screen is shown.
var nwShowRegistrationCallback="custom_hideContent()";
//Callback that will be triggered when the purchase screen is shown.
var nwShowPurchaseCallback="";
//Callback that will be triggered when the meter limit has been reached
var nwMeterLimitReachedCallback="";
var nwMeterExpireEndOfMonth=false;
var nwPromoCk		= "nwpromocode";
var nwFacebookInvalidMessage="Facebook User ID is not associated with any valid accounts.";
var nwResetPasswordMessage="Your password must be reset.  You will be redirected to reset your password in 5 seconds.";
var nwResetPasswordTimeToRedirect=5000;
//var nwDialogPosition= { my: "top", at: "center", of: "#statusbar" };
var nwDialogPosition= { my: "center", at: "center", of: window, collision: "fit" };
var nwExcludePaths = [ "/obituaries/thetimes-tribune/","/obituaries/thetimes-tribune/obituary-place-an-obituary.aspx"];
var nwPathname = window.location.pathname;
var nwInverse = true;


try{
    if(nwPathname != null){
        var nwPageContext = nwPathname.substring(0,nwPathname.lastIndexOf("/"));
        var nwPageName = nwPathname.substring(nwPathname.lastIndexOf("/"));
		console.log("nwPageName: " + nwPageName);
        for(var i = 0; i < nwExcludePaths.length; i++){
			if(nwPageName.indexOf("2.") == -1 && nwPageName.indexOf("1.") == -1){	
            	if((nwPageContext != null && nwExcludePaths[i] == nwPageContext) || nwExcludePaths[i] == nwPathname){
               	 	nwNoActionOnInit = true;
            	}
			}
        }
    }
	console.log("No action on init: " + nwNoActionOnInit);
}catch(error){}

function custom_hideContent(){
try{
	nwJQuery('#nwlogindiv').keypress(function (e) {
  		if (e.which == 13) {
    		newzware_doLogin();
    		return false;  
	  	}
	});
	var doNotHide = false;
    var nwPathname = window.location.pathname;
    if(nwPathname != null){
        var nwPageContext = nwPathname.substring(0,nwPathname.lastIndexOf("/"));
        var nwPageName = nwPathname.substring(nwPathname.lastIndexOf("/"));
        for(var i = 0; i < nwExcludePaths.length; i++){
			if(nwPageName.indexOf("2.") == -1 && nwPageName.indexOf("1.") == -1){	
            	if((nwPageContext != null && nwExcludePaths[i] == nwPageContext) || nwExcludePaths[i] == nwPathname){
               	 	doNotHide = true;
            	}
			}
        }
    }
	if(!doNotHide){
		document.getElementById(nwContentId).style.display = "none";
	}
	newzware_doReposition();
}catch(error){}
}
function newzware_customAfterLogin(){
	console.log("customAfterLogin() is being called. Showing Logout button");
        newzware_setCookie('__ut','Y',1);
	if(document.getElementById("slidebox") && !newzware_isAuthorized()){
		console.log("Changing HTML");
		nwJQuery("#slidebox").html(nwMeterBoxHTML2);
	}
	if(newzware_isAuthorized()){
		nwJQuery('#slidebox').hide();
		document.getElementById(nwContentId).style.display = "block";
	}

	//newzware_showLogout();
	var loggedIn = newzware_getCookie("nwuserloggedin");
	if(loggedIn == null){
        newzware_setCookie('nwuserloggedin','Y',1);
		nwJQuery.ajax({
        	url: window.location.href,
        	headers: {
            	"Pragma": "no-cache",
            	"Expires": -1,
            	"Cache-Control": "no-cache"
        	}
    		}).done(function () {
        		window.location.reload(true);
    	});
	}
	//document.getElementById("mywelcomemessage").innerHTML = "Welcome: " + nwuserlg;
	newzware_doReposition();
}
function newzware_customAfterLogout(){
        newzware_deleteCookie('__ut');
        newzware_deleteCookie('nwuserloggedin');
        nwJQuery.ajax({
            url: window.location.href,
            headers: {
                "Pragma": "no-cache",
                "Expires": -1,
                "Cache-Control": "no-cache"
            }   
            }).done(function () {
                window.location.reload(true);
        });
}

function newzware_getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
       		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}
function newzware_tempForgotUser(){
	window.location = tempForgotUserURL + "&autoReturn=" + nwCurrURL;
}

var nwEmailBlurBound = false;
function newzware_scActivate(){
	if(!nwEmailBlurBound){
		nwJQuery("#nwsub_email").blur(function() {
			nwEmailBlurBound = true;
			if( nwJQuery.trim($("#nwsub_email").val()) != ""){
				nwJQuery("#nwsub_login_id").val(nwJQuery("#nwsub_email").val());
	   		}
		});
	}
	newzware_hideAll(true);
	if(!newzware_isMainVisible())
		newzware_showMain();
	newzware_showRegistrationPanel();
	newzware_doReposition();
}
function newzware_scShowLogin(){
	newzware_hideAll(true);
	if(!newzware_isMainVisible())
		newzware_showMain();
	//newzware_hideLoginShowPurchase();
	newzware_showPurchasePanel();
	newzware_doReposition();
}
function newzware_doReposition(){
	console.log("Repositioning...");
	nwJQuery("#nwmaindiv").dialog({
		position: { my: "center", at: "center", of: window, collision: "fit" }
    			//using: function (pos, ext) {
        			//nwJQuery(this).animate({ }, 600);
    			//}
		 //}
	});
}
function newzware_showLandingPage(){
    if(nwIsLoggedIn){
        newzware_purchaseTermSubscription();
    }
    else{
		window.location = "https://" + nwServer + "/ss70v2/times/custom/landing/LandingPage_TT.html";
	}
}

function newzware_showDayPass(){
    if(nwIsLoggedIn){
        var userLgVar   = newzware_getCookie(nwUserLgCk);
        var userLgSec   = newzware_getCookie(nwUserSecCk);
        var params      = "?nwmodule=epass&nwpage=epass&edition=" + nwEdition +
            "&site=" + nwSite + "&login_id=" + encodeURIComponent(userLgVar) + "&password=" + encodeURIComponent(userLgSec) + "&encrypted=Y&rpage=" + nwCurrURL;
        window.location = nwSSMURL + params;
    }
	else{
		window.location = "https://" + nwServer + "/ss70v2/" + nwSite + "/custom/day_pass_registration.jsp?edition=" + nwEdition + "&rpage=" + nwCurrURL;
	}
}
$(window).resize(function () {
console.log("Resizing fired. Main visible: " + nwJQuery("#nwmaindiv").dialog('isOpen'));
	if(nwJQuery("#nwmaindiv").dialog('isOpen')){
    		newzware_doReposition();
	}
});

var nwfileref =document.createElement("link");
nwfileref.setAttribute("rel", "stylesheet");
nwfileref.setAttribute("type", "text/css");
nwfileref.setAttribute("href", "https://thetimes-tribune.nepanews.com/ss70v2/times/custom/STobitsconfig.css");
document.getElementsByTagName("head")[0].appendChild(nwfileref);
