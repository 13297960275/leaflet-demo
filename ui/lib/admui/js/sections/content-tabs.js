! function (c, e, d) {
  "use strict";
  d.site.contentTabs = {
    $instance: d("#admui-navTabs .site-menu"),
    $content: d("#admui-pageContent"),
    storageKey: "admui.base.contentTabs",
    tabId: 0,
    relative: 0,
    tabTimeout: 30,
    init: function () {
      this.bind(), this._defaultTab()
    },
    bind: function () {
      var a = this,
        i = d("#admui-siteConTabs"),
        n = i.find("ul.con-tabs");
      this.tabWidth = n.find("li").width(), this.view = i.find(".contabs-scroll").width(), this.ifameTabs(), i.on("click.site.contabs", "button.pull-left", function () {
        a.tabPosition(n, a.tabWidth, "right")
      }).off("click.site.contabs", ".pull-right>.btn-icon").on("click.site.contabs", ".pull-right>.btn-icon", function () {
        var t = n.width();
        var lo = d('.change-layout.active').attr('data-layout') || localStorage.getItem('layout') || 'base';
        console.log(lo)
        a.tabPosition(n, a.tabWidth, "left", a.view, lo == 'topbar' ? t - 300 : t)
        // a.tabPosition(n, a.tabWidth, "left", a.view, t)
      }).off("click.site.contabs", "ul.con-tabs>li").on("click.site.contabs", "ul.con-tabs>li", function (t) {
        var e = d(t.target),
          i = d(this);
        e.is("i.wb-close-mini") ? a.closeTab(i) : i.is(".active") || (i.siblings("li").removeClass("active"), i.addClass("active"), a._checkoutTab(i.find("a")), a.enable(i)), t.preventDefault()
      }), i.off("click.site.contabs", ".pull-right li.reload-page").on("click.site.contabs", ".pull-right li.reload-page", function () {
        var t = i.find("ul.con-tabs>li.active>a").attr("href");
        a.$content.children('[src="' + t + '"]').attr("src", t)
      }).off("click.site.contabs", ".pull-right li.close-other").on("click.site.contabs", ".pull-right li.close-other", function () {
        i.find("ul.con-tabs>li").each(function () {
          var t, e = d(this);
          e.is(".active") || 0 === e.index() || (t = e.find("a").attr("target"), e.remove(), a.$content.children('[name="' + t + '"]').remove(), a._updateSetting(t))
        }), n.animate({
          left: 0
        }, 100), a.btnView("hide")
      }).off("click.site.contabs", ".pull-right li.close-all").on("click.site.contabs", ".pull-right li.close-all", function () {
        var t = i.find("ul.con-tabs>li"),
          e = t.eq(0);
        t.each(function () {
          var t, e = d(this);
          0 !== e.index() && (t = e.find("a").attr("target"), e.remove(), a._updateSetting(t))
        }), n.animate({
          left: 0
        }, 100), a.btnView("hide"), e.addClass("active"), a.enable(t.eq(0)), a._checkoutTab(e.find("a")), a.$content.children(":not(:first)").remove(), a.tabSize()
      }), d(e).off("click", "#admui-signOut").on("click", "#admui-signOut", function () {
        d.sessionStorage.remove(a.storageKey)
      }), d(c).off("resize").on("resize", this.resize)
    },
    ifameTabs: function (t) {
      var r = this;
      d(void 0 === t ? e : t).on("click", "a[data-iframe]", function (t) {
        var e = d(this),
          i = e.attr("href"),
          a = d.trim(e.text()) || d.trim(e.attr("title")),
          n = e.data("iframe") || "#admui-pageContent",
          s = e.is('[target="_blank"]');
        new RegExp(/^([a-zA-z]+:|#|javascript|www\.)/).test(i) || (s && "#admui-pageContent" === n ? (c.history.replaceState(null, "", "#!" + i), r.tabType = !0, r.buildTab({
          name: a,
          url: i
        }), r.$instance.find(e).length || r.enable(e.parent())) : s || d(n).find("iframe.active").attr("src", i), t.preventDefault())
      })
    },
    _checkoutTab: function (t) {
      var e = this.$content,
        i = t.attr("target"),
        a = d.trim(t.attr("title")),
        n = t.attr("href"),
        s = e.children('iframe[name="' + i + '"]');
      d("title").text(a), this.tabType || c.history.replaceState(null, "", "#!" + n), s.attr("src") || s.attr("src", n), e.children(".active").removeClass("active"), s.addClass("active"), d.site.iframeEvents(s), this._updateSetting("checked", i), this.tabType = !1
    },
    _defaultTab: function () {
      var t, e = d("#admui-siteConTabs").find("li:first > a");
      null === (t = this.settings = d.sessionStorage.get(this.storageKey)) ? (t = d.extend(!0, {}, {
        "iframe-0": {
          url: e.attr("href"),
          name: e.text()
        },
        checked: e.attr("target"),
        tabId: this.tabId
      }), this._updateSetting(t)) : this.tabId = t.tabId
    },
    _updateSetting: function (t, e) {
      var i = d.sessionStorage.get(this.storageKey);
      i = i || {}, "object" == typeof t ? d.extend(!0, i, t) : e ? i[t] = e : delete i[t], d.sessionStorage.set(this.storageKey, i, this.tabTimeout)
    },
    resize: function () {
      var t = d.site.contentTabs,
        e = d(".site-contabs"),
        i = e.find("ul.con-tabs");
      t._throttle(function () {
        t.view = e.find(".contabs-scroll").width(), t.tabEvent(i, "media")
      }, 200)()
    },
    enable: function (t) {
      var e, i, a, n, s, r = this.$instance,
        c = d.trim(t.find("a").attr("href")),
        l = c.indexOf("#"),
        o = 0 < l ? c.substring(0, l) : c,
        h = r.find('a[href="' + o + '"]'),
        lo = d('.change-layout.active').attr('data-layout') || localStorage.getItem('layout') || 'base';
      0 !== h.length ? (d.trim(r.closest("div.tab-pane.active").attr("id")) !== (s = d.trim(h.closest("div.tab-pane").attr("id"))) && d('#admui-navbar a[href="#' + s + '"]').tab("show"), i = h.closest("li").siblings("li.open"), e = h.parents("li.has-sub"), a = h.closest("li.has-sub").siblings("li.open"), n = r.find("li.open"), r.find("li.active").trigger("deactive.site.menu"), h.closest("li").trigger("active.site.menu"), i.length && i.trigger("close.site.menu"), h.closest("li.has-sub").hasClass("open") || (a.length && a.trigger("close.site.menu"), n.length && n.not(e).trigger("close.site.menu"), lo !== 'topbar' && e.trigger("open.site.menu"))) : d.site.menu.refresh()
    },
    buildTab: function (t) {
      var e, i, a = d(".con-tabs"),
        n = {},
        s = t.url,
        r = s.indexOf("#"),
        c = 0 < r ? s.substring(0, r) : s;
      this._checkTabs(a, c) || (e = "iframe-" + (i = ++this.tabId), a.find("li.active").removeClass("active"), a.append('<li  class="active"><a href="' + c + '" target="' + e + '" title="' + t.name + '" rel="contents"><span>' + t.name + '</span><i class="icon wb-close-mini"></i></a></li>'), n[e] = {
        url: c,
        name: t.name
      }, d.extend(n, {
        checked: e,
        tabId: i
      }), this._updateSetting(n), t.name = "" === t.name ? "无标题" : t.name, d("title").text(d.trim(t.name)), this.buildIframe(s), this.tabSize(), this.tabEvent(a, "media"), this.tabType = !1)
    },
    _checkTabs: function (t, e) {
      var i, a, n, s, r = this.view,
        c = this.tabWidth,
        l = t.find("a[href='" + e + "']").closest("li");
      if (l.hasClass("active")) return !0;
      if (l.size() <= 0) return !1;
      if (t.find("li.active").removeClass("active"), l.addClass("active"), this._checkoutTab(l.find("a")), i = t.position().left, s = t.width(), a = l.prevAll("li").size() * c, n = l.nextAll("li").size() * c, -a < i) {
        if (a + i < r) return !0;
        i = -(a - r + c)
      } else {
        if (-i < s - n) return !0;
        i = -(s - n - c)
      }
      return t.animate({
        left: i
      }, 100), !0
    },
    buildIframe: function (t) {
      var e, i = this.$content,
        a = "iframe-" + this.tabId;
      i.children(".active").removeClass("active"), i.append('<iframe src="' + t + '" frameborder="0" name="' + a + '" class="page-frame animation-fade active"></iframe>'), e = i.find('iframe[name="' + a + '"]'), d.site.iframeEvents(e)
    },
    tabSize: function () {
      var t, e = d(".con-tabs"),
        i = e.find("li").size();
      t = this.tabWidth * i, e.css("width", t), console.log(t)
    },
    tabEvent: function (t, e) {
      var i = d(".con-tabs").width(),
        lo = d('.change-layout.active').attr('data-layout') || localStorage.getItem('layout') || 'base',
        a = lo == 'topbar' ? this.view + 220 : this.view,
        // a = this.view,
        n = this.tabWidth;
      i > this.view ? (this.tabPosition(t, n, "left", a, i, e), this.btnView("visible")) : this.btnView("hide"), (this.currentView < a || this.currentContent > i) && this.tabPosition(t, n, "right", a, i, e), this.currentView = a, this.currentContent = i
    },
    tabPosition: function (t, e, i, a, n, s) {
      // console.log('con-tabs: ', t, ' tabWidth: ', e, ' direc: ', i, ' contabs-scroll width: ', a, ' con-tabs width: ', n, ' media: ', s)
      var r, c = this,
        l = t.position().left;
      if ("left" === i) {
        if (l <= a - n) return !1;
        void 0 !== s ? l = a - n : (l = 0 !== this.relative ? l - e + this.relative : l - e, this.relative = 0)
      } else if ("right" === i) {
        if (0 === l) return !1;
        l = void 0 !== s ? n <= a ? 0 : a - n : 0 < (r = l + e) + e ? (c.relative = r, 0) : r
      }
      t.animate({
        left: l
      }, 100)
    },
    _throttle: function (t, i) {
      var a, n = t,
        s = !0;
      return function () {
        var t = arguments,
          e = this;
        if (s && (n.apply(e, t), s = !1), a) return !1;
        a = setTimeout(function () {
          clearTimeout(a), a = null, n.apply(e, t)
        }, i || 500)
      }
    },
    closeTab: function (t) {
      var e = t.children("a").attr("target"),
        i = "",
        a = t.next("li"),
        n = this.$content;
      t.is(".active") && ((i = 0 < a.size() ? a : t.prev("li")).addClass("active"), this.enable(i), this._checkoutTab(i.find("a"))), t.remove(), n.children('[name="' + e + '"]').remove(), this._updateSetting(e), this.tabSize(), this.tabEvent(d(".con-tabs"), "media")
    },
    btnView: function (t) {
      var e = d(".site-contabs"),
        i = e.children("button.pull-left"),
        a = e.find(".pull-right > button.btn-icon");
      "visible" === t ? (i.removeClass("hide"), a.removeClass("hide")) : "hide" === t && (i.addClass("hide"), a.addClass("hide"))
    }
  }
}(window, document, jQuery);