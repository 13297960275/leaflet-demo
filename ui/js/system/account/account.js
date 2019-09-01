/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (window, document, $) {
    'use strict';

    $.extend(window.notifyFn, { // 扩展账户信息页面时左侧名片&&选项卡消息计数
        messageNum: function (opt) {
            var $navMsg = $('#admui-navbarMessage').find('span.msg-num'),
                $total = $('.msg-number'),
                msgNumber = $navMsg.text(),
                allMsg = Number($total.text());

            $(".tabList>li.news span").text(msgNumber);
            if (opt === '1') {
                $total.text(allMsg + 1);
            }
        },
        unReadMsg: function (count) { // 显示未读消息
            $(".tabList>li.news span").text(count);
        }
    });

    // 获取消息数量
    // TODO: 需要配合后端服务来使用

    // $.ajax({
    //     url: $.ctx + '/user/account',
    //     dataType: 'JSON',
    //     success: function (data) {
    //         if(data.success){
    //             $('.msg-number').text(data.msgCount);
    //             $('.log-number').text(data.logCount);
    //         }else{
    //             toastr.error('出错了，请重试！');
    //         }
    //     },
    //     error: function () {
    //         toastr.error('服务器异常，请稍后再试！');
    //     }
    // });

})(window, document, jQuery);