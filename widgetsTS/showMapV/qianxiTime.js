L.widget.bindClass(L.widget.BaseWidget.extend({options:{},layerWork:null,create:function(){this.layerWork=L.featureGroup()},activate:function(){map.changeBaseMap("谷歌卫星"),map.addLayer(this.layerWork);var t=this;$.ajax({url:"data/apidemo/qianxi-time.txt",type:"GET",dataType:"text",success:function(a){t.isActivate&&t.showMapV(a)}})},disable:function(){map.changeBaseMap(0),map.removeLayer(this.layerWork)},showMapV:function(a){map.setView([36.64,108.15],4);var t=[],s=[];function e(a,t,e){for(var r=(t.lng-a.lng)/e,i=(t.lat-a.lat)/e,n=0;n<e;n++){var o=a.lng+r*n,l=a.lat+i*n;s.push({geometry:{type:"Point",coordinates:[o,l]},count:1,time:n})}}for(var r=a.split("|"),i=0;i<r.length;i++)for(var n=r[i].split(/\n/),o=0;o<n.length;o++)if(n[o]){var l=n[o].split(/\t/);if("起点城市"===l[0]||"迁出城市"===l[0])var p=l[1];if("起点城市"!==l[0]||"迁出城市"!==l[0]&&1<l.length){var d=mapv.utilCityCenter.getCenterByCityName(l[0].replace(/市|省/,"")),g=mapv.utilCityCenter.getCenterByCityName(p.replace(/市|省/,"").trim());d&&(.7<Math.random()&&e(g,d,50),t.push({geometry:{type:"LineString",coordinates:[[d.lng,d.lat],[g.lng,g.lat]]},count:100*Math.random()}))}}var m=new mapv.DataSet(t);L.mapVLayer(m,{strokeStyle:"rgba(55, 50, 250, 0.3)",globalCompositeOperation:"lighter",shadowColor:"rgba(55, 50, 250, 0.5)",methods:{click:function(a){}},gradient:{0:"rgba(55, 50, 250, 0)",1:"rgba(55, 50, 250, 1)"},lineWidth:.2,draw:"intensity"}).addTo(this.layerWork);var y=new mapv.DataSet(s);L.mapVLayer(y,{fillStyle:"rgba(255, 250, 250, 0.9)",size:.5,animation:{type:"time",stepsRange:{start:0,end:50},trails:1,duration:5},draw:"simple"}).addTo(this.layerWork)}}));