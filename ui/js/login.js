/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function ($) {
    'use strict';

    
    // 表单验证
    $("#loginForm").formValidation({
        locale: 'zh_CN',
        framework: 'bootstrap',
        excluded: ':disabled',
        icon: {
            valid: 'icon wb-check',
            invalid: 'icon wb-close',
            validating: 'icon wb-refresh'
        },
        fields: {
            loginName: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '密码必须大于3且小于30个字符'
                    }
                }
            },
            validCode: {
                validators: {
                    notEmpty: {
                        enabled: true,
                        message: '验证码不能为空'
                    }
                }
            }
        }
    });

    function getGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // 验证码刷新
    $('.reload-vify').on('click', function () {
        var $img = $(this).children('img'),
            guid = getGUID(); 

        $img.prop('src', 'http://211.149.149.200:8888/mars-api/userlogin/captcha.jpg?uuid=' + guid);
    });
    $('.reload-vify').click();


    $("#btnSubmit").click(function () {
        //var user = $("#txtUser").val();
        //if (user == null || user.length == 0) {
        //    layer.tips('请输入用户名', '#txtUser');
        //    return;
        //}

        //var pwd = $("#txtPwd").val();
        //if (pwd == null || pwd.length == 0) {
        //    layer.tips('请输入密码', '#txtPwd');
        //    return;
        //}

        //请求后端，完成登录验证 
        //$.ajax({
        //    type: "post",
        //    url: "",
        //    data: {
        //        username: user,
        //        password: pwd,
        //        token: yzcode
        //    },
        //    dataType: "json", 
        //    success: function (data) {
        //        location.href = "index.html";             

        //    },
        //    error: function (XMLHttpRequest, textStatus, errorThrown) { 
        //        mui.toast("服务错误：" + textStatus);
        //    }
        //});

        location.href = "index.html";
    });



})(jQuery);
