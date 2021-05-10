L.widget.bindClass(L.widget.BaseWidget.extend({
  options: {},
  layerWork: null,
  create: function () {},
  activate: function () {
    map.setView([33.652, 107.661], 4), map.changeBaseMap("谷歌卫星"), this.showData()
  },
  disable: function () {
    map.removeLayer(this.layerWork), map.changeBaseMap(0), this.layerWork = null
  },
  showData: function (a) {
    var e = this.getOption(a);
    null == this.layerWork ? this.layerWork = L.flowEcharts(e).addTo(map) : (this.layerWork._echartsOption = e,
      this.layerWork.redraw())
  },
  getOption: function (a) {
    var o = {
        "上海": [121.48, 31.22],
        "珠海": [113.52, 22.3],
        "三亚": [109.31, 18.14],
        "惠州": [114.4, 23.09],
        "海口": [110.35, 20.02],
        "合肥": [117.27, 31.86],
        "南京": [118.78, 32.04],
        "杭州": [120.19, 30.26],
        "苏州": [120.62, 31.32],
        "无锡": [120.29, 31.59],
        "昆山": [120.95, 31.39],
        "广州": [113.23, 23.16],
        "深圳": [114.07, 22.62],
        "佛山": [113.11, 23.05],
        "东莞": [113.75, 23.04],
        "福州": [119.3, 26.08],
        "厦门": [118.1, 24.46],
        "南宁": [108.33, 22.84],
        "郑州": [113.65, 34.76],
        "武汉": [114.31, 30.52],
        "长沙": [113, 28.21],
        "南昌": [115.89, 28.68],
        "北京": [116.46, 39.92],
        "长春": [125.35, 43.88],
        "大连": [121.62, 38.92],
        "沈阳": [123.38, 41.8],
        "哈尔滨": [126.63, 45.75],
        "天津": [117.2, 39.13],
        "济南": [117, 36.65],
        "青岛": [120.33, 36.07],
        "太原": [112.53, 37.87],
        "石家庄": [114.48, 38.03],
        "西安": [108.95, 34.27],
        "成都": [104.06, 30.67],
        "重庆": [106.54, 29.59],
        "昆明": [102.73, 25.04]
      },
      e = function (a) {
        for (var e = [], t = 0; t < a.length; t++) {
          var n = o[a[t].name];
          n && e.push({
            name: a[t].name,
            value: n.concat(a[t].value)
          })
        }
        return e
      },
      t = [e(a = [{
        name: "上海",
        value: 19780
      }, {
        name: "珠海",
        value: 2186
      }, {
        name: "三亚",
        value: 1135
      }, {
        name: "惠州",
        value: 1973
      }, {
        name: "海口",
        value: 2568
      }, {
        name: "合肥",
        value: 4039
      }, {
        name: "南京",
        value: 6959
      }, {
        name: "杭州",
        value: 5632
      }, {
        name: "苏州",
        value: 6707
      }, {
        name: "无锡",
        value: 3393
      }, {
        name: "昆山",
        value: 1894
      }, {
        name: "广州",
        value: 15769
      }, {
        name: "深圳",
        value: 8259
      }, {
        name: "佛山",
        value: 5741
      }, {
        name: "东莞",
        value: 3030
      }, {
        name: "福州",
        value: 4542
      }, {
        name: "厦门",
        value: 3329
      }, {
        name: "南宁",
        value: 3157
      }, {
        name: "郑州",
        value: 6690
      }, {
        name: "武汉",
        value: 8678
      }, {
        name: "长沙",
        value: 5303
      }, {
        name: "南昌",
        value: 3025
      }, {
        name: "北京",
        value: 20259
      }, {
        name: "长春",
        value: 3016
      }, {
        name: "大连",
        value: 3202
      }, {
        name: "沈阳",
        value: 4540
      }, {
        name: "哈尔滨",
        value: 3141
      }, {
        name: "天津",
        value: 8626
      }, {
        name: "济南",
        value: 4361
      }, {
        name: "青岛",
        value: 6667
      }, {
        name: "太原",
        value: 4080
      }, {
        name: "石家庄",
        value: 6137
      }, {
        name: "西安",
        value: 6991
      }, {
        name: "成都",
        value: 13873
      }, {
        name: "重庆",
        value: 13283
      }, {
        name: "昆明",
        value: 4633
      }]), e(a.sort(function (a, e) {
        return e.value - a.value
      }).slice(0, 6))];
    a.sort(function (a, e) {
      return a.value - e.value
    });
    for (var n = [], i = [], l = 0, r = a.length, u = 0; u < a.length; u++) n.push(a[u].name), i.push(a[u]
      .value), l += a[u].value;
    return option = {
      backgroundColor: "rgba(17, 19, 42, 0.3)",
      animation: !0,
      animationDuration: 1e3,
      animationEasing: "cubicInOut",
      animationDurationUpdate: 1e3,
      animationEasingUpdate: "cubicInOut",
      title: [{
        text: "散点图态势",
        subtext: "san dian tu taishi",
        left: "center",
        textStyle: {
          color: "#fff"
        }
      }, {
        id: "statistic",
        text: r ? "平均: " + parseInt((l / r).toFixed(4)) : "",
        right: 120,
        top: 40,
        width: 100,
        textStyle: {
          color: "#fff",
          fontSize: 16
        }
      }],
      geo: {
        map: "",
        roam: !0
      },
      tooltip: {
        trigger: "item"
      },
      grid: {
        right: 40,
        top: 100,
        bottom: 40,
        width: "30%"
      },
      xAxis: {
        type: "value",
        scale: !0,
        position: "top",
        boundaryGap: !1,
        splitLine: {
          show: !1
        },
        axisLine: {
          show: !1
        },
        axisTick: {
          show: !1
        },
        axisLabel: {
          margin: 2,
          textStyle: {
            color: "#aaa"
          }
        }
      },
      yAxis: {
        type: "category",
        nameGap: 16,
        axisLine: {
          show: !0,
          lineStyle: {
            color: "#ddd"
          }
        },
        axisTick: {
          show: !1,
          lineStyle: {
            color: "#ddd"
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#ddd"
          }
        },
        data: n
      },
      series: [{
        type: "scatter",
        coordinateSystem: "geo",
        data: t[0],
        symbolSize: function (a) {
          var e = a[2] / 500 * 1.5;
          return Math.max(e, 8)
        },
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: !1
          },
          emphasis: {
            show: !0
          }
        },
        itemStyle: {
          normal: {
            color: "#FF8C00",
            position: "right",
            show: !0
          }
        }
      }, {
        type: "effectScatter",
        coordinateSystem: "geo",
        data: t[0],
        symbolSize: function (a) {
          var e = a[2] / 500;
          return Math.max(e, 8)
        },
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke"
        },
        hoverAnimation: !0,
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: !0
          }
        },
        itemStyle: {
          normal: {
            color: "#f4e925",
            shadowBlur: 50,
            shadowColor: "#EE0000"
          }
        },
        zlevel: 1
      }, {
        id: "bar",
        zlevel: 2,
        type: "bar",
        symbol: "none",
        itemStyle: {
          normal: {
            color: "#ddb926"
          }
        },
        data: a
      }]
    }, option
  }
}));