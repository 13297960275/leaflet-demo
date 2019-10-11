L.widget.bindClass(L.widget.BaseWidget.extend({
  options: {},
  layerWork: null,
  create: function () {},
  activate: function () {
    map.setView([31.872396,117.290191],12), map.changeBaseMap("谷歌卫星");
    this.queryServer()
  },
  disable: function () {
    map.removeLayer(this.layerWork), map.changeBaseMap(0), this.layerWork = null
  },
  queryServer: function () {
    var e = L.esri.query({
        url: "http://data.marsgis.cn/arcgis/rest/services/mars/hefei/MapServer/33"
      }),
      a = this;
    e.run(function (e, t, r) {
      null != e && 0 < e.code ? haoutil.alert(e.message, "服务访问出错") : null != t && null != t && 0 != t
        .features.length ? a.showQueryResult(t) : haoutil.msg("未找到符合查询条件的要素！")
    })
  },
  showQueryResult: function (e) {
    var t = [];
    for (i = 0; i < e.features.length; i++) {
      var r = e.features[i];
      if (null != r && null != r.geometry && null != r.geometry.coordinates && 0 != r.geometry.coordinates
        .length) {
        var a = 1 / r.geometry.coordinates.length;
        t.push({
          coords: r.geometry.coordinates,
          lineStyle: {
            normal: {
              color: echarts.color.modifyHSL("#5A94DF", Math.round(a * i))
            }
          }
        })
      }
    }
    this.showData(t)
  },
  showData: function (e) {
    var t = this.getOption(e);
    null == this.layerWork ? this.layerWork = L.flowEcharts(t).addTo(map) : (this.layerWork._echartsOption = t,
      this.layerWork.redraw())
  },
  getOption: function (e) {
    return {
      backgroundColor: "rgba(17, 19, 42, 0.7)",
      animation: !0,
      geo: {
        map: "",
        roam: !0
      },
      series: [{
        type: "lines",
        coordinateSystem: "geo",
        polyline: !0,
        data: e,
        silent: !0,
        lineStyle: {
          normal: {
            opacity: .2,
            width: 1
          }
        },
        progressiveThreshold: 500,
        progressive: 200
      }, {
        type: "lines",
        coordinateSystem: "geo",
        polyline: !0,
        data: e,
        lineStyle: {
          normal: {
            width: 0
          }
        },
        effect: {
          constantSpeed: 20,
          show: !0,
          trailLength: .1,
          symbolSize: 1.5
        },
        zlevel: 1
      }]
    }
  }
}));