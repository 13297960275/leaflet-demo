var manageLayersWidget = L.widget.bindClass(L.widget.BaseWidget.extend({
  map: null,
  options: {
    view: {
      type: "window",
      url: "view.html",
      windowOptions: {
        width: 200,
        height: 500
      }
    }
  },
  create: function () {},
  viewWindow: null,
  winCreateOK: function (e, a) {
    this.viewWindow = a
  },
  activate: function () {
    this.map.on("changeForManageLayers", this._map_changeFormanageLayersHnadler, this)
  },
  disable: function () {
    this.viewWindow = null, this.map.off("changeForManageLayers", this._map_changeFormanageLayersHnadler, this)
  },
  _map_changeFormanageLayersHnadler: function (e) {
    for (var a = e.layer, t = a.getFeaturesManage(), i = a.config.id, r = [], n = 0; n < t.length; n++) {
      var s = t[n],
        d = {
          pid: i,
          id: this.getNextId(),
          name: s.name,
          _layer: s,
          type: "feature"
        };
      d.name || (d.name = item.name + "-" + (n + 1));
      var h = Number(s.order);
      isNaN(h) && (h = this._layers.length + 1), (s.config = d)._key = this._layers.length + "_" + d.id + "_" + d.name, this._layers.push(d), r.push(d)
    }
    this.isActivate && this.viewWindow && this.viewWindow.addNodes(i, r, !0)
  },
  _tempIdx: 1,
  arrIdx: [],
  getNextId: function () {
    for (; - 1 != this.arrIdx.indexOf(this._tempIdx);) this._tempIdx++;
    return this.arrIdx.push(this._tempIdx), this._tempIdx
  },
  _layers: null,
  addOverlay: function (e) {
    e.name || (e.name = "未命名"), e.id || (e.id = this.getNextId()), e.pid || (e.pid = -1);
    var a = Number(e.order);
    isNaN(a) && (a = this._layers.length + 1), e.order = a, e._key = this._layers.length + "_" + e.id + "_" + e.name, this._layers.push(e), this.isActivate && this.viewWindow && this.viewWindow.addNode(e)
  },
  removeLayer: function (e) {
    for (var a = 0; a < this._layers.length; a++) {
      var t = this._layers[a];
      if (t.name == e) {
        this._layers.splice(a, 1), this.isActivate && this.viewWindow && this.viewWindow.removeNode(t);
        break
      }
    }
  },
  getLayers: function () {
    var e = [],
      a = this.config.basemaps ? this.map.gisdata.config.basemaps : [],
      t = this.map.gisdata.config.operationallayers;
    this._tempIdx = 1, this.arrIdx = [];
    for (var i = 0; i < a.length; i++) {
      (o = a[i]).id && this.arrIdx.push(o.id)
    }
    for (i = 0; i < t.length; i++) {
      (o = t[i]).id && this.arrIdx.push(o.id)
    }
    for (i = 0; i < a.length; i++) {
      if ((o = a[i]).name || (o.name = "未命名"), o.id || (o.id = this.getNextId()), o.pid || (o.pid = -1), e.push(o), "group" == o.type && o.layers)
        for (var r = 0; r < o.layers.length; r++) {
          (s = o.layers[r]).pid = o.id, s.id = this.getNextId(), s.name || (s.name = o.name + "-" + (r + 1)), s._parent = o, s._layer && (s._layer.hasOpacity = !0, s._layer.hasZIndex = !0), e.push(s)
        } else if (o._layer && (o._layer.hasOpacity = !0, o._layer.hasZIndex = !0), (n = this.getChildLayers(o._layer)) && 0 < n.length)
          for (r = 0; r < n.length; r++) {
            (d = n[r]).hasOpacity = !0, d.hasZIndex = !0, (s = {
              pid: o.id,
              id: this.getNextId(),
              name: d.options.name,
              _layer: d
            }).name || (s.name = o.name + "-" + (r + 1)), s._parent = o, d.config = s, e.push(s)
          }
    }
    for (i = 0; i < t.length; i++) {
      if ((o = t[i]).name || (o.name = "未命名"), o.id || (o.id = this.getNextId()), o.pid || (o.pid = -1), o._layer && (o._layer.hasOpacity = !0), e.push(o), o._layer && o._layer.getFeaturesManage) {
        var n = o._layer.getFeaturesManage();
        for (r = 0; r < n.length; r++) {
          var s, d = n[r];
          (s = {
            pid: o.id,
            id: this.getNextId(),
            name: d.name,
            _layer: d,
            type: "feature"
          }).name || (s.name = o.name + "-" + (r + 1)), d.config = s, e.push(s)
        }
      }
    }
    i = 0;
    for (var h = e.length; i < h; i++) {
      var o = e[i],
        l = Number(o.order);
      isNaN(l) && (l = i + 1), o.order = l, o._key = i + "_" + o.id + "_" + o.name, null != o._layer && this.udpateLayerZIndex(o._layer, l)
    }
    return this._layers = e, this._layers
  },
  centerAt: function (e) {
    if (e && e.centerAt) return e.centerAt()
  },
  getLayerVisible: function (e) {
    return e && e.getVisible ? e.getVisible() : this.map.hasLayer(e)
  },
  getChildLayers: function (e) {
    return e instanceof L.LayerGroup || e instanceof L.FeatureGroup ? e.getLayers() : null
  },
  updateLayerVisible: function (e, a, t) {
    console.log(e, a, t)
    if (a && this.centerAt(e), e && e.setVisible) e.setVisible(a);
    else {
      var i = this;
      t ? a ? (t.addLayer(e), t.eachLayer(function (e) {
        i.udpateLayerZIndex(e, e.config.order)
      })) : t.removeLayer(e) : a ? (this.map.addLayer(e), e.config && e.config.order && this.udpateLayerZIndex(e, e.config.order)) : this.map.removeLayer(e)
    }
  },
  udpateLayerOpacity: function (e, a) {
    console.log(e, a)
    var t = this;
    e instanceof L.LayerGroup || e instanceof L.FeatureGroup ? e.eachLayer(function (e) {
      t.udpateLayerOpacity(e, a)
    }) : (e.setOpacity && e.setOpacity(a), e instanceof L.Path && (e.options.opacity = a, e.setStyle(e.options)))
  },
  udpateLayerZIndex: function (e, a) {
    var r;
    if (e.setZIndex) e.setZIndex(a);
    else if (e.bringToFront && this._layers) {
      this._layers.sort((r = "order", function (e, a) {
        var t = e[r],
          i = a[r];
        return t < i ? -1 : i < t ? 1 : 0
      }));
      for (var t = 0; t < this._layers.length; t++) {
        var i = this._layers[t];
        i._layer && map.hasLayer(i._layer) && i._layer.bringToFront && (i._layer.bringToFront(), i._layer.redraw && i._layer.redraw())
      }
    }
  }
}));