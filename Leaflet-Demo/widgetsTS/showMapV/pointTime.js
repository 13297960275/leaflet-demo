L.widget.bindClass(L.widget.BaseWidget.extend({options:{},layerWork:null,create:function(){this.layerWork=L.featureGroup()},activate:function(){map.changeBaseMap("谷歌卫星"),map.addLayer(this.layerWork);var e=this;$.ajax({url:"data/apidemo/china-point.json",type:"GET",dataType:"json",success:function(a){e.isActivate&&e.showMapV(a)}})},disable:function(){map.changeBaseMap(0),map.removeLayer(this.layerWork)},showMapV:function(a){map.setView([38.028658,105.403119],4);for(var e=[],t=0;t<a[0].length;t++){var i=a[0][t].geoCoord;e.push({geometry:{type:"Point",coordinates:i},time:10*Math.random()})}var o=new mapv.DataSet(e),n={fillStyle:"rgba(255, 250, 50, 0.6)",updateCallback:function(a){a=a.toFixed(2),$("#time").html("时间"+a)},size:3,draw:"simple",animation:{type:"time",stepsRange:{start:0,end:10},trails:1,duration:6}};L.mapVLayer(o,n).addTo(this.layerWork)}}));