const Crawler = require("./../lib/crawler");
const fs = require("fs");
const fse = require('fs-extra');
const path = require('path')

let crawler = new Crawler({
  maxConnections: 100,
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      // With a callback:
      // console.log(res.request.uri.pathname)
      fse.outputFile('files' + res.request.uri.pathname, res.body, (error) => {
        console.log(error) // => null
      })
      // console.log(res.options.uri.replace(uiHtmlPath, '').replace(res.options.filename, ''))
      // fs.createWriteStream(res.options.uri.replace(uiHtmlPath, '/')).write(res.body);
    }
    done();
  }
});

function clQuaue(url, filename) {
  crawler.queue({
    uri: url,
    filename: filename,
    encoding: null,
    jQuery: false
  });
}

function getFileName(file) { //通过第一种方式获取文件名
  let pos = -2
  if (file.lastIndexOf("\\") > -1) {
    pos = file.lastIndexOf("\\"); //查找最后一个\的位置
  } else {
    pos = file.lastIndexOf("/"); //查找最后一个\的位置
  }
  return file.substring(pos + 1); //截取最后一个\位置到字符长度，也就是截取文件名
}

const exampleConfig = [{
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
}, {
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
}, {
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
}, {
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
}, {
  name: "灰度转换",
  thumbnail: "15_tile_graycale.jpg",
  fileName: "15_tile_graycale"
}, {
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
}, {
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
}, {
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
}, {
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
}, {
  name: "OSMBuildings建筑立体",
  thumbnail: "25_osmbuildings.jpg",
  fileName: "25_osmbuildings"
}, {
  name: "蒙板",
  thumbnail: "25_maskcanvas.jpg",
  fileName: "25_maskcanvas"
}, {
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
}, {
  name: "OGC WMS服务",
  thumbnail: "13_layer_wms.jpg",
  fileName: "13_layer_wms"
}, {
  name: "OGC WFS服务",
  thumbnail: "13_layer_wfs.jpg",
  fileName: "13_layer_wfs"
}, {
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
}, {
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
}, {
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
}, {
  name: "右键菜单",
  thumbnail: "42_contextmenu.jpg",
  fileName: "42_contextmenu"
}, {
  name: "时间播放",
  thumbnail: "42_TimeDimension.jpg",
  fileName: "42_TimeDimension"
}, {
  name: "热力图",
  thumbnail: "51_heat.jpg",
  fileName: "51_heat"
}, {
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
}, {
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
}, {
  name: "POI兴趣点查询",
  thumbnail: "91_widget_queryBaiduPOI.jpg",
  fileName: "91_onewidget"
}, {
  name: "路线规划",
  thumbnail: "91_queryGaodeRoute.jpg",
  fileName: "91_onewidget2"
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
}];

