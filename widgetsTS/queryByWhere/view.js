var thisWidget,selectedLayer,whereCfg;function initWidgetView(e){thisWidget=e,$.getJSON("config.json",function(e){whereCfg=e.where;for(var t,r=e.layers,h={},n=[],l=0;l<r.length;l++){var o=r[l];if(null!=o.name&&""!=o.name){var a={text:o.name,id:o.id||999+l,pId:o.pid||-1};null==o.url?(a.iconCls="icon-ui-folder",a.state="true"==o.open?"open":"closed"):(null==t&&(t=a.id),a.iconCls="icon-ui-shape_move_forwards",h[a.id]=o),n.push(a)}}$("#queryonewhere_cmb_layer").combotree({width:308,data:n,loadFilter:function(e){return convertTree(e)},onChange:function(e,t){selectedLayer=null;var r=h[e];if(null==r)return alert("请不要选择分组，请重新选择图层!"),void $("#queryonewhere_cmb_layer").combotree("setValue",t);var n=(selectedLayer=r).columnsShow&&selectedLayer.columnsShow.where,l=selectedLayer.columnsShow&&selectedLayer.columnsShow.table,o=[],a=[],i={name:"序号",field:"rowID"};o.push(i);for(var u=0;u<selectedLayer.columns.length;u++){var c=selectedLayer.columns[u];l&&-1==selectedLayer.columnsShow.table.indexOf(c.field)||(c.title=c.name,o.push(c)),n&&-1==selectedLayer.columnsShow.where.indexOf(c.field)||a.push(c)}thisWidget.clearShowFeature(),$("#queryonewhere_table").datagrid({columns:[o],data:[]}),$("#queryonewhere_cmb_col_name").combobox({data:a,valueField:"field",textField:"name",multiple:!1,editable:!1,onChange:function(e){var t=getColumnCfgItem(e);if(null!=t){var r=t.type||"text";$("#queryonewhere_cmb_col_where").combobox({data:whereCfg[r],multiple:!1,editable:!1,width:100,valueField:"field",textField:"name"}),$("#queryonewhere_cmb_col_where").combobox("setValue",whereCfg[r][0].field)}}}),$("#queryonewhere_cmb_col_name").combobox("setValue",selectedLayer.columns[0].field)}}),$("#queryonewhere_cmb_layer").combotree("setValue",t)}),$("#queryonewhere_cmb_col_name").combobox({width:100}),$("#queryonewhere_txt_col_val").textbox({width:100}),$('input:radio[name="queryonewhere_drawtype"]').change(function(){switch($('input:radio[name="queryonewhere_drawtype"]:checked').val()){case"0":case"1":$("#btn_queryonewhere_resetDraw").hide(),thisWidget.clearDraw();break;case"2":$("#btn_queryonewhere_resetDraw").show(),thisWidget.drawPolygon()}}),$("#btn_queryonewhere_resetDraw").click(function(){thisWidget.drawPolygon()}),$("#queryonewhere_table").datagrid({singleSelect:!0,pagination:!0,rownumbers:!1,height:getHeight(),fitColumns:!0,pagination:!0,onClickRow:function(e,t){thisWidget.centerAt(t.rowID)}}),$("#btnExQueryOneWhere").click(function(){excuteSqlQuery()})}function getColumnCfgItem(e){if(null==selectedLayer)return null;for(var t=0;t<selectedLayer.columns.length;t++){var r=selectedLayer.columns[t];if(r.field==e)return r}return null}function convertTree(e){function t(e,t){for(var r=0;r<e.length;r++)if(e[r].id==t)return!0;return!1}for(var r=[],n=0;n<e.length;n++){t(e,(a=e[n]).pId)||r.push({id:a.id,text:a.text})}var l=[];for(n=0;n<r.length;n++)l.push(r[n]);for(;l.length;){var o=l.shift();for(n=0;n<e.length;n++){var a;if((a=e[n]).pId==o.id){var i={id:a.id,text:a.text};o.children?o.children.push(i):o.children=[i],l.push(i)}}}return r}function excuteSqlQuery(){if(thisWidget.clearShowFeature(),null!=selectedLayer){var e=$('input:radio[name="queryonewhere_drawtype"]:checked').val(),t=$("#queryonewhere_cmb_col_name").combobox("getValue"),r=$("#queryonewhere_cmb_col_where").combobox("getValue"),n=$("#queryonewhere_txt_col_val").textbox("getValue");if(thisWidget.hasDraw()||"2"!=e){var l;if(null!=n&&0<n.length){if(null==t||0==t.length)return void toastr.warning("请选择需要查询的字段");if(null==r||0==r.length)return void toastr.warning("请选择查询条件方式");var o="text",a=getColumnCfgItem(t);null!=a&&a.type&&(o=a.type),l="number"==o?t+" "+r+" "+n+"  ":"like"==r?t+" "+r+" '%"+n+"%' ":t+" "+r+" '"+n+"' "}haoutil.loading.show(),thisWidget.query({url:selectedLayer.url,where:l,extenttype:e,end:function(){haoutil.loading.hide()}})}else toastr.warning("请在地图上鼠标单击绘制限定范围！")}else toastr.warning("请选择图层")}function showResult(l){$("#queryonewhere_table").datagrid("loadData",l.slice(0,10));var o=$("#queryonewhere_table").datagrid("getPager");o.pagination({total:l.length,onSelectPage:function(e,t){var r=(e-1)*t,n=r+t;$("#queryonewhere_table").datagrid("loadData",l.slice(r,n)),o.pagination("refresh",{total:l.length,pageNumber:e})}})}function getHeight(){return $(window).height()-90}