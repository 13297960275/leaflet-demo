var map;

function initMap() {
  var r = haoutil.system.getRequest(),
    a = "config/" + jQuery('input[type="radio"][name="configFlag"]:checked').val() + ".json";
  map && map.off() && map.remove();
  $('#centerDiv').children('.toolBar').remove();
  $('#centerDiv').siblings('#widget-testbar').remove();
  $('#centerDiv').siblings('#map-querybar').remove();
  r.config && (a = r.config), haoutil.loading.show(), L.src.createMap({
    id: "map",
    url: a + "",
    layerToMap: layerToMap,
    success: function (a, t, e) {
      if (haoutil.loading.hide(), map = a, t.controls && t.controls.layers && map.removeControl(t.controls.layers), haoutil.isutil.isNotNull(r.widget) && (e.widget.widgetsAtStart = []), L.widget.init(a, e.widget), haoutil.isutil.isNotNull(r.widget) && L.widget.activate(r.widget), haoutil.isutil.isNotNull(r.x) && haoutil.isutil.isNotNull(r.y) && haoutil.isutil.isNotNull(r.z)) {
        var i = Number(r.x),
          o = Number(r.y),
          n = Number(r.z);
        map.setView([o, i], n)
      }
      initWork()
    }
  })
}

function initWork() {}

function layerToMap(a, t) {
  if ("wfs" == a.type) return L.wfsLayer(a)
}

function bindToLayerControl(a, t) {
  map.gisdata.controls && map.gisdata.controls.layers && map.gisdata.controls.layers.addOverlay(t, a);
  var e = {
    name: a,
    _layer: t
  };
  t.config = e;
  var i = L.widget.getClass("widgets/manageLayers/widget.js");
  i ? i.addOverlay(e) : map.gisdata.config.operationallayers.push(e)
}

function unbindLayerControl(a) {
  if (map.gisdata.controls && map.gisdata.controls.layers)
    for (var t = map.gisdata.config.operationallayers, e = 0; e < t.length; e++) {
      if ((o = t[e]).name == a) {
        map.gisdata.controls.layers.removeLayer(o._layer);
        break
      }
    }
  var i = L.widget.getClass("widgets/manageLayers/widget.js");
  if (i) i.removeLayer(a);
  else
    for (t = map.gisdata.config.operationallayers, e = 0; e < t.length; e++) {
      var o;
      if ((o = t[e]).name == a) {
        t.splice(e, 1);
        break
      }
    }
}

function activateWidget(a) {
  L.widget.activate(a)
}

function activateFunByMenu(fun) {
  eval(fun)
}
$('.config-box').on('click', function (ev) {
  $('.config-control').hasClass('config-control-show') ? $('.config-control').removeClass('config-control-show') : $('.config-control').addClass('config-control-show')
})
$('input[type="radio"][name="configFlag"]').on('click', function (ev) {
  initMap()
})
$(document).ready(function () {
  window.parent && window.parent.setStyleByTheme && (haoutil.storage.add("theme", "blue"),
    window.parent.setStyleByTheme()), initMap()
});