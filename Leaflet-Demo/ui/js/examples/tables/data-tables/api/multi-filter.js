
(function (window, document, $) {
    "use strict";

    // 安装 - 在foot每个单元格中添加文本框
    $('#dataTableExample tfoot th').each(function () {
        var title = $('#dataTableExample thead th').eq($(this).index()).text();
        $(this).html('<input class="form-control" type="text" placeholder="查找 ' + title + '">');
    });

    // DataTable
    var table = $('#dataTableExample').DataTable($.po('dataTable'));

    // 查找
    table.columns().eq(0).each(function (colIdx) {
        $('input', table.column(colIdx).footer()).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
    });

})(window, document, jQuery);

