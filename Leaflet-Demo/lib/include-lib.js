! function () {
  for (var a, s = new RegExp("(^|(.*?\\/))(include-lib.js)(\\?|$)"), e = document.getElementsByTagName("script"), t = 0; t < e.length; t++) {
    var r = e[t].getAttribute("src");
    if (r)
      if (r.match(s)) {
        a = e[t];
        break
      }
  }
  var l = "",
    i = new RegExp("\\.css");

  function o(s) {
    if (null != s && 0 != s.length)
      for (var e = 0, t = s.length; e < t; e++) {
        var r = s[e];
        if (i.test(r)) {
          var a = '<link rel="stylesheet" href="' + r + '">';
          document.writeln(a)
        } else {
          var o = '<script type="text/javascript" src="' + r + '"><\/script>';
          document.writeln(o)
        }
      }
  }! function () {
    var s = (a.getAttribute("include") || "").split(","),
      e = a.getAttribute("libpath") || "";
    e.lastIndexOf("/") != e.length - 1 && (e += "/");
    var t = {
      jquery: [e + "jquery/jquery-2.1.4.min.js"],
      "jquery.scrollTo": [e + "jquery/scrollTo/jquery.scrollTo.min.js"],
      "jquery.minicolors": [e + "jquery/minicolors/jquery.minicolors.css", 
        e + "jquery/minicolors/jquery.minicolors.min.js"],
      "jquery.range": [e + "jquery/range/range.css", 
        e + "jquery/range/range.js"],
      ztree: [e + "jquery/ztree/css/zTreeStyle/zTreeStyle.css", 
        e + "jquery/ztree/js/jquery.ztree.all.min.js"],
      "jquery.mCustomScrollbar": [e + "jquery/mCustomScrollbar/jquery.mCustomScrollbar.css", 
        e + "jquery/mCustomScrollbar/jquery.mCustomScrollbar.js"],
      jedate: [e + "jquery/jedate/skin/jedate.css", 
        e + "jquery/jedate/jedate.js"],
      lazyload: [e + "jquery/lazyload/jquery.lazyload.min.js"],
      "font-awesome": [e + "fonts/font-awesome/css/font-awesome.min.css"],
      "web-icons": [e + "fonts/web-icons/web-icons.css"],
      animate: [e + "animate/animate.css"],
      admui: [e + "admui/css/index.css", 
        e + "admui/js/global/core.js", 
        e + "admui/js/global/configs/site-configs.js", 
        e + "admui/js/global/components.js"],
      "admui-frame": [e + "admui/css/site.css", 
        e + "admui/js/app.js"],
      bootstrap: [e + "bootstrap/bootstrap.css", 
        e + "bootstrap/bootstrap.min.js"],
      "bootstrap-table": [e + "bootstrap/bootstrap-table/bootstrap-table.css", 
        e + "bootstrap/bootstrap-table/bootstrap-table.min.js", 
        e + "bootstrap/bootstrap-table/locale/bootstrap-table-zh-CN.js"],
      "bootstrap-select": [e + "bootstrap/bootstrap-select/bootstrap-select.css", 
        e + "bootstrap/bootstrap-select/bootstrap-select.min.js"],
      "bootstrap-checkbox": [e + "bootstrap/bootstrap-checkbox/awesome-bootstrap-checkbox.css"],
      nprogress: [e + "nprogress/nprogress.css", 
        e + "nprogress/nprogress.min.js"],
      toastr: [e + "toastr/toastr.css", 
        e + "toastr/toastr.js"],
      layer: [e + "layer/theme/default/layer.css", 
        e + "layer/theme/retina/retina.css", 
        e + "layer/layer.js"],
      haoutil: [e + "hao/haoutil.js", 
        e + "hao/loading/loading.css", 
        e + "hao/loading/loading.js"],

      "admin-lte": [e + "admin-lte/css/AdminLTE.min.css", 
        e + "admin-lte/css/skins/skin-blue.min.css", 
        e + "admin-lte/js/adminlte.min.js"],
      ace: [e + "ace/ace.js"],

      echarts: [e + "echarts/echarts.min.js", 
        e + "echarts/dark.js"],
      "echarts-gl": [e + "echarts/echarts-gl.min.js"],
      "echarts-forleaflet": [e + "echarts/forleaflet/echarts-3.4.min.js"],
      mapV: [e + "mapV/mapv.min.js"],
      highlight: [e + "highlight/styles/default.css", 
        e + "highlight/highlight.pack.min.js"],
      turf: [e + "turf/turf.min.js"],
      "esri-leaflet": [e + "leafletPlugins/esri/esri-leaflet.js"],
      "leaflet-wfs": [e + "leafletPlugins/wfs/leaflet-wfs.js"],
      "leaflet-src": [e + "leaflet-src/leaflet.css", 
        e + "leaflet-src/leaflet.js"]
    };
    for (var r in s) o(t[s[r]])
  }()
}();