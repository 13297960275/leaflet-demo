
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').DataTable($.po('dataTable', {
        "ajax": $.ctx + 'data/examples/tables/dt-ajax-2.json',
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

