var thisWidget, lastRightClickTreeId, lastRightClickTreeNode, layers = [],
  layersObj = {};

function initWidgetView(e) {
  thisWidget = e, bindRightMenuEvnet();
  for (var n = {
      check: {
        enable: !0
      },
      data: {
        simpleData: {
          enable: !0
        }
      },
      callback: {
        onCheck: treeOverlays_onCheck,
        onRightClick: treeOverlays_OnRightClick,
        onDblClick: treeOverlays_onDblClick
      },
      view: {
        addDiyDom: addOpacityRangeDom
      }
    }, t = [], a = (layers = thisWidget.getLayers()).length - 1; 0 <= a; a--) {
    var r = getNodeData(layers[a]);
    t.push(r)
  }
  $.fn.zTree.init($("#treeOverlays"), n, t)
}

function addNode(e) {
  var n, t = $.fn.zTree.getZTreeObj("treeOverlays");
  e.pid && -1 != e.pid && (n = t.getNodeByParam("id", e.pid, null));
  var a = getNodeData(e);
  t.addNodes(n, 0, [a], !0)
}

function addNodes(e, n, t) {
  var a = $.fn.zTree.getZTreeObj("treeOverlays"),
    r = a.getNodeByParam("id", e, null),
    i = r.open;
  t && a.removeChildNodes(r);
  for (var o = n.length - 1; 0 <= o; o--) {
    var d = getNodeData(n[o]);
    a.addNodes(r, 0, [d], !i)
  }
}

function removeNode(e) {
  var n = $.fn.zTree.getZTreeObj("treeOverlays"),
    t = n.getNodeByParam("id", e.id, null);
  t && n.removeNode(t)
}

function getNodeData(e) {
  var n = {
    id: e.id,
    pId: e.pid,
    name: e.name,
    opacity: e.opacity,
    _key: e._key
  };
  return null == e._layer ? (n.icon = "images/folder.png", n.open = null == e.open || e.open) : (n.icon = "images/layers-icon.png", n.checked = thisWidget.getLayerVisible(e._layer), "feature" == e.type && (n.icon = "images/node-icon-open.png"), e._parent && (n._parent = e._parent._key), layersObj[n._key] = e._layer), n
}

function treeOverlays_onCheck(e, n, t) {
  for (var a = $.fn.zTree.getZTreeObj(n).getChangeCheckedNodes(), r = 0; r < a.length; r++) {
    if ((t = a[r]).checkedOld = t.checked, layer = layersObj[t._key], null != layer)
      if (t.checked ? $("#" + t.tId + "_range").show() : $("#" + t.tId + "_range").hide(), t._parent) {
        var i = layersObj[t._parent];
        thisWidget.updateLayerVisible(layer, t.checked, i)
      } else thisWidget.updateLayerVisible(layer, t.checked)
  }
}

function treeOverlays_onDblClick(e, n, t) {
  if (null != t && null != t._key) {
    var a = layersObj[t._key];
    null != a && thisWidget.centerAt(a)
  }
}

function addOpacityRangeDom(e, a) {
  var n = layersObj[a._key];
  if (n && n.hasOpacity) {
    var t = '<input id="' + a.tId + '_range" type="range" style="width: 50px;" />';
    $("#" + a.tId).append(t), a.checked || $("#" + a.tId + "_range").hide(), $("#" + a.tId + "_range").range({
      min: 0,
      max: 100,
      step: 1,
      value: 100 * (a.opacity || 1),
      onChange: function (e) {
        var n = e / 100,
          t = layersObj[a._key];
        thisWidget.udpateLayerOpacity(t, n)
      }
    })
  }
}

function treeOverlays_OnRightClick(e, n, t) {
  if (null != t && null != layersObj[t._key]) {
    var a = layersObj[t._key];
    if (a && a.hasZIndex) {
      lastRightClickTreeId = n, lastRightClickTreeNode = t;
      var r = e.clientY,
        i = e.clientX,
        o = document.body.offsetHeight - 100,
        d = document.body.offsetWidth - 100;
      o < r && (r = o), d < i && (i = d), $("#content_layer_manager_rMenu").css({
        top: r + "px",
        left: i + "px"
      }).show(), $("body").bind("mousedown", onBodyMouseDown)
    }
  }
}

function onBodyMouseDown(e) {
  "content_layer_manager_rMenu" == e.target.id || 0 < $(e.target).parents("#content_layer_manager_rMenu").length || hideRMenu()
}

function hideRMenu() {
  $("body").unbind("mousedown", onBodyMouseDown), $("#content_layer_manager_rMenu").hide()
}

function bindRightMenuEvnet() {
  $("#content_layer_manager_rMenu li").on("click", function () {
    hideRMenu(), moveNodeAndLayer($(this).attr("data-type"))
  })
}

function moveNodeAndLayer(e) {
  var n, t = $.fn.zTree.getZTreeObj(lastRightClickTreeId),
    a = lastRightClickTreeNode.getParentNode();
  n = null == a ? t.getNodes() : a.children;
  var r = lastRightClickTreeNode,
    i = layersObj[r._key];
  switch (e) {
    case "up":
      if (o = r.getPreNode()) t.moveNode(o, r, "prev"), exchangeLayer(i, layersObj[o._key]);
      break;
    case "top":
      if (0 == r.getIndex()) return;
      for (; 0 < r.getIndex();) {
        if (o = r.getPreNode()) t.moveNode(o, r, "prev"), exchangeLayer(i, layersObj[o._key])
      }
      break;
    case "down":
      if (o = r.getNextNode()) t.moveNode(o, r, "next"), exchangeLayer(i, layersObj[o._key]);
      break;
    case "bottom":
      if (r.getIndex() == n.length - 1) return;
      for (; r.getIndex() < n.length - 1;) {
        var o;
        if (o = r.getNextNode()) t.moveNode(o, r, "next"), exchangeLayer(i, layersObj[o._key])
      }
  }
  layers.sort(function (e, n) {
    return e.order - n.order
  })
}

function exchangeLayer(e, n) {
  var t = e.config.order;
  e.config.order = n.config.order, n.config.order = t, thisWidget.udpateLayerZIndex(e, e.config.order), thisWidget.udpateLayerZIndex(n, n.config.order)
}

function updateCheckd(e, n) {
  var t = $.fn.zTree.getZTreeObj("treeOverlays"),
    a = t.getNodesByParam("name", e, null);
  a && 0 < a.length ? t.checkNode(a[0], n, !1) : console.log("未在图层树上找到图层“" + e + "”，无法自动勾选处理")
}