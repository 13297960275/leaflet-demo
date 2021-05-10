var mapSwipeWidget = L.widget.bindClass(L.widget.BaseWidget.extend({
  map: null,
  options: {
    resources: ["view.css"],
    view: {
      type: "append",
      url: "view.html",
      parent: "body"
    }
  },
  winCreateOK: function (e, a) {
    for (var i = this, t = "", n = "", s = this.getBaseMaps(), r = 0; r < s.length; r++) {
      var o = s[r];
      t += ' <li><a href="javascript:mapSwipeWidget.changeSelectBaseLayer(' + r + ',true)">' + o.name + "</a></li>", n += ' <li><a href="javascript:mapSwipeWidget.changeSelectSwipeLayer(' + r + ',true)">' + o.name + "</a></li>"
    }
    $("#ddl_basemap").html(t), $("#ddl_swipelayer").html(n), this.changeSelectBaseLayer(0, !1), this.changeSelectSwipeLayer(1, !1), 2 == s.length && $(".select-swiper-layer").hide(), $("#btn_mapSwipe_sp").click(function () {
      i.changeSwipe("2")
    }), $("#btn_mapSwipe_cz").click(function () {
      i.changeSwipe("1")
    }), $("#btn_mapSwipe_close").click(function () {
      i.disableBase()
    })
  },
  layerSwipe: null,
  layerBase: null,
  arrOldLayers: [],
  activate: function () {
    $(".toolBar").css({
      top: "60px"
    }), this.swipeType = "1";
    var i = this;
    this.mapPageCustomer.create({
      parent: "#centerDiv",
      onChange: function (e) {
        i.clip()
      }
    }), this.mapPageCustomer2.create({
      parent: "#centerDiv",
      onChange: function (e) {
        i.clip()
      }
    }), this.mapPageCustomer2.hide();
    var a = [];
    this.map.eachLayer(function (e) {
      e instanceof L.TileLayer && a.push(e)
    }), $.each(a, function (e, a) {
      i.map.removeLayer(a)
    }), this.arrOldLayers = a;
    var e = this.getBaseMaps();
    null != this.layerBase || (this.layerBase = e[0]._layer), this.map.addLayer(this.layerBase), null != this.layerSwipe || (this.layerSwipe = e[1]._layer), this.map.addLayer(this.layerSwipe), this.map.on("move", this.clip, this), this.clip();
    i = this;
    setTimeout(function () {
      i.updateBaseLayer(i.layerBase)
    }, 500)
  },
  disable: function () {
    $(".toolBar").css({
      top: "10px"
    }), this.map.off("move", this.clip, this), $("#map").height("100%"), this.removeSwipeLayer(), this.layerSwipe = null, this.layerBase = null;
    var i = this;
    $.each(this.arrOldLayers, function (e, a) {
      i.map.addLayer(a)
    }), this.arrOldLayers = [], this.mapPageCustomer.remove(), this.mapPageCustomer2.remove()
  },
  removeSwipeLayer: function () {
    if (null != this.layerBase && this.map.removeLayer(this.layerBase), null != this.layerSwipe) {
      var e = this.map.containerPointToLayerPoint([0, 0]),
        a = this.map.containerPointToLayerPoint(this.map.getSize()),
        i = "rect(" + [e.y, a.x, a.y, e.x].join("px,") + "px)";
      this.clipLayer(this.layerSwipe, i), this.map.removeLayer(this.layerSwipe)
    }
  },
  clip: function () {
    if (null != this.layerSwipe) {
      var e, a, i = this.map.containerPointToLayerPoint([0, 0]),
        t = this.map.containerPointToLayerPoint(this.map.getSize());
      a = "1" == this.swipeType ? (e = t.x, i.y + (t.y - i.y) * Number(this.mapPageCustomer.$range.val())) : (e = i.x + (t.x - i.x) * Number(this.mapPageCustomer2.$range.val()), t.y);
      var n = "rect(" + [i.y, e, a, i.x].join("px,") + "px)";
      this.clipLayer(this.layerSwipe, n)
    }
  },
  clipLayer: function (e, a) {
    var i = this;
    if (e instanceof L.LayerGroup || e instanceof L.FeatureGroup) e.eachLayer(function (e) {
      i.clipLayer(e, a)
    });
    else {
      var t = e.getContainer();
      t && t.style && (t.style.clip = a)
    }
  },
  swipeType: "1",
  changeSwipe: function (e) {
    "1" == (this.swipeType = e) ? (this.mapPageCustomer.show(), this.mapPageCustomer2.hide()) : (this.mapPageCustomer.hide(), this.mapPageCustomer2.show()), this.clip()
  },
  mapPageCustomer: {
    onChangeFun: null,
    $parent: null,
    $drag: null,
    $range: null,
    create: function (e) {
      this.remove(), this.$parent = $(e.parent), this.onChangeFun = e.onChange;
      this.$parent.append('<div id="dragSwipe" style="position: absolute;left: 0px;height: 1px; background: rgb(214, 214, 214); width: 100%; border-top: 1px solid rgb(170, 170, 170); border-bottom: 1px solid rgb(170, 170, 170); z-index: 400;"><div style="width: 168px; height: 5px; margin: auto; background: #999;cursor: s-resize;"></div><input id="rangeSwipe" class="range" type="range" min="0" max="1.0" step="any" style="display: none;z-index:-1;"></div>'), this.$drag = $("#dragSwipe"), this.$range = $("#rangeSwipe"), this.$drag.css({
        top: this.$parent.height() / 2 + "px"
      }), this.isMobile() ? this.targetMoveTBHandle() : this.targetMoveHandle();
      var a = this.$parent.height(),
        i = this.$drag[0].offsetTop;
      this.$range.val(i / a)
    },
    show: function () {
      this.$drag.show()
    },
    hide: function () {
      this.$drag.hide()
    },
    remove: function () {
      this.$drag && (this.$drag.remove(), this.$drag = null), this.$range && (this.$range.remove(), this.$range = null)
    },
    isMobile: function () {
      return !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    },
    targetMoveHandle: function () {
      var o = this;
      this.$drag.bind("mousedown", function (e) {
        var n = o.$parent.height(),
          s = o.$drag[0].offsetTop,
          r = e.pageY;
        $(document).bind("mousemove", function (e) {
          var a = e.pageY - r,
            i = s + a;
          if (0 < i && i < n - 0) {
            var t = s + a + 0;
            o.$drag.css({
              top: t + "px"
            }), o.$range.val(t / n), o.onChangeFun()
          }
        })
      }), $(document).bind("mouseup", function () {
        $(this).unbind("mousemove")
      })
    },
    targetMoveTBHandle: function () {
      this.$drag.bind("touchstart", function (e) {
        var n = that.$parent.height(),
          s = this.$drag[0].offsetTop,
          r = e.originalEvent.targetTouches[0].pageY;
        this.$drag.bind("touchmove", function (e) {
          var a = e.originalEvent.targetTouches[0].pageY - r,
            i = s + a;
          if (0 < i && i < n - 0) {
            var t = s + a + 0;
            $(obj1).css({
              top: t + "px"
            }), that.$range.val(t / n), that.onChangeFun()
          }
        })
      }), $(obj1).bind("touchup", function () {
        $(this).unbind("touchmove")
      })
    }
  },
  mapPageCustomer2: {
    onChangeFun: null,
    $parent: null,
    $drag: null,
    $range: null,
    create: function (e) {
      this.remove(), this.$parent = $(e.parent), this.onChangeFun = e.onChange;
      this.$parent.append('<div id="dragSwipe2" style="position: absolute; top: 0px; width: 1px; background: rgb(214, 214, 214); height: 100%; border-left: 1px solid rgb(170, 170, 170); border-right: 1px solid rgb(170, 170, 170); z-index: 400; padding-top: 324px; display: block;"><div style="height: 168px; width: 5px; margin: auto; background: #999;cursor: e-resize;"></div><input id="rangeSwipe2" class="range" type="range" min="0" max="1.0" step="any" style="display:none; z-index:-1;"></div>'), this.$drag = $("#dragSwipe2"), this.$range = $("#rangeSwipe2"), this.$drag.css({
        "padding-top": (this.$parent.height() - 168) / 2 + "px",
        left: this.$parent.width() / 2 + "px"
      }), this.isMobile() ? this.targetMoveTBHandle() : this.targetMoveHandle();
      var a = this.$parent.width(),
        i = this.$drag[0].offsetLeft;
      this.$range.val(i / a)
    },
    show: function () {
      this.$drag.show()
    },
    hide: function () {
      this.$drag.hide()
    },
    remove: function () {
      this.$drag && (this.$drag.remove(), this.$drag = null), this.$range && (this.$range.remove(), this.$range = null)
    },
    isMobile: function () {
      return !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    },
    targetMoveHandle: function () {
      var o = this;
      this.$drag.bind("mousedown", function (e) {
        var n = o.$parent.width(),
          s = o.$drag[0].offsetLeft,
          r = e.pageX;
        $(document).bind("mousemove", function (e) {
          var a = e.pageX - r,
            i = s + a;
          if (0 < i && i < n - 0) {
            var t = s + a + 0;
            o.$drag.css({
              left: t + "px"
            }), o.$range.val(t / n), o.onChangeFun()
          }
        })
      }), $(document).bind("mouseup", function () {
        $(this).unbind("mousemove")
      })
    },
    targetMoveTBHandle: function (o, e, a) {
      o = this;
      this.$drag.bind("touchstart", function (e) {
        var n = o.$parent.width(),
          s = o.$drag[0].offsetLeft,
          r = e.originalEvent.targetTouches[0].pageX;
        o.$drag.bind("touchmove", function (e) {
          var a = e.originalEvent.targetTouches[0].pageX - r,
            i = s + a;
          if (0 < i && i < n - 0) {
            var t = s + a + 0;
            o.$drag.css({
              left: t + "px"
            }), o.$range.val(t / n), o.onChangeFun()
          }
        })
      }), $(e).bind("touchup", function () {
        $(this).unbind("touchmove")
      })
    }
  },
  _basemaps: null,
  getBaseMaps: function () {
    if (null == this._basemaps) {
      for (var e = this.map.gisdata.config.basemaps, a = [], i = 0; i < e.length; i++) {
        "group" == (t = e[i]).type && null == t._layer || (!t._layer || null != t.crs && t.crs != this.map.gisdata.config.crs || a.push(t))
      }
      e = this.map.gisdata.config.operationallayers;
      for (i = 0; i < e.length; i++) {
        var t;
        "group" == (t = e[i]).type && null == t._layer || t._layer && t._layer instanceof L.TileLayer && a.push(t)
      }
      this._basemaps = a
    }
    return this._basemaps
  },
  updateBaseLayer: function (e) {
    console.log(e)
    this.removeSwipeLayer(), this.layerBase = e, this.map.addLayer(this.layerBase), null != this.layerSwipe && this.map.addLayer(this.layerSwipe), this.clip()
  },
  updateSwipeLayer: function (e) {
    console.log(e)
    this.removeSwipeLayer(), this.layerSwipe = e, null != this.layerBase && this.map.addLayer(this.layerBase), this.map.addLayer(this.layerSwipe), this.clip()
  },
  _last_baselayer_id: null,
  _last_swipeLayer_id: null,
  changeSelectBaseLayer: function (e, a) {
    if (this._last_swipeLayer_id != e) {
      this._last_baselayer_id = e;
      var i = this.getBaseMaps()[e];
      console.log(i);
      $("#btnSelectBaseMap").html("已选:" + i.name + '<span class="caret"></span>'), a && this.updateBaseLayer(i._layer)
    } else toastr.warning("底图与卷帘图层不能为同一图层！")
  },
  changeSelectSwipeLayer: function (e, a) {
    if (this._last_baselayer_id != e) {
      this._last_swipeLayer_id = e;
      var i = this.getBaseMaps()[e];
      $("#btnSelectSwipelayer").html("已选:" + i.name + '<span class="caret"></span>'), a && this.updateSwipeLayer(i._layer)
    } else toastr.warning("底图与卷帘图层不能为同一图层！")
  }
}));