
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').DataTable($.po('dataTable', {
        "ajax": {
            "url": $.ctx + 'data/examples/tables/dt-ajax-6.json',
            "dataSrc": ""
        },
        "columns": [
            {"data": "name"},
            {"data": "position"},
            {"data": "office"},
            {"data": "extn"},
            {"data": "start_date"},
            {"data": "salary"}
        ]
    }));

})(window, document, jQuery);

