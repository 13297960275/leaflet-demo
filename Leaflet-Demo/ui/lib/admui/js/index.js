! function (e, t, p) {
  "use strict";
  p.extend(p.site, {
      theme: function () {
        var e, a, t, n, i, s = p("body"),
          self = this,
          o = p("#admui-siteStyle", p("head")),
          lo = p('.change-layout.active').attr('data-layout') || localStorage.getItem('layout') || 'base',
          r = localStorage.getItem("skinTools"),
          l = -1 === o.prop("href").indexOf("?v=") ? "" : ".min";
        lo && localStorage.setItem('layout', lo), p('.change-layout.active').removeClass('active'), p('.change-layout[data-layout="' + lo + '"]').addClass('active')
        p.site.menu._collapse_all()
        r && (r = JSON.parse(r).val, e = this.themeColor = r.themeColor, p('body[data-theme]').attr('data-theme', lo), a = r.sidebar, t = r.navbar, n = r.menuDisplay, i = r.menuTxtIcon, e && setTimeout(function () {
          if (lo == 'base') {
            "primary" !== e ? o.attr("href", "lib/admui/css/skins/" + e + "/index" + l + ".css") : o.attr("href", "lib/admui/css/base/index.css")
            p('li.site-menu-item.has-sub').removeClass('dropdown')
            p('ul.site-menu-sub').removeClass('dropdown-menu')
          } else {
            o.attr("href", "lib/admui/css/topbar/index.css")
            p('li.site-menu-item.has-sub').addClass('dropdown')
            p('ul.site-menu-sub').addClass('dropdown-menu')
          }
          p.site.contentTabs.resize()
          p.site.menu._bind()
          p.site.menu.refresh()
        }, 0), a && "site-menubar-light" === a && p("#admui-siteMenubar").addClass("site-menubar-light"), t && "" !== t && p(".site-navbar").addClass(t), "" === r.navbarInverse && p(".site-navbar").removeClass("navbar-inverse"), n && "site-menubar-fold" === n && (p.site.menubar.fold(), i && "site-menubar-keep" === i ? s.addClass("site-menubar-keep") : s.addClass("site-menubar-fold-alt")), "" === r.tabFlag && s.removeClass("site-contabs-open"))
      },
      iframeTheme: function () {
        var e = p("#admui-siteStyle", this.iframeDocument),
          a = -1 === e.prop("href").indexOf("?v=") ? "" : ".min",
          t = this.themeColor;
          console.log(t);
        t && "primary" !== t && e.attr("href", "lib/admui/skins/" + this.themeColor + "/site" + a + ".css")
      },
      _tabsDraw: function () {
        var e, a, t, n, i, s, o, r, l, d, c, m = this,
          u = p.sessionStorage.get("contentTabs"),
          f = location.hash.substring(2),
          b = p(".con-tabs"),
          v = p.site.contentTabs;
        for (var g in a = u.checked, u) e = u[g], "checked" !== g && "tabId" !== g && ("iframe-0" !== g ? (n = '<a href="' + (i = e.url) + '" target="' + g + '"" title="' + (s = e.name) + '" rel="contents"><span>' + s + '</span><i class="icon wb-close-mini"></i></a></li>', g === a && f ? (n = '<li class="active">' + n, o = '<iframe src="' + (t = i) + '" frameborder="0" name="' + g + '" class="page-frame animation-fade active"></iframe>') : (n = "<li>" + n, o = '<iframe src="" frameborder="0" name="' + g + '" class="page-frame animation-fade"></iframe>'), b.append(n), m.$content.append(o)) : (r = g, l = a, d = e.url, c = void 0, c = m.$content.find("iframe:first"), r !== l && f ? c.removeClass("active") : (t = d, b.find("li:first").addClass("active"), c.attr("src", d), m.iframeEvents(c))));
        f !== t && f && this._urlRequest(f), v.enable(b.find(".active")), 19 <= Object.keys(u).length && (v.tabSize(), v.tabEvent(b, "media"))
      },
      _urlRequest: function (a) {
        var t = "未知页面";
        p(".site-menu a").each(function () {
          var e = p(this);
          if (e.attr("href") === a) return t = p.trim(e.attr("title") || e.text()), !1
        }), p.site.contentTabs.buildTab({
          name: t,
          url: a
        })
      },
      _hideNavbar: function () {
        var e = p("body");
        e.addClass("site-navbar-collapsing"), p("#admui-navbarCollapse").collapse("hide"), setTimeout(function () {
          e.removeClass("site-navbar-collapsing")
        }, 10), e.removeClass("site-navbar-collapse-show")
      },
      iframeEvents: function (e) {
        var a = this;
        e.load(function () {
          var e = a.iframeDocument = p.content.document();
          p(e).on("click", function () {
            Breakpoints.is("xs") && p("body").hasClass("site-menubar-open") && (p.site.menubar.hide(), a._hideNavbar()), p('[data-toggle="dropdown"]').parent().removeClass("open")
          }), p("#admui-siteStyle", e).load(function () {
            a.iframeTheme()
          })
        })
      },
      initLocalStorage: function () {
        var defaultSettings = {
            sidebar: 'site-menubar-dark',
            navbar: 'bg-primary-600',
            navbarInverse: 'navbar-inverse',
            themeColor: 'primary',
            menuDisplay: 'site-menubar-unfold',
            menuTxtIcon: 'site-menubar-keep',
            tabFlag: 'site-contabs-open'
          },
          settings = p.storage.get('skinTools');

        if (settings === null) {
          settings = p.extend(true, {}, defaultSettings);

          p.storage.set('skinTools', settings);
        }
      },
      run: function () {
        var e = this,
          a = this.$content = p("#admui-pageContent");
        e.initLocalStorage()
        p.content = p.content || {}, p.extend(p.content, {
          window: function () {
            var e = a.find("iframe.active").attr("name");
            return t.frames[e]
          },
          document: function () {
            var e = a.find("iframe.active").attr("name");
            return t.frames[e].document
          }
        }), this.iframeDocument = null, p.ctx = p("#admui-signOut").data("ctx") || p.ctx, void 0 !== p.site.menu && p.site.menu.init(), void 0 !== p.site.contentTabs && p.site.contentTabs.init(), p("#admui-navbar").responsiveHorizontalTabs({
          tabParentSelector: "#admui-navTabs",
          fnCallback: function (e) {
            p("#admui-navbar").is(":visible") && e.removeClass("is-load")
          }
        }), void 0 !== p.site.menubar && (p("#admui-siteMenubar").on("changing.site.menubar", function () {
          var e = p('[data-toggle="menubar"]');
          e.toggleClass("hided", !p.site.menubar.opened), e.toggleClass("unfolded", !p.site.menubar.folded), p.site.contentTabs.resize()
        }), p.site.menubar.init(), Breakpoints.on("change", function () {
          p.site.menubar.change()
        }), p(document).on("click", '[data-toggle="collapse"]', function (e) {
          var a, t, n, i = p(e.target);
          if (i.is('[data-toggle="collapse"]') || (i = i.parents('[data-toggle="collapse"]')), t = i.attr("data-target") || (a = i.attr("href")) && a.replace(/.*(?=#[^\s]+$)/, ""), (n = p(t)).hasClass("navbar-search-overlap")) n.find("input").focus(), e.preventDefault();
          else if ("admui-navbarCollapse" === n.attr("id")) {
            var s = !i.hasClass("collapsed"),
              o = p(document.body);
            o.addClass("site-navbar-collapsing"), o.toggleClass("site-navbar-collapse-show", s), p("#admui-navbar").responsiveHorizontalTabs({
              tabParentSelector: "#admui-navTabs",
              fnCallback: function (e) {
                e.removeClass("is-load")
              }
            }), setTimeout(function () {
              o.removeClass("site-navbar-collapsing")
            }, 350)
          }
        }), p(document).on("click", '[data-toggle="menubar"]', function () {
          Breakpoints.is("xs") && p("body").hasClass("site-menubar-open") && e._hideNavbar(), p.site.menubar.toggle()
        }), p("#admui-navbar >.nav-tabs >li:not(.no-menu)").on("click", function (e) {
          p(e.target).closest("li").is(".dropdown") || Breakpoints.is("xs") && p.site.menubar.open()
        })), "undefined" != typeof screenfull && (p(document).on("click", '[data-toggle="fullscreen"]', function () {
          return screenfull.isEnabled && screenfull.toggle(), !1
        }), screenfull.isEnabled && document.addEventListener(screenfull.raw.fullscreenchange, function () {
          p('[data-toggle="fullscreen"]').toggleClass("active", screenfull.isFullscreen)
        })), p(document).on("show.bs.dropdown", function (e) {
          var a, t = p(e.target),
            n = (e.relatedTarget ? p(e.relatedTarget) : t.children('[data-toggle="dropdown"]')).data("animation");
          n && ((a = t.children(".dropdown-menu")).addClass("animation-" + n), a.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            a.removeClass("animation-" + n)
          }))
        }), p('[data-toggle="tooltip"]').tooltip({
          trigger: "hover"
        }), p('[data-toggle="popover"]').popover(), t.localStorage && (this.theme(), this._tabsDraw()), p.components.init(), p(document).on("click", '.change-layout', function (ev) {
          var lo = p(this).attr('data-layout');
          localStorage.setItem('layout', lo);
          p('.change-layout.active').removeClass('active')
          p('.change-layout[data-layout="' + lo + '"]').addClass('active')
          e.theme()
          location.reload(true);
        })
      }
    }),
    p.site.run()
}(document, window, jQuery);