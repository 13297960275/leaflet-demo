var thisWidget,$table;function getHeight(){return $(window).height()-50}function initWidgetView(a){thisWidget=a,$("#btn_bookmark_Add").bind("click",function(){saveBookmark()}),($table=$("#table")).bootstrapTable({height:getHeight(),singleSelect:!0,pagination:!1,pageSize:6,iconsPrefix:"fa",columns:[{field:"name",title:"名称",sortable:!0,editable:!1,align:"left"},{field:"operate",title:"操作",align:"center",width:50,events:{"click .remove":function(a,o,r,t){delBookMark(r.name)}},formatter:function(a,o,r){return['<a class="remove" href="javascript:void(0)" title="删除">','<i class="fa fa-trash"></i>',"</a>"].join("")}}],onClickRow:function(a,o,r){var t=a.data;thisWidget.showExtent(t)}}),initBookMarkList()}var cookieName="gis_bookmark",arrBookmark=[];function initBookMarkList(){var lastcookie=haoutil.cookie.get(cookieName);if(null!=lastcookie&&(arrBookmark=eval(lastcookie)),null==arrBookmark||0==arrBookmark.length){arrBookmark=[];var bounds=thisWidget.getDefaultExtent();arrBookmark.push({name:"默认位置",data:bounds})}$table.bootstrapTable("load",arrBookmark)}function saveBookmark(){null==arrBookmark&&(arrBookmark=[]);var a=$.trim($("#txt_bookmark_name").val()).replace("'","").replace('"',"");if(0!=a.length){for(var o=arrBookmark.length-1;0<=o;o--)if(arrBookmark[o].name==a)return void toastr.warning("该名称已存在，请更换！");var r=thisWidget.getThisExtent();arrBookmark.push({name:a,data:r}),lastcookie=JSON.stringify(arrBookmark),haoutil.cookie.add(cookieName,lastcookie),$("#txt_bookmark_name").val(""),initBookMarkList()}else toastr.warning("请输入名称")}function delBookMark(a){for(var o=arrBookmark.length-1;0<=o;o--)if(arrBookmark[o].name==a){arrBookmark.splice(o,1);var r=JSON.stringify(arrBookmark);haoutil.cookie.add(cookieName,r),$table.bootstrapTable("load",arrBookmark);break}}