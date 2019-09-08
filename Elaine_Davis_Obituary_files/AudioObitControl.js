function AudioObitControl(params){var PlayLink=params.PlayLink;var MediaBase=params.MediaBase;
var FileName=params.FileName;var FlashUrl=params.FlashUrl;var PlayAudioButton=$(".PremiumObitAudioDiv");
var nonIEaudioScript="<audio id='AudioControl' controls controlsList='nodownload'><source src='{0}' type='audio/ogg'><source src='{1}' type='audio/mpeg'><object type='application/x-shockwave-flash' data='{2}' width='{3}' height='20'><param name='movie' value='{2}' /><param name='FlashVars' value='mp3={1}&bgcolor=000000' /></object></audio>";
var ieAudioScript="<object type='application/x-shockwave-flash' data='{2}' width='{3}' height='20'><param name='movie' value='{2}' /><param name='FlashVars' value='mp3={1}&bgcolor=000000&showvolume=1&autoplay=1' /><param name='autoplay' value='1'/></object>";
var ie10="<audio id='AudioControl' controls controlsList='nodownload' style='height:45px;'><source src='{0}' type='audio/ogg'><source src='{1}' type='audio/mpeg'><object type='application/x-shockwave-flash' data='{2}' width='{3}' height='20'><param name='movie' value='{2}' /><param name='FlashVars' value='mp3={1}&bgcolor=000000' /></object></audio>";
function LoadComplete(){$("#AudioControlContainer #AudioLoading").css("display","none");
}PlayLink.click(function(){var audioHtml;var mp3Url=MediaBase+FileName+".mp3x";var oggUrl=MediaBase+FileName+".oggx";
if(navigator.userAgent.toLowerCase().indexOf("msie")>-1){audioHtml=ieAudioScript.replace("{2}",FlashUrl).replace("{2}",FlashUrl).replace("{1}",mp3Url);
audioHtml=audioHtml.replace("{3}","176");PlayAudioButton.html(audioHtml);}else{var tag=(navigator.userAgent.toLowerCase().indexOf("msie")>-1)?ie10:nonIEaudioScript;
audioHtml=tag.replace("{0}",oggUrl).replace("{1}",mp3Url).replace("{2}",FlashUrl);
audioHtml=audioHtml.replace("{3}","180");PlayAudioButton.html(audioHtml);var obitAudio=document.getElementById("AudioControl");
obitAudio.onloadeddata=LoadComplete();obitAudio.play();}_gaq.push(["legacy._trackEvent","nextgenobit","audioobit","obit"]);
});}