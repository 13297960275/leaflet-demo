/* 2018-7-14 20:37:01 | 版权所有 合肥火星科技有限公司 http://www.marsgis.cn  【联系我们QQ：516584683，微信：marsgis】 */
!function(t,e,i){"use strict";var c="asSelectable",r=i[c]=function(t,e){this.element=t,this.$element=i(t),this.options=i.extend({},r.defaults,e,this.$element.data()),this.init()};r.defaults={allSelector:".selectable-all",itemSelector:".selectable-item",rowSelector:"tr",rowSelectable:!1,rowActiveClass:"active",onChange:null},r.prototype={constructor:r,init:function(){var n=this,c=this.options;n.$element.on("change",c.allSelector,function(){var e=i(this).prop("checked");n.getItems().each(function(){var t=i(this);t.prop("checked",e).trigger("change",[!0]),n.selectRow(t,e)})}),n.$element.on("click",c.itemSelector,function(t){var e=i(this),o=e.prop("checked");n.selectRow(e,o),t.stopPropagation()}),n.$element.on("change",c.itemSelector,function(){var t=n.$element.find(c.allSelector),e=n.getItems().length,o=n.getSelected().length;e===o?t.prop("checked",!0):t.prop("checked",!1),n._trigger("change",o),"function"==typeof c.callback&&c.callback.call(this)}),c.rowSelectable&&n.$element.on("click",c.rowSelector,function(t){if("checkbox"!==t.target.type&&"button"!==t.target.type&&"a"!==t.target.tagName.toLowerCase()&&!i(t.target).parent("div.checkbox-custom").length){var e=i(c.itemSelector,this),o=e.prop("checked");e.prop("checked",!o),n.selectRow(e,!o)}})},selectRow:function(t,e){e?t.parents(this.options.rowSelector).addClass(this.options.rowActiveClass):t.parents(this.options.rowSelector).removeClass(this.options.rowActiveClass)},getItems:function(){return this.$element.find(this.options.itemSelector)},getSelected:function(){return this.getItems().filter(":checked")},_trigger:function(t){var e=Array.prototype.slice.call(arguments,1),o=[this].concat(e);this.$element.trigger(c+"::"+t,o);var n="on"+(t=t.replace(/\b\w+\b/g,function(t){return t.substring(0,1).toUpperCase()+t.substring(1)}));"function"==typeof this.options[n]&&this.options[n].apply(this,e)}},i.fn[c]=function(t){var e=t,o=this.first().data(c),n=Array.prototype.slice.call(arguments,1);return"string"==typeof t?!/^_/.test(e)&&(/^(get)/.test(e)&&o&&"function"==typeof o[e]?o[e].apply(o,n):this.each(function(){var t=i.data(this,c);t&&"function"==typeof t[e]&&t[e].apply(t,n)})):this.each(function(){i.data(this,c)||i.data(this,c,new r(this,t))})}}(window,document,jQuery);