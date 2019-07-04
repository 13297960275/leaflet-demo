var sideBarIconConfig = {
    baselayer: "fa-map",
    vector: "fa-object-group",
    drawEdit: "fa-edit ",
    control: "fa fa-plug",
    bigdata: "fa fa-street-view",
    widgets: "fa-tags"
  },
  exampleConfig = {
    baselayer: {
      name: "地图底图",
      content: {
        onlinelayer: {
          name: "在线地图",
          content: [{
            name: "天地图",
            thumbnail: "11_online_tdt.jpg",
            fileName: "11_online_tdt"
          }, {
            name: "百度",
            thumbnail: "11_online_baidu.jpg",
            fileName: "11_online_baidu"
          }, {
            name: "高德",
            thumbnail: "11_online_gaode.jpg",
            fileName: "11_online_gaode"
          }, {
            name: "谷歌",
            thumbnail: "11_online_google.jpg",
            fileName: "11_online_google"
          }, {
            name: "ArcGIS",
            thumbnail: "11_online_arcgis.jpg",
            fileName: "11_online_arcgis"
          }, {
            name: "OSM",
            thumbnail: "11_online_osm.jpg",
            fileName: "11_online_osm"
          }]
        },
        crslayer: {
          name: "不同坐标系",
          content: [{
            name: "单张图片",
            thumbnail: "12_layer_img.jpg",
            fileName: "12_layer_img"
          }, {
            name: "3857底图(墨卡托)",
            thumbnail: "12_layer_3857.jpg",
            fileName: "12_layer_3857"
          }, {
            name: "4326底图(WGS84)",
            thumbnail: "12_layer_4326.jpg",
            fileName: "12_layer_4326"
          }, {
            name: "4490底图(大地2000)",
            thumbnail: "12_layer_4490.jpg",
            fileName: "12_layer_4490"
          }, {
            name: "自定义crs(基于proj4)",
            thumbnail: "12_layer_proj4.jpg",
            fileName: "12_layer_proj4"
          }]
        },
        typelayer: {
          name: "不同格式",
          content: [{
            name: "xyz格式瓦片",
            thumbnail: "13_layer_tile.jpg",
            fileName: "13_layer_tile"
          }, {
            name: "arcgis离散型瓦片",
            thumbnail: "13_layer_arcgis_cache.jpg",
            fileName: "13_layer_arcgis_cache"
          }, {
            name: "arcgis紧凑型瓦片",
            thumbnail: "13_layer_arcgis_cache_compact.jpg",
            fileName: "13_layer_arcgis_cache_compact"
          }, {
            name: "OGC WMS服务",
            thumbnail: "13_layer_wms.jpg",
            fileName: "13_layer_wms"
          }, {
            name: "OGC WMTS服务",
            thumbnail: "13_layer_wmts.jpg",
            fileName: "13_layer_wmts"
          }, {
            name: "GeoJson数据",
            thumbnail: "13_layer_geojson.jpg",
            fileName: "13_layer_geojson"
          }, {
            name: "ArcGIS MapServer瓦片",
            thumbnail: "13_layer_arcgis_tile.jpg",
            fileName: "13_layer_arcgis_tile"
          }]
        },
        configlayer: {
          name: "通过配置(推荐)",
          content: [{
            name: "json配置文件",
            thumbnail: "14_for_config.jpg",
            fileName: "14_for_config"
          }, {
            name: "json文件url动态传参",
            thumbnail: "14_for_config_url.jpg",
            fileName: "14_for_config_url",
            params: "config=wgs84.json"
          }, {
            name: "json格式数据",
            thumbnail: "14_for_config_data.jpg",
            fileName: "14_for_config_data"
          }]
        },
        gaojitile: {
          name: "高级控制",
          content: [{
            name: "灰度转换",
            thumbnail: "15_tile_graycale.jpg",
            fileName: "15_tile_graycale"
          }]
        }
      }
    },
    vector: {
      name: "矢量数据",
      content: {
        marker: {
          name: "点",
          content: [{
            name: "图标点",
            thumbnail: "21_marker.jpg",
            fileName: "21_marker"
          }, {
            name: "文字点",
            thumbnail: "21_marker_divicon.jpg",
            fileName: "21_marker_divicon"
          }, {
            name: "照片点",
            thumbnail: "21_photo.jpg",
            fileName: "21_photo"
          }, {
            name: "点封装加载类",
            thumbnail: "21_work_marker.jpg",
            fileName: "21_work_marker"
          }, {
            name: "动画点",
            thumbnail: "21_marker_animation.gif",
            fileName: "21_marker_animation"
          }, {
            name: "点高亮",
            thumbnail: "21_marker_highlight.gif",
            fileName: "21_marker_highlight"
          }, {
            name: "加载动画",
            thumbnail: "21_magicMarker.jpg",
            fileName: "21_magicMarker"
          }, {
            name: "点聚合",
            thumbnail: "21_markercluster.jpg",
            fileName: "21_markercluster"
          }, {
            name: "自定义聚合",
            thumbnail: "21_markercluster_custom.jpg",
            fileName: "21_markercluster_custom"
          }, {
            name: "文字碰撞",
            thumbnail: "21_textCollision.jpg",
            fileName: "21_textCollision"
          }, {
            name: "canvas数据点",
            thumbnail: "21_customLayer-canvas.jpg",
            fileName: "21_customLayer-canvas"
          }, {
            name: "大数据点（高效率）",
            thumbnail: "21_canvas_markers.jpg",
            fileName: "21_canvas_markers"
          }]
        },
        polyline: {
          name: "线",
          content: [{
            name: "线(全国地震带)",
            thumbnail: "22_line.jpg",
            fileName: "22_line"
          }, {
            name: "动态显示线",
            thumbnail: "22_line_showPath.jpg",
            fileName: "22_line_showPath"
          }, {
            name: "动画效果线",
            thumbnail: "22_line_animation.gif",
            fileName: "22_line_animation"
          }, {
            name: "点在线上运动",
            thumbnail: "22_line_MovingMarker.gif",
            fileName: "22_line_MovingMarker"
          }, {
            name: "线动画绘制",
            thumbnail: "22_line_SnakeAnim.jpg",
            fileName: "22_line_SnakeAnim"
          }, {
            name: "平行线",
            thumbnail: "22_line_polylineoffset.jpg",
            fileName: "22_line_polylineoffset"
          }, {
            name: "曲线",
            thumbnail: "22_curve.jpg",
            fileName: "22_curve"
          }, {
            name: "渐变色",
            thumbnail: "22_polycolor.jpg",
            fileName: "22_polycolor"
          }, {
            name: "svg动态线",
            thumbnail: "21_customLayer-svg.jpg",
            fileName: "21_customLayer-svg"
          }]
        },
        polygon: {
          name: "面",
          content: [{
            name: "中国各省市面",
            thumbnail: "23_geojson_polygon.jpg",
            fileName: "23_geojson_polygon"
          }, {
            name: "世界各国面",
            thumbnail: "23_geojson_polygon2.jpg",
            fileName: "23_geojson_polygon2"
          }, {
            name: "自定义填充",
            thumbnail: "23_fillPattern.jpg",
            fileName: "23_fillPattern"
          }, {
            name: "椭圆",
            thumbnail: "23_vector_ellipse.jpg",
            fileName: "23_vector_ellipse"
          }, {
            name: "扇形",
            thumbnail: "23_vector_semicircle.jpg",
            fileName: "23_vector_semicircle"
          }, {
            name: "大数据面（高效率）",
            thumbnail: "23_geojson_canvas.jpg",
            fileName: "23_geojson_canvas"
          }]
        },
        imageOverlay: {
          name: "图片",
          content: [{
            name: "ImageOverlay编辑",
            thumbnail: "24_imageOverlay.jpg",
            fileName: "24_imageOverlay"
          }, {
            name: "带旋转角度",
            thumbnail: "24_imageOverlay_rotate.jpg",
            fileName: "24_imageOverlay_rotate"
          }, {
            name: "canvas绘制图片",
            thumbnail: "24_imageOverlay_canvas.jpg",
            fileName: "24_imageOverlay_canvas"
          }]
        },
        otherVector: {
          name: "其他",
          content: [{
            name: "OSMBuildings建筑立体",
            thumbnail: "25_osmbuildings.jpg",
            fileName: "25_osmbuildings"
          }, {
            name: "蒙板",
            thumbnail: "25_maskcanvas.jpg",
            fileName: "25_maskcanvas"
          }]
        },
        arcFeatureServer: {
          name: "ArcGIS Server支持",
          content: [{
            name: "ArcGIS MapServer",
            thumbnail: "13_layer_arcgis_dynamic.jpg",
            fileName: "13_layer_arcgis_dynamic"
          }, {
            name: "ArcGIS ImageServer",
            thumbnail: "13_layer_arcgis_image.jpg",
            fileName: "13_layer_arcgis_image"
          }, {
            name: "ArcGIS FeatureServer",
            thumbnail: "13_layer_arcgis_feature.jpg",
            fileName: "13_layer_arcgis_feature"
          }]
        },
        geoServer: {
          name: "GeoServer支持",
          content: [{
            name: "OGC WMS服务",
            thumbnail: "13_layer_wms.jpg",
            fileName: "13_layer_wms"
          }, {
            name: "OGC WFS服务",
            thumbnail: "13_layer_wfs.jpg",
            fileName: "13_layer_wfs"
          }]
        }
      }
    },
    drawEdit: {
      name: "分析及绘制",
      content: {
        drawfeature: {
          name: "编辑绘制",
          content: [{
            name: "标绘控件",
            thumbnail: "32_draw.jpg",
            fileName: "32_draw"
          }, {
            name: "图上选点",
            thumbnail: "31_selectPoint.jpg",
            fileName: "31_selectPoint"
          }, {
            name: "绘制线",
            thumbnail: "31_drawFeature.jpg",
            fileName: "31_drawFeature",
            params: "type=polyline"
          }, {
            name: "绘制面",
            thumbnail: "31_drawFeature2.jpg",
            fileName: "31_drawFeature",
            params: "type=polygon"
          }, {
            name: "标绘（绘制点、线、面、圆、矩形等）",
            thumbnail: "32_work_draw.jpg",
            fileName: "32_work_draw"
          }]
        },
        drawcontrol: {
          name: "客户端分析",
          content: [{
            name: "测量长度、面积",
            thumbnail: "33_measure.jpg",
            fileName: "33_measure"
          }, {
            name: "缓冲分析",
            thumbnail: "33_buffer.jpg",
            fileName: "33_buffer"
          }, {
            name: "最近点分析",
            thumbnail: "33_nearestPoint.jpg",
            fileName: "33_nearestPoint"
          }]
        }
      }
    },
    control: {
      name: "地图控件",
      content: {
        mapcontrol: {
          name: "地图辅助",
          content: [{
            name: "三维全景切换",
            thumbnail: "41_mapswich.jpg",
            fileName: "41_mapswich"
          }, {
            name: "鹰眼地图",
            thumbnail: "41_overviewmap.jpg",
            fileName: "41_overviewmap"
          }, {
            name: "鱼骨导航",
            thumbnail: "41_slider.jpg",
            fileName: "41_slider"
          }]
        },
        othercontrol: {
          name: "其他控件",
          content: [{
            name: "右键菜单",
            thumbnail: "42_contextmenu.jpg",
            fileName: "42_contextmenu"
          }, {
            name: "时间播放",
            thumbnail: "42_TimeDimension.jpg",
            fileName: "42_TimeDimension"
          }]
        }
      }
    },
    bigdata: {
      name: "可视化",
      content: {
        heat: {
          name: "常见",
          content: [{
            name: "热力图",
            thumbnail: "51_heat.jpg",
            fileName: "51_heat"
          }]
        },
        ECharts: {
          name: "ECharts",
          content: [{
            name: "饼形图标记",
            thumbnail: "61_marker_pie.jpg",
            fileName: "61_marker_pie"
          }, {
            name: "折线图标记",
            thumbnail: "61_marker_table.jpg",
            fileName: "61_marker_table"
          }, {
            name: "散点图全省经济指标",
            thumbnail: "62_sandian1.jpg",
            fileName: "62_sandian1"
          }, {
            name: "散点图城市空气质量",
            thumbnail: "62_sandian2.jpg",
            fileName: "62_sandian2"
          }, {
            name: "散点图态势",
            thumbnail: "62_sandian3.jpg",
            fileName: "62_sandian3"
          }, {
            name: "散点图微博签到",
            thumbnail: "62_sandianWeibo.jpg",
            fileName: "62_sandianWeibo"
          }, {
            name: "流出线",
            thumbnail: "63_line_chu.jpg",
            fileName: "63_line_chu"
          }, {
            name: "流入线",
            thumbnail: "63_line_ru.jpg",
            fileName: "63_line_ru"
          }, {
            name: "物流运输图",
            thumbnail: "63_line1.jpg",
            fileName: "63_line1"
          }, {
            name: "人口迁徙图",
            thumbnail: "63_line2.jpg",
            fileName: "63_line2"
          }, {
            name: "流向动态效果",
            thumbnail: "63_line3.jpg",
            fileName: "63_line3"
          }, {
            name: "道路拥堵图",
            thumbnail: "63_lineroad.jpg",
            fileName: "63_lineroad"
          }, {
            name: "公交路线热力图",
            thumbnail: "63_lineroad2.jpg",
            fileName: "63_lineroad2"
          }, {
            name: "铁路热力图Arc",
            thumbnail: "63_lineroad3.jpg",
            fileName: "63_lineroad3"
          }]
        },
        MapV: {
          name: "MapV",
          content: [{
            name: "蜂巢图",
            thumbnail: "71_gridHoneycomb.jpg",
            fileName: "71_gridHoneycomb"
          }, {
            name: "方格图",
            thumbnail: "71_gridPoint.jpg",
            fileName: "71_gridPoint"
          }, {
            name: "微博",
            thumbnail: "71_pointWeibo.jpg",
            fileName: "71_pointWeibo"
          }, {
            name: "动态点",
            thumbnail: "71_pointTime.jpg",
            fileName: "71_pointTime"
          }, {
            name: "简单线",
            thumbnail: "72_polyline.jpg",
            fileName: "72_polyline"
          }, {
            name: "强度线",
            thumbnail: "72_polylineIntensity.jpg",
            fileName: "72_polylineIntensity"
          }, {
            name: "动态轨迹",
            thumbnail: "72_lineTime.jpg",
            fileName: "72_lineTime"
          }, {
            name: "强边界图",
            thumbnail: "72_lineForceEdgeBunding.jpg",
            fileName: "72_lineForceEdgeBunding"
          }, {
            name: "迁徙图",
            thumbnail: "73_qianxi.jpg",
            fileName: "73_qianxi"
          }, {
            name: "大迁徙图",
            thumbnail: "73_qianxiTime.jpg",
            fileName: "73_qianxiTime"
          }, {
            name: "北京",
            thumbnail: "74_polygon.jpg",
            fileName: "74_polygon"
          }]
        }
      }
    },
    widgets: {
      name: "widgets功能",
      content: {
        widgetsTool: {
          name: "基础模块",
          content: [{
            name: "POI兴趣点查询",
            thumbnail: "91_widget_queryBaiduPOI.jpg",
            fileName: "91_onewidget.html"
          }, {
            name: "路线规划",
            thumbnail: "91_queryGaodeRoute.jpg",
            fileName: "91_onewidget2.html"
          }, {
            name: "底图控制",
            thumbnail: "91_widget_manageBasemaps.jpg",
            fileName: "91_widget_manageBasemaps",
            params: "widget=manageBasemaps"
          }, {
            name: "图层控制",
            thumbnail: "91_widget_manageLayers.jpg",
            fileName: "91_widget_manageLayers",
            params: "widget=widgets/manageLayers/widget.js"
          }, {
            name: "地区导航",
            thumbnail: "91_widget_navXZQH.jpg",
            fileName: "91_widget_navXZQH",
            params: "widget=widgets/navXZQH/widget.js"
          }, {
            name: "测量",
            thumbnail: "91_widget_measure.jpg",
            fileName: "91_widget_measure",
            params: "widget=widgets/measure/widget.js"
          }, {
            name: "标记",
            thumbnail: "91_widget_addmarker.jpg",
            fileName: "91_widget_addmarker",
            params: "widget=widgets/addmarker/widget.js"
          }, {
            name: "书签",
            thumbnail: "91_widget_bookmark.jpg",
            fileName: "91_widget_bookmark",
            params: "widget=widgets/bookmark/widget.js"
          }, {
            name: "双屏对比",
            thumbnail: "91_widget_mapCompare.jpg",
            fileName: "91_widget_mapCompare",
            params: "widget=widgets/mapCompare/widget.js"
          }, {
            name: "卷帘对比",
            thumbnail: "91_widget_mapSwipe.jpg",
            fileName: "91_widget_mapSwipe",
            params: "widget=widgets/mapSwipe/widget.js"
          }, {
            name: "标绘",
            thumbnail: "91_widget_plot.jpg",
            fileName: "91_widget_plot",
            params: "widget=widgets/plot/widget.js"
          }, {
            name: "打印",
            thumbnail: "91_widget_print.jpg",
            fileName: "91_widget_print",
            params: "widget=widgets/print/widget.js"
          }, {
            name: "街景",
            thumbnail: "91_widget_streetscape.jpg",
            fileName: "91_widget_streetscape",
            params: "widget=widgets/streetscape/widget.js"
          }]
        }
      }
    }
  };