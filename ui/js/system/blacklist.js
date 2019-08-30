/**
 * UI v1.1.0
 * Copyright 2017-2018 Muyao
 * Licensed under the Muyao License 1.0 
 */
(function (window, document, $) {
    "use strict";

    var $blaclistModal = $('#add');

    var blacklist = {
        queryIp: function () { // ip查询
            var opts = $.extend(true, {}, $.po('webuiPopover'), $('.ip-msg').data(), {
                trigger: 'click',
                title: '详细信息',
                type: 'async',
                content: function (data) {
                    var message = '出错了，请重试！';
                    if (data.success) {
                        message = data.message;
                    }
                    return message;
                }
            });
            $('.ip-msg').webuiPopover(opts);
        },
        run: function () {
            var oTable, self = this,
                $blackList = $("#blackList");

            // 表格初始化
            oTable = $('.dataTable').DataTable($.po('dataTable', {
                rowId: 'blId',
                autoWidth: false,
                columns: [
                    {
                        "render": function (data, type, row, meta) {
                            return ( meta.row + 1);
                        }
                    },
                    {
                        "render": function (data, type, row) {
                            var html,
                                loginIp = row.loginIp;

                            if (loginIp === undefined) {
                                html = row[1];
                            } else {
                                html = '<a href="javascript:;" class="ip-msg" data-url="/query/ip?' + loginIp + '">' + loginIp + '</a>';
                            }
                            return html;
                        }
                    },
                    {"data": "createTime"},
                    {"data": "comment"},
                    {
                        "render": function () {
                            return '<a class="btn btn-pure btn-xs btn-default icon wb-close delete-tr" href="#"></a>';
                        }
                    }
                ],
                drawCallback: function () {
                    this.api().column(0).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });

                    self.queryIp();
                }
            }));

            // 黑名单编辑表单初始化
            $blackList
                .formValidation($.po('formValidation', {
                    fields: {
                        ip: {
                            validators: {
                                notEmpty: {
                                    message: "请填写IP地址"
                                }
                            }
                        }
                    }
                }))
                .on('success.form.fv', function (e) {
                    var validator = $(e.target).data('formValidation'),
                        blacklist = {
                            loginIp: validator.getFieldElements('ip').val(),
                            comment: validator.getFieldElements('comment').val()
                        };

                    $.ajax({
                        url: $.ctx + '/blacklist/save',
                        type: 'POST',
                        data: $(this).serialize(),
                        dataType: 'JSON',
                        success: function (data) {
                            if (data.success) {
                                blacklist.blId = data.blacklist.blId;
                                blacklist.createTime = data.blacklist.createTime;

                                $blaclistModal.one('hidden.bs.modal', function () {
                                    oTable.row.add(blacklist).draw(false);

                                    toastr.success('添加成功！');
                                }).modal('hide');
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

            // 模态窗隐藏后
            $blaclistModal.one('hide.bs.modal', function () {
                $blackList.formValidation('resetForm', true);
                $blackList.find('textarea').val('');
            });

            // 删除当前行
            $(document).on('click', '.delete-tr', function (e) {
                var $item = $(this).closest('tr'), ID,
                    $tr = $item.prev();

                if ($item.hasClass('child') && $tr.hasClass('parent')) {
                    $item = $tr;
                }
                ID = oTable.row($item).id();

                parent.layer.confirm('你确定要删除吗？', function (index) {
                    $.ajax({
                        url: $.ctx + '/blacklist/delete?blId=' + ID,
                        type: 'POST',
                        dataType: 'JSON',
                        success: function (data) {
                            if (data.success) {
                                oTable.row($item).remove().draw(false);
                                toastr.success('删除成功！');
                                parent.layer.close(index);
                            } else {
                                toastr.error('出错了，请重试！');
                            }
                        },
                        error: function () {
                            toastr.error('服务器异常，请稍后再试！');
                        }
                    });
                });
                e.preventDefault();
            });
        }
    };

    blacklist.run();

})(window, document, jQuery);