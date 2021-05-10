("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)})(["jquery"],function(D){return function(){var h,t,v,o,w=0,i="error",s="info",a="success",r="warning",e={clear:function(e,t){var n=O();h||C(n),l(e,n,t)||function(e){for(var t=h.children(),n=t.length-1;0<=n;n--)l(D(t[n]),e)}(n)},remove:function(e){var t=O();h||C(t),e&&0===D(":focus",e).length?b(e):h.children().length&&h.remove()},error:function(e,t,n){if(o!=e)return o=e,d({type:i,iconClass:O().iconClasses.error,message:e,optionsOverride:n,title:t})},getContainer:C,info:function(e,t,n){if(o!=e)return o=e,d({type:s,iconClass:O().iconClasses.info,message:e,optionsOverride:n,title:t})},options:{},subscribe:function(e){t=e},success:function(e,t,n){if(o!=e)return o=e,d({type:a,iconClass:O().iconClasses.success,message:e,optionsOverride:n,title:t})},version:"2.1.2",warning:function(e,t,n){if(o!=e)return o=e,d({type:r,iconClass:O().iconClasses.warning,message:e,optionsOverride:n,title:t})}};return e;function C(e,t){return e||(e=O()),(h=D("#"+e.containerId)).length||t&&(h=function(e){return(h=D("<div/>").attr("id",e.containerId).addClass(e.positionClass).attr("aria-live","polite").attr("role","alert")).appendTo(D(e.target)),h}(e)),h}function l(e,t,n){o=null;var i=!(!n||!n.force)&&n.force;return!(!e||!i&&0!==D(":focus",e).length||(e[t.hideMethod]({duration:t.hideDuration,easing:t.hideEasing,complete:function(){b(e)}}),0))}function T(e){t&&t(e)}function d(e){var o=O(),t=e.iconClass||o.iconClass;if(void 0!==e.optionsOverride&&(o=D.extend(o,e.optionsOverride),t=e.optionsOverride.iconClass||t),!function(e,t){if(e.preventDuplicates){if(t.message===v)return!0;v=t.message}return!1}(o,e)){w++,h=C(o,!0);var n=null,s=D("<div/>"),i=D("<div/>"),a=D("<div/>"),r=D("<div/>"),l=D(o.closeHtml),d={intervalId:null,hideEta:null,maxHideTime:null},c={toastId:w,state:"visible",startTime:new Date,options:o,map:e};return e.iconClass&&s.addClass(o.toastClass).addClass(t),e.title&&(i.append(o.escapeHtml?u(e.title):e.title).addClass(o.titleClass),s.append(i)),e.message&&(a.append(o.escapeHtml?u(e.message):e.message).addClass(o.messageClass),s.append(a)),o.closeButton&&(l.addClass("toast-close-button").attr("role","button"),s.prepend(l)),o.progressBar&&(r.addClass("toast-progress"),s.prepend(r)),o.newestOnTop?h.prepend(s):h.append(s),s.hide(),s[o.showMethod]({duration:o.showDuration,easing:o.showEasing,complete:o.onShown}),0<o.timeOut&&(n=setTimeout(p,o.timeOut),d.maxHideTime=parseFloat(o.timeOut),d.hideEta=(new Date).getTime()+d.maxHideTime,o.progressBar&&(d.intervalId=setInterval(f,10))),s.hover(g,m),!o.onclick&&o.tapToDismiss&&s.click(p),o.closeButton&&l&&l.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&!0!==e.cancelBubble&&(e.cancelBubble=!0),p(!0)}),o.onclick&&s.click(function(e){o.onclick(e),p()}),T(c),o.debug&&console&&console.log(c),s}function u(e){return null==e&&(e=""),new String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function p(e){var t=e&&!1!==o.closeMethod?o.closeMethod:o.hideMethod,n=e&&!1!==o.closeDuration?o.closeDuration:o.hideDuration,i=e&&!1!==o.closeEasing?o.closeEasing:o.hideEasing;if(!D(":focus",s).length||e)return clearTimeout(d.intervalId),s[t]({duration:n,easing:i,complete:function(){b(s),o.onHidden&&"hidden"!==c.state&&o.onHidden(),c.state="hidden",c.endTime=new Date,T(c)}})}function m(){(0<o.timeOut||0<o.extendedTimeOut)&&(n=setTimeout(p,o.extendedTimeOut),d.maxHideTime=parseFloat(o.extendedTimeOut),d.hideEta=(new Date).getTime()+d.maxHideTime)}function g(){clearTimeout(n),d.hideEta=0,s.stop(!0,!0)[o.showMethod]({duration:o.showDuration,easing:o.showEasing})}function f(){var e=(d.hideEta-(new Date).getTime())/d.maxHideTime*100;r.width(e+"%")}}function O(){return D.extend({},{closeButton:!0,tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,extendedTimeOut:3e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',newestOnTop:!0,preventDuplicates:!1,progressBar:!1},e.options)}function b(e){o=null,h||(h=C()),e.is(":visible")||(e.remove(),e=null,0===h.children().length&&(h.remove(),v=void 0))}}()});