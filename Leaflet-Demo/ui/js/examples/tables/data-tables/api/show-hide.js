
(function (window, document, $) {
    "use strict";

    var table = $('#dataTableExample').DataTable($.po('dataTable', {
        "scrollY": "200px",
        "paging": false
    }));

    $(document).on('click', '#DTToggleBtn .btn', function () {
        // 获取 API 对象
        var column = table.column($(this).attr('data-column'));

        // 显示切换
        column.visible(!column.visible());
    });

})(window, document, jQuery);

