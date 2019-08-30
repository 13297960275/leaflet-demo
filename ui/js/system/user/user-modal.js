/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
"use strict";
(function (window, document, $) {

    var $userAccont = $("#userAccountInfo");

    var userModal = window.userModal = {
        addUser: function () {
            $userAccont.find("input[name='loginName']").removeAttr("readonly").val("");
            $userAccont.find("input[name='userId']").val("");
        },
        editUser: function (currentUser, currentRow) {
            var $checkbox = $userAccont.find('input:checkbox');

            this.currentRow = currentRow;

            $userAccont
                .formValidation('enableFieldValidators', 'password', false, 'notEmpty')
                .formValidation('enableFieldValidators', 'confirm', false, 'notEmpty');

            $userAccont.find("input[name='loginName']").attr("readonly", "").val(currentRow.loginName);
            $userAccont.find("input[name='userId']").val(currentRow.userId);

            if (currentRow.userId === currentUser) {
                $checkbox.prop('disabled', true);
            } else {
                if (currentRow.state === 'FORBIDDEN') {
                    $checkbox.prop("checked", true).val('FORBIDDEN');
                }
            }
        },
        authView: function (data, others) {
            var html;

            $.extend(true, this, others);

            template.helper('authVal', function (auth) {
                if (auth) {
                    return 'selected';
                }
            });

            html = template('userAuth', data);

            $('select[name="roleIds"]').html(html).multiSelect('refresh');
        }
    };

    // 禁用选中用户
    $userAccont.find("input:checkbox").change(function () {
        var $item = $(this);

        if ($item.is(":checked")) {
            $item.val('FORBIDDEN');
        } else {
            $item.val('NORMAL');
        }
    });

    $userAccont
        .formValidation($.po('formValidation', {
            fields: {
                loginName: {
                    validators: {
                        notEmpty: {
                            message: '账号信息不能为空'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            enabled: true,
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: '密码必须大于6且小于30个字符'
                        }
                    }
                },
                confirm: {
                    validators: {
                        notEmpty: {
                            enabled: true,
                            message: '确认密码不能为空'
                        },
                        identical: {
                            field: 'password',
                            message: '确认密码必须和密码保持一致'
                        }
                    }
                },
                limit: {
                    validators: {
                        notEmpty: {
                            message: '必须选中一个角色'
                        }
                    }
                }
            }
        }))
        .on('success.form.fv', function (e) {
            var $target = $(e.target),
            validator = $target.data('formValidation');

            $.ajax({
                url: $.ctx + '/user/save',
                type: 'POST',
                data: $target.serialize(),
                dataType: 'JSON',
                success: function (data) {
                    var table = userModal.table,
                        $currentRow = userModal.$currentRow,
                        _callback = function () {
                            var state = validator.getFieldElements('state').val();
                            table.row($currentRow).data().state = state;

                            if (state === "NORMAL") {
                                if ($currentRow.hasClass('disabled')) {
                                    $currentRow.removeClass('disabled');
                                }
                            } else if (state === "FORBIDDEN") {
                                if (!$currentRow.hasClass('disabled')) {
                                    $currentRow.addClass('disabled');
                                }
                            }
                        };

                    if (data.success) {
                        if (typeof userModal.currentRow !== 'undefined') {
                            _callback();
                        } else {
                            table.row.add(data.user).draw(false);
                        }

                        userModal.$el.modal('hide');
                        toastr.success(data.msg);
                    } else {
                        toastr.error(data.msg);
                    }
                },
                error: function () {
                    toastr.error('服务器异常，请稍后再试！');
                }
            });
            e.preventDefault();
        });
})(window, document, jQuery);