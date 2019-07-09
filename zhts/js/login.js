"use strict";

function initView() {
  var t;
  setStyleByTheme(), new Slider(function () {
    console.log("滑块验证通过"), $(".drag_text").html("验证通过"), t = "muyao"
  }), $("#btnLogin").click(function () {
    null != t ? location.href = "index.html" : layer.tips("请先拖动滑动验证通过后再登录", "#slider")
  })
}

function setStyleByTheme() {
  setInterval(slideSwitch, 5e3), slideSwitch()
}

function slideSwitch() {
  var t = $("#loginBJ IMG.active");
  0 == t.length && (t = $("#loginBJ IMG:last"));
  var e = t.next().length ? t.next() : $("#loginBJ IMG:first");
  t.addClass("last-active"), e.css({
    opacity: 0
  }).addClass("active").animate({
    opacity: 1
  }, 1e3, function () {
    t.removeClass("active last-active")
  })
}
$(document).ready(function () {
  initView()
});