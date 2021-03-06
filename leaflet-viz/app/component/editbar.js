import './editbar.scss';
// import '../common/css/leaflet.draw.css';
import '../../node_modules/leaflet-draw/dist/leaflet.draw.css'

import { editableLayers } from './basemap.js'
import { _getShapeLatlngs, _round, _strLatLng, _getPopupContent } from './mapUtils'
import 'leaflet-draw'; //矢量画图工具

class Editbar {
    init(map) {
        this._handleEdit(map);
    }

    _handleEdit(map) {
        map.addLayer(editableLayers);
        var MyCustomMarker = L.Icon.extend({
            options: {
                shadowUrl: null,
                iconAnchor: new L.Point(12, 12),
                iconSize: new L.Point(16, 24),
                iconUrl: 'app/common/css/images/marker-icon.png'
            }
        });
        var options = {
            position: 'topleft',
            draw: {
                polyline: {
                    shapeOptions: {
                        color: '#f357a1',
                        weight: 5
                    }
                },
                polygon: {
                    showArea: true, //显示面积
                    metric: true,
                    allowIntersection: false, // Restricts shapes to simple polygons
                    drawError: {
                        color: '#e1e100', // Color the shape will turn when intersects
                        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                    },
                    shapeOptions: {
                        color: '#bada55'
                    }
                },
                circle: true, // Turns off this drawing tool
                rectangle: {
                    metric: true,
                    showArea: true, //显示面积
                    shapeOptions: {
                        clickable: false
                    }
                },
                // marker: {
                //     icon: new MyCustomMarker()
                // }
            },
            edit: {
                featureGroup: editableLayers, //REQUIRED!!
                remove: true //是否有删除按钮
            }
        };

        var drawControl = new L.Control.Draw(options);
        map.addControl(drawControl);
        console.info(L.DrawToolbar.TYPE);

        map.on(L.Draw.Event.CREATED, function (e) {
            var type = e.layerType,
                layer = e.layer;
            console.log("e(L.Draw.Event.CREATED)", e);
            var pos = e.layer._latlngs ? e.layer._latlngs : e.layer._latlng;
            // console.log("坐标", pos);
            if (document.getElementsByClassName("leaflet-draw-tooltip-subtext")[0]) {
                var area = document.getElementsByClassName("leaflet-draw-tooltip-subtext")[0].innerHTML;
                console.log("面积", area);
            }
            //使用[GeoJSON.js](https://github.com/caseycesari/GeoJSON.js)转化为GeoJSON
            //leaflet 中有转化的方法toGeoJSON
            if (type === 'marker') {
                if (e.layer._latlng) layer.bindPopup('坐标：' + e.layer._latlng);
            } else if (type === 'rectangle') {
                if (area) layer.bindPopup('矩形面积：' + area);
            } else if (type === 'circlemarker') {
                if (e.layer._latlng) layer.bindPopup('坐标：' + e.layer._latlng);
            } else if (type === 'circle') {
                if (e.layer._latlng) layer.bindPopup('圆心坐标：' + e.layer._latlng + '     圆形半径：' + area);
            } else if (type === 'polygon') {
                if (area) layer.bindPopup('多边形面积：' + area);
            } else if (type === 'polyline') {
                if (area) layer.bindPopup('长度：' + area);
            }

            // var content = _getPopupContent(layer, type);
            // if (content !== null) {
            //     layer.bindPopup(content.popupContent);
            // }

            editableLayers.addLayer(layer);
        });
    }
}

export {
    Editbar
};