L.widget.bindClass(L.widget.BaseWidget.extend({options:{resources:["map.css"],view:{type:"window",url:"view.html",windowOptions:{width:400,height:280}}},layerWork:null,create:function(){},viewWindow:null,winCreateOK:function(e,t){this.viewWindow=t},activate:function(){},disable:function(){this.layerWork&&(map.removeLayer(this.layerWork),this.layerWork=null),document.getElementById("legendContainer")&&$("#legendContainer").remove()},addLayer:function(e,t){if(this.isActivate){this.featureCollection=e,this.selectData=t,this.addLegend();var r=this;null==this.layerWork?(this.layerWork=L.geoJson(this.featureCollection,{style:function(e){return{weight:2,opacity:1,color:"white",fillOpacity:.7,fillColor:e.properties.color}},onEachFeature:function(e,t){var i=e.properties,o="<div><h5>"+i.name+"</h5><span>"+r.selectData.title+"&nbsp;:&nbsp;"+i.num+r.selectData.unit+"</span></div>";t.bindTooltip(o),t.on({mouseover:function(e){var t=e.target;t.setStyle({weight:3,color:"#666",fillOpacity:.7}),L.Browser.ie||L.Browser.opera||t.bringToFront(),r.viewWindow.showTip(t.feature.properties.shortname)},mouseout:function(e){var t=e.target;r.layerWork.resetStyle(t),r.viewWindow.hideTip(t.feature.properties.shortname)},click:function(e){map.fitBounds(e.target.getBounds())}})}}),map.addLayer(this.layerWork)):(this.layerWork.clearLayers(),this.layerWork.addData(this.featureCollection)),map.flyToBounds(this.layerWork.getBounds())}},showPolyTip:function(e){for(var t=this.layerWork.getLayers(),i=0;i<t.length;i++){var o=t[i];if(o.feature.properties.shortname==e){o.setStyle({weight:3,color:"#666",fillOpacity:.7}),o.openTooltip();break}}},hidePolyTip:function(e){for(var t=this.layerWork.getLayers(),i=0;i<t.length;i++){var o=t[i];if(o.feature.properties.shortname==e){this.layerWork.resetStyle(o),o.closeTooltip();break}}},addLegend:function(){var e=null;e=document.getElementById("legendContainer")?$("#legendContainer"):$('<div id="legendContainer" class="legend-container"></div>').appendTo($(document.body));var t="<div class='legend-title'>"+this.selectData.title+"("+this.selectData.unit+")</div>",i=this.selectData.span,o=this.viewWindow.colors,r=i.length;r>o.length&&(r=o.length);for(var n=0;n<=r;n++){var a=i[n];a=0==n?"小于"+i[n]:n==r?"大于"+i[n-1]:i[n-1]+"-"+i[n],t+="<div class='legend-item'><span class='legend-color' style='background:"+o[n]+"'></span><span class='legend-des'>"+a+"</span></div>"}$(e).html(t)}}));