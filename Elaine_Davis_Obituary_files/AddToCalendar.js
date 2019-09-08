function AddToCalendar(params){var addToCalendarLink=params.addToCalendarLink;var addToCalendarPanel=params.addToCalendarPanel;
addToCalendarLink.click(function(e){$("body").on("click",function(){addToCalendarPanel.hide();
});addToCalendarPanel.show();_gaq.push(["legacy._trackEvent","nextgenobit","AddCalendar - main","obit"]);
e.stopPropagation();});}