const exampleConfig1 = [{
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
}, {
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
  name: "PGIS底图",
  thumbnail: "12_layer_pgis.jpg",
  fileName: "12_layer_pgis"
}, {
  name: "自定义crs(基于proj4)",
  thumbnail: "12_layer_proj4.jpg",
  fileName: "12_layer_proj4"
}, {
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
}, {
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
}, {
  name: "灰度转换",
  thumbnail: "15_tile_graycale.jpg",
  fileName: "15_tile_graycale"
}, {
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
}, {
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
}, {
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
}, {
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
}, {
  name: "OSMBuildings建筑立体",
  thumbnail: "25_osmbuildings.jpg",
  fileName: "25_osmbuildings"
}, {
  name: "蒙板",
  thumbnail: "25_maskcanvas.jpg",
  fileName: "25_maskcanvas"
}, {
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
}, {
  name: "OGC WMS服务",
  thumbnail: "13_layer_wms.jpg",
  fileName: "13_layer_wms"
}, {
  name: "OGC WFS服务",
  thumbnail: "13_layer_wfs.jpg",
  fileName: "13_layer_wfs"
}, {
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
}, {
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
}, {
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
}, {
  name: "右键菜单",
  thumbnail: "42_contextmenu.jpg",
  fileName: "42_contextmenu"
}, {
  name: "时间播放",
  thumbnail: "42_TimeDimension.jpg",
  fileName: "42_TimeDimension"
}, {
  name: "热力图",
  thumbnail: "51_heat.jpg",
  fileName: "51_heat"
}, {
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
}, {
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
}, {
  name: "POI兴趣点查询",
  thumbnail: "91_widget_queryBaiduPOI.jpg",
  fileName: "91_widget_queryBaiduPOI",
  params: "widget=widgets/queryBaiduPOI/widget.js"
}, {
  name: "路线规划",
  thumbnail: "91_queryGaodeRoute.jpg",
  fileName: "91_widget_queryGaodeRoute",
  params: "widget=widgets/queryGaodeRoute/widget.js"
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

const htmlPath = 'http://leaflet.marsgis.cn/leaflet-example/'
const jpgPath = 'http://leaflet.marsgis.cn/leaflet-example/nav/img/'
// for (let index = 0; index < exampleConfig1.length; index++) {
//   const element = exampleConfig1[index];

//   let hurl = htmlPath + element.fileName + '.html'
//   let imgurl = jpgPath + element.thumbnail
//   clQuaue(hurl, getFileName(hurl))
//   clQuaue(imgurl, getFileName(imgurl))
// }

const uiPageArr = [
  "./page/site-map.html", "./page/system/menu/index.html", "./page/system/account.html#message", "./page/system/settings/display.html", "login.html", "./page/examples/components/layouts/grids.html", "./page/examples/components/layouts/layout-grid.html", "./page/examples/components/layouts/headers.html", "./page/examples/components/layouts/bordered-header.html", "./page/examples/components/layouts/panel-transition.html", "./page/examples/components/layouts/boxed.html", "./page/examples/components/layouts/page-aside.html", "./page/examples/components/layouts/two-columns.html", "./page/examples/components/basic/panel/structure.html", "./page/examples/components/basic/panel/actions.html", "./page/examples/components/basic/panel/portlets.html", "./page/examples/components/basic/buttons.html", "./page/examples/components/basic/icons.html", "./page/examples/components/basic/dropdowns.html", "./page/examples/components/basic/list.html", "./page/examples/components/basic/tooltip-popover.html", "./page/examples/components/basic/modals.html", "./page/examples/components/basic/tabs-accordions.html", "./page/examples/components/basic/images.html", "./page/examples/components/basic/badges-labels.html", "./page/examples/components/basic/carousel.html", "./page/examples/components/basic/typography.html", "./page/examples/components/basic/progress-bars.html", "./page/examples/components/basic/colors.html", "./page/examples/components/basic/utilities.html", "./page/examples/components/advanced/animation.html", "./page/examples/components/advanced/highlight.html", "./page/examples/components/advanced/scrollbar.html", "./page/examples/components/advanced/rating.html", "./page/examples/components/advanced/context-menu.html", "./page/examples/components/advanced/layer.html", "./page/examples/components/advanced/masonry.html", "./page/examples/components/advanced/tree/jstree.html", "./page/examples/components/advanced/tree/treeview.html", "./page/examples/components/advanced/toastr.html", "./page/examples/components/advanced/sortable-nestable.html", "./page/examples/components/structure/alerts.html", "./page/examples/components/structure/ribbon.html", "./page/examples/components/structure/pricing-tables.html", "./page/examples/components/structure/overlay.html", "./page/examples/components/structure/cover.html", "./page/examples/components/structure/timeline/simple.html", "./page/examples/components/structure/timeline/icons.html", "./page/examples/components/structure/step.html", "./page/examples/components/structure/comments.html", "./page/examples/components/structure/media.html", "./page/examples/components/structure/chat.html", "./page/examples/components/structure/testimonials.html", "./page/examples/components/structure/nav.html", "./page/examples/components/structure/navbars.html", "./page/examples/components/structure/blockquotes.html", "./page/examples/components/structure/pagination.html", "./page/examples/components/structure/breadcrumbs.html", "./page/examples/components/widgets/statistics.html", "./page/examples/components/widgets/data.html", "./page/examples/components/widgets/blog.html", "./page/examples/components/widgets/chart.html", "./page/examples/components/widgets/social.html", "./page/examples/components/widgets/weather.html", "./page/examples/pages/home/index-v1.html", "./page/examples/pages/home/index-v2.html", "./page/examples/pages/home/ecommerce.html", "./page/examples/pages/home/analytics.html", "./page/examples/pages/home/team/index.html", "./page/examples/pages/general/blank.html", "./page/examples/pages/general/faq.html", "./page/examples/pages/general/gallery-grid.html", "./page/examples/pages/general/search-result.html", "./page/examples/pages/general/user.html", "./page/examples/pages/general/email.html", "./page/examples/pages/general/code-editor.html", "./page/error.html", "./page/examples/errors/no-auth.html", "./page/examples/errors/maintenance.html", "./page/locked.html", "./page/examples/pages/team/calendar/index.html", "./page/examples/pages/team/notebook.html", "./page/examples/pages/team/taskboard.html", "./page/examples/pages/team/documents/articles.html", "./page/examples/pages/team/documents/categories.html", "./page/examples/pages/team/documents/article.html", "./page/examples/pages/team/forum/index.html", "./page/examples/pages/team/message.html", "./page/examples/pages/team/mailbox/index.html", "./page/examples/pages/team/media.html", "./page/examples/pages/team/projects/index.html", "./page/examples/pages/team/work.html", "./page/examples/tables/basic/index.html", "./page/examples/tables/treegrid/index.html", "./page/examples/tables/data-tables/basic-init/zero-configuration.html", "./page/examples/tables/data-tables/advanced-init/events-live.html", "./page/examples/tables/data-tables/data-sources/dom.html", "./page/examples/tables/data-tables/api/add-row.html", "./page/examples/tables/data-tables/ajax/simple.html", "./page/examples/tables/data-tables/server-side/simple.html", "./page/examples/tables/data-tables/plug-ins/api.html", "./page/examples/tables/data-tables/others/fixed-header.html", "./page/examples/forms/general.html", "./page/examples/forms/material.html", "./page/examples/forms/advanced.html", "./page/examples/forms/layouts.html", "./page/examples/forms/wizard.html", "./page/examples/forms/validation.html", "./page/examples/forms/masks.html", "./page/examples/forms/editable.html", "./page/examples/forms/editor/summernote.html", "./page/examples/forms/editor/markdown.html", "./page/examples/forms/editor/ace.html", "./page/examples/forms/image-cropping.html", "./page/examples/forms/dropify.html", "./page/examples/charts/chartjs.html", "./page/examples/charts/gauges.html", "./page/examples/charts/flot.html", "./page/examples/charts/peity.html", "./page/examples/charts/sparkline.html", "./page/examples/charts/morris.html", "./page/examples/charts/chartist.html", "./page/examples/charts/rickshaw.html", "./page/examples/charts/c3.html", "./page/examples/charts/echarts.html", "./page/examples/menu.html", "./page/examples/menu.html", "./page/examples/menu.html", "./page/examples/menu.html", "./page/examples/menu.html", "./page/examples/menu.html", "./page/examples/menu.html", "./page/system/menu/index.html", "./page/system/user/index.html", "./page/system/log.html", "./page/system/blacklist.html", "./page/system/settings/display.html", "./page/system/settings/log.html", "./page/system/account.html", "./page/examples/home.html"
]

const uiHtmlPath = 'http://marsgis.cn/ui/'
// for (let index = 0; index < uiPageArr.length; index++) {
//   let element = uiPageArr[index];
//   let hname = getFileName(element)
//   let hurl = uiHtmlPath + element.replace('./page/', 'page/')
//   // console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }

var foundArr = [
  'http://marsgis.cn/ui/lib/bootstrap/ladda-bootstrap/ladda.css',
  'http://marsgis.cn/ui/css/examples/components/basic/buttons.css',
  'http://marsgis.cn/ui/lib/fonts/7-stroke/7-stroke.css',
  'http://marsgis.cn/ui/lib/fonts/glyphicons/glyphicons.css',
  'http://marsgis.cn/ui/lib/fonts/ionicons/ionicons.css',
  'http://marsgis.cn/ui/lib/fonts/material-design/material-design.css',
  'http://marsgis.cn/ui/lib/fonts/mfglabs/mfglabs.css',
  'http://marsgis.cn/ui/lib/fonts/open-iconic/open-iconic.css',
  'http://marsgis.cn/ui/lib/fonts/weather-icons/weather-icons.css',
  'http://marsgis.cn/ui/lib/fonts/octicons/octicons.css',
  'http://marsgis.cn/ui/css/examples/components/basic/icons.css',
  'http://marsgis.cn/ui/css/examples/components/basic/dropdowns.css',
  'http://marsgis.cn/ui/lib/webui-popover/webui-popover.css',
  'http://marsgis.cn/ui/lib/toolbar/toolbar.css',
  'http://marsgis.cn/ui/lib/webui-popover/webui-popover.css',
  'http://marsgis.cn/ui/lib/toolbar/toolbar.css',
  'http://marsgis.cn/ui/css/examples/components/basic/modals.css',
  'http://marsgis.cn/ui/css/examples/components/basic/badges-labels.css',
  'http://marsgis.cn/ui/lib/owl-carousel/owl.carousel.css',
  'http://marsgis.cn/ui/lib/slick-carousel/slick.css',
  'http://marsgis.cn/ui/css/examples/components/basic/carousel.css',
  'http://marsgis.cn/ui/css/examples/components/basic/colors.css',
  'http://marsgis.cn/ui/css/examples/components/basic/utilities.css',
  'http://marsgis.cn/ui/css/examples/components/advanced/animation.css',
  'http://marsgis.cn/ui/lib/highlight/default.css',
  'http://marsgis.cn/ui/lib/highlight/github-gist.css',
  'http://marsgis.cn/ui/lib/highlight/highlight.css',
  'http://marsgis.cn/ui/css/examples/components/advanced/highlight.css',
  'http://marsgis.cn/ui/css/examples/components/advanced/scrollbar.css',
  'http://marsgis.cn/ui/css/examples/components/advanced/rating.css',
  'http://marsgis.cn/ui/css/examples/components/advanced/masonry.css',
  'http://marsgis.cn/ui/lib/jstree/jstree.css',
  'http://marsgis.cn/ui//data/examples/components/jstree-root.json',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-treeview/bootstrap-treeview.css',
  'http://marsgis.cn/ui/css/examples/components/advanced/toastr.css',
  'http://marsgis.cn/ui/lib/nestable/nestable.css',
  'http://marsgis.cn/ui/lib/html5sortable/sortable.css',
  'http://marsgis.cn/ui/lib/tasklist/tasklist.css',
  'http://marsgis.cn/ui/css/examples/components/structure/alerts.css',
  'http://marsgis.cn/ui/css/examples/components/structure/ribbon.css',
  'http://marsgis.cn/ui/lib/plyr/plyr.css',
  'http://marsgis.cn/ui/lib/plyr/plyr.css',
  'http://marsgis.cn/ui/css/examples/components/structure/timeline.css',
  'http://marsgis.cn/ui/lib/plyr/plyr.css',
  'http://marsgis.cn/ui/css/examples/components/structure/chat.css',
  'http://marsgis.cn/ui/css/examples/components/structure/testimonials.css',
  'http://marsgis.cn/ui/css/examples/components/structure/navbars.css',
  'http://marsgis.cn/ui/css/examples/components/structure/breadcrumbs.css',
  'http://marsgis.cn/ui/lib/tasklist/tasklist.css',
  'http://marsgis.cn/ui/css/examples/components/widgets/data.css',
  'http://marsgis.cn/ui/lib/plyr/plyr.css',
  'http://marsgis.cn/ui/lib/chartist-js/chartist.css',
  'http://marsgis.cn/ui/css/examples/components/widgets/chart.css',
  'http://marsgis.cn/ui/css/examples/components/widgets/social.css',
  'http://marsgis.cn/ui/lib/fonts/weather-icons/weather-icons.css',
  'http://marsgis.cn/ui/css/examples/components/widgets/weather.css',
]

// for (let index = 0; index < foundArr.length; index++) {
//   let element = foundArr[index];
//   let hname = getFileName(element)
//   let hurl = element
//   // console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }

const iconPages = ['http://marsgis.cn/ui/lib/bootstrap/bootstrap-slider/bootstrap-slider.css',
  'http://marsgis.cn/ui/css/examples/components/basic/icon.css',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-slider/bootstrap-slider.min.js',
  'http://marsgis.cn/ui/js/examples/components/basic/icon.js'
]

// for (let index = 0; index < iconPages.length; index++) {
//   let element = iconPages[index];
//   let hname = getFileName(element)
//   let hurl = element
//   // console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }

const exPages = [
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.css',
  'http://marsgis.cn/ui/css/examples/pages/home/v1.css',
  'http://marsgis.cn/ui/lib/flag-icon-css/flag-icon.css',
  'http://marsgis.cn/ui/css/examples/pages/home/v2.css',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.css',
  'http://marsgis.cn/ui/css/examples/pages/home/ecommerce.css',
  'http://marsgis.cn/ui/lib/morris-js/morris.css',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.css',
  'http://marsgis.cn/ui/css/examples/pages/home/analytics.css',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.css',
  'http://marsgis.cn/ui/css/examples/pages/home/team.css',
  'http://marsgis.cn/ui/css/examples/pages/general/gallery-grid.css',
  'http://marsgis.cn/ui/css/examples/pages/general/search-result.css',
  'http://marsgis.cn/ui/css/examples/pages/general/user.css',
  'http://marsgis.cn/ui/css/examples/pages/general/email.css',
  'http://marsgis.cn/ui/lib/codemirror/codemirror.css',
  'http://marsgis.cn/ui/lib/codemirror/theme/eclipse.css',
  'http://marsgis.cn/ui/lib/codemirror/addon/scroll/simplescrollbars.css',
  'http://marsgis.cn/ui/css/examples/pages/general/code-editor.css',
  'http://marsgis.cn/ui/css/errors.css',
  'http://marsgis.cn/ui/css/errors.css',
  'http://marsgis.cn/ui/css/errors.css',
  'http://marsgis.cn/ui/lib/fullcalendar/fullcalendar.css',
  'http://marsgis.cn/ui/css/examples/pages/team/calendar.css',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/bootstrap-markdown.css',
  'http://marsgis.cn/ui/css/examples/pages/team/notebook.css',
  'http://marsgis.cn/ui/lib/jquery/jquery-selective/jquery-selective.css',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-datepicker/bootstrap-datepicker.css',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/bootstrap-markdown.css',
  'http://marsgis.cn/ui/css/examples/pages/team/taskboard.css',
  'http://marsgis.cn/ui/lib/slidepanel/slidePanel.css',
  'http://marsgis.cn/ui/css/examples/pages/team/documents.css',
  'http://marsgis.cn/ui/css/examples/pages/team/documents.css',
  'http://marsgis.cn/ui/css/examples/pages/team/documents.css',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/bootstrap-markdown.css',
  'http://marsgis.cn/ui/css/examples/pages/team/forum.css',
  'http://marsgis.cn/ui/css/examples/pages/team/message.css',
  'http://marsgis.cn/ui/lib/select2/select2.css',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/bootstrap-markdown.css',
  'http://marsgis.cn/ui/css/examples/pages/team/mailbox.css',
  'http://marsgis.cn/ui/lib/slidepanel/slidePanel.css',
  'http://marsgis.cn/ui/css/examples/pages/team/media.css',
  'http://marsgis.cn/ui/css/examples/pages/team/projects.css',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.css',
  'http://marsgis.cn/ui/lib/jquery/jquery-selective/jquery-selective.css',
  'http://marsgis.cn/ui/css/examples/pages/team/work.css',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.js',
  'http://marsgis.cn/ui/js/examples/pages/home/home-v1.js',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.js',
  'http://marsgis.cn/ui/js/examples/pages/home/home-v1.js',
  'http://marsgis.cn/ui/js/examples/pages/home/home-v2.js',
  'http://marsgis.cn/ui/img/products/imac.png',
  'http://marsgis.cn/ui/img/products/iphone.png',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.js',
  'http://marsgis.cn/ui/img/products/macmouse.png',
  'http://marsgis.cn/ui/js/examples/pages/home/ecommerce.js',
  'http://marsgis.cn/ui/img/products/applewatch.png',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.js',
  'http://marsgis.cn/ui/js/examples/pages/home/ecommerce.js',
  'http://marsgis.cn/ui/img/browser/360.png',
  'http://marsgis.cn/ui/img/browser/sogou.png',
  'http://marsgis.cn/ui/lib/raphael/raphael.min.js',
  'http://marsgis.cn/ui/lib/morris-js/morris.min.js',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.js',
  'http://marsgis.cn/ui/img/browser/baidu.png',
  'http://marsgis.cn/ui/img/browser/ie.png',
  'http://marsgis.cn/ui/js/examples/pages/home/analytics.js',
  'http://marsgis.cn/ui/img/browser/qq.png',
  'http://marsgis.cn/ui/img/country/china-icon.png',
  'http://marsgis.cn/ui/lib/raphael/raphael.min.js',
  'http://marsgis.cn/ui/img/country/usa-icon.png',
  'http://marsgis.cn/ui/img/country/canada-icon.png',
  'http://marsgis.cn/ui/img/country/uk-icon.png',
  'http://marsgis.cn/ui/img/country/germany-icon.png',
  'http://marsgis.cn/ui/lib/morris-js/morris.min.js',
  'http://marsgis.cn/ui/img/country/australia-icon.png',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.js',
  'http://marsgis.cn/ui/js/examples/pages/home/analytics.js',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.js',
  'http://marsgis.cn/ui/js/examples/pages/home/team/index.js',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.js',
  'http://marsgis.cn/ui/img/photos/animal-4.jpg',
  'http://marsgis.cn/ui/img/photos/animal-3.jpg',
  'http://marsgis.cn/ui/img/photos/animal-2.jpg',
  'http://marsgis.cn/ui/js/examples/pages/home/team/index.js',
  'http://marsgis.cn/ui/js/examples/pages/general/faq.js',
  'http://marsgis.cn/ui/img/logo-min.svg',
  'http://marsgis.cn/ui/img/photos/city-7.jpg',
  'http://marsgis.cn/ui/img/photos/city-8.jpg',
  'http://marsgis.cn/ui/img/photos/city-9.jpg',
  'http://marsgis.cn/ui/lib/codemirror/codemirror.js',
  'http://marsgis.cn/ui/lib/codemirror/addon/scroll/simplescrollbars.js',
  'http://marsgis.cn/ui/lib/codemirror/mode/css/css.js',
  'http://marsgis.cn/ui/lib/codemirror/mode/xml/xml.js',
  'http://marsgis.cn/ui/lib/codemirror/mode/htmlmixed/htmlmixed.js',
  'http://marsgis.cn/ui/js/examples/pages/general/code-editor.js',
  'http://marsgis.cn/ui/lib/codemirror/codemirror.js',
  'http://marsgis.cn/ui/lib/codemirror/addon/scroll/simplescrollbars.js',
  'http://marsgis.cn/ui/lib/codemirror/mode/xml/xml.js',
  'http://marsgis.cn/ui/lib/codemirror/mode/css/css.js',
  'http://marsgis.cn/ui/lib/codemirror/mode/htmlmixed/htmlmixed.js',
  'http://marsgis.cn/ui/js/examples/pages/general/code-editor.js',
  'http://marsgis.cn/ui/js/error.js',
  'http://marsgis.cn/ui/lib/moment/moment.min.js',
  'http://marsgis.cn/ui/lib/fullcalendar/fullcalendar.min.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/action-btn.js',
  'http://marsgis.cn/ui/lib/fullcalendar/lang/zh-cn.min.js',
  'http://marsgis.cn/ui/js/examples/pages/team/calendar/index.js',
  'http://marsgis.cn/ui/lib/moment/moment.min.js',
  'http://marsgis.cn/ui/lib/fullcalendar/fullcalendar.min.js',
  'http://marsgis.cn/ui/lib/fullcalendar/lang/zh-cn.min.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/action-btn.js',
  'http://marsgis.cn/ui/js/examples/pages/team/calendar/index.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/bootstrap-markdown.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/locale/bootstrap-markdown.zh.js',
  'http://marsgis.cn/ui/lib/marked/marked.min.js',
  'http://marsgis.cn/ui/lib/to-markdown/to-markdown.min.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/action-btn.js',
  'http://marsgis.cn/ui/js/examples/pages/team/notebook.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/bootstrap-markdown.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/locale/bootstrap-markdown.zh.js',
  'http://marsgis.cn/ui/lib/marked/marked.min.js',
  'http://marsgis.cn/ui/lib/to-markdown/to-markdown.min.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/action-btn.js',
  'http://marsgis.cn/ui/js/examples/pages/team/notebook.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-selective/jquery-selective.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-datepicker/bootstrap-datepicker.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js',
  'http://marsgis.cn/ui/lib/slidepanel/jquery-slidePanel.min.js',
  'http://marsgis.cn/ui/js/examples/pages/team/taskboard.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/locale/bootstrap-markdown.zh.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/bootstrap-markdown.min.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-selective/jquery-selective.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-datepicker/bootstrap-datepicker.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/bootstrap-markdown.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-markdown/locale/bootstrap-markdown.zh.js',
  'http://marsgis.cn/ui/lib/slidepanel/jquery-slidePanel.min.js',
  'http://marsgis.cn/ui/js/examples/pages/team/taskboard.js',
  'http://marsgis.cn/ui/js/examples/pages/team/documents.js',
  'http://marsgis.cn/ui/lib/autosize/autosize.min.js',
  'http://marsgis.cn/ui/js/examples/pages/team/message.js',
  'http://marsgis.cn/ui/lib/autosize/autosize.min.js',
  'http://marsgis.cn/ui/js/examples/pages/team/message.js',
  'http://marsgis.cn/ui/lib/slidepanel/jquery-slidePanel.min.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/selectable.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/action-btn.js',
  'http://marsgis.cn/ui/js/examples/pages/team/mailbox/index.js',
  'http://marsgis.cn/ui/lib/slidepanel/jquery-slidePanel.min.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/action-btn.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/selectable.js',
  'http://marsgis.cn/ui/js/examples/pages/team/mailbox/index.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/action-btn.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/sticky-header.js',
  'http://marsgis.cn/ui/js/examples/pages/team/media.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/selectable.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/action-btn.js',
  'http://marsgis.cn/ui/img/photos/view-15.jpg',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/sticky-header.js',
  'http://marsgis.cn/ui/lib/admui/js/global/plugins/selectable.js',
  'http://marsgis.cn/ui/js/examples/pages/team/media.js',
  'http://marsgis.cn/ui/js/examples/pages/team/projects/index.js',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-selective/jquery-selective.min.js',
  'http://marsgis.cn/ui/js/examples/pages/team/work.js',
  'http://marsgis.cn/ui/lib/chartist-plugin-tooltip/chartist-plugin-tooltip.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-selective/jquery-selective.min.js',
  'http://marsgis.cn/ui/js/examples/pages/team/work.js'
]

const exPages1 = [
  'http://marsgis.cn/ui/img/dashboard2-header.jpg',
  'http://marsgis.cn/ui/examples/pages/home/team/_edit-todo.html',
  'http://marsgis.cn/ui/examples/pages/home/team/_add-todo.html',
  'http://marsgis.cn/ui/examples/pages/team/calendar/_add-calendar.html',
  'http://marsgis.cn/ui/examples/pages/team/calendar/_add-event.html',
  'http://marsgis.cn/ui/examples/pages/team/calendar/_edit-event.html',
  'http://marsgis.cn/ui/data/examples/pages/taskboard.json',
  'http://marsgis.cn/ui/data/examples/pages/mailbox.json',
  'http://marsgis.cn/ui/examples/pages/team/mailbox/_add-mail.html',
]

const exPages2 = [
  'http://marsgis.cn/ui/lib/jquery/jquery-treegrid/jquery.treegrid.min.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-cookie/jquery.cookie.min.js',
  'http://marsgis.cn/ui/js/examples/tables/treegrid.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-treegrid/jquery.treegrid.min.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-cookie/jquery.cookie.min.js',
  'http://marsgis.cn/ui/js/examples/tables/treegrid.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/events-live.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/events-live.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/add-row.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/add-row.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/server-side/simple.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/server-side/simple.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/plug-ins/api.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/plug-ins/api.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-fixedheader/dataTables.fixedHeader.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/others/fixed-header.js',
  'http://marsgis.cn/ui/lib/datatables/jquery.dataTables.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-fixedheader/dataTables.fixedHeader.min.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/common.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/others/fixed-header.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.css',
  'http://marsgis.cn/ui/css/examples/tables/data-tables/examples.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.css',
  'http://marsgis.cn/ui/css/examples/tables/data-tables/examples.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-fixedheader/dataTables.fixedHeader.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.css',
  'http://marsgis.cn/ui/css/examples/tables/data-tables/examples.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.css',
  'http://marsgis.cn/ui/css/examples/tables/data-tables/examples.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.css',
  'http://marsgis.cn/ui/css/examples/tables/data-tables/examples.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.css',
  'http://marsgis.cn/ui/css/examples/tables/data-tables/examples.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.css',
  'http://marsgis.cn/ui/css/examples/tables/data-tables/examples.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-bootstrap/dataTables.bootstrap.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-responsive/dataTables.responsive.css',
  'http://marsgis.cn/ui/lib/datatables/datatables-fixedheader/dataTables.fixedHeader.css',
  'http://marsgis.cn/ui/css/examples/tables/data-tables/examples.css',
  'http://marsgis.cn/ui/lib/jquery/jquery-treegrid/jquery-treegrid.css',
]

const exPages3 = [
  'http://marsgis.cn/ui/lib/jquery/jquery-treegrid/img/collapse.png',
  'http://marsgis.cn/ui/data/examples/tables/dt-ajax.json',
]

const exPages4 = [
  'http://marsgis.cn/ui/lib/select2/select2.full.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-tokenfield/bootstrap-tokenfield.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-tagsinput/bootstrap-tagsinput.min.js',
  'http://marsgis.cn/ui/lib/select2/i18n/zh-CN.min.js',
  'http://marsgis.cn/ui/lib/clockpicker/bootstrap-clockpicker.min.js',
  'http://marsgis.cn/ui/lib/icheck/icheck.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-colorpicker/bootstrap-colorpicker.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-maxlength/bootstrap-maxlength.min.js',
  'http://marsgis.cn/ui/lib/card/jquery.card.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-knob/jquery.knob.min.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-labelauty/jquery-labelauty.min.js',
  'http://marsgis.cn/ui/lib/jt-timepicker/jquery.timepicker.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-daterangepicker/moment.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-daterangepicker/daterangepicker.min.js',
  'http://marsgis.cn/ui/lib/datepair-js/jquery.datepair.min.js',
  'http://marsgis.cn/ui/lib/fontawesome-iconpicker/fontawesome-iconpicker.min.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-strength/jquery-strength.min.js',
  'http://marsgis.cn/ui/lib/typeahead-js/bloodhound.min.js',
  'http://marsgis.cn/ui/lib/multi-select/jquery.multi-select.min.js',
  'http://marsgis.cn/ui/lib/typeahead-js/typeahead.jquery.min.js',
  'http://marsgis.cn/ui/js/examples/forms/advanced.js',
  'http://marsgis.cn/ui/lib/select2/select2.full.min.js',
  'http://marsgis.cn/ui/lib/select2/i18n/zh-CN.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-tokenfield/bootstrap-tokenfield.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-tagsinput/bootstrap-tagsinput.min.js',
  'http://marsgis.cn/ui/lib/icheck/icheck.min.js',
  'http://marsgis.cn/ui/lib/clockpicker/bootstrap-clockpicker.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-colorpicker/bootstrap-colorpicker.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-maxlength/bootstrap-maxlength.min.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-knob/jquery.knob.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js',
  'http://marsgis.cn/ui/lib/card/jquery.card.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-labelauty/jquery-labelauty.min.js',
  'http://marsgis.cn/ui/lib/jt-timepicker/jquery.timepicker.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-daterangepicker/moment.min.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-daterangepicker/daterangepicker.min.js',
  'http://marsgis.cn/ui/lib/datepair-js/jquery.datepair.min.js',
  'http://marsgis.cn/ui/lib/fontawesome-iconpicker/fontawesome-iconpicker.min.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-strength/jquery-strength.min.js',
  'http://marsgis.cn/ui/lib/multi-select/jquery.multi-select.min.js',
  'http://marsgis.cn/ui/lib/typeahead-js/bloodhound.min.js',
  'http://marsgis.cn/ui/lib/typeahead-js/typeahead.jquery.min.js',
  'http://marsgis.cn/ui/js/examples/forms/advanced.js',
  'http://marsgis.cn/ui/lib/formvalidation/framework/bootstrap.min.js',
  'http://marsgis.cn/ui/lib/formvalidation/formValidation.min.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-wizard/jquery-wizard.min.js',
  'http://marsgis.cn/ui/js/examples/forms/wizard.js',
  'http://marsgis.cn/ui/lib/formvalidation/formValidation.min.js',
  'http://marsgis.cn/ui/lib/formvalidation/framework/bootstrap.min.js',
  'http://marsgis.cn/ui/lib/jquery/jquery-wizard/jquery-wizard.min.js',
  'http://marsgis.cn/ui/js/examples/forms/wizard.js',
  'http://marsgis.cn/ui/lib/formvalidation/formValidation.min.js',
  'http://marsgis.cn/ui/lib/formvalidation/framework/bootstrap.min.js',
  'http://marsgis.cn/ui/js/examples/forms/validation.js',
  'http://marsgis.cn/ui/lib/formvalidation/formValidation.min.js',
  'http://marsgis.cn/ui/lib/formvalidation/framework/bootstrap.min.js',
  'http://marsgis.cn/ui/js/examples/forms/validation.js',
  'http://marsgis.cn/ui/lib/formatter-js/jquery.formatter.min.js',
  'http://marsgis.cn/ui/lib/select2/select2.min.js',
  'http://marsgis.cn/ui/lib/x-editable/bootstrap-editable.min.js',
  'http://marsgis.cn/ui/lib/typeahead-js/typeaheadjs.min.js',
  'http://marsgis.cn/ui/lib/typeahead-js/bloodhound.min.js',
  'http://marsgis.cn/ui/lib/typeahead-js/typeahead.jquery.min.js',
  'http://marsgis.cn/ui/js/examples/forms/editable.js',
  'http://marsgis.cn/ui/lib/x-editable/address.min.js',
  'http://marsgis.cn/ui/lib/select2/select2.min.js',
  'http://marsgis.cn/ui/lib/x-editable/bootstrap-editable.min.js',
  'http://marsgis.cn/ui/lib/typeahead-js/bloodhound.min.js',
  'http://marsgis.cn/ui/lib/typeahead-js/typeahead.jquery.min.js',
  'http://marsgis.cn/ui/lib/typeahead-js/typeaheadjs.min.js',
  'http://marsgis.cn/ui/lib/x-editable/address.min.js',
  'http://marsgis.cn/ui/js/examples/forms/editable.js',
  'http://marsgis.cn/ui/lib/summernote/summernote.min.js',
  'http://marsgis.cn/ui/lib/summernote/lang/summernote-zh-CN.min.js',
  'http://marsgis.cn/ui/js/examples/forms/editor-summernote.js',
  'http://marsgis.cn/ui/lib/summernote/summernote.min.js',
  'http://marsgis.cn/ui/lib/summernote/lang/summernote-zh-CN.min.js',
  'http://marsgis.cn/ui/js/examples/forms/editor-summernote.js',
  'http://marsgis.cn/ui/lib/ace/ace.js',
  'http://marsgis.cn/ui/lib/cropper/cropper.js',
  'http://marsgis.cn/ui/js/examples/forms/image-cropping.js',
  'http://marsgis.cn/ui/lib/cropper/cropper.js',
  'http://marsgis.cn/ui/js/examples/forms/image-cropping.js',
  'http://marsgis.cn/ui/lib/blueimp-tmpl/tmpl.min.js',
  'http://marsgis.cn/ui/lib/blueimp-load-image/load-image.all.min.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload.js',
  'http://marsgis.cn/ui/lib/blueimp-canvas-to-blob/canvas-to-blob.min.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-audio.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-video.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-process.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-image.js',
  'http://marsgis.cn/ui/lib/dropify/dropify.min.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-ui.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-validate.js',
  'http://marsgis.cn/ui/js/examples/forms/dropify.js',
  'http://marsgis.cn/ui/lib/blueimp-tmpl/tmpl.min.js',
  'http://marsgis.cn/ui/lib/blueimp-canvas-to-blob/canvas-to-blob.min.js',
  'http://marsgis.cn/ui/lib/blueimp-load-image/load-image.all.min.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-process.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-image.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-audio.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-video.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-validate.js',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload-ui.js',
  'http://marsgis.cn/ui/lib/dropify/dropify.min.js',
  'http://marsgis.cn/ui/js/examples/forms/dropify.js',
]

const exPages5 = [
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-tokenfield/bootstrap-tokenfield.css',
  'http://marsgis.cn/ui/data/examples/forms/cities.json',
  'http://marsgis.cn/ui/data/examples/forms/cities.json',
  'http://marsgis.cn/ui/data/examples/forms/countries.json',
  'http://marsgis.cn/ui/lib/ace/ext-language_tools.js',
  'http://marsgis.cn/ui/lib/ace/mode-javascript.js',
  'http://marsgis.cn/ui/lib/ace/mode-html.js',
  'http://marsgis.cn/ui/lib/ace/theme-twilight.js',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-tagsinput/bootstrap-tagsinput.css',
  'http://marsgis.cn/ui/lib/icheck/icheck.css',
  'http://marsgis.cn/ui/lib/clockpicker/clockpicker.css',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-colorpicker/colorpicker.css',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-touchspin/bootstrap-touchspin.css',
  'http://marsgis.cn/ui/lib/card/card.css',
  'http://marsgis.cn/ui/lib/jquery/jquery-labelauty/jquery-labelauty.css',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-maxlength/bootstrap-maxlength.css',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-daterangepicker/daterangepicker.css',
  'http://marsgis.cn/ui/lib/fontawesome-iconpicker/iconpicker.css',
  'http://marsgis.cn/ui/lib/jt-timepicker/jquery-timepicker.css',
  'http://marsgis.cn/ui/lib/jquery/jquery-strength/jquery-strength.css',
  'http://marsgis.cn/ui/lib/multi-select/multi-select.css',
  'http://marsgis.cn/ui/lib/typeahead-js/typeahead.css',
  'http://marsgis.cn/ui/css/examples/forms/advanced.css',
  'http://marsgis.cn/ui/css/examples/forms/layouts.css',
  'http://marsgis.cn/ui/lib/jquery/jquery-wizard/jquery-wizard.css',
  'http://marsgis.cn/ui/css/examples/forms/validation.css',
  'http://marsgis.cn/ui/css/examples/forms/masks.css',
  'http://marsgis.cn/ui/lib/x-editable/x-editable.css',
  'http://marsgis.cn/ui/lib/typeahead-js/typeahead.css',
  'http://marsgis.cn/ui/lib/summernote/summernote.css',
  'http://marsgis.cn/ui/lib/ace/ace.css',
  'http://marsgis.cn/ui/lib/cropper/cropper.css',
  'http://marsgis.cn/ui/lib/blueimp-file-upload/jquery.fileupload.css',
  'http://marsgis.cn/ui/css/examples/forms/image-cropping.css',
  'http://marsgis.cn/ui/lib/dropify/dropify.css',
]

const exPages6 = [
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-colorpicker/images/saturation.png',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-colorpicker/images/hue.png',
  'http://marsgis.cn/ui/lib/bootstrap/bootstrap-colorpicker/images/alpha.png',
  'http://marsgis.cn/ui/lib/icheck/images/blue.png',
  'http://marsgis.cn/ui/lib/icheck/images/green.png',
  'http://marsgis.cn/ui/lib/icheck/images/orange.png',
  'http://marsgis.cn/ui/lib/icheck/images/red.png',
  'http://marsgis.cn/ui/lib/icheck/images/grey.png',
  'http://marsgis.cn/ui/lib/jquery/jquery-labelauty/images/input-unchecked.png',
  'http://marsgis.cn/ui/lib/jquery/jquery-labelauty/images/input-checked.png',
  'http://marsgis.cn/ui/lib/ace/worker-javascript.js',
  'http://marsgis.cn/ui/lib/ace/snippets/text.js',
  'http://marsgis.cn/ui/lib/ace/worker-html.js',
  'http://marsgis.cn/ui/lib/ace/worker-html.js',
  'http://marsgis.cn/ui/lib/ace/snippets/javascript.js',
  'http://marsgis.cn/ui/lib/ace/snippets/html.js',
]

const exPages7 = [
  'http://marsgis.cn/ui/js/examples/charts/chartjs.js',
  'http://marsgis.cn/ui/css/examples/charts/chartjs.css',
  'http://marsgis.cn/ui/lib/gauge-js/gauge.css',
  'http://marsgis.cn/ui/css/examples/charts/flot.css',
  'http://marsgis.cn/ui/lib/flot/flot.css',
  'http://marsgis.cn/ui/lib/sparkline/sparkline.css',
  'http://marsgis.cn/ui/css/examples/charts/sparkline.css',
  'http://marsgis.cn/ui/css/examples/charts/chartist.css',
  'http://marsgis.cn/ui/lib/rickshaw/rickshaw.css',
  'http://marsgis.cn/ui/lib/c3/c3.css',
  'http://marsgis.cn/ui/lib/chart-js/Chart.js',
  'http://marsgis.cn/ui/js/examples/charts/chartjs.js',
  'http://marsgis.cn/ui/lib/gauge-js/gauge.min.js',
  'http://marsgis.cn/ui/js/examples/charts/gauges.js',
  'http://marsgis.cn/ui/lib/gauge-js/gauge.min.js',
  'http://marsgis.cn/ui/js/examples/charts/gauges.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.min.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.resize.min.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.time.min.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.pie.min.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.stack.min.js',
  'http://marsgis.cn/ui/js/examples/charts/flot.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.selection.min.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.min.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.resize.min.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.time.min.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.stack.min.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.pie.min.js',
  'http://marsgis.cn/ui/lib/flot/jquery.flot.selection.min.js',
  'http://marsgis.cn/ui/js/examples/charts/flot.js',
  'http://marsgis.cn/ui/js/examples/charts/sparkline.js',
  'http://marsgis.cn/ui/js/examples/charts/morris.js',
  'http://marsgis.cn/ui/js/examples/charts/chartist.js',
  'http://marsgis.cn/ui/lib/d3/d3.js',
  'http://marsgis.cn/ui/lib/rickshaw/rickshaw.js',
  'http://marsgis.cn/ui/js/examples/charts/rickshaw.js',
  'http://marsgis.cn/ui/lib/d3/d3.js',
  'http://marsgis.cn/ui/lib/rickshaw/rickshaw.js',
  'http://marsgis.cn/ui/js/examples/charts/rickshaw.js',
  'http://marsgis.cn/ui/lib/d3/d3.js',
  'http://marsgis.cn/ui/lib/c3/c3.min.js',
  'http://marsgis.cn/ui/js/examples/charts/c3.js',
  'http://marsgis.cn/ui/lib/d3/d3.js',
  'http://marsgis.cn/ui/lib/c3/c3.min.js',
  'http://marsgis.cn/ui/js/examples/charts/c3.js',
  'http://marsgis.cn/ui/lib/echarts/echarts.min.js',
  'http://marsgis.cn/ui/lib/echarts/map/js/china.js',
  'http://marsgis.cn/ui/js/examples/charts/echarts.js',
  'http://marsgis.cn/ui/lib/echarts/bmap.min.js',
  'http://marsgis.cn/ui/lib/echarts/echarts.min.js',
  'http://marsgis.cn/ui/lib/echarts/map/js/china.js',
  'http://marsgis.cn/ui/lib/echarts/bmap.min.js',
  'http://marsgis.cn/ui/js/examples/charts/echarts.js',
]

const exPages8 = [
  'http://marsgis.cn/ui/lib/datatables/datatables-buttons/buttons.print.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-buttons/dataTables.buttons.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-buttons/buttons.html5.min.js',
  'http://marsgis.cn/ui/lib/jszip/jszip.min.js',
  'http://marsgis.cn/ui/js/system/user/index.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-buttons/dataTables.buttons.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-buttons/buttons.print.min.js',
  'http://marsgis.cn/ui/lib/datatables/datatables-buttons/buttons.html5.min.js',
  'http://marsgis.cn/ui/lib/jszip/jszip.min.js',
  'http://marsgis.cn/ui/js/system/user/index.js',
  'http://marsgis.cn/ui/js/system/log.js',
  'http://marsgis.cn/ui/js/system/blacklist.js',
  'http://marsgis.cn/ui/js/system/settings/display.js',
  'http://marsgis.cn/ui/js/system/settings/log.js',
  'http://marsgis.cn/ui/js/system/account/account.js',
  'http://marsgis.cn/ui/js/system/account/message.js',
  'http://marsgis.cn/ui/js/system/log.js',
  'http://marsgis.cn/ui/js/system/settings/display.js',
  'http://marsgis.cn/ui/js/system/account/password.js',
  'http://marsgis.cn/ui/js/system/account/account.js',
  'http://marsgis.cn/ui/js/system/account/message.js',
  'http://marsgis.cn/ui/js/system/log.js',
  'http://marsgis.cn/ui/js/system/account/password.js',
  'http://marsgis.cn/ui/js/system/settings/display.js',
  'http://marsgis.cn/ui/css/system/settings/display.css',
  'http://marsgis.cn/ui/css/system/settings/log.css',
  'http://marsgis.cn/ui/css/system/account.css',
  'http://marsgis.cn/ui/css/system/settings/display.css',
  'http://marsgis.cn/ui/css/system/user.css',
]

const exPages9 = [
  'http://marsgis.cn/ui/data/system/user.json',
  'http://marsgis.cn/ui/page/system/user/_user-info.html',
  'http://marsgis.cn/ui/data/system/log.json',
  'http://marsgis.cn/ui/data/system/message.json',
]

const exPages10 = [
  'http://marsgis.cn/ui/js/system/user/user-modal.js',
  'http://marsgis.cn/ui/data/examples/tables/table.json',
  'http://marsgis.cn/ui/lib/layer/theme/default/icon.png',
]

const exPages11 = [
  "examples/components/layouts/grids.html", "examples/components/layouts/layout-grid.html", "examples/components/layouts/headers.html", "examples/components/layouts/bordered-header.html", "examples/components/layouts/panel-transition.html", "examples/components/layouts/boxed.html", "examples/components/layouts/page-aside.html", "examples/components/layouts/two-columns.html", "examples/components/basic/panel/structure.html", "examples/components/basic/panel/actions.html", "examples/components/basic/panel/portlets.html", "examples/components/basic/buttons.html", "examples/components/basic/icons.html", "examples/components/basic/dropdowns.html", "examples/components/basic/list.html", "examples/components/basic/tooltip-popover.html", "examples/components/basic/modals.html", "examples/components/basic/tabs-accordions.html", "examples/components/basic/img.html", "examples/components/basic/badges-labels.html", "examples/components/basic/carousel.html", "examples/components/basic/typography.html", "examples/components/basic/progress-bars.html", "examples/components/basic/colors.html", "examples/components/basic/utilities.html", "examples/components/advanced/animation.html", "examples/components/advanced/highlight.html", "examples/components/advanced/scrollbar.html", "examples/components/advanced/rating.html", "examples/components/advanced/context-menu.html", "examples/components/advanced/layer.html", "examples/components/advanced/masonry.html", "examples/components/advanced/tree/jstree.html", "examples/components/advanced/tree/treeview.html", "examples/components/advanced/toastr.html", "examples/components/advanced/sortable-nestable.html", "examples/components/structure/alerts.html", "examples/components/structure/ribbon.html", "examples/components/structure/pricing-tables.html", "examples/components/structure/overlay.html", "examples/components/structure/cover.html", "examples/components/structure/timeline/simple.html", "examples/components/structure/timeline/icons.html", "examples/components/structure/step.html", "examples/components/structure/comments.html", "examples/components/structure/media.html", "examples/components/structure/chat.html", "examples/components/structure/testimonials.html", "examples/components/structure/nav.html", "examples/components/structure/navbars.html", "examples/components/structure/blockquotes.html", "examples/components/structure/pagination.html", "examples/components/structure/breadcrumbs.html", "examples/components/widgets/statistics.html", "examples/components/widgets/data.html", "examples/components/widgets/blog.html", "examples/components/widgets/chart.html", "examples/components/widgets/social.html", "examples/components/widgets/weather.html", "examples/pages/home/index-v1.html", "examples/pages/home/index-v2.html", "examples/pages/home/ecommerce.html", "examples/pages/home/analytics.html", "examples/pages/home/team.html", "examples/pages/general/blank.html", "examples/pages/general/faq.html", "examples/pages/general/gallery-grid.html", "examples/pages/general/search-result.html", "examples/pages/general/user.html", "examples/pages/general/email.html", "examples/pages/general/code-editor.html", "error.html", "examples/errors/no-auth-inner.html", "maintenance.html", "locked.html", "examples/pages/team/calendar.html", "examples/pages/team/notebook.html", "examples/pages/team/taskboard.html", "examples/pages/team/documents/articles.html", "examples/pages/team/documents/categories.html", "examples/pages/team/documents/article.html", "examples/pages/team/forum.html", "examples/pages/team/message.html", "examples/pages/team/mailbox.html", "examples/pages/team/media.html", "examples/pages/team/projects.html", "examples/pages/team/work.html", "examples/tables/basic/index.html", "examples/tables/treegrid/index.html", "examples/tables/data-tables/basic-init/index.html", "examples/tables/data-tables/advanced-init/index.html", "examples/tables/data-tables/data-sources/index.html", "examples/tables/data-tables/api/index.html", "examples/tables/data-tables/ajax/index.html", "examples/tables/data-tables/server-side/index.html", "examples/tables/data-tables/plug-ins/index.html", "examples/tables/data-tables/others/index.html", "examples/forms/general.html", "examples/forms/material.html", "examples/forms/advanced.html", "examples/forms/layouts.html", "examples/forms/wizard.html", "examples/forms/validation.html", "examples/forms/masks.html", "examples/forms/editable.html", "examples/forms/editor/summernote.html", "examples/forms/editor/markdown.html", "examples/forms/editor/ace.html", "examples/forms/image-cropping.html", "examples/forms/dropify.html", "examples/charts/chartjs.html", "examples/charts/gauges.html", "examples/charts/flot.html", "examples/charts/peity.html", "examples/charts/sparkline.html", "examples/charts/morris.html", "examples/charts/chartist.html", "examples/charts/rickshaw.html", "examples/charts/c3.html", "examples/charts/echarts.html", "examples/menu.html", "examples/menu.html", "examples/menu.html", "examples/menu.html", "examples/menu.html", "#.html", "examples/menu.html", "system/menu.html", "system/user.html", "system/log.html", "system/blacklist.html", "system/settings/display.html", "system/settings/log.html", "system/account/index.html"
]

// for (let index = exPages11.length - 1; index < exPages11.length; index++) {
//   let element = exPages11[index];
//   let hname = element
//   let hurl = uiHtmlPath + 'page/' + element
//   console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }

const exPages12 = ["primary", "brown", "cyan", "green", "grey", "indigo", "orange", "pink", "purple", "red", "teal", "yellow"]

// for (let index = 0; index < exPages12.length; index++) {
//   let element = exPages12[index];
//   let hname = 'site.css'
//   let hname1 = 'index.css'
//   let hurl = uiHtmlPath + 'lib/admui/skins/' + element + '/' + hname
//   let hurl1 = uiHtmlPath + 'lib/admui/skins/' + element + '/' + hname1
//   // console.log(hurl, hname)
//   clQuaue(hurl, hname)
//   clQuaue(hurl1, hname1)
// }

const basePath = 'http://leaflet.marsgis.cn/'
const exPages13 = ["http://leaflet.marsgis.cn/doc.html", "http://leaflet.marsgis.cn/guide.html", "http://leaflet.marsgis.cn/api.html", "http://leaflet.marsgis.cn/buy.html", "http://leaflet.marsgis.cn/forleaflet/go-leaflet.html", "http://leaflet.marsgis.cn/forleaflet/examples.html", "http://leaflet.marsgis.cn/forleaflet/reference_cn.html", "http://leaflet.marsgis.cn/forleaflet/plugins.html", "http://marsgis.cn/w3cschool/index.html", "http://marsgis.cn/file/21.pdf", "http://marsgis.cn/file/22.pdf", "http://marsgis.cn/file/23.pdf", "http://marsgis.cn/file/24.pdf", "http://marsgis.cn/file/gis.pdf", "http://marsgis.cn/file/v.pdf"]

// for (let index = 0; index < exPages13.length; index++) {
//   let element = exPages13[index];
//   let hname = getFileName(element)
//   let hurl = element
//   console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }

const exPages14 = [
  'http://leaflet.marsgis.cn/lib/highlight/styles/foundation.css',
  'http://leaflet.marsgis.cn/lib/highlight/highlight.pack.js',
  'http://leaflet.marsgis.cn/leaflet-example/img/docs/22.jpg',
  'http://leaflet.marsgis.cn/lib/highlight/styles/foundation.css',
  'http://leaflet.marsgis.cn/lib/highlight/highlight.pack.js',
  'http://leaflet.marsgis.cn/leaflet-example/img/lib/Turfjs.png',
  'http://leaflet.marsgis.cn/lib/highlight/highlight.pack.js',
  'http://leaflet.marsgis.cn/lib/highlight/styles/foundation.css',
  'http://leaflet.marsgis.cn/leaflet-example/section/header.html?time=20190603',
  'http://leaflet.marsgis.cn/forleaflet/docs/css/normalize.css',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/css/w3.css',
  'http://leaflet.marsgis.cn/forleaflet/docs/css/main.css',
  'http://leaflet.marsgis.cn/forleaflet/docs/highlight/highlight.pack.js',
  'http://leaflet.marsgis.cn/forleaflet/docs/highlight/styles/github-gist.css',
  'http://leaflet.marsgis.cn/forleaflet/docs/js/docs.js',
  'http://leaflet.marsgis.cn/leaflet-example/css/index.css?time=20190603',
  'http://leaflet.marsgis.cn/leaflet-example/section/header.html?time=20190603',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/1487226843.png',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/1487226176.png',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/1487225325.jpg',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/1486623483.jpg',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/1493969540.jpg',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/cover_ecmascript.png',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/cover_htmldom.jpeg',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/cover_ajax.png',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/cover_json.jpeg',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/1487227120.png',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/cover_bootstrap.png',
  'http://leaflet.marsgis.cn/leaflet-example/w3cschool/statics/img/cover_webdevelopment.png',
]

// for (let index = 0; index < exPages14.length; index++) {
//   let element = exPages14[index];
//   let hname = getFileName(element)
//   let hurl = element
//   console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }


const dtPath = 'http://marsgis.cn/ui/page/examples/tables/data-tables/'
const filePath = ['basic-init', 'advanced-init', 'data-sources', 'api', 'ajax', 'server-side', 'plug-ins', 'others']
const exPages15 = [
  ["zero-configuration.html", "filter-only.html", "table-sorting.html", "multi-col-sort.html", "multiple-tables.html", "hidden-columns.html", "complex-header.html", "dom.html", "flexible-width.html", "state-save.html", "alt-pagination.html", "scroll-y.html", "scroll-y-dynamic.html", "scroll-x.html", "scroll-xy.html"],
  ["events-live.html", "dt-events.html", "column-render.html", "length-menu.html", "dom-multiple-elements.html", "complex-header.html", "object-dom-read.html", "html5-data-options.html", "html5-data-attributes.html", "defaults.html", "row-callback.html", "row-grouping.html", "footer-callback.html", "dom-toolbar.html", "sort-direction-control.html"],
  ["dom.html", "ajax.html", "js-array.html", "server-side.html"],
  ["add-row.html", "multi-filter.html", "multi-filter-select.html", "highlight.html", "row-details.html", "select-row.html", "select-single-row.html", "form.html", "counter-columns.html", "show-hide.html", "api-in-init.html", "tabs-and-scrolling.html", "regex.html"],
  ["simple.html", "objects.html", "deep.html", "objects-subarrays.html", "orthogonal-data.html", "null-data-source.html", "custom-data-property.html", "custom-data-flat.html", "defer-render.html"],
  ["simple.html", "custom-vars.html", "post.html", "ids.html", "object-data.html", "row-details.html", "select-rows.html", "jsonp.html", "defer-loading.html", "pipeline.html"],
  ["api.html", "sorting-auto.html", "sorting-manual.html", "range-filtering.html", "dom-sort.html"],
  ["fixed-header.html", "export-file.html"]
]
// for (let idx = 0; idx < filePath.length; idx++) {
//   let pages = exPages15[idx]
//   for (let index = 0; index < pages.length; index++) {
//     let element = pages[index];
//     let hname = getFileName(element)
//     let hurl = dtPath + filePath[idx] + '/' + hname
//     console.log(hurl, hname)
//     clQuaue(hurl, hname)
//   }
// }

const exPages16 = [
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/dt-events.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/column-render.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/length-menu.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/dom-multiple-elements.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/complex-header.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/object-dom-read.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/defaults.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/row-callback.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/row-grouping.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/footer-callback.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/dom-toolbar.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/advanced-init/sort-direction-control.js',
  'http://marsgis.cn/ui/data/examples/tables/dt-ajax.json',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/data-sources/js-array.js',
  'http://marsgis.cn/ui/data/examples/tables/dt-server-processing.json',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/multi-filter.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/multi-filter-select.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/highlight.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/row-details.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/select-row.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/select-single-row.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/form.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/counter-columns.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/show-hide.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/select-row.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/tabs-and-scrolling.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/api/regex.js',
  'http://marsgis.cn/ui/data/examples/tables/dt-ajax.json',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/ajax/objects.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/ajax/deep.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/ajax/objects-subarrays.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/ajax/orthogonal-data.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/ajax/null-data-source.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/ajax/custom-data-property.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/ajax/custom-data-flat.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/ajax/deep.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/server-side/custom-vars.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/server-side/post.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/server-side/ids.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/server-side/object-data.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/server-side/row-details.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/server-side/select-rows.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/server-side/jsonp.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/server-side/defer-loading.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/server-side/pipeline.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/plug-ins/sorting-auto.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/plug-ins/sorting-manual.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/plug-ins/range-filtering.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/plug-ins/dom-sort.js',
  'http://marsgis.cn/ui/js/examples/tables/data-tables/others/export-file.js'
]

// for (let index = 0; index < exPages16.length; index++) {
//   let element = exPages16[index];
//   let hname = getFileName(element)
//   let hurl = element
//   console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }

const layerPath = 'http://marsgis.cn/ui/lib/layer/theme/'
const imgPath = ['retina', 'default']
const exPages17 = [
  ['maximize.svg', 'restore.svg', 'close-1.svg', 'close-2.svg', 'icon-1.svg', 'icon-2.svg', 'icon-1.svg', 'icon-3.svg', 'icon-1.svg', 'icon-4.svg', 'icon-1.svg', 'icon-5.svg', 'icon-1.svg', 'icon-6.svg', 'icon-1.svg', 'icon-7.svg', 'icon-1.svg', 'icon-8.svg', 'loading-0.svg', 'loading-1.svg', 'loading-2.svg', 'prev.svg', 'next.svg'],
  ['loading-1.gif', 'icon.png', 'loading-0.gif', 'loading-1.gif', 'loading-2.gif', 'icon-ext.png']
]
// for (let idx = 0; idx < imgPath.length; idx++) {
//   let pages = exPages17[idx]
//   for (let index = 0; index < pages.length; index++) {
//     let element = pages[index];
//     let hname = getFileName(element)
//     let hurl = layerPath + imgPath[idx] + '/' + hname
//     console.log(hurl, hname)
//     clQuaue(hurl, hname)
//   }
// }

const baseUrl = ['http://basic.demo.admui.com', 'http://iframe.demo.admui.com']
const pages = ["/sitemap", "/system/menu", "/system/account?tab=display", "/system/account?tab=password", "/system/account", "/system/account?tab=message", "/system/settings/display", "/components/layouts/grids", "/components/layouts/layout-grid", "/components/layouts/headers", "/components/layouts/bordered-header", "/components/layouts/panel-transition", "/components/layouts/aside/left-static", "/components/layouts/aside/left-fixed", "/components/layouts/aside/right-static", "/components/layouts/aside/right-fixed", "/components/layouts/two-columns", "/components/basic/panel/structure", "/components/basic/panel/actions", "/components/basic/panel/portlets", "/components/basic/buttons", "/components/basic/icons", "/components/basic/dropdowns", "/components/basic/list", "/components/basic/tooltip-popover", "/components/basic/modals", "/components/basic/tabs-accordions", "/components/basic/images", "/components/basic/badges", "/components/basic/carousel", "/components/basic/typography", "/components/basic/progress-bars", "/components/basic/colors", "/components/basic/utilities", "/components/advanced/animation", "/components/advanced/scrollbar", "/components/advanced/rating", "/components/advanced/context-menu", "/components/advanced/masonry", "/components/advanced/tree/jstree", "/components/advanced/tree/treeview", "/components/advanced/toastr", "/components/advanced/sortable-nestable", "/components/structure/alerts", "/components/structure/ribbon", "/components/structure/pricing-tables", "/components/structure/overlay", "/components/structure/cover", "/components/structure/timeline/simple", "/components/structure/timeline/icons", "/components/structure/step", "/components/structure/comments", "/components/structure/media", "/components/structure/chat", "/components/structure/testimonials", "/components/structure/nav", "/components/structure/navbars", "/components/structure/blockquotes", "/components/structure/pagination", "/components/structure/breadcrumbs", "/components/cards/statistics", "/components/cards/data", "/components/cards/blog", "/components/cards/chart", "/components/cards/social", "/components/cards/weather", "/pages/home/index-v1", "/pages/home/index-v2", "/pages/home/ecommerce", "/pages/home/analytics", "/pages/home/team", "/pages/general/blank", "/pages/general/faq", "/pages/general/gallery-grid", "/pages/general/search-result", "/pages/general/user", "/pages/general/email", "/pages/general/code-editor", "/errors", "/errors/noauth", "/errors/maintenance", "/locked", "/pages/team/calendar", "/pages/team/notebook", "/pages/team/taskboard", "/pages/team/documents/articles", "/pages/team/documents/categories", "/pages/team/documents/article", "/pages/team/forum", "/pages/team/message", "/pages/team/mailbox", "/pages/team/media", "/pages/team/projects", "/pages/team/work", "/tables/basic/index", "/tables/treegrid/index", "/tables/data-tables/basic-init/zero-configuration", "/tables/data-tables/advanced-init/events-live", "/tables/data-tables/data-sources/dom", "/tables/data-tables/api/add-row", "/tables/data-tables/ajax/simple", "/tables/data-tables/server-side/simple", "/tables/data-tables/plug-ins/api", "/tables/data-tables/others/fixed-header", "/tables/bootstrap-table/options/boolean-options", "/tables/bootstrap-table/methods/getOptions", "/tables/bootstrap-table/extensions/export", "/forms/general", "/forms/material", "/forms/advanced/select", "/forms/advanced/tags-input", "/forms/advanced/date-time", "/forms/advanced/checkbox-radio", "/forms/advanced/color-icon", "/forms/advanced/other", "/forms/layouts", "/forms/wizard", "/forms/validation", "/forms/masks", "/forms/editor/summernote", "/forms/editor/markdown", "/forms/editor/ace", "/forms/image-cropping", "/forms/dropify", "/charts/chartjs", "/charts/gauges", "/charts/flot", "/charts/peity", "/charts/sparkline", "/charts/morris", "/charts/chartist", "/charts/rickshaw", "/charts/c3", "/charts/echarts", "/examples/menu", "/examples/menu", "/examples/menu", "/examples/menu", "/examples/menu", "/examples/menu", "/examples/menu", "/system/menu", "/system/organization", "/system/role", "/system/permission", "/system/settings/display", "/system/settings/log", "/system/log", "/system/blacklist", "/system/account", "/home"]
// for (let idx = 0; idx < baseUrl.length; idx++) {
//   if (idx) return;
//   let url = baseUrl[idx]
//   for (let index = 0; index < pages.length; index++) {
//     let element = pages[index];
//     let hname = getFileName(element + '.html')
//     let hurl = url + element + '.html'
//     console.log(hurl, hname)
//     clQuaue(hurl, hname)
//   }
// }

const flagPath = 'http://www.marsgis.cn/ui/lib/flag-icon-css/'
const flags = [
  'flags/ad.svg',
  'flags/ae.svg',
  'flags/af.svg',
  'flags/ag.svg',
  'flags/ai.svg',
  'flags/al.svg',
  'flags/am.svg',
  'flags/ao.svg',
  'flags/aq.svg',
  'flags/ar.svg',
  'flags/as.svg',
  'flags/at.svg',
  'flags/au.svg',
  'flags/aw.svg',
  'flags/ax.svg',
  'flags/az.svg',
  'flags/ba.svg',
  'flags/bb.svg',
  'flags/bd.svg',
  'flags/be.svg',
  'flags/bf.svg',
  'flags/bg.svg',
  'flags/bh.svg',
  'flags/bi.svg',
  'flags/bj.svg',
  'flags/bl.svg',
  'flags/bm.svg',
  'flags/bn.svg',
  'flags/bo.svg',
  'flags/bq.svg',
  'flags/br.svg',
  'flags/bs.svg',
  'flags/bt.svg',
  'flags/bv.svg',
  'flags/bw.svg',
  'flags/by.svg',
  'flags/bz.svg',
  'flags/ca.svg',
  'flags/cc.svg',
  'flags/cd.svg',
  'flags/cf.svg',
  'flags/cg.svg',
  'flags/ch.svg',
  'flags/ci.svg',
  'flags/ck.svg',
  'flags/cl.svg',
  'flags/cm.svg',
  'flags/cn.svg',
  'flags/co.svg',
  'flags/cr.svg',
  'flags/cu.svg',
  'flags/cv.svg',
  'flags/cw.svg',
  'flags/cx.svg',
  'flags/cy.svg',
  'flags/cz.svg',
  'flags/de.svg',
  'flags/dj.svg',
  'flags/dk.svg',
  'flags/dm.svg',
  'flags/do.svg',
  'flags/dz.svg',
  'flags/ec.svg',
  'flags/ee.svg',
  'flags/eg.svg',
  'flags/eh.svg',
  'flags/er.svg',
  'flags/es.svg',
  'flags/et.svg',
  'flags/fi.svg',
  'flags/fj.svg',
  'flags/fk.svg',
  'flags/fm.svg',
  'flags/fo.svg',
  'flags/fr.svg',
  'flags/ga.svg',
  'flags/gb.svg',
  'flags/gd.svg',
  'flags/ge.svg',
  'flags/gf.svg',
  'flags/gg.svg',
  'flags/gh.svg',
  'flags/gi.svg',
  'flags/gl.svg',
  'flags/gm.svg',
  'flags/gn.svg',
  'flags/gp.svg',
  'flags/gq.svg',
  'flags/gr.svg',
  'flags/gs.svg',
  'flags/gt.svg',
  'flags/gu.svg',
  'flags/gw.svg',
  'flags/gy.svg',
  'flags/hk.svg',
  'flags/hm.svg',
  'flags/hn.svg',
  'flags/hr.svg',
  'flags/ht.svg',
  'flags/hu.svg',
  'flags/id.svg',
  'flags/ie.svg',
  'flags/il.svg',
  'flags/im.svg',
  'flags/in.svg',
  'flags/io.svg',
  'flags/iq.svg',
  'flags/ir.svg',
  'flags/is.svg',
  'flags/it.svg',
  'flags/je.svg',
  'flags/jm.svg',
  'flags/jo.svg',
  'flags/jp.svg',
  'flags/ke.svg',
  'flags/kg.svg',
  'flags/kh.svg',
  'flags/ki.svg',
  'flags/km.svg',
  'flags/kn.svg',
  'flags/kp.svg',
  'flags/kr.svg',
  'flags/kw.svg',
  'flags/ky.svg',
  'flags/kz.svg',
  'flags/la.svg',
  'flags/lb.svg',
  'flags/lc.svg',
  'flags/li.svg',
  'flags/lk.svg',
  'flags/lr.svg',
  'flags/ls.svg',
  'flags/lt.svg',
  'flags/lu.svg',
  'flags/lv.svg',
  'flags/ly.svg',
  'flags/ma.svg',
  'flags/mc.svg',
  'flags/md.svg',
  'flags/me.svg',
  'flags/mf.svg',
  'flags/mg.svg',
  'flags/mh.svg',
  'flags/mk.svg',
  'flags/ml.svg',
  'flags/mm.svg',
  'flags/mn.svg',
  'flags/mo.svg',
  'flags/mp.svg',
  'flags/mq.svg',
  'flags/mr.svg',
  'flags/ms.svg',
  'flags/mt.svg',
  'flags/mu.svg',
  'flags/mv.svg',
  'flags/mw.svg',
  'flags/mx.svg',
  'flags/my.svg',
  'flags/mz.svg',
  'flags/na.svg',
  'flags/nc.svg',
  'flags/ne.svg',
  'flags/nf.svg',
  'flags/ng.svg',
  'flags/ni.svg',
  'flags/nl.svg',
  'flags/no.svg',
  'flags/np.svg',
  'flags/nr.svg',
  'flags/nu.svg',
  'flags/nz.svg',
  'flags/om.svg',
  'flags/pa.svg',
  'flags/pe.svg',
  'flags/pf.svg',
  'flags/pg.svg',
  'flags/ph.svg',
  'flags/pk.svg',
  'flags/pl.svg',
  'flags/pm.svg',
  'flags/pn.svg',
  'flags/pr.svg',
  'flags/ps.svg',
  'flags/pt.svg',
  'flags/pw.svg',
  'flags/py.svg',
  'flags/qa.svg',
  'flags/re.svg',
  'flags/ro.svg',
  'flags/rs.svg',
  'flags/ru.svg',
  'flags/rw.svg',
  'flags/sa.svg',
  'flags/sb.svg',
  'flags/sc.svg',
  'flags/sd.svg',
  'flags/se.svg',
  'flags/sg.svg',
  'flags/sh.svg',
  'flags/si.svg',
  'flags/sj.svg',
  'flags/sk.svg',
  'flags/sl.svg',
  'flags/sm.svg',
  'flags/sn.svg',
  'flags/so.svg',
  'flags/sr.svg',
  'flags/ss.svg',
  'flags/st.svg',
  'flags/sv.svg',
  'flags/sx.svg',
  'flags/sy.svg',
  'flags/sz.svg',
  'flags/tc.svg',
  'flags/td.svg',
  'flags/tf.svg',
  'flags/tg.svg',
  'flags/th.svg',
  'flags/tj.svg',
  'flags/tk.svg',
  'flags/tl.svg',
  'flags/tm.svg',
  'flags/tn.svg',
  'flags/to.svg',
  'flags/tr.svg',
  'flags/tt.svg',
  'flags/tv.svg',
  'flags/tw.svg',
  'flags/tz.svg',
  'flags/ua.svg',
  'flags/ug.svg',
  'flags/um.svg',
  'flags/us.svg',
  'flags/uy.svg',
  'flags/uz.svg',
  'flags/va.svg',
  'flags/vc.svg',
  'flags/ve.svg',
  'flags/vg.svg',
  'flags/vi.svg',
  'flags/vn.svg',
  'flags/vu.svg',
  'flags/wf.svg',
  'flags/ws.svg',
  'flags/ye.svg',
  'flags/yt.svg',
  'flags/za.svg',
  'flags/zm.svg',
  'flags/zw.svg',
]
// for (let index = 0; index < flags.length; index++) {
//   let element = flags[index];
//   let hurl = flagPath + element
//   let hname = getFileName(hurl)
//   console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }

const flatPath = 'http://www.marsgis.cn/ui/lib/icheck/'
const flats = [
  'images/flat.png',
  'images/flat@2x.png',
  'images/red.png',
  'images/red@2x.png',
  'images/green.png',
  'images/green@2x.png',
  'images/blue.png',
  'images/blue@2x.png',
  'images/aero.png',
  'images/aero@2x.png',
  'images/grey.png',
  'images/grey@2x.png',
  'images/orange.png',
  'images/orange@2x.png',
  'images/yellow.png',
  'images/yellow@2x.png',
  'images/pink.png',
  'images/pink@2x.png',
  'images/purple.png',
  'images/purple@2x.png',
]
// for (let index = 0; index < flats.length; index++) {
//   let element = flats[index];
//   let hurl = flatPath + element
//   let hname = getFileName(hurl)
//   console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }


// ../../lib/ie-css3.htc
// ../../images/sd.png
// ../../images/icon-add.png
// ../../images/sd2.png
// ../../images/icons-3.png
// ../../images/-l-a-win-down.png

const tsPath = 'http://marsgis.cn/project/2d/zhts/widgetsTS/queryByWhere/easyui/themes/insdep/'
const tsImgs = [
  'images/blank.gif',
  'images/loading.gif',
  'images/panel_tools.png',
  'images/footer_projection.png',
  'images/accordion_arrows.png',
  'images/footer_projection.png',
  'images/disable.png',
  'images/passwordbox_open.png',
  'images/passwordbox_close.png',
  'images/blank.gif',
  'images/combo_arrow.png',
  'images/tagbox_icons_white.png',
  'images/layout_arrows.png',
  'images/tabs_icons.png',
  'images/tabs_icons_hover.png',
  'images/datagrid_icons.png',
  'images/loading.gif',
  'images/arrow-right.png',
  'images/pagination_icons.png',
  'images/loading.gif',
  'images/calendar_arrows.png',
  'images/datebox_arrow.png',
  'images/spinner_arrows.png',
  'images/searchbox_navigate_button.png',
  'images/menu_arrows.png',
  'images/menu_arrows.png',
  'images/messager_icons.png',
  'images/tree_icons.png',
  'images/loading.gif',
  'images/panel_tools_white.png',
  'images/tabs_icons_white.png',
  'images/alert_icons.png',
  'images/menu_arrows_white.png',
  'images/progressbar-background.png'
]
// for (let index = 0; index < tsImgs.length; index++) {
//   let hurl = tsPath + tsImgs[index]
//   let hname = getFileName(hurl)
//   console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }

const leafletPath = 'http://marsgis.cn/project/2d/jcxm/lib/leaflet-mars/'
const leafletImgs = [
  'images/layers-2x.png',
  'images/marker-icon.png',
  'images/spritesheet.png',
  'images/spritesheet.svg',
  'images/spritesheet-2x.png',
  'images/spritesheet.svg',
  'images/home.png',
  'images/location.png',
  'images/location-loading.gif',
  'images/clear.png',
  'images/fullscreen.png',
  'images/fullscreen-on.png',
  'images/spritesheet.png',
  'images/spritesheet.svg',
  'images/spritesheet-2x.png',
  'images/spritesheet.svg',
]
// for (let index = 0; index < leafletImgs.length; index++) {
//   let hurl = leafletPath + leafletImgs[index]
//   let hname = getFileName(hurl)
//   console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }

const esriPath = 'http://marsgis.cn/project/2d/jcxm/lib/leafletPlugins/esri-geocoder/'
const esriImgs = [
"img/search.png",
"img/search-disabled.png",
"img/loading.gif",
"img/search@2x.png",
"img/search@2x-disabled.png",
"img/loading@2x.gif"
]
// for (let index = 0; index < esriImgs.length; index++) {
//   let hurl = esriPath + esriImgs[index]
//   let hname = getFileName(hurl)
//   console.log(hurl, hname)
//   clQuaue(hurl, hname)
// }