
(function (window, document, $) {
    "use strict";

    var table = $('#dataTableExample').DataTable($.po('dataTable'));

    $(document).on('click', '#dataTableExample tbody tr', function () {
        $(this).toggleClass('selected');
    });

    $(document).on('click', '#DTSelectRow', function () {
        toastr.info('选中了 ' + table.rows('.selected').data().length + ' 行数据');
    });

})(window, document, jQuery);

