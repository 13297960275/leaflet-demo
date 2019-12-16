
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').DataTable($.po('dataTable', {
        "processing": true,
        "ajax": $.ctx + '/data/examples/tables/dt-ajax-4.json',
        columns: [
            {data: "name"},
            {data: "position"},
            {data: "office"},
            {data: "extn"},
            {
                data: {
                    _: "start_date.display",
                    sort: "start_date.timestamp"
                }
            },
            {data: "salary"}
        ]
    }));

})(window, document, jQuery);

