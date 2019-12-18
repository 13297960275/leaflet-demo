function bindEvents() {
  var t = $(window),
    o = $(document.body);
  o.scrollspy({
    target: ".icl-docs-sidebar"
  }), t.on("load", function () {
    o.scrollspy("refresh")
  }), $('.icl-docs-container [href="#"]').click(function (t) {
    t.preventDefault()
  }), setTimeout(function () {
    var o = $(".icl-docs-sidebar");
    o.affix({
      offset: {
        top: function () {
          var t = o.offset().top;
          return this.top = t
        },
        bottom: function () {
          return this.bottom = $(".icl-docs-footer").outerHeight(!0)
        }
      }
    })
  }, 100)
}
$(function () {
  bindEvents()
});

var tocCopy = document.createElement("div");
tocCopy.id = "toc-copy";
var toc = document.querySelector("#toc");
if (toc) {
    tocCopy.innerHTML = toc.innerHTML,
    document.getElementsByClassName("container")[0].appendChild(tocCopy);
    for (var menus = document.querySelectorAll("#toc-copy ul"), i = 0; i < menus.length; i++)
        menus[i].addEventListener("mouseover", function() {
            this.previousElementSibling.classList.add("hover")
        }),
        menus[i].addEventListener("mouseout", function() {
            this.previousElementSibling.classList.remove("hover")
        });
    var labels = document.querySelectorAll("#toc-copy h4");
    for (i = 0; i < labels.length; i++)
        labels[i].addEventListener("click", function() {
            this.classList.toggle("active")
        });
    tocCopy.addEventListener("click", function(e) {
        "H4" != e.target.nodeName && this.classList.toggle("active")
    });
    var scrollPos = function() {
        window.scrollY >= toc.offsetHeight + toc.offsetTop ? document.body.classList.add("scrolled") : document.body.classList.remove("scrolled")
    };
    scrollPos(),
    window.addEventListener("scroll", function(e) {
        scrollPos()
    })
}
