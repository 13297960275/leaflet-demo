var thisWidget;function initWidgetView(t){showLatlng((thisWidget=t).getMapCenter())}function showLatlng(t){$("#point_jd").val(t.x.toFixed(6)),$("#point_wd").val(t.y.toFixed(6))}function submitXY(){var t=Number($.trim($("#point_jd").val())),i=Number($.trim($("#point_wd").val()));thisWidget.centerAt({lng:t,lat:i},!0)}