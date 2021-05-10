! function (e, i, n) {
  "use strict";
  n.site.menubar = {
    opened: null,
    folded: null,
    top: !1,
    foldAlt: !1,
    auto: !0,
    init: function () {
      var s = this,
        t = this.$body = n("body"),
        e = this.$html = n("html"),
        i = this.$instance = n("#admui-navTabs");
      e.removeClass("css-menubar").addClass("js-menubar"), this.tabId = n("#admui-navbar").find("li.active > a"), "#" === this.tabId && (this.tabId = n(".nav-tabs li.active").find("ul>li.active>a")), i.length && (t.is(".site-menubar-fold-alt") && (this.foldAlt = !0), t.is(".site-menubar-keep") && (t.hasClass("site-menubar-fold") ? this.auto = "fold" : t.hasClass("site-menubar-unfold") && (this.auto = "unfold")), i.on("changed.site.menubar", function () {
        s.update()
      }), n(".nav-tabs li:not(.no-menu)").on("shown.bs.tab", function (e) {
        var i = s.tabId = n(e.target);
        t.hasClass("site-menubar-fold") ? s.hoverscroll.enable(i) : t.hasClass("site-menubar-unfold") && ''/* s.slimScroll.enable() */
      }), this.change())
    },
    change: function () {
      var e = Breakpoints.current();
      if (!0 !== this.auto) switch (this.auto) {
        case "fold":
          return this.reset(), void("xs" === e.name ? this.hide() : this.fold());
        case "unfold":
          return this.reset(), void("xs" === e.name ? this.hide() : this.unfold())
      }
      if (this.reset(), e) switch (e.name) {
        case "lg":
          this.unfold();
          break;
        case "md":
        case "sm":
          this.fold();
          break;
        case "xs":
          this.hide()
      }
      Breakpoints.on("xs", "leave", function () {
        n("#admui-navbar").responsiveHorizontalTabs({
          tabParentSelector: "#admui-navTabs",
          fnCallback: function (e) {
            n("#admui-navbar").is(":visible") && e.removeClass("is-load")
          }
        })
      })
    },
    animate: function (e, i) {
      var s = this,
        t = s.$body;
      t.addClass("site-menubar-changing"), e.call(s), this.$instance.trigger("changing.site.menubar"), i.call(s), t.removeClass("site-menubar-changing"), s.$instance.trigger("changed.site.menubar")
    },
    reset: function () {
      this.opened = null, this.folded = null, this.$body.removeClass("site-menubar-hide site-menubar-open site-menubar-fold site-menubar-unfold"), this.$html.removeClass("disable-scrolling")
    },
    open: function () {
      !0 !== this.opened && this.animate(function () {
        this.$body.removeClass("site-menubar-hide").addClass("site-menubar-open site-menubar-unfold"), this.opened = !0, this.$html.addClass("disable-scrolling")
      }, function () {
        // this.slimScroll.enable()
      })
    },
    hide: function () {
      this.hoverscroll.disable(), !1 !== this.opened && this.animate(function () {
        this.$html.removeClass("disable-scrolling"), this.$body.removeClass("site-menubar-open").addClass("site-menubar-hide site-menubar-unfold"), this.opened = !1
      }, function () {
        // this.slimScroll.enable()
      })
    },
    unfold: function () {
      this.hoverscroll.disable(), !1 !== this.folded && this.animate(function () {
        this.$body.removeClass("site-menubar-fold").addClass("site-menubar-unfold"), this.folded = !1
      }, function () {
        // this.slimScroll.enable()
      })
    },
    fold: function () {
      this.slimScroll.destroy(), !0 !== this.folded && this.animate(function () {
        this.$body.removeClass("site-menubar-unfold").addClass("site-menubar-fold"), this.folded = !0
      }, function () {
        this.hoverscroll.enable(this.tabId)
      })
    },
    toggle: function () {
      var e = Breakpoints.current(),
        i = this.folded,
        s = this.opened;
      switch (e.name) {
        case "lg":
          null === i || !1 === i ? this.fold() : this.unfold();
          break;
        case "md":
        case "sm":
          null === i || !0 === i ? this.unfold() : this.fold(), n("#admui-navbar").responsiveHorizontalTabs({
            tabParentSelector: "#admui-navTabs"
          });
          break;
        case "xs":
          null === s || !1 === s ? this.open() : this.hide()
      }
    },
    update: function () {
      this.hoverscroll.update()
    },
    slimScroll: {
      api: null,
      native: !1,
      init: function () {
        n("body").is(".site-menubar-native") ? this.native = !0 : n.site.menubar.$instance.slimScroll(n.po("slimScroll"))
      },
      enable: function () {
        this.native || this.init()
      },
      destroy: function () {
        n.site.menubar.$instance.slimScroll({
          destroy: !0
        }), n.site.menubar.$instance.removeAttr("style")
      }
    },
    hoverscroll: {
      api: null,
      init: function (e) {
        n.site.menubar.$instance.find(e).children("div").attr("style", ""), this.api = n.site.menubar.$instance.find(e).asHoverScroll({
          namespace: "hoverscorll",
          direction: "vertical",
          list: ".site-menu",
          item: "> li",
          exception: ".site-menu-sub",
          fixed: !1,
          boundary: 100,
          onEnter: function () {},
          onLeave: function () {}
        }).data("asHoverScroll")
      },
      update: function () {
        /* this.api&&this.api.update() */ },
      enable: function (e) {
        /* e!==this.tabId?(this.tabId=e,this.init(e)):this.api.enable() */ },
      disable: function () {
        /* this.api&&this.api.disable() */ }
    }
  }
}(window, document, jQuery);