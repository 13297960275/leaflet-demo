! function (e, s, o) {
  "use strict";
  o.site.menu = {
    speed: 250,
    accordion: !0,
    init: function () {
      (this.$siteMenubar = o("#admui-navTabs .site-menu")).length && this._bind()
    },
    _bind: function () {
      var i = this,
        s = o("body"),
        lo = o('.change-layout.active').attr('data-layout') || localStorage.getItem('layout') || 'base',
        n = this.$siteMenubar;
      n.off("mouseenter.site.menu", ".site-menu-item").on("mouseenter.site.menu", ".site-menu-item", function (e) {
        if (o('.change-layout.active').attr('data-layout') == 'topbar') {
          return;
        }
        var e = o(this);
        !0 === s.hasClass("site-menubar-fold") && e.is(".has-sub") && e.parent(".site-menu").length && i.position(e, e.children(".site-menu-sub")), e.addClass("hover")
      }).off("mouseleave.site.menu", ".site-menu-item").on("mouseleave.site.menu", ".site-menu-item", function (e) {
        if (o('.change-layout.active').attr('data-layout') == 'topbar') {
          return;
        }
        var e = o(this);
        !0 === s.hasClass("site-menubar-fold") && e.is(".has-sub") && e.parent(".site-menu").length && e.children(".site-menu-sub").css("max-height", ""), e.removeClass("hover")
      }).off("deactive.site.menu", ".site-menu-item.active").on("deactive.site.menu", ".site-menu-item.active", function () {
        o(this).removeClass("active")
      }).off("active.site.menu", ".site-menu-item").on("active.site.menu", ".site-menu-item", function () {
        o(this).addClass("active")
      }).off("open.site.menu", ".site-menu-item").on("open.site.menu", ".site-menu-item", function (e) {
        var s = o(this);
        i._expand(s, function () {
          s.addClass("open")
        }), i.accordion && s.closest("li.has-sub").length <= 1 && s.siblings(".open").trigger("close.site.menu"), e.stopPropagation()
      }).off("close.site.menu", ".site-menu-item.open").on("close.site.menu", ".site-menu-item.open", function (e) {
        var s = o(this);
        i._collapse(s, function () {
          s.removeClass("open")
        }), e.stopPropagation()
      }).off("click.site.menu ", ".site-menu-item > a").on("click.site.menu ", ".site-menu-item > a", function (ev) {
        var e = o(this),
          s = e.parent();
        s.is(".has-sub") ? s.is(".open") ? s.trigger("close.site.menu") : s.trigger("open.site.menu") : (e.closest("li").siblings(".open").trigger("close.site.menu"), e.closest("li.has-sub").siblings(".open").trigger("close.site.menu"), e.parents("div.tab-pane").siblings().find("li.open").trigger("close.site.menu"), n.find("li.active").trigger("deactive.site.menu"), s.trigger("active.site.menu"))
      }).off("touchend.site.menu", "> .site-menu-item > a").on("touchend.site.menu", "> .site-menu-item > a", function (ev) {
        var e = o(this).parent(".site-menu-item");
        s.hasClass("site-menubar-fold") && e.is(".has-sub") && e.parent(".site-menu").length && (e.siblings(".hover").removeClass("hover"), e.is(".hover") ? e.removeClass("hover") : e.addClass("hover"))
      }).off("scroll.site.menu", ".site-menu-sub").on("scroll.site.menu", ".site-menu-sub", function (e) {
        e.stopPropagation()
      })

      o(document.body).off("click").on("click", function (t) {
        var tg = t.target,
          p = o(tg).parents('.site-menu-item');
        !p.length && lo == 'topbar' && o.site.menu._collapse_all()
      })

      lo == 'topbar' && setTimeout(function () {
        o.site.menu._collapse_all()
      }, 200);
    },
    _collapse_all: function (e) {
      var e = o('.site-menu-item > a'),
        s = e.parent();
      s.is(".has-sub") ? s.is(".open") ? s.trigger("close.site.menu") : '' : (e.closest("li").siblings(".open").trigger("close.site.menu"), e.closest("li.has-sub").siblings(".open").trigger("close.site.menu"), e.parents("div.tab-pane").siblings().find("li.open").trigger("close.site.menu"))
    },
    _collapse: function (e, s) {
      var i = this;
      e.children(".site-menu-sub").slideUp(i.speed, function () {
        s && s(), i.$siteMenubar.trigger("collapsed.site.menu")
      })
    },
    _expand: function (e, s) {
      var i = this;
      e.children(".site-menu-sub").slideDown(i.speed, function () {
        s && s(), i.$siteMenubar.trigger("expanded.site.menu")
      })
    },
    refresh: function () {
      var e = this.$siteMenubar;
      o(".active.dropdown.open").removeClass("open")
      e.find("li.open").trigger("close.site.menu"), e.find("li.active").trigger("deactive.site.menu")
    },
    position: function (e, s) {
      var i = e.position().top,
        n = o("#admui-navTabs").outerHeight(),
        t = e.find("> a").outerHeight();
      s.removeClass("site-menu-sub-up").css("max-height", ""), n / 2 < i ? (s.addClass("site-menu-sub-up"), o.site.menubar.foldAlt && (i -= t), s.css("max-height", i + t)) : (o.site.menubar.foldAlt && (i += t), s.removeClass("site-menu-sub-up"), s.css("max-height", n - i))
    }
  }
}(window, document, jQuery);