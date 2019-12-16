L.widget.bindClass(L.widget.BaseWidget.extend({
  options: {},
  layerWork: null,
  create: function () {},
  activate: function () {
    map.setView([33.652, 107.661], 4), map.changeBaseMap("谷歌卫星");
    this.showData({
      "武汉": [114.30539299999998, 30.593099],
      "深圳": [114.05786499999999, 22.543096],
      "北京": [116.40739499999995, 39.904211],
      "阿克苏": [80.26338699999997, 41.167548]
    })
  },
  disable: function () {
    map.removeLayer(this.layerWork), map.changeBaseMap(0), this.layerWork = null
  },
  showData: function (o) {
    var m = this.getOption(o);
    null == this.layerWork ? this.layerWork = L.flowEcharts(m).addTo(map) : (this.layerWork._echartsOption = m, this.layerWork.redraw())
  },
  getOption: function (a) {
    return {
      backgroundColor: "rgba(17, 19, 42, 0.4)",
      geo: {
        map: "",
        roam: !0
      },
      series: [{
        type: "lines",
        coordinateSystem: "geo",
        zlevel: 1,
        data: [{
          name: "武汉",
          toname: "北京",
          coords: [a["武汉"], a["北京"]]
        }, {
          name: "深圳",
          toname: "北京",
          coords: [a["深圳"], a["北京"]]
        }, {
          name: "阿克苏",
          toname: "北京",
          coords: [a["阿克苏"], a["北京"]]
        }],
        effect: {
          show: !0,
          period: 6,
          trailLength: .7,
          color: "#fff",
          symbolSize: 4
        },
        lineStyle: {
          normal: {
            width: "",
            color: "#a6c84c",
            curveness: .2
          }
        }
      }, {
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 3,
        data: [{
          name: "北京",
          value: a["北京"].concat(200)
        }],
        rippleEffect: {
          period: 10,
          scale: 5,
          brushType: "fill"
        }
      }]
    }
  }
}));