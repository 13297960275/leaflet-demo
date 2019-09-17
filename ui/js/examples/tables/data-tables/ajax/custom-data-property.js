
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').DataTable($.po('dataTable', {
        "processing": true,
        "ajax": {
            "url": $.ctx + 'data/examples/tables/dt-ajax-5.json',
            "dataSrc": "demo"
        }
    }));

})(window, document, jQuery);

