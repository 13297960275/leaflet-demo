L.Marker.include({_initIcon:function(){this._initIconOrigin();var t=this._light=L.DivIcon.prototype.createIcon();L.DomUtil.addClass(t,"light"),L.DomUtil.create("span","glow",t),L.DomUtil.create("span","flare",t),"permanent"===this.options.highlight?L.DomUtil.addClass(t,"permanent"):"temporary"===this.options.highlight&&L.DomUtil.addClass(t,"temporary"),this.getPane().appendChild(t)},_setPos:function(t){this._setPosOrigin(t),L.DomUtil.setPosition(this._light,t)},enableTemporaryHighlight:function(){this.options.highlight="temporary",L.DomUtil.addClass(this._light,"temporary")},disableTemporaryHighlight:function(t){delete this.options.highlight,L.DomUtil.removeClass(this._light,"temporary")},enablePermanentHighlight:function(){this.options.highlight="permanent",L.DomUtil.addClass(this._light,"permanent")},disablePermanentHighlight:function(t){delete this.options.highlight,L.DomUtil.removeClass(this._light,"permanent")},_initIconOrigin:function(){var t=this.options,i="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),o=t.icon.createIcon(this._icon),e=!1;o!==this._icon&&(this._icon&&this._removeIcon(),e=!0,t.title&&(o.title=t.title),t.alt&&(o.alt=t.alt)),L.DomUtil.addClass(o,i),t.keyboard&&(o.tabIndex="0"),this._icon=o,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex});var s=t.icon.createShadow(this._shadow),n=!1;s!==this._shadow&&(this._removeShadow(),n=!0),s&&L.DomUtil.addClass(s,i),this._shadow=s,t.opacity<1&&this._updateOpacity(),e&&this.getPane().appendChild(this._icon),this._initInteraction(),s&&n&&this.getPane("shadowPane").appendChild(this._shadow)},_setPosOrigin:function(t){L.DomUtil.setPosition(this._icon,t),this._shadow&&L.DomUtil.setPosition(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()}});