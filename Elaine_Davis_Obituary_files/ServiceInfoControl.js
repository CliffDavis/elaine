function ServiceInfoControl(params){var isCollapsed=params.isCollapsed;var flowersFhDetails1=params.flowersFhDetails1;
var responsiveEnabled=params.responsiveEnabled;var mobileBreakPoint=params.mobileBreakPoint;
if(responsiveEnabled){if($("html").attr("data-loaded")!=="true"&&$("html").attr("data-viewport")==="mobile"){setTimeout(function(){ServiceInfoControl(params);
},500);}else{if(window.innerWidth<=mobileBreakPoint){setTimeout(function(){eval(flowersFhDetails1);
},100);$("#FlowerPromoAdContainer").hide();}}}if(isCollapsed){$(".ServiceItems").css("display","none");
$(".ServicesDetails .ExpandCollapse span").html("+");$(".ServiceDetailMessage").text("See Services Detail");
}else{$(".ServicesDetails .ExpandCollapse span").html("-");$(".ServiceDetailMessage").text("Hide Services Detail");
}$(".ServicesDetails").click(function(){if($(".ServiceDetailMessage").text()==="See Services Detail"){$(".ServiceItems").show();
$(".ServicesDetails .ExpandCollapse span").html("-");$(".ServiceDetailMessage").text("Hide Services Detail");
}else{$(".ServiceItems").hide();$(".ServicesDetails .ExpandCollapse span").html("+");
$(".ServiceDetailMessage").text("See Services Detail");}});}