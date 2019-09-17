
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').DataTable($.po('dataTable', {
        "columnDefs": [{
            "visible": false,
            "targets": 3
        }]
    }));

})(window, document, jQuery);

