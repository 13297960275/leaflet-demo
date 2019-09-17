
(function (window, document, $) {
    "use strict";

    var table = $('#dataTableExample').DataTable($.po('dataTable', {
        "columnDefs": [
            {"visible": false, "targets": 2}
        ],
        "order": [[2, 'asc']],
        "displayLength": 25,
        "drawCallback": function () {
            var api = this.api();
            var rows = api.rows({page: 'current'}).nodes();
            var last = null;

            api.column(2, {page: 'current'}).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="group"><td colspan="5">' + group + '</td></tr>'
                    );

                    last = group;
                }
            });
        }
    }));

    // 分组排序
    $(document).on('click', '#dataTableExample tbody tr.group', function () {
        var currentOrder = table.order()[0];
        if (currentOrder[0] === 2 && currentOrder[1] === 'asc') {
            table.order([2, 'desc']).draw();
        }
        else {
            table.order([2, 'asc']).draw();
        }
    });

})(window, document, jQuery);

