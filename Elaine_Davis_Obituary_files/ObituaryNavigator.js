var ASR;(function(ASR){var ObituaryNavigationItemBE=(function(){function ObituaryNavigationItemBE(){}return ObituaryNavigationItemBE;
}());ASR.ObituaryNavigationItemBE=ObituaryNavigationItemBE;var NavigationLink=(function(){function NavigationLink(url,text){this.Url=url;
this.Text=text;}return NavigationLink;}());ASR.NavigationLink=NavigationLink;var ObituaryNavigator=(function(){function ObituaryNavigator(){this.ObituaryNavigationList=new Array();
this.CurrentObituary=new ObituaryNavigationItemBE();this.DisablePreviousOnFirstItem=false;
this.DisableNextOnLastItem=false;this.DisplayInstructions=false;this.LeftNavigationActive=false;
this.RightNavigationActive=false;this.FlyoutTime=250;}ObituaryNavigator.prototype.SaveObituaryNavigationItems=function(obituaryNavigationItems){this.ObituaryNavigationList=obituaryNavigationItems;
this.SaveToSession(true);};ObituaryNavigator.prototype.AddObituaryNavigationItems=function(obituaryNavigationItems){this.ObituaryNavigationList=this.ObituaryNavigationList.concat(obituaryNavigationItems);
this.SaveToSession(true);};ObituaryNavigator.prototype.ClearNavigationList=function(){this.ObituaryNavigationList=new Array();
try{window.clientStorage.removeData("ObituaryNavigator");}catch(e){this.LogToConsole(e);
}};ObituaryNavigator.prototype.ActivateNavigator=function(obitType,currentPersonId,noticeType){var _this=this;
window.clientStorage.getDataCallback("ObituaryNavigator",function(data){if(!data){_this.ClearNavigationList();
return;}var obituaryNavigator=JSON.parse(data);_this.DisablePreviousOnFirstItem=obituaryNavigator.DisablePreviousOnFirstItem;
_this.DisableNextOnLastItem=obituaryNavigator.DisableNextOnLastItem;_this.ObituaryNavigationList=obituaryNavigator.ObituaryNavigationList;
_this.LastPageOverride=obituaryNavigator.LastPageOverride;_this.FirstPageOverride=obituaryNavigator.FirstPageOverride;
_this.DisplayInstructions=obituaryNavigator.DisplayInstructions;_this.SetupNavigator(obitType,currentPersonId,noticeType);
if(_this.DisplayInstructions){_this.LoadInstructions();}$("body").click(function(){if(_this.GetMediaQueryState("large")){_this.HideFlyout($(".Navigation.Left").find(".NavBody"),$(".Navigation.Left").find(".NavBlock"),"left");
_this.HideFlyout($(".Navigation.Right").find(".NavBody"),$(".Navigation.Right").find(".NavBlock"),"right");
$("#KeyboardInstructions").stop();$("#KeyboardInstructions").animate({bottom:-$("#KeyboardInstructions").outerHeight()+"px"},_this.FlyoutTime);
}});});};ObituaryNavigator.prototype.ShowFlyout=function(navBody,navBlock,position){if(this.GetMediaQueryState("large")){var positionJson={};
navBody.stop();positionJson[position]=navBlock.outerWidth()+"px";navBody.animate(positionJson,this.FlyoutTime,function(){navBody.addClass("High");
});}};ObituaryNavigator.prototype.HideFlyout=function(navBody,navBlock,position){if(this.GetMediaQueryState("large")){var positionJson={};
navBody.stop();positionJson[position]=-navBody.outerWidth()+"px";navBody.removeClass("High");
navBody.animate(positionJson,this.FlyoutTime);}};ObituaryNavigator.prototype.GetMediaQueryState=function(size){return navigator.appVersion.indexOf("MSIE 8.0")!==-1||window.getComputedStyle(document.querySelector("#ObituaryNavigation"),":before").getPropertyValue("content").replace(/["']/g,"")==size;
};ObituaryNavigator.prototype.LoadInstructions=function(){if(this.GetMediaQueryState("large")){if(!$("#KeyboardInstructions").length){$("body").prepend('<div id="KeyboardInstructions">Use your keyboard arrow keys to view Next / Previous obituaries too!</div>');
$("#KeyboardInstructions").delay(10000).animate({bottom:-$("#KeyboardInstructions").outerHeight()+"px"},1000);
}else{$("#KeyboardInstructions").clearQueue();$("#KeyboardInstructions").animate({bottom:"0px"},this.FlyoutTime);
setTimeout(function(){$("#KeyboardInstructions").animate({bottom:-$("#KeyboardInstructions").outerHeight()+"px"});
},3000);}}};ObituaryNavigator.prototype.LoadHideNavBody=function(obitNavSide,position){var _this=this;
if(obitNavSide){this.ShowFlyout(obitNavSide.find(".NavBody"),obitNavSide.find(".NavBlock"),position);
setTimeout(function(){return _this.HideFlyout(obitNavSide.find(".NavBody"),obitNavSide.find(".NavBlock"),position);
},3000);}};ObituaryNavigator.prototype.SetupNavigator=function(obitType,currentPersonId,noticeType){var _this=this;
var isInNavigator=false;$.each(this.ObituaryNavigationList,function(key,value){if(value.ObituaryId==currentPersonId){_this.CurrentObituary=value;
_this.NextObituaryIndex=key==_this.ObituaryNavigationList.length-1?0:key+1;_this.PreviousObituaryIndex=(key==0?_this.ObituaryNavigationList.length:key)-1;
isInNavigator=true;return false;}});if(!this.LeftNavigationActive&&!this.RightNavigationActive&&this.ObituaryNavigationList&&this.ObituaryNavigationList.length>1&&isInNavigator){var gaTagging='data-ga-evt-cat="Obit Browse Arrows" data-ga-evt-label="'+obitType+'" data-ga-evt-action=';
$("body").prepend('<div id="ObituaryNavigation"></div>');this.SetupLeftNavigation(gaTagging,noticeType);
this.SetupRightNavigation(gaTagging,noticeType);$(document).keydown(function(event){return _this.NavigateObit(event);
});if(navigator.appVersion.indexOf("MSIE 8.0")!==-1){$("#ObituaryNavigation").addClass("IE8");
}$(window).scroll(function(){if($(window).scrollTop()+$(window).height()==$(document).height()){_this.LoadInstructions();
_this.LoadHideNavBody($(".Navigation.Left"),"left");_this.LoadHideNavBody($(".Navigation.Right"),"right");
}});}};ObituaryNavigator.prototype.NavigateObit=function(event){if((event.keyCode==37&&this.LeftNavigationActive)||(event.keyCode==39&&this.RightNavigationActive)){var url;
if(event.keyCode==37){url=this.PreviousUrl;}else{url=this.NextUrl;}this.SetNavigationUrl(url);
}};ObituaryNavigator.prototype.SetupLeftNavigation=function(gaTagging,noticeType){if(!this.DisablePreviousOnFirstItem||this.FirstPageOverride||(this.DisablePreviousOnFirstItem&&this.PreviousObituaryIndex!=this.ObituaryNavigationList.length-1)){$("#ObituaryNavigation").append('<div class="Navigation Left"'+gaTagging+'"Previous"><div class="NavBody"><div class="NavText"></div><img class="PersonImage" src=""/><div class="PersonName"></div></div><div class="NavBlock"><div class="glyphicons glyphicons-chevron-left"></div></div></div>');
}if($(".Navigation.Left").length){var obitNavLeft=$(".Navigation.Left");if(this.FirstPageOverride&&this.PreviousObituaryIndex==this.ObituaryNavigationList.length-1){obitNavLeft.find(".NavText").html('<span class="Override">'+this.FirstPageOverride.Text+" </span><br/>");
obitNavLeft.find(".PersonImage").remove();this.PreviousUrl=this.FirstPageOverride.Url;
}else{obitNavLeft.find(".NavText").html("<span>Previous "+noticeType+" </span>");
obitNavLeft.find(".PersonName").html(this.ObituaryNavigationList[this.PreviousObituaryIndex].PersonName).after('<div class="Counter"></div>');
obitNavLeft.find(".PersonImage").attr("src",this.ObituaryNavigationList[this.PreviousObituaryIndex].ImageUrl);
obitNavLeft.find(".Counter").text((this.PreviousObituaryIndex+1)+" of "+this.ObituaryNavigationList.length);
this.PreviousUrl=this.ObituaryNavigationList[this.PreviousObituaryIndex].Url;}this.HookEvents(obitNavLeft,this.PreviousUrl,"left");
this.LeftNavigationActive=true;}};ObituaryNavigator.prototype.SetupRightNavigation=function(gaTagging,noticeType){if(!this.DisableNextOnLastItem||this.LastPageOverride||(this.DisableNextOnLastItem&&this.NextObituaryIndex!=0)){$("#ObituaryNavigation").append('<div class="Navigation Right"'+gaTagging+'Next ><div class="NavBody"><div class="NavText" ></div><img class="PersonImage" src=""/><div class="PersonName"></div></div><div class="NavBlock"><div class="glyphicons glyphicons-chevron-right" ></div></div></div >');
}if($(".Navigation.Right").length){var obitNavRight=$(".Navigation.Right");if(this.LastPageOverride&&this.NextObituaryIndex==0){obitNavRight.find(".NavText").html('<span class="Override">'+this.LastPageOverride.Text+" </span><br/>");
obitNavRight.find(".PersonImage").remove();this.NextUrl=this.LastPageOverride.Url;
}else{obitNavRight.find(".NavText").html("<span>Next "+noticeType+" </span>");obitNavRight.find(".PersonName").html(this.ObituaryNavigationList[this.NextObituaryIndex].PersonName).after('<div class="Counter"></div>');
obitNavRight.find(".PersonImage").attr("src",this.ObituaryNavigationList[this.NextObituaryIndex].ImageUrl);
obitNavRight.find(".Counter").text((this.NextObituaryIndex+1)+" of "+this.ObituaryNavigationList.length);
this.NextUrl=this.ObituaryNavigationList[this.NextObituaryIndex].Url;}this.HookEvents(obitNavRight,this.NextUrl,"right");
this.RightNavigationActive=true;}};ObituaryNavigator.prototype.HookEvents=function(obitNav,url,position){var _this=this;
obitNav.click(function(){return _this.SetNavigationUrl(url);});obitNav.mouseover(function(){return _this.ShowFlyout(obitNav.find(".NavBody"),obitNav.find(".NavBlock"),position);
});obitNav.mouseleave(function(){return _this.HideFlyout(obitNav.find(".NavBody"),obitNav.find(".NavBlock"),position);
});obitNav.fadeIn();};ObituaryNavigator.prototype.SaveToSession=function(displayInstructions){try{window.clientStorage.saveData("ObituaryNavigator",{ObituaryNavigationList:this.ObituaryNavigationList,DisablePreviousOnFirstItem:this.DisablePreviousOnFirstItem,DisableNextOnLastItem:this.DisableNextOnLastItem,LastPageOverride:this.LastPageOverride,FirstPageOverride:this.FirstPageOverride,DisplayInstructions:displayInstructions});
}catch(e){this.LogToConsole(e);}};ObituaryNavigator.prototype.LogToConsole=function(e){try{console.log(e.message);
}catch(e){}};ObituaryNavigator.prototype.SetNavigationUrl=function(url){this.SaveToSession(false);
$("body").fadeOut("slow",function(){window.location.href=url;});};return ObituaryNavigator;
}());ASR.ObituaryNavigator=ObituaryNavigator;})(ASR||(ASR={}));