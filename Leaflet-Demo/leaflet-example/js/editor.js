var aceEditor;
$(document).ready(function () {
  initPage(), bindEvents(), sidebarScrollFix()
});
var containExamples = !0;

function initPage() {
  initEditor(), screenResize()
}

function screenResize() {
  window.onresize = function () {
    mapHeight()
  }
}

function findConfig(e, t) {
  for (var i in t && 1 < t.length && (t = t.substr(1)), exampleConfig) {
    var n = exampleConfig[i].content;
    for (var a in n)
      for (var o = n[a].content, r = 0, d = o.length; r < d; r++) {
        var s = o[r];
        if (t) {
          if (s.fileName == e && s.params == t) {
            var c = exampleConfig[i].name,
              l = n[a].name;
            return void(document.title = s.name + " 【" + c + " " + l + "")
          }
        } else if (s.fileName == e) {
          c = exampleConfig[i].name, l = n[a].name;
          return void(document.title = s.name + " 【" + c + " " + l + "")
        }
      }
  }
}

function initCodeEditor() {
  aceEditor || ((aceEditor = ace.edit("editor")).setTheme("ace/theme/xcode"), aceEditor.getSession().setMode("ace/mode/html"), aceEditor.getSession().setUseWrapMode(!0), aceEditor.setShowPrintMargin(!1), aceEditor.$blockScrolling = 1 / 0), aceEditor.setValue($("#editor").val()), aceEditor.clearSelection(), aceEditor.moveCursorTo(0, 0)
}

function initEditor() {
  loadExampleHtml(), initCodeEditor()
}

function loadExampleHtml() {
  var e = getLocationParam();
  if (e) {
    findConfig(e, window.location.search), e = id2FileName(e);
    var t = window.location.pathname,
      i = t.substr(0, t.lastIndexOf("/") + 1);
    if (i = i + e + window.location.search) {
      // var n = ""; - 1 == i.indexOf("?") ? i += "?time=" + n : -1 == i.indexOf("time=" + n) && (i += "&time=" + n);
      var a = haoutil.system.getRequestByName("widget");
      if (null != a) $("#showCodeBtn").hide(), loadIFrameForSrc("../widgets.html?widget=" + a);
      else {
        // console.log("加载示例页面：" + i);
        var o = $.ajax({
          url: i,
          async: !1,
          error: function (e) {
            haoutil.msg("该页面不存在，请检查地址！"), o = ""
          }
        }).responseText;
        o && "" != o && ($("#editor").val(o), loadPreview(o))
      }
    }
  }
}

function getLocationParam() {
  var e = window.location.toString();
  return -1 === e.indexOf("#") ? "11_online_tdt" : (e = e.split("#")) && 0 < e.length ? e[1] : void 0
}

function run() {
  var e = $("#editor").val();
  editor && (e = aceEditor.getValue()), loadPreview(e)
}

function loadPreview(e) {
  var t = createIFrame(),
    i = t.contentWindow.document;
  i.open(), i.write(e), i.close();
  document;
  t.addEventListener("load", function () {
    mapHeight()
  }), mapHeight()
}

function loadIFrameForSrc(e) {
  createIFrame(), $("#innerPage").attr("src", e), mapHeight()
}

function createIFrame() {
  var e = $("#previewPane");
  e.empty();
  var t = document.createElement("iframe");
  return $(t).attr("id", "innerPage"), $(t).attr("name", "innerPage"), e.append(t), t
}

function refresh() {
  initEditor(), run()
}

function initSelect() {
  var e, t = window.location.hash; - 1 === t.indexOf("#") ? (e = $("section#sidebar .thirdMenu a.link").first().attr("id"), window.location.hash = e ? "#" + e : window.location.hash) : e = t.split("#")[1], selectMenu(e)
}

function mapHeight() {
  var e = $("#innerPage").contents();
  e.find("html").height("100%"), e.find("body").height("100%")
}

function bindEvents() {
  $("#sidebar ul.third-menu a").click(function (e) {
    var t = $(e.target).parent().parent(),
      i = e.target.id;
    "span" === e.target.localName && (i = t.attr("id")), i && (e.preventDefault(), window.location.hash = "#" + i, initEditor(), e.stopPropagation())
  });
  var e = $("#codePane"),
    t = $("#previewPane"),
    i = !0;
  $("#showCodeBtn").click(function () {
    i ? ($(this).text(" 收缩").css({
      left: "500px"
    }), $(this).addClass(" fa-compress"), $(this).removeClass("fa-arrows-alt"), e.show(10, function () {
      t.removeClass("col-md-12"), t.addClass("col-md-7"), e.addClass("col-md-5"), $("#showCodeBtn").css({
        left: $("#codePane").width() + 5 + "px"
      }), aceEditor && aceEditor.resize()
    })) : ($(this).text(" 源码").css({
      left: "0px"
    }), $(this).addClass("fa-arrows-alt"), $(this).removeClass(" fa-compress"), e.hide(200, function () {
      e.removeClass("col-md-5"), t.removeClass("col-md-7"), t.addClass("col-md-12")
    })), i = !i
  }), window.addEventListener("hashchange", function () {
    var e = window.location.hash;
    if (-1 !== e.indexOf("#")) {
      var t = e.split("#")[1];
      selectMenu(t)
    }
  })
}