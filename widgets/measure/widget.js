L.widget.bindClass(L.widget.BaseWidget.extend({map:null,options:{view:{type:"divwindow",url:"view.html",windowOptions:{width:255,height:150}}},measureTool:null,create:function(){this.measureTool=new L.mars.MeasureTool({map:this.map,isactivate:!1})},winCreateOK:function(e,t){var a=this;$("#measure_length_danwei").selectpicker({container:"body",showTick:!0,width:"120px"}),$("#measure_area_danwei").selectpicker({container:"body",showTick:!0,width:"120px"}).selectpicker("hide"),$("#btn_measure_length").bind("click",function(){$("#measure_length_danwei").selectpicker("show"),$("#measure_area_danwei").selectpicker("hide"),a.showResult(""),a.drawPolyline()}),$("#btn_measure_area").bind("click",function(){$("#measure_length_danwei").selectpicker("hide"),$("#measure_area_danwei").selectpicker("show"),a.showResult(""),a.drawPolygon()}),$("#btn_measure_clear").bind("click",function(){$("#measure_length_danwei").selectpicker("show"),$("#measure_area_danwei").selectpicker("hide"),a.showResult(""),a.clearDraw()}),$("#measure_length_danwei").change(function(e){a.updateResultLengthByDw(!0)}),$("#measure_area_danwei").change(function(e){a.updateResultAreaByDw(!0)})},getLengtchDanWei:function(){return $("#measure_length_danwei").val()},getAreaDanWei:function(){return $("#measure_area_danwei").val()},showResult:function(e){$("#lbl_measure_result").html(e)},activate:function(){this.measureTool.activate()},disable:function(){this.measureTool.disable()},clearDraw:function(){this.showResult(""),this.measureTool.clear()},drawPolyline:function(){var a=this;this.measureTool.measureLength({unit:function(){return a.getLengtchDanWei()},showResult:function(e,t){a.showResult(e)}})},drawPolygon:function(){var a=this;this.measureTool.measureArea({unit:function(){return a.getAreaDanWei()},showResult:function(e,t){a.showResult(e)}})},updateResultLengthByDw:function(){var e=this.getLengtchDanWei();return this.measureTool.updateLengthUnit(e),this},updateResultAreaByDw:function(){var e=this.getAreaDanWei();return this.measureTool.updateAreaUnit(e),this}}));