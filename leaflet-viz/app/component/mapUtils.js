// 获取绘制图形的测量数据
export function _getShapeLatlngs(layers) {
  let content = null
  let lagArr = []
  layers.eachLayer(function (layer) {
    content = _getPopupContent(layer);
    if (content !== null) {
      latlngs = content.latlngs
      lagArr.push(latlngs)
      layer.setPopupContent(content.popupContent);
    }
  });
}

// Truncate value based on number of decimals
export function _round(num, len) {
  return Math.round(num * (Math.pow(10, len))) / (Math.pow(10, len));
}

// Helper method to format LatLng object (x.xxxxxx, y.yyyyyy)
export function _strLatLng(latlng) {
  return "坐标：纬度（" + _round(latlng.lat, 6) + "）, 经度（" + _round(latlng.lng, 6) + "）";
}

// Generate popup content based on layer type
// - Returns HTML string, or null if unknown object
export function _getPopupContent(layer, type) {
  if (type === 'marker') {
      if (e.layer._latlng) layer.bindPopup('坐标：' + e.layer._latlng);
  } else if (type === 'rectangle') {
      if (area) layer.bindPopup('多边形面积：' + area);
  } else if (type === 'circlemarker') {
      if (e.layer._latlng) layer.bindPopup('圆心坐标：' + e.layer._latlng);
  } else if (type === 'circle') {
      if (e.layer._latlng) layer.bindPopup('圆形半径：' + e.layer._mRadius);
  } else if (type === 'polygon') {
      if (area) layer.bindPopup('矩形面积：' + area);
  } else if (type === 'polyline') {
      if (area) layer.bindPopup('矩形面积：' + area);
  }
  if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
    return {
      popupContent: _strLatLng(layer.getLatLng()),
      latlngs: layer.getLatLng(),
      layerType: 'marker'
    }
  } else if (layer instanceof L.Circle) {
    var center = layer.getLatLng(),
      radius = layer.getRadius();
    return {
      popupContent: "圆心: " + _strLatLng(center) + "<br />" + "半径: " + _round(radius, 2) + " m",
      latlngs: layer.getLatLng(),
      layerType: 'circle'
    }
  } else if (layer instanceof L.Polygon) {
    var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
      area = L.GeometryUtil.geodesicArea(latlngs);
    return {
      popupContent: "面积: " + L.GeometryUtil.readableArea(area, true),
      latlngs: latlngs,
      layerType: 'polygon'
    }
  } else if (layer instanceof L.Polyline) {
    var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
      distance = 0;
    if (latlngs.length < 2) {
      return {
        popupContent: "距离: N/A",
        latlngs: latlngs,
        layerType: 'polyline'
      }
    } else {
      for (var i = 0; i < latlngs.length - 1; i++) {
        distance += latlngs[i].distanceTo(latlngs[i + 1]);
      }
      return {
        popupContent: "距离: " + _round(distance, 2) + " m",
        latlngs: latlngs,
        layerType: 'polyline'
      }
    }
  }
  return null;
}