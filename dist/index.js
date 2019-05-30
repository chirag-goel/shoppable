!function(){"use strict";var e=function(){return function(e){var t=this;this.showDetails=function(e,o,n,i){t.removeAllAdsDetail();var s=document.querySelector(t.selector),a=document.createElement("div"),r=document.createElement("div"),l=document.createElement("div");l.className="ads-detail-close",l.innerHTML="X",l.setAttribute("style","width: 10px;height: 10px;right: 5px;top: 5px;line-height: 10px;text-align: center;color: #000;border: 1px solid #000;position: absolute;font-size: 12px;font-weight: bold;padding: 3px;cursor: pointer;"),a.className="ads-detail",a.id=e+"-ads-detail",r.innerHTML=i,a.setAttribute("style","left: "+o+"px; top: "+n+"px;position: absolute;width: 200px;height: 300px;background: rgba(255, 255, 255, 0.8);padding: 5px;border-radius: 2px;overflow: hidden;"),a.addEventListener("click",function(o){"ads-detail-close"===o.target.className&&t.removeAdsDetail(e)}),r.className="ads-content",r.setAttribute("style","position: relative;background: white;"),r.append(l),a.appendChild(r),s.appendChild(a)},this.removeAllAdsDetail=function(){for(var e=document.querySelectorAll(t.selector+" .ads-detail"),o=0;o<e.length;o++)e[o]&&e[o].parentNode.removeChild(e[o])},this.removeAdsDetail=function(e){var o=document.querySelector(t.selector+" #"+e+"-ads-detail");o&&o.parentNode.removeChild(o)},this.selector=e.selector}}(),t=function(){return function(t){var o=this;this.getYPosition=function(e){var t=e-280;return t>10?t:10},this.getXPosition=function(e,t){var o=document.querySelector(t);return e+150>(o?o.offsetWidth:0)-10?e-210:e+30},this.showIcon=function(e,t,n,i){var s=o,a=document.querySelector(o.selector),r=document.createElement("div");r.className="ads-icon",r.id=e,r.innerHTML="+",r.setAttribute("style","position: absolute;border: 4px solid rgba(255, 255, 255, 0.5);border-radius: 20px;width: 20px;height: 20px;color: white;font-size: 20px;font-weight: bold;text-align: center;line-height: 20px;cursor: pointer;left: "+t+"px; top: "+n+"px"),r.addEventListener("click",function(a){o.AdsDetailPopUp.showDetails(e,o.getXPosition(t,s.selector),o.getYPosition(n),i)}),a.appendChild(r)},this.removeIcon=function(e){o.AdsDetailPopUp.removeAdsDetail(e);var t=document.querySelector(o.selector+" #"+e);t&&t.parentNode.removeChild(t)},this.selector=t.selector,this.AdsDetailPopUp=new e({selector:this.selector})}}(),o=function(){return function(e){var o=this;this.setAdsData=function(e){o.data=e},this.onReady=function(){switch(document.querySelector(o.selector).setAttribute("style","position: relative;"),o.type.mediaType){case"VIDEO":o.showAdsOnVideo();break;case"IMAGE":o.showAdsOnImage()}},this.showAdsOnVideo=function(){switch(o.type.playerType){case"YOUTUBE":window.onYouTubeIframeAPIReady=o.onYouTubeIframeAPIReady}},this.showAdsOnImage=function(){for(var e=0;e<o.data.length;e++){var t=o.data[e];o.AdsIconIns.showIcon(t.id,t.positionPx.left,t.positionPx.top,t.content)}},this.setTimeLookup=function(){var e=o;o.interval=setInterval(function(){for(var t=Math.floor(e.player.getCurrentTime()),o=0;o<e.data.length;o++){var n=e.data[o];t===n.timestamp?(e.enablePause&&e.player.pauseVideo(),e.AdsIconIns.showIcon(n.id,n.positionPx.left,n.positionPx.top,n.content)):e.AdsIconIns.removeIcon(n.id)}},1e3)},this.onYouTubeIframeAPIReady=function(){o.player=new window.YT.Player("existing-iframe-example",{events:{onReady:o.onPlayerReady,onStateChange:o.onPlayerStateChange}})},this.onPlayerReady=function(){document.getElementById("existing-iframe-example").style.borderColor="#FF6D00"},this.onPlayerStateChange=function(e){1===e.data?o.setTimeLookup():2===e.data&&clearInterval(o.interval)},this.type={mediaType:e.type.mediaType,playerType:e.type.playerType,cbConfig:e.type.cbConfig},this.player=null,this.selector=e.selector,this.interval=null,this.enablePause=e.enablePause,this.AdsIconIns=new t({selector:this.selector}),this.data=e.data}}();window.ShoppableAds=function(e){return new o(e)}}();