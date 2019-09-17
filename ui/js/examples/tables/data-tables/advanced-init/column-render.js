
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').DataTable($.po('dataTable', {
        "columnDefs": [
            {
                "render": function (data, type, row) {
                    return data + ' (' + row[3] + ')';
                },
                "targets": 0
            },
            {
                "visible": false,
                "targets": [3]
            }
        ]
    }));

})(window, document, jQuery);

