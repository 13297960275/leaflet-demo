
(function (window, document, $) {
    "use strict";

    var t = $('#dataTableExample').DataTable($.po('dataTable', {
        "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": 0
        }],
        "order": [[1, 'asc']]
    }));

    t.on('order.dt search.dt',
        function () {
            t.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

})(window, document, jQuery);
