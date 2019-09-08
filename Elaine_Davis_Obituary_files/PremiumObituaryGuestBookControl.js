function SignPremiumObitGuestBook(options){var waterMarkText=options.WaterMarkText;
var signGb=$("#"+options.SignGuestbookId);$(document).ready(function(){$(".AddGuestBookEntry").val("");
var numEntries=signGb.find(".GuestBookEntry ul li").length;if(numEntries>0){signGb.find(".GuestBookEntry ul li:first").show();
if(numEntries>1){setTimeout("rotateMessages('"+options.SignGuestbookId+"')",8000);
}}signGb.find(".AddGuestBookEntry").watermark({watermarkText:waterMarkText});signGb.find(".GuestBookEntryButton").click(addGuestBookEntry);
function addGuestBookEntry(){if(signGb.find(".AddGuestBookEntry").get(0).value==waterMarkText){signGb.find(".AddGuestBookEntry").get(0).value="";
}$("#__VIEWSTATE").remove();$("form").attr("action",options.GetGuestBookAddEntryLink);
$("form").attr("target",options.GuestBookLinkTarget);$("form").attr("onsubmit","");
$("form").get(0).submit();}});}function rotateMessages(guestBookId){var signGb=$("#"+guestBookId);
signGb.find(".GuestBookEntry ul li:first").hide();signGb.find(".GuestBookEntry ul li:last").after(signGb.find(".GuestBookEntry ul li:first"));
signGb.find(".GuestBookEntry ul li:first").show();setTimeout("rotateMessages('"+guestBookId+"')",8000);
}