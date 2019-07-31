L.widget.bindClass(L.widget.BaseWidget.extend({options:{resources:["map.css"],view:{type:"window",url:"view.html",windowOptions:{width:400,height:220}}},layerWork:null,create:function(){},viewWindow:null,winCreateOK:function(e,t){this.viewWindow=t},activate:function(){var t=this;$.getJSON(this.path+"config.json",function(e){if(t.isActivate){featureCollection={type:"FeatureCollection",features:e.features};t.initData(featureCollection,[{id:"430100",value:4987},{id:"430200",value:2455},{id:"430300",value:1235},{id:"430400",value:4532},{id:"430500",value:435},{id:"430600",value:1234},{id:"430700",value:1543},{id:"430800",value:2419},{id:"430900",value:1235},{id:"431000",value:1123},{id:"431100",value:214},{id:"431200",value:421},{id:"431300",value:200},{id:"433100",value:3653}])}})},colors:["#FFEDA0","#FED976","#FEB24C","#FD8D3C","#FC4E2A","#E31A1C","#BD0026","#800026"],getColor:function(e){var t=this.selectData.span,i=t.length+1;i>this.colors.length&&(i=this.colors.length);for(var a=0;a<i;a++)if(e<t[a])return this.colors[a];return this.colors[i-1]},selectData:{title:"风险源",unit:"个",span:[251,1095,1656,2417,2506,5235]},initData:function(e,t){for(var i=[],a=[],r=0;r<e.features.length;r++){for(var o=e.features[r],n=o.properties.num=0;n<t.length;n++)if(o.properties.id==t[n].id){var l=+Math.floor(Math.random()*this.selectData.span[0]);o.properties.num=t[n].value+l;break}o.properties.color=this.getColor(o.properties.num),i.push(o.properties.name),a.push(o.properties.num)}this.viewWindow.updateData(this.selectData,i,a),this.addLayer(e)},disable:function(){this.layerWork&&(map.removeLayer(this.layerWork),this.layerWork=null),document.getElementById("legendContainer")&&$("#legendContainer").remove()},addLayer:function(e){this.addLegend();var r=this;null==this.layerWork?(this.layerWork=L.geoJson(e,{style:function(e){return{weight:2,opacity:1,color:"white",fillOpacity:.7,fillColor:e.properties.color}},onEachFeature:function(e,t){var i=e.properties,a="<div><h5>"+i.name+"</h5><span>"+r.selectData.title+"&nbsp;:&nbsp;"+i.num+r.selectData.unit+"</span></div>";t.bindTooltip(a),t.on({mouseover:function(e){var t=e.target;t.setStyle({weight:3,color:"#666",fillOpacity:.7}),L.Browser.ie||L.Browser.opera||t.bringToFront(),r.viewWindow.showTip(t.feature.properties.name)},mouseout:function(e){var t=e.target;r.layerWork.resetStyle(t),r.viewWindow.hideTip(t.feature.properties.name)},click:function(e){map.fitBounds(e.target.getBounds())}})}}),map.addLayer(this.layerWork)):(this.layerWork.clearLayers(),this.layerWork.addData(e)),map.flyToBounds(this.layerWork.getBounds())},showPolyTip:function(e){for(var t=this.layerWork.getLayers(),i=0;i<t.length;i++){var a=t[i];if(a.feature.properties.name==e){a.setStyle({weight:3,color:"#666",fillOpacity:.7}),a.openTooltip();break}}},hidePolyTip:function(e){for(var t=this.layerWork.getLayers(),i=0;i<t.length;i++){var a=t[i];if(a.feature.properties.name==e){this.layerWork.resetStyle(a),a.closeTooltip();break}}},addLegend:function(){var e=null;e=document.getElementById("legendContainer")?$("#legendContainer"):$('<div id="legendContainer" class="legend-container"></div>').appendTo($(document.body));var t="<div class='legend-title'>"+this.selectData.title+"("+this.selectData.unit+")</div>",i=this.selectData.span,a=this.colors,r=i.length;r>a.length&&(r=a.length);for(var o=0;o<=r;o++){var n=i[o];n=0==o?"小于"+i[o]:o==r?"大于"+i[o-1]:i[o-1]+"-"+i[o],t+="<div class='legend-item'><span class='legend-color' style='background:"+a[o]+"'></span><span class='legend-des'>"+n+"</span></div>"}$(e).html(t)}}));