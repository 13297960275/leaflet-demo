/* 2018-3-10 12:34:16 | 版权所有 合肥火星科技有限公司 http://www.marsgis.cn  【联系我们QQ：516584683，微信：marsgis】 */
ace.define("ace/snippets",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/anchor","ace/keyboard/hash_handler","ace/tokenizer","ace/lib/dom","ace/editor"],function(e,s,t){"use strict";var i=e("./lib/oop"),n=e("./lib/event_emitter").EventEmitter,h=e("./lib/lang"),l=e("./range").Range,o=e("./anchor").Anchor,r=e("./keyboard/hash_handler").HashHandler,a=e("./tokenizer").Tokenizer,p=l.comparePoints,c=function(){this.snippetMap={},this.snippetNameMap={}};(function(){i.implement(this,n),this.getTokenizer=function(){function o(e,t,i){return e=e.substr(1),/^\d+$/.test(e)&&!i.inFormatString?[{tabstopId:parseInt(e,10)}]:[{text:e}]}function e(e){return"(?:[^\\\\"+e+"]|\\\\.)"}return c.$tokenizer=new a({start:[{regex:/:/,onMatch:function(e,t,i){return i.length&&i[0].expectIf?(i[0].expectIf=!1,i[0].elseBranch=i[0],[i[0]]):":"}},{regex:/\\./,onMatch:function(e,t,i){var n=e[1];return"}"==n&&i.length?e=n:-1!="`$\\".indexOf(n)?e=n:i.inFormatString&&("n"==n?e="\n":"t"==n?e="\n":-1!="ulULE".indexOf(n)&&(e={changeCase:n,local:"a"<n})),[e]}},{regex:/}/,onMatch:function(e,t,i){return[i.length?i.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:o},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(e,t,i){var n=o(e.substr(1),0,i);return i.unshift(n[0]),n},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+e("\\|")+"*\\|",onMatch:function(e,t,i){i[0].choices=e.slice(1,-1).split(",")},next:"start"},{regex:"/("+e("/")+"+)/(?:("+e("/")+"*)/)(\\w*):?",onMatch:function(e,t,i){var n=i[0];return n.fmtString=e,e=this.splitRegex.exec(e),n.guard=e[1],n.fmt=e[2],n.flag=e[3],""},next:"start"},{regex:"`"+e("`")+"*`",onMatch:function(e,t,i){return i[0].code=e.splice(1,-1),""},next:"start"},{regex:"\\?",onMatch:function(e,t,i){i[0]&&(i[0].expectIf=!0)},next:"start"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:"/("+e("/")+"+)/",token:"regex"},{regex:"",onMatch:function(e,t,i){i.inFormatString=!0},next:"start"}]}),c.prototype.getTokenizer=function(){return c.$tokenizer},c.$tokenizer},this.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map(function(e){return e.value||e})},this.$getDefaultValue=function(e,t){if(/^[A-Z]\d+$/.test(t)){var i=t.substr(1);return(this.variables[t[0]+"__"]||{})[i]}if(/^\d+$/.test(t))return(this.variables.__||{})[t];if(t=t.replace(/^TM_/,""),e){var n=e.session;switch(t){case"CURRENT_WORD":var o=n.getWordRange();case"SELECTION":case"SELECTED_TEXT":return n.getTextRange(o);case"CURRENT_LINE":return n.getLine(e.getCursorPosition().row);case"PREV_LINE":return n.getLine(e.getCursorPosition().row-1);case"LINE_INDEX":return e.getCursorPosition().column;case"LINE_NUMBER":return e.getCursorPosition().row+1;case"SOFT_TABS":return n.getUseSoftTabs()?"YES":"NO";case"TAB_SIZE":return n.getTabSize();case"FILENAME":case"FILEPATH":return"";case"FULLNAME":return"Ace"}}},this.variables={},this.getVariableValue=function(e,t){return this.variables.hasOwnProperty(t)?this.variables[t](e,t)||"":this.$getDefaultValue(e,t)||""},this.tmStrFormat=function(e,t,r){var i=t.flag||"",n=t.guard;n=new RegExp(n,i.replace(/[^gi]/,""));var s=this.tokenizeTmSnippet(t.fmt,"formatString"),a=this,o=e.replace(n,function(){a.variables.__=arguments;for(var e=a.resolveVariables(s,r),t="E",i=0;i<e.length;i++){var n=e[i];if("object"==typeof n)if(e[i]="",n.changeCase&&n.local){var o=e[i+1];o&&"string"==typeof o&&("u"==n.changeCase?e[i]=o[0].toUpperCase():e[i]=o[0].toLowerCase(),e[i+1]=o.substr(1))}else n.changeCase&&(t=n.changeCase);else"U"==t?e[i]=n.toUpperCase():"L"==t&&(e[i]=n.toLowerCase())}return e.join("")});return this.variables.__=null,o},this.resolveVariables=function(i,e){for(var t=[],n=0;n<i.length;n++){var o=i[n];if("string"==typeof o)t.push(o);else{if("object"!=typeof o)continue;if(o.skip)s(o);else{if(o.processed<n)continue;if(o.text){var r=this.getVariableValue(e,o.text);r&&o.fmtString&&(r=this.tmStrFormat(r,o)),o.processed=n,null==o.expectIf?r&&(t.push(r),s(o)):r?o.skip=o.elseBranch:s(o)}else null!=o.tabstopId?t.push(o):null!=o.changeCase&&t.push(o)}}}function s(e){var t=i.indexOf(e,n+1);-1!=t&&(n=t)}return t},this.insertSnippetForSelection=function(e,t){var i=e.getCursorPosition(),n=e.session.getLine(i.row),o=e.session.getTabString(),r=n.match(/^\s*/)[0];i.column<r.length&&(r=r.slice(0,i.column));var s=this.tokenizeTmSnippet(t);s=(s=this.resolveVariables(s,e)).map(function(e){return"\n"==e?e+r:"string"==typeof e?e.replace(/\t/g,o):e});var a=[];s.forEach(function(e,t){if("object"==typeof e){var i=e.tabstopId,n=a[i];if(n||((n=a[i]=[]).index=i,n.value=""),-1===n.indexOf(e)){n.push(e);var o=s.indexOf(e,t+1);if(-1!==o){var r=s.slice(t+1,o);r.some(function(e){return"object"==typeof e})&&!n.value?n.value=r:!r.length||n.value&&"string"==typeof n.value||(n.value=r.join(""))}}}}),a.forEach(function(e){e.length=0});var c={};function h(e){for(var t=[],i=0;i<e.length;i++){var n=e[i];if("object"==typeof n){if(c[n.tabstopId])continue;n=t[e.lastIndexOf(n,i-1)]||{tabstopId:n.tabstopId}}t[i]=n}return t}for(var l=0;l<s.length;l++){var p=s[l];if("object"==typeof p){var u=p.tabstopId,d=s.indexOf(p,l+1);if(c[u])c[u]===p&&(c[u]=null);else{var g=a[u],f="string"==typeof g.value?[g.value]:h(g.value);f.unshift(l+1,Math.max(0,d-l)),f.push(p),c[u]=p,s.splice.apply(s,f),-1===g.indexOf(p)&&g.push(p)}}}var m=0,b=0,v="";s.forEach(function(e){"string"==typeof e?("\n"===e[0]?(b=e.length-1,m++):b+=e.length,v+=e):e.start?e.end={row:m,column:b}:e.start={row:m,column:b}});var x=e.getSelectionRange(),w=e.session.replace(x,v),T=new S(e),y=e.inVirtualSelectionMode&&e.selection.index;T.addTabstops(a,x.start,w,y)},this.insertSnippet=function(e,t){var i=this;if(e.inVirtualSelectionMode)return i.insertSnippetForSelection(e,t);e.forEachSelection(function(){i.insertSnippetForSelection(e,t)},null,{keepOrder:!0}),e.tabstopManager&&e.tabstopManager.tabNext()},this.$getScope=function(e){var t=e.session.$mode.$id||"";if("html"===(t=t.split("/").pop())||"php"===t){"php"!==t||e.session.$mode.inlinePhp||(t="html");var i=e.getCursorPosition(),n=e.session.getState(i.row);"object"==typeof n&&(n=n[0]),n.substring&&("js-"==n.substring(0,3)?t="javascript":"css-"==n.substring(0,4)?t="css":"php-"==n.substring(0,4)&&(t="php"))}return t},this.getActiveScopes=function(e){var t=this.$getScope(e),i=[t],n=this.snippetMap;return n[t]&&n[t].includeScopes&&i.push.apply(i,n[t].includeScopes),i.push("_"),i},this.expandWithTab=function(e,t){var i=this,n=e.forEachSelection(function(){return i.expandSnippetForSelection(e,t)},null,{keepOrder:!0});return n&&e.tabstopManager&&e.tabstopManager.tabNext(),n},this.expandSnippetForSelection=function(e,t){var i,n=e.getCursorPosition(),o=e.session.getLine(n.row),r=o.substring(0,n.column),s=o.substr(n.column),a=this.snippetMap;return this.getActiveScopes(e).some(function(e){var t=a[e];return t&&(i=this.findMatchingSnippet(t,r,s)),!!i},this),!!i&&(t&&t.dryRun||(e.session.doc.removeInLine(n.row,n.column-i.replaceBefore.length,n.column+i.replaceAfter.length),this.variables.M__=i.matchBefore,this.variables.T__=i.matchAfter,this.insertSnippetForSelection(e,i.content),this.variables.M__=this.variables.T__=null),!0)},this.findMatchingSnippet=function(e,t,i){for(var n=e.length;n--;){var o=e[n];if((!o.startRe||o.startRe.test(t))&&((!o.endRe||o.endRe.test(i))&&(o.startRe||o.endRe)))return o.matchBefore=o.startRe?o.startRe.exec(t):[""],o.matchAfter=o.endRe?o.endRe.exec(i):[""],o.replaceBefore=o.triggerRe?o.triggerRe.exec(t)[0]:"",o.replaceAfter=o.endTriggerRe?o.endTriggerRe.exec(i)[0]:"",o}},this.snippetMap={},this.snippetNameMap={},this.register=function(e,n){var o=this.snippetMap,r=this.snippetNameMap,s=this;function a(e){return e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e)&&(e="(?:"+e+")"),e||""}function c(e,t,i){return e=a(e),t=a(t),i?(e=t+e)&&"$"!=e[e.length-1]&&(e+="$"):(e+=t)&&"^"!=e[0]&&(e="^"+e),new RegExp(e)}function t(e){e.scope||(e.scope=n||"_"),n=e.scope,o[n]||(o[n]=[],r[n]={});var t=r[n];if(e.name){var i=t[e.name];i&&s.unregister(i),t[e.name]=e}o[n].push(e),e.tabTrigger&&!e.trigger&&(!e.guard&&/^\w/.test(e.tabTrigger)&&(e.guard="\\b"),e.trigger=h.escapeRegExp(e.tabTrigger)),(e.trigger||e.guard||e.endTrigger||e.endGuard)&&(e.startRe=c(e.trigger,e.guard,!0),e.triggerRe=new RegExp(e.trigger,"",!0),e.endRe=c(e.endTrigger,e.endGuard,!0),e.endTriggerRe=new RegExp(e.endTrigger,"",!0))}e||(e=[]),e&&e.content?t(e):Array.isArray(e)&&e.forEach(t),this._signal("registerSnippets",{scope:n})},this.unregister=function(e,o){var r=this.snippetMap,s=this.snippetNameMap;function t(e){var t=s[e.scope||o];if(t&&t[e.name]){delete t[e.name];var i=r[e.scope||o],n=i&&i.indexOf(e);0<=n&&i.splice(n,1)}}e.content?t(e):Array.isArray(e)&&e.forEach(t)},this.parseSnippetFile=function(e){e=e.replace(/\r/g,"");for(var t,i=[],n={},o=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;t=o.exec(e);){if(t[1])try{n=JSON.parse(t[1]),i.push(n)}catch(e){}if(t[4])n.content=t[4].replace(/^\t/gm,""),i.push(n),n={};else{var r=t[2],s=t[3];if("regex"==r){var a=/\/((?:[^\/\\]|\\.)*)|$/g;n.guard=a.exec(s)[1],n.trigger=a.exec(s)[1],n.endTrigger=a.exec(s)[1],n.endGuard=a.exec(s)[1]}else"snippet"==r?(n.tabTrigger=s.match(/^\S*/)[0],n.name||(n.name=s)):n[r]=s}}return i},this.getSnippetByName=function(i,e){var n,o=this.snippetNameMap;return this.getActiveScopes(e).some(function(e){var t=o[e];return t&&(n=t[i]),!!n},this),n}}).call(c.prototype);var S=function(e){if(e.tabstopManager)return e.tabstopManager;(e.tabstopManager=this).$onChange=this.onChange.bind(this),this.$onChangeSelection=h.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(e)};(function(){this.attach=function(e){this.index=0,this.ranges=[],this.tabstops=[],this.$openTabstops=null,this.selectedTabstop=null,this.editor=e,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges=null,this.tabstops=null,this.selectedTabstop=null,this.editor.removeListener("change",this.$onChange),this.editor.removeListener("changeSelection",this.$onChangeSelection),this.editor.removeListener("changeSession",this.$onChangeSession),this.editor.commands.removeListener("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.editor=null},this.onChange=function(e){var t="r"==e.action[0],i=e.start,n=e.end,o=i.row,r=n.row-o,s=n.column-i.column;if(t&&(r=-r,s=-s),!this.$inChange&&t){var a=this.selectedTabstop;if(a&&!a.some(function(e){return p(e.start,i)<=0&&0<=p(e.end,n)}))return this.detach()}for(var c=this.ranges,h=0;h<c.length;h++){var l=c[h];l.end.row<i.row||(t&&p(i,l.start)<0&&0<p(n,l.end)?(this.removeRange(l),h--):(l.start.row==o&&l.start.column>i.column&&(l.start.column+=s),l.end.row==o&&l.end.column>=i.column&&(l.end.column+=s),l.start.row>=o&&(l.start.row+=r),l.end.row>=o&&(l.end.row+=r),0<p(l.start,l.end)&&this.removeRange(l)))}c.length||this.detach()},this.updateLinkedFields=function(){var e=this.selectedTabstop;if(e&&e.hasLinkedRanges){this.$inChange=!0;for(var t=this.editor.session,i=t.getTextRange(e.firstNonLinked),n=e.length;n--;){var o=e[n];if(o.linked){var r=s.snippetManager.tmStrFormat(i,o.original);t.replace(o,r)}}this.$inChange=!1}},this.onAfterExec=function(e){e.command&&!e.command.readOnly&&this.updateLinkedFields()},this.onChangeSelection=function(){if(this.editor){for(var e=this.editor.selection.lead,t=this.editor.selection.anchor,i=this.editor.selection.isEmpty(),n=this.ranges.length;n--;)if(!this.ranges[n].linked){var o=this.ranges[n].contains(e.row,e.column),r=i||this.ranges[n].contains(t.row,t.column);if(o&&r)return}this.detach()}},this.onChangeSession=function(){this.detach()},this.tabNext=function(e){var t=this.tabstops.length,i=this.index+(e||1);(i=Math.min(Math.max(i,1),t))==t&&(i=0),this.selectTabstop(i),0===i&&this.detach()},this.selectTabstop=function(e){this.$openTabstops=null;var t=this.tabstops[this.index];if(t&&this.addTabstopMarkers(t),this.index=e,(t=this.tabstops[this.index])&&t.length){if(this.selectedTabstop=t,this.editor.inVirtualSelectionMode)this.editor.selection.setRange(t.firstNonLinked);else{var i=this.editor.multiSelect;i.toSingleRange(t.firstNonLinked.clone());for(var n=t.length;n--;)t.hasLinkedRanges&&t[n].linked||i.addRange(t[n].clone(),!0);i.ranges[0]&&i.addRange(i.ranges[0].clone())}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)}},this.addTabstops=function(e,s,t){if(this.$openTabstops||(this.$openTabstops=[]),!e[0]){var i=l.fromPoints(t,t);g(i.start,s),g(i.end,s),e[0]=[i],e[0].index=0}var a=[this.index+1,0],c=this.ranges;e.forEach(function(e,t){for(var i=this.$openTabstops[t]||e,n=e.length;n--;){var o=e[n],r=l.fromPoints(o.start,o.end||o.start);d(r.start,s),d(r.end,s),r.original=o,r.tabstop=i,c.push(r),i!=e?i.unshift(r):i[n]=r,o.fmtString?(r.linked=!0,i.hasLinkedRanges=!0):i.firstNonLinked||(i.firstNonLinked=r)}i.firstNonLinked||(i.hasLinkedRanges=!1),i===e&&(a.push(i),this.$openTabstops[t]=i),this.addTabstopMarkers(i)},this),2<a.length&&(this.tabstops.length&&a.push(a.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,a))},this.addTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){e.markerId||(e.markerId=t.addMarker(e,"ace_snippet-marker","text"))})},this.removeTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){t.removeMarker(e.markerId),e.markerId=null})},this.removeRange=function(e){var t=e.tabstop.indexOf(e);e.tabstop.splice(t,1),t=this.ranges.indexOf(e),this.ranges.splice(t,1),this.editor.session.removeMarker(e.markerId),e.tabstop.length||(-1!=(t=this.tabstops.indexOf(e.tabstop))&&this.tabstops.splice(t,1),this.tabstops.length||this.detach())},this.keyboardHandler=new r,this.keyboardHandler.bindKeys({Tab:function(e){s.snippetManager&&s.snippetManager.expandWithTab(e)||e.tabstopManager.tabNext(1)},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1)},Esc:function(e){e.tabstopManager.detach()},Return:function(e){return!1}})}).call(S.prototype);var u={};u.onChange=o.prototype.onChange,u.setPosition=function(e,t){this.pos.row=e,this.pos.column=t},u.update=function(e,t,i){this.$insertRight=i,this.pos=e,this.onChange(t)};var d=function(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row},g=function(e,t){e.row==t.row&&(e.column-=t.column),e.row-=t.row};e("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}"),s.snippetManager=new c;var f=e("./editor").Editor;(function(){this.insertSnippet=function(e,t){return s.snippetManager.insertSnippet(this,e,t)},this.expandSnippet=function(e){return s.snippetManager.expandWithTab(this,e)}}).call(f.prototype)}),ace.define("ace/autocomplete/popup",["require","exports","module","ace/virtual_renderer","ace/editor","ace/range","ace/lib/event","ace/lib/lang","ace/lib/dom"],function(e,t,i){"use strict";var n=e("../virtual_renderer").VirtualRenderer,o=e("../editor").Editor,c=e("../range").Range,h=e("../lib/event"),u=e("../lib/lang"),d=e("../lib/dom"),g=function(e){var t=new n(e);t.$maxLines=4;var i=new o(t);return i.setHighlightActiveLine(!1),i.setShowPrintMargin(!1),i.renderer.setShowGutter(!1),i.renderer.setHighlightGutterLine(!1),i.$mouseHandler.$focusWaitTimout=0,i.$highlightTagPending=!0,i};d.importCssString(".ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {    background-color: #CAD6FA;    z-index: 1;}.ace_editor.ace_autocomplete .ace_line-hover {    border: 1px solid #abbffe;    margin-top: -1px;    background: rgba(233,233,253,0.4);}.ace_editor.ace_autocomplete .ace_line-hover {    position: absolute;    z-index: 2;}.ace_editor.ace_autocomplete .ace_scroller {   background: none;   border: none;   box-shadow: none;}.ace_rightAlignedText {    color: gray;    display: inline-block;    position: absolute;    right: 4px;    text-align: right;    z-index: -1;}.ace_editor.ace_autocomplete .ace_completion-highlight{    color: #000;    text-shadow: 0 0 0.01em;}.ace_editor.ace_autocomplete {    width: 280px;    z-index: 200000;    background: #fbfbfb;    color: #444;    border: 1px lightgray solid;    position: fixed;    box-shadow: 2px 3px 5px rgba(0,0,0,.2);    line-height: 1.4;}"),t.AcePopup=function(e){var t=d.createElement("div"),l=new g(t);e&&e.appendChild(t),t.style.display="none",l.renderer.content.style.cursor="default",l.renderer.setStyle("ace_autocomplete"),l.setOption("displayIndentGuides",!1),l.setOption("dragDelay",150);var p,i=function(){};l.focus=i,l.$isFocused=!0,l.renderer.$cursorLayer.restartTimer=i,l.renderer.$cursorLayer.element.style.opacity=0,l.renderer.$maxLines=8,l.renderer.$keepTextAreaAtCursor=!1,l.setHighlightActiveLine(!1),l.session.highlight(""),l.session.$searchHighlight.clazz="ace_highlight-marker",l.on("mousedown",function(e){var t=e.getDocumentPosition();l.selection.moveToPosition(t),o.start.row=o.end.row=t.row,e.stop()});var n=new c(-1,0,-1,1/0),o=new c(-1,0,-1,1/0);o.id=l.session.addMarker(o,"ace_active-line","fullLine"),l.setSelectOnHover=function(e){e?n.id&&(l.session.removeMarker(n.id),n.id=null):n.id=l.session.addMarker(n,"ace_line-hover","fullLine")},l.setSelectOnHover(!1),l.on("mousemove",function(e){if(p){if(p.x!=e.x||p.y!=e.y){(p=e).scrollTop=l.renderer.scrollTop;var t=p.getDocumentPosition().row;n.start.row!=t&&(n.id||l.setRow(t),s(t))}}else p=e}),l.renderer.on("beforeRender",function(){if(p&&-1!=n.start.row){p.$pos=null;var e=p.getDocumentPosition().row;n.id||l.setRow(e),s(e,!0)}}),l.renderer.on("afterRender",function(){var e=l.getRow(),t=l.renderer.$textLayer,i=t.element.childNodes[e-t.config.firstRow];i!=t.selectedNode&&(t.selectedNode&&d.removeCssClass(t.selectedNode,"ace_selected"),(t.selectedNode=i)&&d.addCssClass(i,"ace_selected"))});var r=function(){s(-1)},s=function(e,t){e!==n.start.row&&(n.start.row=n.end.row=e,t||l.session._emit("changeBackMarker"),l._emit("changeHoverMarker"))};l.getHoveredRow=function(){return n.start.row},h.addListener(l.container,"mouseout",r),l.on("hide",r),l.on("changeSelection",r),l.session.doc.getLength=function(){return l.data.length},l.session.doc.getLine=function(e){var t=l.data[e];return"string"==typeof t?t:t&&t.value||""};var a=l.session.bgTokenizer;return a.$tokenizeRow=function(e){var t=l.data[e],i=[];if(!t)return i;"string"==typeof t&&(t={value:t}),t.caption||(t.caption=t.value||t.name);for(var n,o,r=-1,s=0;s<t.caption.length;s++)o=t.caption[s],r!==(n=t.matchMask&1<<s?1:0)?(i.push({type:t.className||(n?"completion-highlight":""),value:o}),r=n):i[i.length-1].value+=o;if(t.meta){var a=l.renderer.$size.scrollerWidth/l.renderer.layerConfig.characterWidth,c=t.meta;c.length+t.caption.length>a-2&&(c=c.substr(0,a-t.caption.length-3)+"…"),i.push({type:"rightAlignedText",value:c})}return i},a.$updateOnChange=i,a.start=i,l.session.$computeWidth=function(){return this.screenWidth=0},l.$blockScrolling=1/0,l.isOpen=!1,l.isTopdown=!1,l.data=[],l.setData=function(e){l.setValue(u.stringRepeat("\n",e.length),-1),l.data=e||[],l.setRow(0)},l.getData=function(e){return l.data[e]},l.getRow=function(){return o.start.row},l.setRow=function(e){e=Math.max(0,Math.min(this.data.length,e)),o.start.row!=e&&(l.selection.clearSelection(),o.start.row=o.end.row=e||0,l.session._emit("changeBackMarker"),l.moveCursorTo(e||0,0),l.isOpen&&l._signal("select"))},l.on("changeSelection",function(){l.isOpen&&l.setRow(l.selection.lead.row),l.renderer.scrollCursorIntoView()}),l.hide=function(){this.container.style.display="none",this._signal("hide"),l.isOpen=!1},l.show=function(e,t,i){var n=this.container,o=window.innerHeight,r=window.innerWidth,s=this.renderer,a=s.$maxLines*t*1.4,c=e.top+this.$borderSize;o/2<c&&!i&&o<c+t+a?(s.$maxPixelHeight=c-2*this.$borderSize,n.style.top="",n.style.bottom=o-c+"px",l.isTopdown=!1):(c+=t,s.$maxPixelHeight=o-c-.2*t,n.style.top=c+"px",n.style.bottom="",l.isTopdown=!0),n.style.display="",this.renderer.$textLayer.checkForSizeChanges();var h=e.left;h+n.offsetWidth>r&&(h=r-n.offsetWidth),n.style.left=h+"px",this._signal("show"),p=null,l.isOpen=!0},l.getTextLeftOffset=function(){return this.$borderSize+this.renderer.$padding+this.$imageSize},l.$imageSize=0,l.$borderSize=1,l}}),ace.define("ace/autocomplete/util",["require","exports","module"],function(e,t,i){"use strict";t.parForEach=function(e,t,i){var n=0,o=e.length;0===o&&i();for(var r=0;r<o;r++)t(e[r],function(e,t){++n===o&&i(e,t)})};var r=/[a-zA-Z_0-9\$\-\u00A2-\uFFFF]/;t.retrievePrecedingIdentifier=function(e,t,i){i=i||r;for(var n=[],o=t-1;0<=o&&i.test(e[o]);o--)n.push(e[o]);return n.reverse().join("")},t.retrieveFollowingIdentifier=function(e,t,i){i=i||r;for(var n=[],o=t;o<e.length&&i.test(e[o]);o++)n.push(e[o]);return n},t.getCompletionPrefix=function(e){var t,i=e.getCursorPosition(),n=e.session.getLine(i.row);return e.completers.forEach(function(e){e.identifierRegexps&&e.identifierRegexps.forEach(function(e){!t&&e&&(t=this.retrievePrecedingIdentifier(n,i.column,e))}.bind(this))}.bind(this)),t||this.retrievePrecedingIdentifier(n,i.column)}}),ace.define("ace/autocomplete",["require","exports","module","ace/keyboard/hash_handler","ace/autocomplete/popup","ace/autocomplete/util","ace/lib/event","ace/lib/lang","ace/lib/dom","ace/snippets"],function(e,t,i){"use strict";var n=e("./keyboard/hash_handler").HashHandler,o=e("./autocomplete/popup").AcePopup,h=e("./autocomplete/util"),r=(e("./lib/event"),e("./lib/lang")),s=e("./lib/dom"),a=e("./snippets").snippetManager,c=function(){this.autoInsert=!1,this.autoSelect=!0,this.exactMatch=!1,this.gatherCompletionsId=0,this.keyboardHandler=new n,this.keyboardHandler.bindKeys(this.commands),this.blurListener=this.blurListener.bind(this),this.changeListener=this.changeListener.bind(this),this.mousedownListener=this.mousedownListener.bind(this),this.mousewheelListener=this.mousewheelListener.bind(this),this.changeTimer=r.delayedCall(function(){this.updateCompletions(!0)}.bind(this)),this.tooltipTimer=r.delayedCall(this.updateDocTooltip.bind(this),50)};(function(){this.$init=function(){return this.popup=new o(document.body||document.documentElement),this.popup.on("click",function(e){this.insertMatch(),e.stop()}.bind(this)),this.popup.focus=this.editor.focus.bind(this.editor),this.popup.on("show",this.tooltipTimer.bind(null,null)),this.popup.on("select",this.tooltipTimer.bind(null,null)),this.popup.on("changeHoverMarker",this.tooltipTimer.bind(null,null)),this.popup},this.getPopup=function(){return this.popup||this.$init()},this.openPopup=function(e,t,i){this.popup||this.$init(),this.popup.setData(this.completions.filtered),e.keyBinding.addKeyboardHandler(this.keyboardHandler);var n=e.renderer;if(this.popup.setRow(this.autoSelect?0:-1),i)i&&!t&&this.detach();else{this.popup.setTheme(e.getTheme()),this.popup.setFontSize(e.getFontSize());var o=n.layerConfig.lineHeight,r=n.$cursorLayer.getPixelPosition(this.base,!0);r.left-=this.popup.getTextLeftOffset();var s=e.container.getBoundingClientRect();r.top+=s.top-n.layerConfig.offset,r.left+=s.left-e.renderer.scrollLeft,r.left+=n.gutterWidth,this.popup.show(r,o)}},this.detach=function(){this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.off("changeSelection",this.changeListener),this.editor.off("blur",this.blurListener),this.editor.off("mousedown",this.mousedownListener),this.editor.off("mousewheel",this.mousewheelListener),this.changeTimer.cancel(),this.hideDocTooltip(),this.gatherCompletionsId+=1,this.popup&&this.popup.isOpen&&this.popup.hide(),this.base&&this.base.detach(),this.activated=!1,this.completions=this.base=null},this.changeListener=function(e){var t=this.editor.selection.lead;(t.row!=this.base.row||t.column<this.base.column)&&this.detach(),this.activated?this.changeTimer.schedule():this.detach()},this.blurListener=function(e){var t=document.activeElement,i=this.editor.textInput.getElement(),n=e.relatedTarget&&e.relatedTarget==this.tooltipNode,o=this.popup&&this.popup.container;t==i||t.parentNode==o||n||t==this.tooltipNode||e.relatedTarget==i||this.detach()},this.mousedownListener=function(e){this.detach()},this.mousewheelListener=function(e){this.detach()},this.goTo=function(e){var t=this.popup.getRow(),i=this.popup.session.getLength()-1;switch(e){case"up":t=t<=0?i:t-1;break;case"down":t=i<=t?-1:t+1;break;case"start":t=0;break;case"end":t=i}this.popup.setRow(t)},this.insertMatch=function(e,t){if(e||(e=this.popup.getData(this.popup.getRow())),!e)return!1;if(e.completer&&e.completer.insertMatch)e.completer.insertMatch(this.editor,e);else{if(this.completions.filterText)for(var i,n=this.editor.selection.getAllRanges(),o=0;i=n[o];o++)i.start.column-=this.completions.filterText.length,this.editor.session.remove(i);e.snippet?a.insertSnippet(this.editor,e.snippet):this.editor.execCommand("insertstring",e.value||e)}this.detach()},this.commands={Up:function(e){e.completer.goTo("up")},Down:function(e){e.completer.goTo("down")},"Ctrl-Up|Ctrl-Home":function(e){e.completer.goTo("start")},"Ctrl-Down|Ctrl-End":function(e){e.completer.goTo("end")},Esc:function(e){e.completer.detach()},Return:function(e){return e.completer.insertMatch()},"Shift-Return":function(e){e.completer.insertMatch(null,{deleteSuffix:!0})},Tab:function(e){var t=e.completer.insertMatch();if(t||e.tabstopManager)return t;e.completer.goTo("down")},PageUp:function(e){e.completer.popup.gotoPageUp()},PageDown:function(e){e.completer.popup.gotoPageDown()}},this.gatherCompletions=function(n,o){var r=n.getSession(),i=n.getCursorPosition(),s=(r.getLine(i.row),h.getCompletionPrefix(n));this.base=r.doc.createAnchor(i.row,i.column-s.length),this.base.$insertRight=!0;var a=[],c=n.completers.length;return n.completers.forEach(function(e,t){e.getCompletions(n,r,i,s,function(e,t){!e&&t&&(a=a.concat(t));var i=n.getCursorPosition();r.getLine(i.row);o(null,{prefix:s,matches:a,finished:0==--c})})}),!0},this.showPopup=function(e){this.editor&&this.detach(),this.activated=!0,(this.editor=e).completer!=this&&(e.completer&&e.completer.detach(),e.completer=this),e.on("changeSelection",this.changeListener),e.on("blur",this.blurListener),e.on("mousedown",this.mousedownListener),e.on("mousewheel",this.mousewheelListener),this.updateCompletions()},this.updateCompletions=function(s){if(s&&this.base&&this.completions){var e=this.editor.getCursorPosition(),t=this.editor.session.getTextRange({start:this.base,end:e});if(t==this.completions.filterText)return;return this.completions.setFilter(t),this.completions.filtered.length?1!=this.completions.filtered.length||this.completions.filtered[0].value!=t||this.completions.filtered[0].snippet?void this.openPopup(this.editor,t,s):this.detach():this.detach()}var a=this.gatherCompletionsId;this.gatherCompletions(this.editor,function(e,t){var i=function(){if(t.finished)return this.detach()}.bind(this),n=t.prefix,o=t&&t.matches;if(!o||!o.length)return i();if(0===n.indexOf(t.prefix)&&a==this.gatherCompletionsId){this.completions=new l(o),this.exactMatch&&(this.completions.exactMatch=!0),this.completions.setFilter(n);var r=this.completions.filtered;return r.length&&(1!=r.length||r[0].value!=n||r[0].snippet)?this.autoInsert&&1==r.length&&t.finished?this.insertMatch(r[0]):void this.openPopup(this.editor,n,s):i()}}.bind(this))},this.cancelContextMenu=function(){this.editor.$mouseHandler.cancelContextMenu()},this.updateDocTooltip=function(){var e=this.popup,t=e.data,i=t&&(t[e.getHoveredRow()]||t[e.getRow()]),n=null;return i&&this.editor&&this.popup.isOpen?(this.editor.completers.some(function(e){return e.getDocTooltip&&(n=e.getDocTooltip(i)),n}),n||(n=i),"string"==typeof n&&(n={docText:n}),n&&(n.docHTML||n.docText)?void this.showDocTooltip(n):this.hideDocTooltip()):this.hideDocTooltip()},this.showDocTooltip=function(e){this.tooltipNode||(this.tooltipNode=s.createElement("div"),this.tooltipNode.className="ace_tooltip ace_doc-tooltip",this.tooltipNode.style.margin=0,this.tooltipNode.style.pointerEvents="auto",this.tooltipNode.tabIndex=-1,this.tooltipNode.onblur=this.blurListener.bind(this));var t=this.tooltipNode;e.docHTML?t.innerHTML=e.docHTML:e.docText&&(t.textContent=e.docText),t.parentNode||document.body.appendChild(t);var i=this.popup,n=i.container.getBoundingClientRect();t.style.top=i.container.style.top,t.style.bottom=i.container.style.bottom,window.innerWidth-n.right<320?(t.style.right=window.innerWidth-n.left+"px",t.style.left=""):(t.style.left=n.right+1+"px",t.style.right=""),t.style.display="block"},this.hideDocTooltip=function(){if(this.tooltipTimer.cancel(),this.tooltipNode){var e=this.tooltipNode;this.editor.isFocused()||document.activeElement!=e||this.editor.focus(),this.tooltipNode=null,e.parentNode&&e.parentNode.removeChild(e)}}}).call(c.prototype),c.startCommand={name:"startAutocomplete",exec:function(e){e.completer||(e.completer=new c),e.completer.autoInsert=!1,e.completer.autoSelect=!0,e.completer.showPopup(e),e.completer.cancelContextMenu()},bindKey:"Ctrl-Space|Ctrl-Shift-Space|Alt-Space"};var l=function(e,t){this.all=e,this.filtered=e,this.filterText=t||"",this.exactMatch=!1};(function(){this.setFilter=function(e){if(e.length>this.filterText&&0===e.lastIndexOf(this.filterText,0))var t=this.filtered;else t=this.all;this.filterText=e,t=(t=this.filterCompletions(t,this.filterText)).sort(function(e,t){return t.exactMatch-e.exactMatch||t.score-e.score});var i=null;t=t.filter(function(e){var t=e.snippet||e.caption||e.value;return t!==i&&(i=t,!0)}),this.filtered=t},this.filterCompletions=function(e,t){var i=[],n=t.toUpperCase(),o=t.toLowerCase();e:for(var r,s=0;r=e[s];s++){var a=r.value||r.caption||r.snippet;if(a){var c,h,l=-1,p=0,u=0;if(this.exactMatch){if(t!==a.substr(0,t.length))continue e}else for(var d=0;d<t.length;d++){var g=a.indexOf(o[d],l+1),f=a.indexOf(n[d],l+1);if((c=0<=g&&(f<0||g<f)?g:f)<0)continue e;0<(h=c-l-1)&&(-1===l&&(u+=10),u+=h),p|=1<<c,l=c}r.matchMask=p,r.exactMatch=u?0:1,r.score=(r.score||0)-u,i.push(r)}}return i}}).call(l.prototype),t.Autocomplete=c,t.FilteredList=l}),ace.define("ace/autocomplete/text_completer",["require","exports","module","ace/range"],function(e,t,i){var n=e("../range").Range,c=/[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/;function s(e,t){var i,o=(i=t,e.getTextRange(n.fromPoints({row:0,column:0},i)).split(c).length-1),r=e.getValue().split(c),s=Object.create(null),a=r[o];return r.forEach(function(e,t){if(e&&e!==a){var i=Math.abs(o-t),n=r.length-i;s[e]?s[e]=Math.max(n,s[e]):s[e]=n}}),s}t.getCompletions=function(e,t,i,n,o){var r=s(t,i);o(null,Object.keys(r).map(function(e){return{caption:e,value:e,score:r[e],meta:"local"}}))}}),ace.define("ace/ext/language_tools",["require","exports","module","ace/snippets","ace/autocomplete","ace/config","ace/lib/lang","ace/autocomplete/util","ace/autocomplete/text_completer","ace/editor","ace/config"],function(e,t,i){"use strict";var a=e("../snippets").snippetManager,n=e("../autocomplete").Autocomplete,o=e("../config"),r=e("../lib/lang"),s=e("../autocomplete/util"),c=e("../autocomplete/text_completer"),h={getCompletions:function(e,t,i,n,o){if(t.$mode.completer)return t.$mode.completer.getCompletions(e,t,i,n,o);var r=e.session.getState(i.row);o(null,t.$mode.getCompletions(r,t,i,n))}},l={getCompletions:function(e,t,i,n,o){var r=a.snippetMap,s=[];a.getActiveScopes(e).forEach(function(e){for(var t=r[e]||[],i=t.length;i--;){var n=t[i],o=n.name||n.tabTrigger;o&&s.push({caption:o,snippet:n.content,meta:n.tabTrigger&&!n.name?n.tabTrigger+"⇥ ":"snippet",type:"snippet"})}},this),o(null,s)},getDocTooltip:function(e){"snippet"!=e.type||e.docHTML||(e.docHTML=["<b>",r.escapeHTML(e.caption),"</b>","<hr></hr>",r.escapeHTML(e.snippet)].join(""))}},p=[l,c,h];t.setCompleters=function(e){p.length=0,e&&p.push.apply(p,e)},t.addCompleter=function(e){p.push(e)},t.textCompleter=c,t.keyWordCompleter=h,t.snippetCompleter=l;var u={name:"expandSnippet",exec:function(e){return a.expandWithTab(e)},bindKey:"Tab"},d=function(e,t){g(t.session.$mode)},g=function(e){var t=e.$id;a.files||(a.files={}),f(t),e.modes&&e.modes.forEach(g)},f=function(t){if(t&&!a.files[t]){var e=t.replace("mode","snippets");a.files[t]={},o.loadModule(e,function(e){e&&(!(a.files[t]=e).snippets&&e.snippetText&&(e.snippets=a.parseSnippetFile(e.snippetText)),a.register(e.snippets||[],e.scope),e.includeScopes&&(a.snippetMap[e.scope].includeScopes=e.includeScopes,e.includeScopes.forEach(function(e){f("ace/mode/"+e)})))})}},m=function(e){var t=e.editor,i=t.completer&&t.completer.activated;if("backspace"===e.command.name)i&&!s.getCompletionPrefix(t)&&t.completer.detach();else if("insertstring"===e.command.name){s.getCompletionPrefix(t)&&!i&&(t.completer||(t.completer=new n),t.completer.autoInsert=!1,t.completer.showPopup(t))}},b=e("../editor").Editor;e("../config").defineOptions(b.prototype,"editor",{enableBasicAutocompletion:{set:function(e){e?(this.completers||(this.completers=Array.isArray(e)?e:p),this.commands.addCommand(n.startCommand)):this.commands.removeCommand(n.startCommand)},value:!1},enableLiveAutocompletion:{set:function(e){e?(this.completers||(this.completers=Array.isArray(e)?e:p),this.commands.on("afterExec",m)):this.commands.removeListener("afterExec",m)},value:!1},enableSnippets:{set:function(e){e?(this.commands.addCommand(u),this.on("changeMode",d),d(0,this)):(this.commands.removeCommand(u),this.off("changeMode",d))},value:!1}})}),ace.require(["ace/ext/language_tools"],function(){});