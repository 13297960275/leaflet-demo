function tab2plot(){$("#tab_attr").addClass("disabled"),$("#tab_latlng").addClass("disabled"),$("#tab_plot").click()}$(function(){$(window).resize(refHeight),refHeight(),$(".mp_icon_close").click(function(){$(this).parent().parent(".mp_box").hide()}),$(".mp_tab_tit li").click(function(){if($(this).hasClass("cur")||$(this).hasClass("disabled"))return!1;var e=$(this),i=e.index();e.addClass("cur").siblings("li").removeClass("cur"),e.parent().siblings(".mp_tab_con").children().eq(i).addClass("cur").siblings().removeClass("cur");var s=$(this).attr("id");"tab_plot"!=s&&(last_attr_tab=s)}),$(".open").click(changeOpenShowHide)});var last_attr_tab="tab_attr";function tab2attr(){$("#tab_attr").removeClass("disabled"),$("#tab_latlng").removeClass("disabled"),$("#tab_plot").hasClass("cur")&&$("#"+last_attr_tab).click()}function changeOpenShowHide(){var e=$(this).siblings(),i=$(this).children(".tree_icon");e.toggle(),e.is(":hidden")?i.html("+"):i.html("-")}function refHeight(){$(".mp_tab_card").height($(".mp_box").height()-$(".mp_head").height()-1),$(".mp_tree").height($(".mp_tab_card").height()-32),$(".mp_mark").height($(".mp_tab_card").height()-80)}!function(k){var i={select:"mp_select",select_text:"mp_select_text",select_ul:"mp_select_ul"};k.fn.extend({select:function(e){var a=k.extend({},i,e);return this.each(function(){var s=k(this);void 0!==s.data("value")&&""!==s.data("value")&&s.val(s.data("value"));var i=[];i.push('<div class="'+s.attr("class")+'">'),i.push('<div class="'+a.select_text+'">'+s.find(":selected").text()+"</div>"),i.push('<ul class="'+a.select_ul+'">'),s.children("option").each(function(){var e=k(this);s.data("value"),e.val(),i.push('<li data-value="'+e.val()+'">'+e.text()+"</li>")}),i.push("</ul>"),i.push("</div>");var e=k(i.join("")),t=e.find("."+a.select_text),c=e.find("."+a.select_ul);s.after(e),s.hide(),e.click(function(e){k(this).toggleClass("mp_selected"),k(this).find("."+a.select_ul).slideToggle().end().siblings("div."+a.select).find("."+a.select_ul).slideUp(),e.stopPropagation()}),k("body").click(function(){c.slideUp()}),c.on("click","li",function(){var e=k(this),i=e.addClass("selecton").siblings("li").removeClass("selecton").end().data("value").toString();i!==s.attr("data-value")&&(t.text(e.text()),s.attr("data-value",i),s.change())})})},checkbox:function(){return this.each(function(){var e=k(this),i=e.siblings("input");1==i.prop("disabled")?e.addClass("pnui-check-disbaled"):1==i.prop("checked")?e.addClass("pnui-checked"):e.removeClass("pnui-checked"),e.on("click",function(){if(1==i.prop("disabled"))return!1;e.hasClass("pnui-checked")?(i.removeAttr("checked"),e.removeClass("pnui-checked")):(i.attr("checked","checked"),e.addClass("pnui-checked"))}),k(".checkall").click(function(){var e=k(this),i=e.parents(".checkallbox").find(".pnui-chkbox");e.toggleClass("pnui-checked"),i.each(function(){k(this).toggleClass("pnui-checked")}),e.hasClass("pnui-checked")?(i.siblings("input").attr("checked","checked"),i.addClass("pnui-checked")):(i.siblings("input").removeAttr("checked"),i.removeClass("pnui-checked"))})})},radio:function(){return this.each(function(){var e=k(this);1==e.children("input").prop("disabled")?e.children(".pnui-rdobox").removeClass().addClass("pnui-rdobox pnui-radio-disbaled"):1==e.children("input").prop("checked")?(e.siblings().children("input").removeAttr("checked"),e.siblings().children(".pnui-rdobox").removeClass("pnui-checked"),e.children(".pnui-rdobox").addClass("pnui-checked")):(e.siblings().children("input").prop("checked","checked"),e.siblings().children(".pnui-rdobox").addClass("pnui-checked"),e.children(".pnui-rdobox").removeClass("pnui-checked")),e.on("click",function(){var e=k(this);if(1==e.children("input").prop("disabled"))return!1;1==e.children("input").prop("checked")?(e.siblings().children("input").prop("checked","checked"),e.siblings().children(".pnui-rdobox").addClass("pnui-checked"),e.children("input").removeAttr("checked"),e.children(".pnui-rdobox").removeClass("pnui-checked")):(e.siblings().children("input").removeAttr("checked"),e.siblings().children(".pnui-rdobox").removeClass("pnui-checked"),e.children("input").prop("checked","checked"),e.children(".pnui-rdobox").addClass("pnui-checked"))})})},progress:function(p){var u="puiprogress",v="puiprogress_bg",b="puiprogress_btn",g="puiprogress_bar",f="puiprogress_text";return this.each(function(){var s=k(this),e=[];e.push('<div class="'+u+'">'),e.push('<div class="'+v+'">'),e.push('<div class="'+g+'"></div>'),e.push("</div>"),e.push('<div class="'+b+'"></div>'),e.push('<div class="'+f+'">'+s.val()+"%</div>"),e.push("</div>");var i=k(e.join("")),t=i.find("."+v),c=i.find("."+b),a=i.find("."+g),n=i.find("."+f);s.after(i),s.hide();var l=!1,d=0,r=0,h=0;i.css("width",p);var o=Number(s.val());r=p*o/100,c.css("left",r),a.width(r),n.html(parseInt(o)+"%"),c.mousedown(function(e){d=e.pageX-r,l=!0}),k(document).mouseup(function(){l=!1}),i.mousemove(function(e){if(l){(r=e.pageX-d)<=0?r=0:p<r&&(r=p),c.css("left",r),a.width(r);var i=parseInt(r/p*100);n.html(i+"%"),s.val(i),s.change()}}),t.click(function(e){if(!l){h=t.offset().left,(r=e.pageX-h)<=0?r=0:p<r&&(r=p),c.css("left",r),a.animate({width:r},p);var i=parseInt(r/p*100);n.html(i+"%"),s.val(i),s.change()}})})}})}(jQuery);