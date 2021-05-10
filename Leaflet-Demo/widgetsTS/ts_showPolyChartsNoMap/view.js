var thisWidget;function getHeight(){var t=$(window).height()-31;$("#echartsView").height(t),myChart&&myChart.resize()}var arrData,featureCollection,selectData,echarsNameObj,myChart,colors=["#FFEDA0","#FED976","#FEB24C","#FD8D3C","#FC4E2A","#E31A1C","#BD0026","#800026"];function getColor(t){var e=selectData.span,a=e.length+1;a>colors.length&&(a=colors.length);for(var r=0;r<a;r++)if(t<e[r])return colors[r];return colors[colors.length-1]}function initWidgetView(t){thisWidget=t,getHeight(),$(window).resize(getHeight),(myChart=echarts.init(document.getElementById("echartsView"))).on("mouseover",function(t){thisWidget.showPolyTip(t.name)}),myChart.on("mouseout",function(t){thisWidget.hidePolyTip(t.name)}),$("#ddlZT").change(function(){showYear($("#ddlZT").val())}),$("#ddlYear").change(function(){showData()}),$.getJSON("config.json",function(t){if(featureCollection={type:"FeatureCollection",features:t.features},null!=(arrData=t.list)&&0!=arrData.length){for(var e="",a=0;a<arrData.length;a++){var r=arrData[a];e+=' <option value="'+r.title+'">'+r.title+"</option>"}$("#ddlZT").html(e),setTimeout(function(){showYear(arrData[0].title)},600)}})}function showYear(t){for(var e=0;e<arrData.length;e++){var a=arrData[e];if(a.title==t){var r=a.year.split(",");if(null==r||0==r.length)break;for(var i="",o=0;o<r.length;o++)i+=' <option value="'+r[o]+'">'+r[o]+"</option>";$("#ddlYear").html(i),showData();break}}}function showData(t){t=$("#ddlZT").val(),$("#ddlYear").val();for(var e=[],a=0;a<arrData.length;a++){var r=arrData[a];if(r.title==t){e=(selectData=r).data;break}}echarsNameObj={};var i=[],o=[];for(a=0;a<featureCollection.features.length;a++){for(var n=featureCollection.features[a],l=n.properties.num=0;l<e.length;l++)if(n.properties.id==e[l].id){var s=+Math.floor(Math.random()*selectData.span[0]);n.properties.num=e[l].value+s;break}n.properties.color=getColor(n.properties.num),echarsNameObj[n.properties.shortname]=a,i.push(n.properties.shortname),o.push(n.properties.num)}updateData(selectData,i,o),thisWidget.addLayer(featureCollection,selectData)}function updateData(t,e,a){var r=t.title+"("+t.unit+")",i={title:{text:t.title,subtext:t.unit,left:"center",top:5},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},calculable:!0,xAxis:[{data:e,axisLine:{lineStyle:{color:"#999"}}}],yAxis:{splitLine:{show:!1},axisLine:{lineStyle:{color:"#999"}}},series:[{name:r,type:"bar",data:a,itemStyle:{normal:{color:function(t){return getColor(t.data)},label:{show:!1,position:"top",formatter:"{b}\n{c}"}}}}]};myChart.setOption(i,!0)}function showTip(t){myChart.dispatchAction({type:"highlight",seriesIndex:0,name:t}),myChart.dispatchAction({type:"showTip",seriesIndex:0,dataIndex:echarsNameObj[t]})}function hideTip(t){myChart.dispatchAction({type:"hideTip"}),myChart.dispatchAction({type:"downplay",seriesIndex:0,name:t})}