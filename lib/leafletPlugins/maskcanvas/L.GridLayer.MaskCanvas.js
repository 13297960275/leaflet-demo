L.GridLayer.MaskCanvas=L.GridLayer.extend({options:{radius:5,useAbsoluteRadius:!0,color:"#000",opacity:.5,noMask:!1,lineColor:void 0,debug:!1,zIndex:18},initialize:function(t){L.setOptions(this,t)},createTile:function(t){var i=document.createElement("canvas");return i.width=i.height=this.options.tileSize,this._draw(i,t),this.options.debug&&this._drawDebugInfo(i,t),i},_drawDebugInfo:function(t,i){var o=this.options.tileSize,n=t.getContext("2d");n.globalCompositeOperation="xor",n.fillStyle="#fff",n.fillRect(0,0,o,o),n.strokeStyle="#000",n.strokeText("x: "+i.x+", y: "+i.y+", zoom: "+i.z,20,20),n.strokeStyle="#f55",n.beginPath(),n.moveTo(0,0),n.lineTo(o,0),n.lineTo(o,o),n.lineTo(0,o),n.closePath(),n.stroke()},setData:function(t){var o=this;this.bounds=new L.LatLngBounds(t),this._quad=new QuadTree(this._boundsToQuery(this.bounds),!1,6,6);var i=t[0],n=1,s=0;i instanceof L.LatLng&&(n="lng",s="lat"),this._maxRadius=0,t.forEach(function(t){var i=t[2]||o.options.radius;o._quad.insert({x:t[n],y:t[s],r:i}),o._maxRadius=Math.max(o._maxRadius,i)}),this._map&&this.redraw()},setRadius:function(t){this.options.radius=t,this.redraw()},_getMaxRadius:function(t){return this._calcRadius(this._maxRadius,t)},_tilePoint:function(t,i){var o=t.multiplyBy(this.options.tileSize),n=this._map.project(new L.LatLng(i.y,i.x),t.z);return[Math.round(n.x-o.x),Math.round(n.y-o.y),this._calcRadius(i.r||this.options.radius,t.z)]},_boundsToQuery:function(t){return null==t.getSouthWest()?{x:0,y:0,width:.1,height:.1}:{x:t.getSouthWest().lng,y:t.getSouthWest().lat,width:t.getNorthEast().lng-t.getSouthWest().lng,height:t.getNorthEast().lat-t.getSouthWest().lat}},_calcRadius:function(t,i){var o;if(this.options.useAbsoluteRadius){var n=t/40075017*360/Math.cos(Math.PI/180*this._latLng.lat),s=new L.LatLng(this._latLng.lat,this._latLng.lng-n,!0),e=this._latLngToLayerPoint(s,i),a=this._latLngToLayerPoint(this._latLng,i);o=Math.max(Math.round(a.x-e.x),1)}else o=t;return o},_latLngToLayerPoint:function(t,i){return this._map.project(t,i)._round()._subtract(this._map.getPixelOrigin())},_draw:function(t,i){if(this._quad&&this._map){var o=this.options.tileSize,n=i.multiplyBy(o),s=n.add(new L.Point(o,o));if(this.options.useAbsoluteRadius){var e=n.add(new L.Point(o/2,o/2));this._latLng=this._map.unproject(e,i.z)}var a=new L.Point(this._getMaxRadius(i.z),this._getMaxRadius(i.z));n=n.subtract(a),s=s.add(a);var r=new L.LatLngBounds(this._map.unproject(s,i.z),this._map.unproject(n,i.z)),u=this._quad.retrieveInBounds(this._boundsToQuery(r));this._drawPoints(t,i,u)}},_drawPoints:function(t,i,o){var n,s=t.getContext("2d");for(var e in s.fillStyle=this.options.color,this.options.lineColor&&(s.strokeStyle=this.options.lineColor,s.lineWidth=this.options.lineWidth||1),s.globalCompositeOperation="source-over",this.options.noMask||this.options.debug||(s.fillRect(0,0,this.options.tileSize,this.options.tileSize),s.globalCompositeOperation="destination-out"),o)o.hasOwnProperty(e)&&(n=this._tilePoint(i,o[e]),s.beginPath(),s.arc(n[0],n[1],n[2],0,2*Math.PI),s.fill(),this.options.lineColor&&s.stroke())}}),L.TileLayer.maskCanvas=function(t){return new L.GridLayer.MaskCanvas(t)};