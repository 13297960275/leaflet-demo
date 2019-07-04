var thisWidget;

function initWidgetView(t) {
  thisWidget = t, $("#xzqh-select").citypicker({
    simple: !0
  });
  var i = $("#xzqh-select");
  i.hide(), i.citypicker("open");
  var n = -1;
  $(".city-picker-dropdown").on("click", ".city-select a", function () {
    var t = String(i.data("citypicker").getCode()),
      e = i.data("citypicker").getVal();
    $("#cityname").html(e), -1 != n && (clearTimeout(n), n = -1), n = setTimeout(function () {
      centerAtRegion(t, e)
    }, 200)
  })
}

function centerAtRegion(t, e) {
  var sl, el;
  sl = e.lastIndexOf("/"); -
  1 != sl ? (el = e.substring(sl + 1)) : (el = e)
  console.log(el)
  var i, n;
  if ("0000" == t.substring(2)) {
    (i = "chinaGeoJson/china.json",
      n = t.substring(0, 2))
  } else if ("00" == t.substring(4)) {
    (i = "chinaGeoJson/geometryProvince/" + t.substring(0, 2) + ".json",
      n = t.substring(0, 4))
  } else {
    (i = "chinaGeoJson/geometryCouties/" + t.substring(0, 4) + "00.json",
      n = t,
      $("#con_wdx_1").hide())
  }
  $.getJSON(i, function (t) {
    if (thisWidget.isActivate)
      for (var e = t.features.length, i = 0; i < e; i++)
        if (t.features[i].properties.id == n) {
        // if (t.features[i].properties.name.indexOf(el) > -1 || el.indexOf(t.features[i].properties.name) > -1) {
          thisWidget.showRegionExtent(t.features[i]);
          break
        }
  });
  var s = e.lastIndexOf("/"); - 1 != s && (e = e.substring(s + 1)), e.length <= 2 ? e += "&nbsp;" : 3 < e.length && (e = e.substring(0, 2) + ".."), $("#xzqh_sel").html(e)
}

function goHome() {
  $("#cityname").html(""), $("#xzqh-select").citypicker("reset"), thisWidget.goHome()
}