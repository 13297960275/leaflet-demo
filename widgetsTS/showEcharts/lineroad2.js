L.widget.bindClass(L.widget.BaseWidget.extend({options:{},layerWork:null,create:function(){},activate:function(){map.setView([39.907,116.377],10),map.changeBaseMap("谷歌卫星");var t=this;$.getJSON("data/apidemo/bjgj.json",function(e){t.isActivate&&t.showData(e)})},disable:function(){map.removeLayer(this.layerWork),map.changeBaseMap(0),this.layerWork=null},showData:function(e){var t=this.getOption(e);null==this.layerWork?this.layerWork=L.flowEcharts(t).addTo(map):(this.layerWork._echartsOption=t,this.layerWork.redraw())},getOption:function(e){var c=300/(e.length-1),t=[].concat.apply([],e.map(function(e,t){for(var a,o=[],n=0;n<e.length;n+=2){var r=[e[n],e[n+1]];0<n&&(r=[a[0]+r[0],a[1]+r[1]]);var i=(a=r)[0]/1e4,l=r[1]/1e4,s=L.mars.pointconvert.bd2gcj([i,l]);i=s[0],l=s[1],o.push([i,l])}return{coords:o,lineStyle:{normal:{color:echarts.color.modifyHSL("#5A94DF",Math.round(c*t))}}}}));return option={backgroundColor:"rgba(17, 19, 42, 0.7)",animation:!0,geo:{map:"",roam:!0},series:[{type:"lines",coordinateSystem:"geo",polyline:!0,data:t,silent:!0,lineStyle:{normal:{opacity:.2,width:1}},progressiveThreshold:500,progressive:200},{type:"lines",coordinateSystem:"geo",polyline:!0,data:t,lineStyle:{normal:{width:0}},effect:{constantSpeed:20,show:!0,trailLength:.1,symbolSize:1.5},zlevel:1}]},option}}));