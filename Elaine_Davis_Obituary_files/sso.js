	
	
	var newzwareTrackerDivId = "newzwaretrackerdiv";
	function newzware_removeTracker(){
		if(document.getElementById(newzwareTrackerDivId)){
		}
		else{
        	var tkDiv = document.createElement("div");
        	tkDiv.id = newzwareTrackerDivId;
        	document.body.appendChild(tkDiv);
		}
		document.getElementById(newzwareTrackerDivId).innerHTML = "<img src='" + ssoDeleteTrackerURL + "'>";
	}
	function newzware_tracker(login){
		if(document.getElementById(newzwareTrackerDivId)){
		}
		else{
        	var tkDiv = document.createElement("div");
        	tkDiv.id = newzwareTrackerDivId;
        	document.body.appendChild(tkDiv);
		}
		var buff = "<img src='" + ssoTrackerURL + "?login_id=" + encodeURIComponent(login) + "'>";
		buff += "<img src='" + ssoTrackerURL + "?loggedout=N'>";
		document.getElementById(newzwareTrackerDivId).innerHTML = buff;
	}
